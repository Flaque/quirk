#! /usr/bin/env bash


# Version bumped? 
tag=$(git describe --tags --abbrev=0)
appver=$(cat app.json | jq '.expo.version' | sed "s/\"//g") # last sed removes quotes
if [ "$tag" == "$appver" ]; then
    echo "You haven't bumped the version in app.json"
    exit 1
fi