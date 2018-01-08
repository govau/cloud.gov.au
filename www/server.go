package www

import (
	"crypto/subtle"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

// BasicAuthCreds can be used to restrict access to Server.
type BasicAuthCreds struct {
	Username string
	Password string
}

type Server struct {
	Creds           BasicAuthCreds
	NotFoundPath    string
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
	if s.Creds.Username != "" {
		realm := "Basic realm=" + strconv.Quote("Authorization Required")
		u, p, _ := r.BasicAuth()
		if !(subtle.ConstantTimeCompare([]byte(s.Creds.Username), []byte(u)) == 1 &&
			subtle.ConstantTimeCompare([]byte(s.Creds.Password), []byte(p)) == 1) {
			w.Header().Set("WWW-Authenticate", realm)
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	switch r.URL.Path {
	// Since there is actually a real file named "404.html" in the UI dir
	// (assuming that's the value of s.NotFoundPath), we need to intercept this
	// and make it a real 404 because we don't want users to see this path as
	// existing.
	case fmt.Sprintf("/%s", s.NotFoundPath):
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
