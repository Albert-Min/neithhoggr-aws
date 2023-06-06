#!/bin/bash

# Exit if any command fails
set -e

npx cdk diff

npx cdk bootstrap

npx cdk deploy --all --require-approval never

echo "Deployment complete"
