#!/bin/bash

# Checking current directory
output=$(pwd)
if [[ "$output" ==  *challenge/images ]]; then
    echo "Ready to Build!"
else
    echo "Moving to images"
    cd images/
fi

# Clearing Header interpreter
sed -i -e 's/\r$//' ./challenge-base/entrypoint.sh
sed -i -e 's/\r$//' ./eth-challenge-base/96-start-launcher
sed -i -e 's/\r$//' ./eth-challenge-base/98-start-gunicorn

# Building the docker for specific challenge
sed -i -e 's/\r$//' ./build.sh
./build.sh

# Reseting the directory - challenge directory
cd ../

# Deploying the challenge instance
docker-compose -p blockchain-symbol-of-noble up  --build -d 
