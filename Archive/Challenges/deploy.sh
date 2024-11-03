#!/bin/bash

containers=$(docker ps --format "{{.ID}}: {{.Names}}")

remove_all() {
  docker rm -f $(docker ps -q)
  echo "All containers removed."
}

# Function to remove a specific container
remove_specific() {
  read -p "Enter the index of the container to remove: " container_index

  # Get the container ID by index
  container_id=$(echo "$containers" | sed -n "$((container_index + 1))p" | cut -d':' -f1)

  if [ -n "$container_id" ]; then
    docker rm -f "$container_id"
    echo "Container $container_id removed."
  else
    echo "Invalid index."
  fi
}

echo "Welcome to Casino Heist Challenge Deployer!"
echo ""
echo "We are going to deploy the Challenge for you, "
echo "Please specify your Challenge VPS IP or default"
echo "of 127.0.0.1 (local) for local deployment"
read -p "IP: " inserted_ip

if [ "$inserted_ip" != "127.0.0.1" ]; then
    chall_ip="$inserted_ip"
    echo "Using specified IP: $chall_ip"
else
    chall_ip="127.0.0.1"
    echo "Using default IP: $chall_ip"
fi

while true;do
echo """

Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info
"""
read -p ">> " option

if [ "$option" -eq 1 ]; then
    echo """
Please Choose an Option
    1337 - Deploy All Challenge (Recommended only for Challenge Server)
    0  - [BASIC] [Smart Contract Basic] Briefing
    1  - [BASIC] [Creating Exploit Contract] Gearing Up 
    2  - [COMMON] [Access Control Vulnerability] Bar
    3  - [COMMON] [Delegatecall] Casino Vault
    4  - [COMMON] [Integer Over-underflow] Cheap Glitch
    5  - [COMMON] [Rounding Error] Entry Point
    6  - [COMMON] [Reentrancy] Inju Bank
    7  - [COMMON] [Timestamp Dependence] Master of Blackjack
    8  - [COMMON] [Insecure Randomness] Roulette
    9  - [COMMON] [Low-leve call] Silent Dealer
    10 - [COMMON] [Hash Collision] Singular Identity
    11 - [COMMON] [ERC721 Reentrancy] Symbol of Noble
    12 - [COMMON] [ERC20 Misuse] Unlimited Credit Line
    13 - [COMMON] [Logic Error] Voting Frenzy
    14 - [COMMON] [DoS] VVVIP Member
    15 - [VIP] Casino Bankbuster
    16 - [VIP] Executive Problems
    17 - [VIP] Inju's Gambit
"""
    read -p ">> " choose
    current_dir=$(pwd)
    case $choose in
        1337)
            current_dir=$(pwd)
            for dir in ./Basic/*/; do
                echo "Deploying on ${dir}"
                cd "$dir" || { 
                    echo "Failed to enter $dir"; 
                    exit 1; 
                }
                if [ -f "./build.sh" ]; then
                    ./build.sh || {
                        echo "Error executing build.sh in $dir";
                    }
                else
                    echo "No build.sh found in $dir"
                fi
                cd "$current_dir" || { 
                    echo "Failed to return to $current_dir"; 
                    exit 1; 
                }
            done
            for dir in ./Common/*/; do
                echo "Deploying on ${dir}"
                cd "$dir" || { 
                    echo "Failed to enter $dir"; 
                    exit 1; 
                }
                if [ -f "./build.sh" ]; then
                    ./build.sh || {
                        echo "Error executing build.sh in $dir";
                    }
                else
                    echo "No build.sh found in $dir"
                fi
                cd "$current_dir" || { 
                    echo "Failed to return to $current_dir"; 
                    exit 1; 
                }
            done
            for dir in ./VIP/*/; do
                echo "Deploying on ${dir}"
                cd "$dir" || { 
                    echo "Failed to enter $dir"; 
                    exit 1; 
                }
                if [ -f "./build.sh" ]; then
                    ./build.sh || {
                        echo "Error executing build.sh in $dir";
                    }
                else
                    echo "No build.sh found in $dir"
                fi
                cd "$current_dir" || { 
                    echo "Failed to return to $current_dir"; 
                    exit 1; 
                }
            done
            ;;
        0)
            echo "Deploying [BASIC] Briefing"
            cd ./Basic/"B-Briefing"/
            ./build.sh
            cd ../../
            echo "[Briefing] is deployed on $chall_ip:30001"
            ;;
        1)
            echo "Deploying [BASIC] Gearing Up"
            cd ./Basic/"B-Gearing Up"/
            ./build.sh
            cd ../../
            echo "[Gearing Up] is deployed on $chall_ip:30002"
            ;;
        2)
            echo "Deploying [COMMON] Bar"
            cd ./Common/"C-Bar"/
            ./build.sh
            cd ../../
            echo "[Bar] is deployed on $chall_ip:40003"
            ;;
        3)
            echo "Deploying [COMMON] Casino Vault"
            cd ./Common/"C-Casino Vault"/
            ./build.sh
            cd ../../
            echo "[Casino Vault] is deployed on $chall_ip:40013"
            ;;
        4)
            echo "Deploying [COMMON] Cheap Glitch"
            cd ./Common/"C-Cheap Glitch"/
            ./build.sh
            cd ../../
            echo "[Cheap Glitch] is deployed on $chall_ip:40001"
            ;;
        5)
            echo "Deploying [COMMON] Entry Point"
            cd ./Common/"C-Entry Point"/
            ./build.sh
            cd ../../
            echo "[Entry Point] is deployed on $chall_ip:40002"
            ;;
        6)
            echo "Deploying [COMMON] Inju Bank"
            cd ./Common/"C-Inju Bank"/
            ./build.sh
            cd ../../
            echo "[Entry Point] is deployed on $chall_ip:40008"
            ;;
        7)
            echo "Deploying [COMMON] Master of Blackjack"
            cd ./Common/"C-Master of Blackjack"/
            ./build.sh
            cd ../../
            echo "[Master of Blackjack] is deployed on $chall_ip:40005"
            ;;
        8)
            echo "Deploying [COMMON] Roulette"
            cd ./Common/"C-Roulette"/
            ./build.sh
            cd ../../
            echo "[Roulette] is deployed on $chall_ip:40004"
            ;;
        9)
            echo "Deploying [COMMON] Silent Dealer"
            cd ./Common/"C-Silent Dealer"/
            ./build.sh
            cd ../../
            echo "[Silent Dealer] is deployed on $chall_ip:40009"
            ;;
        10)
            echo "Deploying [COMMON] Singular Identity"
            cd ./Common/"C-Singular Identity"/
            ./build.sh
            cd ../../
            echo "[Singular Identity] is deployed on $chall_ip:40010"
            ;;
        11)
            echo "Deploying [COMMON] Symbol of Noble"
            cd ./Common/"C-Symbol of Noble"/
            ./build.sh
            cd ../../
            echo "[Symbol of Noble] is deployed on $chall_ip:40012"
            ;;
        12)
            echo "Deploying [COMMON] Unlimited Credit Line"
            cd ./Common/"C-Unlimited Credit Line"/
            ./build.sh
            cd ../../
            echo "[Unlimited Credit Line] is deployed on $chall_ip:40011"
            ;;
        13)
            echo "Deploying [COMMON] Voting Frenzy"
            cd ./Common/"C-Voting Frenzy"/
            ./build.sh
            cd ../../
            echo "[Voting Frenzy] is deployed on $chall_ip:40006"
            ;;
        14)
            echo "Deploying [COMMON] VVVIP Member"
            cd ./Common/"C-VVVIP Member"/
            ./build.sh
            cd ../../
            echo "[VVVIP Member] is deployed on $chall_ip:40007"
            ;;
        15)
            echo "Deploying [VIP] Casino Bankbuster"
            cd ./VIP/"V-Casino Bankbuster"/
            ./build.sh
            cd ../../
            echo "[Casino Bankbuster] is deployed on $chall_ip:50002"
            ;;
        16)
            echo "Deploying [VIP] Executive Problems"
            cd ./VIP/"V-Executive Problems"/
            ./build.sh
            cd ../../
            echo "[Executive Problems] is deployed on $chall_ip:50003"
            ;;
        17)
            echo "Deploying [VIP] Inju's Gambit"
            cd ./VIP/"V-Inju's Gambit"/
            ./build.sh
            cd ../../
            echo "[Inju's Gambit] is deployed on $chall_ip:50001"
            ;;
        
    esac
elif [ "$option" -eq 2 ]; then
    if [ -z "$containers" ]; then
        echo "No running containers found."
    else
        echo "Running Docker Containers:"
        index=0
        while IFS= read -r container; do
            echo "$index) $container"
            index=$((index + 1))
        done <<< "$containers"
    fi
    echo """
Which container do you want to remove?
1. Remove All
2. Remove Specific
    """ 
    read -p ">> " choice
    if [ "$choice" -eq 1 ]; then
        remove_all
    elif [ "$choice" -eq 2 ]; then
        remove_specific
    else
        echo "Invalid choice."
    fi
elif [ "$option" -eq 3 ]; then
    containers=$(docker ps --format "{{.ID}}: {{.Names}}")
    echo "Running Docker Containers:"
    echo "$containers"
else 
    echo "Unrecognized Option!"
    exit 0
fi

done