package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestBasicAuthRoundTripper(t *testing.T) {
	rt := &basicAuthRoundTripper{
		base:     &http.Transport{},
		username: "jane",
		password: "password1234",
	}
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		u, p, ok := r.BasicAuth()
		if !ok {
			t.Errorf("got no basic auth credentials, want some")
			return
		}
		if !(u == "jane" && p == "password1234") {
			t.Errorf(`got basic auth credentials "%s:%s", want "jane:password1234"`, u, p)
			return
		}
	}))
	defer ts.Close()
	c := http.Client{Transport: rt}
	resp, err := c.Get(ts.URL)
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
}
