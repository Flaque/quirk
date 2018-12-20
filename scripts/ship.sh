#! /usr/bin/env bash
set -e # exit if something goes wrong
./preflight_checks.sh

# Install deps
yarn

# Publish a production release
exp publish --release-channel production --non-interactive

# ios
./ship_ios.sh

# android
./ship_android.sh