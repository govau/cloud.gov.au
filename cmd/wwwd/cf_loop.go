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

// collectDeployments returns a vector of samples for the total number of
// app deployments per day, for the provided number of days starting back from
// now.
// TODO(jonathaningram): this function hits the CF API pretty hard because we
// cannot just get the total events from the first response. Really need to see
// if the CF API can be modified to accept the query parameters / filters we
// need. The problem is exacerbated as days is set to a higher value.
func collectDeployments(c *cfv2.Client, days int) (model.Vector, error) {
	const timeLayout = "2006-01-02 15:04:05Z07:00"
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, sydneyLocation)

	var v model.Vector

	for d := 0; d < days; d++ {
		lower := today.Add(time.Duration(d) * -24 * time.Hour)
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
	const days = 30

	for {
		select {
		case <-time.After(pollFrequency):
			cfc, err := newClient(ctx)
			if err != nil {
				log.Println(err)
				break
			}
			v, err := collectDeployments(cfc, days)
			if err != nil {
				log.Println(err)
				break
			}
			metrics.Deployments = v
		}
	}
}
