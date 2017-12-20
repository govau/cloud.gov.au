package www

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/prometheus/common/model"
)

func (s *Server) getPrometheusStat(w http.ResponseWriter, r *http.Request, id, q string) {
	v, err := s.CachingPrometheus.Query(r.Context(), q, time.Now())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	switch v := v.(type) {
	case model.Vector:
		switch id {
		case "buildpacks_staging":
			fallthrough
		case "buildpacks_production":
			v = cleanBuildpacks(v)
		}
		if err := json.NewEncoder(w).Encode(v); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	default:
		w.Write([]byte(fmt.Sprintf("not sure of the type %T\n", v)))
	}
}

// GetStat is a handler that can return a stat with a provided `id` from the URL
// query.
func (s *Server) GetStat(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	q, ok := s.PrometheusQueries[id]
	if ok {
		s.getPrometheusStat(w, r, id, q)
		return
	}
	var v model.Vector
	switch {
	case id == "total_deployments_staging":
		v = s.CFMetricStore.Staging.Deployments
	case id == "total_deployments_production":
		v = s.CFMetricStore.Production.Deployments
	default:
		http.Error(w, fmt.Sprintf("could not find stat %q", id), http.StatusNotFound)
		return
	}
	if err := json.NewEncoder(w).Encode(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
}
