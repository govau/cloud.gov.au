#!/usr/bin/env sh

set -eu

# Start in ui/
cd "$(dirname "$0")/.."

yarn install

yarn test
