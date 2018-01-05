package main

import (
	"context"
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"time"

	"github.com/NYTimes/gziphandler"
	"github.com/govau/cloud.gov.au/www"
	_ "github.com/lib/pq"
	prometheusclient "github.com/prometheus/client_golang/api"
	prometheus "github.com/prometheus/client_golang/api/prometheus/v1"
)

const (
	portEnv                     = "PORT"
	usernameEnv                 = "WWWD_USERNAME"
	passwordEnv                 = "WWWD_PASSWORD"
	postgresConnStrEnv          = "POSTGRES_URI"
	prometheusEndpointEnv       = "PROMETHEUS_ENDPOINT"
	prometheusUsernameEnv       = "PROMETHEUS_USERNAME"
	prometheusPasswordEnv       = "PROMETHEUS_PASSWORD"
	cfAPIEndpointStagingEnv     = "CF_API_ENDPOINT_STAGING"
	cfClientIDStagingEnv        = "CF_CLIENT_ID_STAGING"
	cfClientSecretStagingEnv    = "CF_CLIENT_SECRET_STAGING"
	cfAPIEndpointProductionEnv  = "CF_API_ENDPOINT_PRODUCTION"
	cfClientIDProductionEnv     = "CF_CLIENT_ID_PRODUCTION"
	cfClientSecretProductionEnv = "CF_CLIENT_SECRET_PRODUCTION"

	defaultPort                    = "8080"
	defaultPrometheusQueryLifetime = 360 * time.Second
	defaultPollFrequency           = 360 * time.Second
	defaultUIDir                   = "./build"
	defaultNotFoundFile            = "404.html"
)

func loop(
	ctx context.Context,
	pollFrequency time.Duration,
	prom *www.CachingPrometheus,
	prometheusQueries map[string]string,
	cfcs *www.CFClients,
	cfms *www.CFMetricStore,
) {
	go prometheusLoop(ctx, pollFrequency, prom, prometheusQueries)
	go cfEventsLoop(ctx, pollFrequency, cfcs.NewStaging, cfms.Staging)
	go cfEventsLoop(ctx, pollFrequency, cfcs.NewProduction, cfms.Production)
}

func main() {
	port := os.Getenv(portEnv)
	username := os.Getenv(usernameEnv)
	password := os.Getenv(passwordEnv)
	postgresConnStr := os.Getenv(postgresConnStrEnv)
	prometheusEndpointStr := os.Getenv(prometheusEndpointEnv)
	prometheusUsername := os.Getenv(prometheusUsernameEnv)
	prometheusPassword := os.Getenv(prometheusPasswordEnv)
	cfAPIEndpointStagingStr := os.Getenv(cfAPIEndpointStagingEnv)
	cfClientIDStaging := os.Getenv(cfClientIDStagingEnv)
	cfClientSecretStaging := os.Getenv(cfClientSecretStagingEnv)
	cfAPIEndpointProductionStr := os.Getenv(cfAPIEndpointProductionEnv)
	cfClientIDProduction := os.Getenv(cfClientIDProductionEnv)
	cfClientSecretProduction := os.Getenv(cfClientSecretProductionEnv)

	if port == "" {
		port = defaultPort
	}
	if prometheusEndpointStr == "" {
		fmt.Printf("%s must be provided\n", prometheusEndpointEnv)
		os.Exit(1)
	}
	if cfAPIEndpointStagingStr == "" {
		fmt.Printf("%s must be provided\n", cfAPIEndpointStagingEnv)
		os.Exit(1)
	}
	if cfAPIEndpointProductionStr == "" {
		fmt.Printf("%s must be provided\n", cfAPIEndpointProductionEnv)
		os.Exit(1)
	}
	prometheusQueryLifetime := defaultPrometheusQueryLifetime
	pollFrequency := defaultPollFrequency
	uiDir := defaultUIDir
	notFoundFile := defaultNotFoundFile

	db, err := sql.Open("postgres", postgresConnStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	log.Println("Pinging database...")
	if err := db.Ping(); err != nil {
		log.Fatalf("Could not ping database: %v", err)
	}
	// db2 is used so that the migrate code can close the connection after it's
	// finished with it.
	// See https://github.com/mattes/migrate/issues/297#issuecomment-339646656
	db2, err := sql.Open("postgres", postgresConnStr)
	if err != nil {
		log.Fatal(err)
	}
	migrate, err := migrateDB(db2)
	if err != nil {
		log.Fatal(err)
	}
	err1, err2 := migrate.Close()
	if err1 != nil {
		log.Fatalf("Could not close migrate source: %v", err1)
	}
	if err2 != nil {
		log.Fatalf("Could not close migrate database: %v", err2)
	}

	prometheusEndpoint, err := url.Parse(prometheusEndpointStr)
	if err != nil {
		log.Fatal(err)
	}

	c, err := prometheusclient.NewClient(prometheusclient.Config{
		Address: prometheusEndpoint.String(),
		RoundTripper: &basicAuthRoundTripper{
			base:     prometheusclient.DefaultRoundTripper,
			username: prometheusUsername,
			password: prometheusPassword,
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	prom := prometheus.NewAPI(c)

	cachingPrometheus := www.NewCachingPrometheus(
		db,
		prom,
		prometheusQueryLifetime,
	)

	prometheusQueries := map[string]string{
		// total apps
		"total_non_system_cf_apps_staging":              `count(cf_application_info{environment="y-cld-gov-au", organization_name!="system"})`,
		"total_non_system_cf_apps_prev_week_staging":    `count(cf_application_info{environment="y-cld-gov-au", organization_name!="system"} offset 7d)`,
		"total_non_system_cf_apps_production":           `count(cf_application_info{environment="b-cld-gov-au", organization_name!="system"})`,
		"total_non_system_cf_apps_prev_week_production": `count(cf_application_info{environment="b-cld-gov-au", organization_name!="system"} offset 7d)`,
		// buildpacks
		"buildpacks_staging":    `count(cf_application_info{environment="y-cld-gov-au", organization_name!="system"}) by (buildpack)`,
		"buildpacks_production": `count(cf_application_info{environment="b-cld-gov-au", organization_name!="system"}) by (buildpack)`,
	}

	cfAPIEndpointStaging, err := url.Parse(cfAPIEndpointStagingStr)
	if err != nil {
		log.Fatal(err)
	}
	cfAPIEndpointProduction, err := url.Parse(cfAPIEndpointProductionStr)
	if err != nil {
		log.Fatal(err)
	}
	cfcs := www.NewCFClients(
		www.CFClientConfig{
			APIEndpoint:  cfAPIEndpointStaging,
			ClientID:     cfClientIDStaging,
			ClientSecret: cfClientSecretStaging,
		},
		www.CFClientConfig{
			APIEndpoint:  cfAPIEndpointProduction,
			ClientID:     cfClientIDProduction,
			ClientSecret: cfClientSecretProduction,
		},
	)

	cfms := www.NewCFMetricStore()

	log.Println("Starting poll loop...")
	go loop(
		context.Background(),
		pollFrequency,
		cachingPrometheus,
		prometheusQueries,
		cfcs,
		cfms,
	)

	notFoundContent, err := ioutil.ReadFile(filepath.Join(uiDir, notFoundFile))
	if err != nil {
		log.Fatal(err)
	}

	s := &www.Server{
		Creds: www.BasicAuthCreds{
			Username: username,
			Password: password,
		},
		NotFoundPath:      notFoundFile,
		NotFoundContent:   notFoundContent,
		UIDir:             uiDir,
		CachingPrometheus: cachingPrometheus,
		PrometheusQueries: prometheusQueries,
		CFMetricStore:     cfms,
	}

	listen := fmt.Sprintf(":%s", port)
	log.Printf("HTTP listening on %q...", listen)
	log.Println("HTTP ListenAndServe:", http.ListenAndServe(listen, gziphandler.GzipHandler(s)))
}
