#!/bin/bash

# Exit if any command fails
set -e

# Run cdk diff and capture the output
output=$(npx cdk diff)

# Check if the output contains the string "No changes"
if [[ $output == *"No changes"* ]]; then
  echo "No changes to deploy."
else
  echo "Changes detected. Running cdk bootstrap and cdk deploy."
  npx cdk bootstrap
  npx cdk deploy
fi

echo "Deployment complete"
