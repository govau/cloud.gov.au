#!/usr/bin/env bash

set -euxo pipefail

ROOT_PATH="${PWD}"

## Hack for Puppeteer
## See https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
#apt-get update && apt-get install -yq libgconf-2-4
#
#apt-get update && apt-get install -y wget --no-install-recommends \
#  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#  && apt-get update \
#  && apt-get install -y google-chrome-unstable \
#    --no-install-recommends \
#  && rm -rf /var/lib/apt/lists/* \
#  && apt-get purge --auto-remove -y curl \
#  && rm -rf /src/*.deb
## End hack for Puppeteer

export YARN_CACHE_FOLDER=${ROOT_PATH}/.yarn_cache
mkdir -p "${YARN_CACHE_FOLDER}"
cd "${ROOT_PATH}/src/www/ui"

#yarn add puppeteer

yarn install

#CI=true yarn test
#
#. "${ROOT_PATH}/src/cmd/wwwd/ci/build-ui-env-vars-${ENV_DOMAIN}.sh"

CI=true yarn build

cp -R "${ROOT_PATH}/src/www/ui/build" "${ROOT_PATH}/build/build"
