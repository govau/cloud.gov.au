package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/govau/cloud.gov.au/www"
	_ "github.com/lib/pq"
	prometheusclient "github.com/prometheus/client_golang/api"
	prometheus "github.com/prometheus/client_golang/api/prometheus/v1"
)

const (
	portEnv               = "PORT"
	postgresConnStrEnv    = "POSTGRES_URI"
	prometheusEndpointEnv = "PROMETHEUS_ENDPOINT"
	prometheusUsernameEnv = "PROMETHEUS_USERNAME"
	prometheusPasswordEnv = "PROMETHEUS_PASSWORD"

	defaultPort = "8080"

	prometheusQueryLifetime = 360 * time.Second
)

func main() {
	port := os.Getenv(portEnv)
	postgresConnStr := os.Getenv(postgresConnStrEnv)
	prometheusEndpointStr := os.Getenv(prometheusEndpointEnv)
	prometheusUsername := os.Getenv(prometheusUsernameEnv)
	prometheusPassword := os.Getenv(prometheusPasswordEnv)

	if port == "" {
		port = defaultPort
	}

	if prometheusEndpointStr == "" {
		fmt.Printf("%s must be provided\n", prometheusEndpointEnv)
		os.Exit(1)
	}

	db, err := sql.Open("postgres", postgresConnStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	log.Println("Pinging database...")
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}
	migrate, err := migrateDB(db)
	if err != nil {
		log.Fatal(err)
	}
	defer migrate.Close()

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

	cfms := www.NewCFMetricStore()

	s := &www.Server{
		NotFoundFile:      "notFound.html",
		NotFoundContent:   []byte(`Not found.`),
		UIDir:             "../../ui/build/", // TODO
		CachingPrometheus: cachingPrometheus,
		PrometheusQueries: prometheusQueries,
		CFMetricStore:     cfms,
	}

	listen := fmt.Sprintf(":%s", port)
	log.Printf("HTTP listening on %q...", listen)
	log.Println("HTTP ListenAndServe:", http.ListenAndServe(listen, s))
}
