#!/bin/bash

echo """
This is a Quick Start version of Casino Heist,
You will be able to play Casino Heist with its UI locally
and fetch the data from our official API at

| https://casinoheist.xyz/api

"""

read -p "Do you wish to launch Quick Start Casino Heist? (y/n)" respond

frontend_env="./Frontend/.env"

if [ "$respond" == "y" ]; then
    #STEP 1: Launch HTTP Casino Heist with official API
    echo "VITE_BACKEND_IP='https://casinoheist.xyz/api'" > "$frontend_env"
    cd ./Frontend
    python3 changer.py 103.178.153.113
    ./start.sh
elif [ "$respond" == "n" ]; then
    echo "Deployment cancelled!"
    exit 1
else
    echo "Invalid option!"
    exit 1
fi