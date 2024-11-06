### Challenge-Only Version
Here is how you can deploy and use **Casino Heist Challenge-Only Version**. You can use this guide to manage your local machine or Challenge VPS for challenge deployment. To make it easier for you, we are going to walk you through
- Deploy challenge(s)
- Stop challenge(s)
- Active challenge(s) information

You first need to clone this repository.

```bash
https://github.com/Kiinzu/Casino-Heist.git
```

## Deploy challenge(s)

1. To deploy a challenge, you can run the `manager.sh` in `/Casino-Heist` and then choose option `1. Manage Challenges`. 
```bash
  ___   __   ____  __  __ _   __     _  _  ____  __  ____  ____ 
 / __) / _\ / ___)(  )(  ( \ /  \   / )( \(  __)(  )/ ___)(_  _)
( (__ /    \___ \ )( /    /(  O )  ) __ ( ) _)  )( \___ \  )(  
 \___)\_/\_/(____/(__)\_)__) \__/   \_)(_/(____)(__)(____/ (__) 

WELCOME TO CASINO HEIST!
HOW MAY WE HELP YOU TODAY?
0. Quick Start - Casino Heist
1. Manage Challenges
2. Deploy HTTPS Casino Heist (require Nginx & certbot)
3. Deploy HTTP Casino Heist (local)


>> 1
Welcome to Casino Heist Challenge Deployer!

We are going to deploy the Challenge for you, 
Please specify your Challenge VPS IP or default
of 127.0.0.1 (local) for local deployment
IP: 
```

2. Specify the IP for your Challenge, if you are deploying it locally, insert the `127.0.0.1`; otherwise, please specify the IP (ex: your Challenge VPS IP). After you insert the IP, the next menu would look like this.

```bash
Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info

>> 
```

3. To Deploy a Challenge, you just need to choose option `1. Deploy Challenge` and choose which challenge you want to deploy. You just need to give the index; for example, if you want to deploy `[COMMON] [DoS] VVVIP Member` you just need to input `14`.  
> **NOTE**: `1337 - Deploy All Challenge` is recommended **ONLY** if you have the minimum VPS specifications specified [here](../README.md#minimum-recommended-specification), because it will consume a lot of CPU to start all Challenges at once.

```
Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info

>> 1

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
    9  - [COMMON] [Low-level call] Silent Dealer
    10 - [COMMON] [Hash Collision] Singular Identity
    11 - [COMMON] [ERC721 Reentrancy] Symbol of Noble
    12 - [COMMON] [ERC20 Misuse] Unlimited Credit Line
    13 - [COMMON] [Logic Error] Voting Frenzy
    14 - [COMMON] [DoS] VVVIP Member
    15 - [VIP] Casino Bankbuster
    16 - [VIP] Executive Problems
    17 - [VIP] Inju's Gambit

>> 
```

4. Your challenge is now deployed; you can verify this by accessing the URL on your website.

```bash
# Success Deployment
Successfully tagged blockchain-briefing_launcher:latest
Creating blockchain-briefing_launcher_1 ... done
[Briefing] is deployed on 127.0.0.1:30001


Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info
```

## Stop challenge(s)

1. To stop the challenge, once you're done, you can run the `manager.sh` again with the first option `1. Manage Challenge`, this time choosing the next option `2. Stop Challenge`
```bash
  ___   __   ____  __  __ _   __     _  _  ____  __  ____  ____ 
 / __) / _\ / ___)(  )(  ( \ /  \   / )( \(  __)(  )/ ___)(_  _)
( (__ /    \___ \ )( /    /(  O )  ) __ ( ) _)  )( \___ \  )(  
 \___)\_/\_/(____/(__)\_)__) \__/   \_)(_/(____)(__)(____/ (__) 

WELCOME TO CASINO HEIST!
HOW MAY WE HELP YOU TODAY?
0. Quick Start - Casino Heist
1. Manage Challenges
2. Deploy HTTPS Casino Heist (require Nginx & certbot)
3. Deploy HTTP Casino Heist (local)


>> 1
Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info

>> 2
Running Docker Containers:
0) 1b7318ddb948: blockchain-vvvip-member_launcher_1
1) ceb5d34a7fa0: blockchain-voting-frenzy_launcher_1

Which container do you want to remove?
1. Remove All
2. Remove Specific

>> 2
Enter the index of the container to remove: 
```
2. To stop a specific challenge, you can choose `2. Remove Specific` and enter the index of the challenge. To remove all challenges, choose option `1. Remove All`

## Active challenge(s) information
1. To see how many active containers, you can run `manager.sh` and choose first option `1. Manage Challenge` and then option `3. Containers Info`
```bash

Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info

>> 3
Running Docker Containers:
1b7318ddb948: blockchain-vvvip-member_launcher_1
ceb5d34a7fa0: blockchain-voting-frenzy_launcher_1
```
