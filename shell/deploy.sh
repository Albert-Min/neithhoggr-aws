#!/bin/bash

# Exit if any command fails
set -e

# Run cdk diff and capture the output
output=$(cdk diff)

echo $output

npx cdk bootstrap

npx cdk deploy --all --require-approval never

echo "Deployment complete"
