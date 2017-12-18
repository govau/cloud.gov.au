package www

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
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

// Query implements prometheus.API.
func (c *CachingPrometheus) Query(ctx context.Context, q string, ts time.Time) (model.Value, error) {
	row := c.db.QueryRowContext(ctx, `SELECT value_type, value, updated FROM prometheus_query WHERE query = $1`, q)
	var (
		vtbs     []byte
		vbs      []byte
		updateds string
	)
	switch err := row.Scan(&vtbs, &vbs, &updateds); err {
	case sql.ErrNoRows:
		// Fall out and query prometheus.
	case nil:
		// Check for expiry before considering this record.
		updated, err := time.Parse(time.RFC3339Nano, updateds)
		if err != nil {
			return nil, err
		}
		expiry := updated.Add(c.lifetime)
		if time.Now().After(expiry) {
			break
		}
		var vt model.ValueType
		if err := json.Unmarshal(vtbs, &vt); err != nil {
			return nil, err
		}
		var v model.Value
		switch vt {
		case model.ValVector:
			v2 := model.Vector{}
			if err := json.Unmarshal(vbs, &v2); err != nil {
				return nil, err
			}
			v = v2
		default:
			return nil, fmt.Errorf("could not decode value type %s", vt)
		}
		return v, nil
	default:
		return nil, err
	}
	// TODO(jonathaningram): if this query fails because of connection issues,
	// and we had an expired query above, it's probably worth returning that and
	// just logging the error. The data will be stale but that's better than
	// failing here (and also part of the point of this wrapper).
	v, err := c.api.Query(ctx, q, ts)
	if err != nil {
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
