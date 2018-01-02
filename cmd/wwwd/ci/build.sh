#!/usr/bin/env sh

set -eu

ROOT_PATH="${PWD}"

# Server

export GOPATH="${ROOT_PATH}/go"
mkdir -p "${GOPATH}/src/github.com/govau"
ln -s "${ROOT_PATH}/src" "${GOPATH}/src/github.com/govau/cloud.gov.au"
cd "${GOPATH}/src/github.com/govau/cloud.gov.au"

## Deps
dep ensure

## Test
go test -race ./...

## Build
cd cmd/wwwd
go build -tags="cloudfoundry"

# UI

export YARN_CACHE_FOLDER=${ROOT_PATH}/www/ui/.yarn_cache
mkdir -p "${YARN_CACHE_FOLDER}"
cd "${ROOT_PATH}/www/ui"

## Deps
yarn install

## Test
yarn test

## Build
yarn build

# Output

## Copy artefacts to output directory
cp "${ROOT_PATH}/src/cmd/wwwd/wwwd" "${ROOT_PATH}/build/wwwd"
cp -R "${ROOT_PATH}/src/cmd/wwwd/migrations" "${ROOT_PATH}/build/migrations"
cp -R "${ROOT_PATH}/src/www/ui/build" "${ROOT_PATH}/build/build"
cp "${ROOT_PATH}/src/cmd/wwwd/ci/Procfile" "${ROOT_PATH}/build/Procfile"
cp "${ROOT_PATH}/src/cmd/wwwd/ci/manifest.yml" "${ROOT_PATH}/build/manifest.yml"
