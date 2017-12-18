package main

import (
	"context"
	"log"
	"time"

	"github.com/govau/cloud.gov.au/www"
)

func prometheusLoop(
	ctx context.Context,
	pollFrequency time.Duration,
	prom *www.CachingPrometheus,
	qs map[string]string,
) {
	for {
		select {
		case <-time.After(pollFrequency):
			for _, q := range qs {
				go func(q string) {
					_, err := prom.Query(ctx, q, time.Now())
					if err != nil {
						log.Println(err)
					}
				}(q)
			}
		}
	}
}
