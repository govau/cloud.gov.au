package www

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"time"

	prometheus "github.com/prometheus/client_golang/api/prometheus/v1"
	"github.com/prometheus/common/model"
)

// CachingPrometheus provides a database cache layer over the prometheus API.
type CachingPrometheus struct {
	db  *sql.DB
	api prometheus.API
	// lifetime is the duration for which a record should be cached.
	lifetime time.Duration
}

// NewCachingPrometheus makes a new CachingPrometheus.
func NewCachingPrometheus(
	db *sql.DB,
	api prometheus.API,
	lifetime time.Duration,
) *CachingPrometheus {
	return &CachingPrometheus{
		db:       db,
		api:      api,
		lifetime: lifetime,
	}
}

// modelValueFromBytes takes the database model value (which is in bytes) and
// converts it to a model.Value type (probably a model.Vector).
func modelValueFromBytes(vtbs, vbs []byte) (model.Value, error) {
	var vt model.ValueType
	if err := json.Unmarshal(vtbs, &vt); err != nil {
		return nil, err
	}
	switch vt {
	case model.ValVector:
		v := model.Vector{}
		if err := json.Unmarshal(vbs, &v); err != nil {
			return nil, err
		}
		return v, nil
	default:
		return nil, fmt.Errorf("could not decode value type %s", vt)
	}
}

// Query implements prometheus.API.
func (c *CachingPrometheus) Query(ctx context.Context, q string, ts time.Time) (model.Value, error) {
	row := c.db.QueryRowContext(ctx, `SELECT value_type, value, updated FROM prometheus_query WHERE query = $1`, q)
	var (
		vtbs      []byte
		vbs       []byte
		updateds  string
		noResults bool
		updated   time.Time
		expired   bool
	)
	switch err := row.Scan(&vtbs, &vbs, &updateds); err {
	case sql.ErrNoRows:
		// Fall out and query prometheus.
		noResults = true
	case nil:
		var err error
		// Check for expiry before considering this record.
		updated, err = time.Parse(time.RFC3339Nano, updateds)
		if err != nil {
			return nil, err
		}
		expiry := updated.Add(c.lifetime)
		if time.Now().After(expiry) {
			expired = true
			break
		}
		return modelValueFromBytes(vtbs, vbs)
	default:
		return nil, err
	}
	v, err := c.api.Query(ctx, q, ts)
	if err != nil {
		// If there were never any results from cache, we can't return anything
		// so we have no choice but to error.
		if noResults {
			log.Printf("Prometheus query failed. Unfortunately there was no cached record to return. The error from prometheus was: %v", err)
			return nil, err
		}
		// If we had an expired record, return that instead of failing.
		if expired {
			log.Printf("Prometheus query failed. Returning expired record which was last updated %s. The error from prometheus was: %v", updated, err)
			return modelValueFromBytes(vtbs, vbs)
		}
		return nil, err
	}
	vtb := &bytes.Buffer{}
	if err := json.NewEncoder(vtb).Encode(v.Type()); err != nil {
		return nil, err
	}
	vb := &bytes.Buffer{}
	if err := json.NewEncoder(vb).Encode(v); err != nil {
		return nil, err
	}
	if _, err := c.db.ExecContext(
		ctx,
		`INSERT INTO prometheus_query (query, value_type, value, updated)
		 VALUES ($1, $2, $3, $4)
		 ON CONFLICT (query) DO UPDATE SET value_type = $2, value = $3, updated = $4`,
		q,
		vtb.String(),
		vb.String(),
		time.Now().In(time.UTC),
	); err != nil {
		return nil, err
	}
	return v, nil
}
