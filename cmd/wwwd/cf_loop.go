package main

import (
	"context"
	"fmt"
	"log"
	"net/url"
	"time"

	cfv2 "github.com/cloudfoundry-community/go-cfclient"
	"github.com/govau/cloud.gov.au/www"
	"github.com/prometheus/common/model"
)

const healthCheckAppName = "cf-healthcheck"

var sydneyLocation *time.Location

func init() {
	var err error
	sydneyLocation, err = time.LoadLocation("Australia/Sydney")
	if err != nil {
		log.Fatal(err)
	}
}

func collectDeployments(c *cfv2.Client) (model.Vector, error) {
	const timeLayout = "2006-01-02 15:04:05Z07:00"
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, sydneyLocation)

	var v model.Vector
	const days = 14

	for d := time.Duration(0); d < days; d++ {
		lower := today.Add(d * -24 * time.Hour)
		upper := lower.Add(24 * time.Hour)

		q := []string{
			"type:audit.app.build.create",
			fmt.Sprintf("timestamp>=%s", lower.Format(timeLayout)),
		}
		if d > 0 {
			q = append(
				q,
				fmt.Sprintf("timestamp<%s", upper.Format(timeLayout)),
			)
		}
		events, err := c.ListEventsByQuery(url.Values{"q": q})
		if err != nil {
			return nil, err
		}
		var total int
		for _, e := range events {
			if e.ActeeName == healthCheckAppName {
				continue
			}
			total++
		}
		v = append(v, &model.Sample{
			Metric:    model.Metric{},
			Value:     model.SampleValue(total),
			Timestamp: model.TimeFromUnixNano(lower.UnixNano()),
		})
	}

	return v, nil
}

func cfEventsLoop(
	ctx context.Context,
	pollFrequency time.Duration,
	newClient func(context.Context) (*cfv2.Client, error),
	metrics *www.CFMetrics,
) {
	for {
		select {
		case <-time.After(pollFrequency):
			cfc, err := newClient(ctx)
			if err != nil {
				log.Println(err)
				break
			}
			v, err := collectDeployments(cfc)
			if err != nil {
				log.Println(err)
				break
			}
			metrics.Deployments = v
		}
	}
}
