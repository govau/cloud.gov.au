#!/usr/bin/env sh

set -eu

# Start in /
cd "$(dirname "$0")/.."

go test -race ./...
