#!/bin/bash

# Loop from 0 to 26 inclusive
for x in {0..26}; do
  echo "Processing version $x..."

  # Get the JSON response for the current version
  json=$(curl -s "https://assetdelivery.roblox.com/v2/assetId/131965012415321/version/$x")

  # Parse the asset link from the JSON response using jq.
  # Fix: Use .locations[0].location since locations is an array.
  asset_link=$(echo "$json" | jq -r '.locations[0].location')

  # Check if the asset link is valid (not "null" or empty)
  if [ -z "$asset_link" ] || [ "$asset_link" == "null" ]; then
    echo "No valid asset link found for version $x"
    continue
  fi

  # Download the asset using curl and save it as file named with the version number
  echo "Downloading asset from: $asset_link"
  curl -s -o "$x.rbxl" "$asset_link"
  echo "Downloaded version $x as file '$x'"
done

