package www

import (
	"crypto/subtle"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"
	"time"
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

	githubCacheLock  sync.Mutex
	githubResultsTTL time.Time
	githubResults    []byte
}

// NotFound is a handler that can write a HTML 404 response to w.
func (s *Server) NotFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusNotFound)
	w.Write(s.NotFoundContent)
}

func (s *Server) getGithub() ([]byte, error) {
	s.githubCacheLock.Lock()
	defer s.githubCacheLock.Unlock()

	if time.Now().After(s.githubResultsTTL) {
		s.githubResults = nil
	}

	if s.githubResults != nil {
		return s.githubResults, nil
	}

	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("https://api.github.com/search/repositories?%s", (&url.Values{
		"q": []string{
			strings.Join([]string{
				"org:govau",
				"topic:govau-author-cga",
				"fork:true",
			}, " "),
		},
	}).Encode()), nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/vnd.github.v3+json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("bad status code from github")
	}

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	s.githubResults = data
	s.githubResultsTTL = time.Now().Add(24 * time.Hour)

	return data, nil
}

func (s *Server) getGithubStats(w http.ResponseWriter, r *http.Request) {
	bb, err := s.getGithub()
	if err != nil {
		http.Error(w, "unable to fetch state", http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/vnd.github.v3+json")
	w.Write(bb)
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
	case "/api/github-repos":
		s.getGithubStats(w, r)
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
