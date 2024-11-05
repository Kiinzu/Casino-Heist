#!/bin/bash

echo "Casino Heist Official API is available until the end of 2024."
echo "With the Official API, you don't need to deploy the Challenges"
echo "and Backend, however, if you choose to go without it, you'll have"
echo "to deploy the Challenges and Backend on your localhost."
echo ""
read -p "Do you wish to use Casino Heist official API? (yes/no) " answer

frontend_env="./Frontend/.env"

if [ "$answer" == "yes" ]; then
    echo "VITE_BACKEND_IP='https://casinoheist.xyz/api'" > "$frontend_env"
    cd ./Frontend
    python3 changer.py 103.178.153.113
    ./start.sh
elif [ "$answer" == "no" ]; then
    # STEP 1: Generating SECRET_KEY for Backend
    echo "Generating 32-byte hex secret..."
    secret_key=$(openssl rand -hex 32)
    backend_env="./Backend/.env"
    echo "SECRET_KEY=$secret_key" > "$backend_env"
    echo "Secret key saved in $backend_env"

    # STEP 2: Running Backend
    cd ./Backend
    ./start_http.sh &

    # STEP 3: Configuring Frontend
    echo "VITE_BACKEND_IP='http://127.0.0.1:5000/api'" > "$frontend_env"
    cd ../Frontend 
    python3 changer.py 127.0.0.1
    ./start.sh &

    wait
else
    echo "Invalid input. Please answer 'yes' or 'no'."
    exit 1
fi

echo "Your Casino Heist Website is Ready!"
echo "Access http://localhost:5137 to start"
