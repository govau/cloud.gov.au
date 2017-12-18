package www

import (
	"fmt"
	"net/http"
	"strings"
)

type Server struct {
	NotFoundFile    string
	NotFoundContent []byte
	UIDir           string
	*CachingPrometheus
	PrometheusQueries map[string]string
	*CFMetricStore
}

// NotFound is a handler that can write a HTML 404 response to w.
func (s *Server) NotFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusNotFound)
	w.Write(s.NotFoundContent)
}

// ServeHTTP implements http.Handler.
func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	switch r.URL.Path {
	// Since there is actually a real file named "notFound.html" in the UI dir
	// (assuming that's the value of s.NotFoundFile), we need to intercept this
	// and make it a real 404 because we don't want users to see this path as
	// existing.
	case fmt.Sprintf("/%s", s.NotFoundFile):
		s.NotFound(w, r)
		return
	default:
		switch {
		case strings.HasPrefix(r.URL.Path, "/api/get-stat/"):
			s.GetStat(w, r)
			return
		}
		http.StripPrefix("/", http.FileServer(http.Dir(s.UIDir))).
			ServeHTTP(
				newNotFoundResponseWriter(w, s.NotFoundContent),
				r,
			)
	}
}
