package main

import "net/http"

// basicAuthRoundTripper wraps the provided round tripper with basic auth
// credentials from username and password.
type basicAuthRoundTripper struct {
	base               http.RoundTripper
	username, password string
}

var _ http.RoundTripper = (*basicAuthRoundTripper)(nil)

// RoundTrip implements http.RoundTripper.
func (b *basicAuthRoundTripper) RoundTrip(r *http.Request) (*http.Response, error) {
	r.SetBasicAuth(b.username, b.password)
	return b.base.RoundTrip(r)
}
