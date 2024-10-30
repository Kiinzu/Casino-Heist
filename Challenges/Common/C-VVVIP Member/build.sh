#!/bin/bash

# Checking current directory
output=$(pwd)
if [[ "$output" ==  *challenge/images ]]; then
    echo "Ready to Build!"
else
    echo "Moving to images"
    cd images/
fi

# Building the docker for specific challenge
./build.sh

# Reseting the directory - challenge directory
cd ../

# Deploying the challenge instance
docker-compose -p blockchain-vvvip-member up  --build -d 
