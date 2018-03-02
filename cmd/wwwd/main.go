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
	"os/signal"
	"path/filepath"
	"syscall"
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
	// cfPollFrequencyEnv is the CF poll frequency env name (as a duration,
	// e.g. 1h, 5m).
	cfPollFrequencyEnv = "CF_POLL_FREQUENCY"

	defaultPort                    = "8080"
	defaultPrometheusQueryLifetime = 360 * time.Second
	defaultPrometheusPollFrequency = 3600 * time.Second
	defaultCFPollFrequency         = 6 * 3600 * time.Second
	defaultUIDir                   = "./build"
	defaultNotFoundFile            = "404.html"
	defaultNotFoundContent         = `<!doctype html>
<html lang="en">
<body>
	404 not found
</body>
</html>`

	maxDBPingAttempts = 10
)

// ping attempts to ping the provided DB a number of times.
// The provided name is just a label used for logging.
func ping(name string, db *sql.DB, maxAttempts int) error {
	log.Printf("Pinging %s database connection...", name)
	var err error
	for attempts := 1; attempts <= maxAttempts; attempts++ {
		err = db.Ping()
		if err == nil {
			break
		}
		log.Println(err)
		time.Sleep(time.Duration(attempts) * time.Second)
	}
	if err == nil {
		log.Println("OK")
	}
	return err
}

func mustPing(name string, db *sql.DB, maxAttempts int) {
	if err := ping(name, db, maxAttempts); err != nil {
		log.Fatalf("Could not ping database: %v", err)
	}
}

func loop(
	ctx context.Context,
	promPollFrequency time.Duration,
	cfPollFrequency time.Duration,
	prom *www.CachingPrometheus,
	prometheusQueries map[string]string,
	cfcs *www.CFClients,
	cfms *www.CFMetricStore,
) {
	log.Printf("Polling prometheus every %s", promPollFrequency)
	go prometheusLoop(ctx, promPollFrequency, prom, prometheusQueries)
	log.Printf("Polling CF staging every %s", cfPollFrequency)
	go cfEventsLoop(ctx, cfPollFrequency, cfcs.NewStaging, cfms.Staging)
	log.Printf("Polling CF production every %s", cfPollFrequency)
	go cfEventsLoop(ctx, cfPollFrequency, cfcs.NewProduction, cfms.Production)
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
	cfPollFrequencyStr := os.Getenv(cfPollFrequencyEnv)

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
	cfPollFrequency := defaultCFPollFrequency
	if cfPollFrequencyStr != "" {
		var err error
		cfPollFrequency, err = time.ParseDuration(cfPollFrequencyStr)
		if err != nil {
			fmt.Printf("%s must be a duration: %v\n", cfPollFrequencyEnv, err)
			os.Exit(1)
		}
	}
	prometheusQueryLifetime := defaultPrometheusQueryLifetime
	promPollFrequency := defaultPrometheusPollFrequency
	uiDir := defaultUIDir
	notFoundFile := defaultNotFoundFile

	if err := migrateDB(postgresConnStr, maxDBPingAttempts); err != nil {
		log.Fatalf("Could not migrate: %v", err)
	}
	db, err := sql.Open("postgres", postgresConnStr)
	if err != nil {
		log.Fatalf("Could not open main database connection: %v", err)
	}
	defer db.Close()
	mustPing("main", db, maxDBPingAttempts)

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt)
	signal.Notify(sigCh, syscall.SIGTERM)
	go func() {
		sig := <-sigCh
		log.Printf("Received %v, starting shutdown...", sig)
		db.Close()
		log.Println("Closed database connection")
		log.Println("Shutdown complete")
		os.Exit(0)
	}()

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
		promPollFrequency,
		cfPollFrequency,
		cachingPrometheus,
		prometheusQueries,
		cfcs,
		cfms,
	)

	notFoundContent, err := ioutil.ReadFile(filepath.Join(uiDir, notFoundFile))
	if os.IsNotExist(err) {
		log.Println("Creating missing not found / 404 file", filepath.Join(uiDir, notFoundFile))
		if err := os.MkdirAll(uiDir, 0755); err != nil {
			log.Fatal(err)
		}
		notFoundContent = []byte(defaultNotFoundContent)
		err = ioutil.WriteFile(filepath.Join(uiDir, notFoundFile), notFoundContent, 0755)
	}
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
