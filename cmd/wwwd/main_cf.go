// +build cloudfoundry

package main

import (
	"log"

	"github.com/govau/cfsvcenv"
)

func init() {
	if err := cfsvcenv.Bind(); err != nil {
		log.Fatal(err)
	}
}
