# cloud.gov.au website &middot; [![Travis-CI](https://travis-ci.org/govau/cloud.gov.au.svg)](https://travis-ci.org/govau/cloud.gov.au) [![GoDoc](https://godoc.org/github.com/govau/cloud.gov.au?status.svg)](http://godoc.org/github.com/govau/cloud.gov.au) [![Report card](https://goreportcard.com/badge/github.com/govau/cloud.gov.au)](https://goreportcard.com/report/github.com/govau/cloud.gov.au)

This repository contains the source code for the [cloud.gov.au](https://cloud.gov.au) website.

## Repository structure

This repository is designed for other cloud.gov.au subdomains like "docs" and "console" to sit alongside "www".

### cloud.gov.au website

* [www server](cmd/wwwd/README.md)
* [www UI](www/ui/README.md)

Note: the use of "www" does not imply that this website should be hosted on www.cloud.gov.au - it's simply that "www" is generally used on the root or entry point website for a domain. The idea is that the "www" website sits alongside "docs" and "console".

## docs.cloud.gov.au website

The docs source code can be found [here](https://github.com/ausdto/cga_docs). In the future, it sit in this repository alongside `www`. This will allow docs.cloud.gov.au to easily share styles and code.

## cloud.gov.au Cloud Foundry console website

The console source code can be found [here](https://github.com/govau/cg-dashboard/tree/deploy). In the future, it might sit in this repository alongside `www`. This will allow the console to easily share styles and code.

## Requirements

* Go
* Node.js
* Yarn

## Installation

From the project's root:

```sh
make install
```

## Testing the Go source

```sh
make test
```
