#! /usr/bin/env bash
set -e # exit if something goes wrong

./$(dirname $0)/preflight_checks.sh

# Build Android standalone release
exp build:android --release-channel production --non-interactive --no-publish

# Download the apk
curl -o app.apk "$(exp url:apk --non-interactive)"

fastlane supply --track 'production' --json_key '~/.api-7738836530326696066-539250-c6f11c3abb07.json' --package_name "tech.econn.quirk" --apk "app.apk" 