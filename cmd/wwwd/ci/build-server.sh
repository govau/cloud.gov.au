#!/usr/bin/env bash

set -euxo pipefail

ROOT_PATH="${PWD}"

echo "Env domain: ${ENV_DOMAIN}"

export GOPATH="${ROOT_PATH}/go"

go get -u github.com/golang/dep/cmd/dep

mkdir -p "${GOPATH}/src/github.com/govau"
ln -s "${ROOT_PATH}/src" "${GOPATH}/src/github.com/govau/cloud.gov.au"
cd "${GOPATH}/src/github.com/govau/cloud.gov.au"

"${GOPATH}/bin/dep" ensure

go test -race ./...

cd cmd/wwwd
go build -tags="cloudfoundry"

cp "${ROOT_PATH}/src/cmd/wwwd/wwwd" "${ROOT_PATH}/build/wwwd"
cp -R "${ROOT_PATH}/src/cmd/wwwd/migrations" "${ROOT_PATH}/build/migrations"
cp "${ROOT_PATH}/src/cmd/wwwd/ci/Procfile" "${ROOT_PATH}/build/Procfile"

ROUTE="www.system.${ENV_DOMAIN}"

if [ "$ENV_DOMAIN" "b.cld.gov.au" ]; then
  ROUTE="cloud.gov.au"
fi

printf "\nroutes:\n- route: ${ROUTE}\n" | cat "${ROOT_PATH}/src/cmd/wwwd/ci/manifest.yml" - > "${ROOT_PATH}/build/manifest.yml"
