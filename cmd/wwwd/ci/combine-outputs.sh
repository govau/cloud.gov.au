#!/usr/bin/env sh

set -eux

ROOT_PATH="${PWD}"

cp -R ${ROOT_PATH}/build-server/* "${ROOT_PATH}/build/"
cp -R ${ROOT_PATH}/build-ui/* "${ROOT_PATH}/build/"
