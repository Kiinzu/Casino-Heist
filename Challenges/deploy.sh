#!/bin/bash

if ! command -v docker &> /dev/null; then
  echo "Docker is not installed or not in PATH."
  exit 1
fi

if ! systemctl is-active --quiet docker; then
  echo "Docker is not running. Please start Docker and try again."
  exit 1
fi

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

echo """
  ___  _   __   _____    __  ___           _______  __  _____ 
  / __\/_\ / _\  \_   \/\ \ \/___\   /\  /\/__\_   \/ _\/__   \
 / /  //_\\\ \    / /\/  \/ //  //  / /_/ /_\  / /\/\ \   / /\/
/ /__/  _  \\ \/\/ /_/ /\  / \_//  / __  //_/\/ /_  _\ \ / /   
\____|_/ \_|__/\____/\_\ \/\___/   \/ /_/\__|____/  \__/ \/    
"""
while true;do
echo """
Welcome to Casino Heist Challenge Deployer!

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
    0 - [BASIC] Briefing
    1 - [BASIC] Gearing Up
    2 - [COMMON] Bar
    3 - [COMMON] Casino Vault
    4 - [COMMON] Cheap Glitch
    5 - [COMMON] Entry Point
    6 - [COMMON] Inju Bank
    7 - [COMMON] Master of Blackjack
    8 - [COMMON] Roulette
    9 - [COMMON] Silent Dealer
    10 - [COMMON] Singular Identity
    11 - [COMMON] Symbol of Noble
    12 - [COMMON] Unlimited Credit Line
    13 - [COMMON] Voting Frenzy
    14 - [COMMON] VVVIP Member
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
            ;;
        1)
            echo "Deploying [BASIC] Gearing Up"
            cd ./Basic/"B-Gearing Up"/
            ./build.sh
            cd ../../
            ;;
        2)
            echo "Deploying [COMMON] Bar"
            cd ./Common/"C-Bar"/
            ./build.sh
            cd ../../
            ;;
        3)
            echo "Deploying [COMMON] Casino Vault"
            cd ./Common/"C-Casino Vault"/
            ./build.sh
            cd ../../
            ;;
        4)
            echo "Deploying [COMMON] Cheap Glitch"
            cd ./Common/"C-Cheap Glitch"/
            ./build.sh
            cd ../../
            ;;
        5)
            echo "Deploying [COMMON] Entry Point"
            cd ./Common/"C-Entry Point"/
            ./build.sh
            cd ../../
            ;;
        6)
            echo "Deploying [COMMON] Inju Bank"
            cd ./Common/"C-Inju Bank"/
            ./build.sh
            cd ../../
            ;;
        7)
            echo "Deploying [COMMON] Master of Blackjack"
            cd ./Common/"C-Master of Blackjack"/
            ./build.sh
            cd ../../
            ;;
        8)
            echo "Deploying [COMMON] Roulette"
            cd ./Common/"C-Roulette"/
            ./build.sh
            cd ../../
            ;;
        9)
            echo "Deploying [COMMON] Silent Dealer"
            cd ./Common/"C-Silent Dealer"/
            ./build.sh
            cd ../../
            ;;
        10)
            echo "Deploying [COMMON] Singular Identity"
            cd ./Common/"C-Singular Identity"/
            ./build.sh
            cd ../../
            ;;
        11)
            echo "Deploying [COMMON] Symbol of Noble"
            cd ./Common/"C-Symbol of Noble"/
            ./build.sh
            cd ../../
            ;;
        12)
            echo "Deploying [COMMON] Unlimited Credit Line"
            cd ./Common/"C-Unlimited Credit Line"/
            ./build.sh
            cd ../../
            ;;
        13)
            echo "Deploying [COMMON] Voting Frenzy"
            cd ./Common/"C-Voting Frenzy"/
            ./build.sh
            cd ../../
            ;;
        14)
            echo "Deploying [COMMON] VVVIP Member"
            cd ./Common/"C-VVVIP Member"/
            ./build.sh
            cd ../../
            ;;
        15)
            echo "Deploying [VIP] Casino Bankbuster"
            cd ./VIP/"V-Casino Bankbuster"/
            ./build.sh
            cd ../../
            ;;
        16)
            echo "Deploying [VIP] Executive Problems"
            cd ./VIP/"V-Executive Problems"/
            ./build.sh
            cd ../../
            ;;
        17)
            echo "Deploying [VIP] Inju's Gambit"
            cd ./VIP/"V-Inju's Gambit"/
            ./build.sh
            cd ../../
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
    echo "Running Docker Containers:"
    echo "$containers"
else 
    echo "Unrecognized Option!"
    exit 0
fi

done