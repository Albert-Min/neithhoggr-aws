#!/bin/bash

# List of your stack names
stacks=("NeithhoggrECRStack" "NeithhoggrECSClusterStack" "NeithhoggrIAMStack")

# Run cdk bootstrap
npx cdk bootstrap

# Loop over the stacks
for stack in "${stacks[@]}"
do
  # Run cdk diff for the current stack and capture the output
  output=$(npx cdk diff $stack)

  # Check if the output contains the string "There were no differences"
  if [[ $output == *"There were no differences"* ]]; then
    echo "No changes to deploy for $stack."
  else
    echo "Changes detected in $stack, running npx cdk deploy."
    npx cdk deploy $stack --require-approval never
  fi
done
