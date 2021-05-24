#! /usr/bin/env bash
set -e # exit if something goes wrong
./$(dirname $0)/preflight_checks.sh

# Install deps
yarn

# Publish a production release
exp publish --release-channel production --non-interactive

# ios
./$(dirname $0)/ship_ios.sh

# android
./$(dirname $0)/ship_android.sh

# Tag everything
./$(dirname $0)/tag_version.sh