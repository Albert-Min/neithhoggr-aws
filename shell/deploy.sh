#!/bin/bash

# Exit if any command fails
set -e

npx cdk bootstrap
npx cdk deploy

echo "Deployment complete"
