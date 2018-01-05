#!/usr/bin/env bash

set -eu

: ${TARGET:="local"}

PIPELINE="www"

fly validate-pipeline \
  --config ./pipeline.yml

fly -t $TARGET set-pipeline \
  --config ./pipeline.yml \
  --pipeline $PIPELINE \
  --load-vars-from ./credentials.yml
