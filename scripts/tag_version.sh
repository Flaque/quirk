#! /usr/bin/env bash
set -e

appver=$(cat app.json | jq '.expo.version' | sed "s/\"//g") # last sed removes quotes

echo "Tagging version as $appver"
git tag $appver
git push --tags