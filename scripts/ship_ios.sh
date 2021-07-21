#! /usr/bin/env bash
set -e # exit if something goes wrong

# Build a ios standalone release 
exp build:ios --release-channel production --non-interactive --no-publish

# Download the artifact
curl -o app.ipa "$(exp url:ipa --non-interactive)"

# This step assumes you have the following environment variables set
fastlane deliver --verbose --ipa "app.ipa" --skip_screenshots --skip_metadata --user "flaqueeau@gmail.com" --team_name "Evan Conrad"