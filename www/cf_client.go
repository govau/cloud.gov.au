package www

import (
	"context"
	"net/url"

	cfv2 "github.com/cloudfoundry-community/go-cfclient"
)

const userAgent = "cga_wwwd"

// CFClientConfig contains the values required to configure a Cloud Foundry
// client.
type CFClientConfig struct {
	APIEndpoint  *url.URL
	ClientID     string
	ClientSecret string
}

// CFClients encapsulates Cloud Foundry clients across multiple
// environments.
type CFClients struct {
	staging    CFClientConfig
	production CFClientConfig
}

// NewCFClients makes a new CFClients.
func NewCFClients(
	staging CFClientConfig,
	production CFClientConfig,
) *CFClients {
	return &CFClients{
		staging:    staging,
		production: production,
	}
}

// NewStaging makes a new Cloud Foundry client that connects to the staging env.
func (c *CFClients) NewStaging(ctx context.Context) (*cfv2.Client, error) {
	return cfv2.NewClient(&cfv2.Config{
		ApiAddress:   c.staging.APIEndpoint.String(),
		ClientID:     c.staging.ClientID,
		ClientSecret: c.staging.ClientSecret,
		UserAgent:    userAgent,
	})
}

// NewProduction makes a new Cloud Foundry client that connects to the
// production env.
func (c *CFClients) NewProduction(ctx context.Context) (*cfv2.Client, error) {
	return cfv2.NewClient(&cfv2.Config{
		ApiAddress:   c.production.APIEndpoint.String(),
		ClientID:     c.production.ClientID,
		ClientSecret: c.production.ClientSecret,
		UserAgent:    userAgent,
	})
}
