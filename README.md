# CASINO HEIST : Where Blockchain Vulnerabilities Meet the Thrill of the Heist!
![Logo](./casino-heist.png)
# Casino Heist
**We are open source blockchain playground where we provide Challenges that featured OWASP Top 10 Smart Contract and the Mitigation**

Are you a Blockchain Developer, Auditor, Enthusiast, or just starting your journey into the world of blockchain?

**You’re in the right place**

The Web3 and Blockchain space has grown significantly over the past few years, with many real-world applications of blockchain in areas like finance, voting, and gaming. Advanced technology doesn’t come without security risks. Whether you're looking to gain new skills (such as Smart Contract Security) or explore a career as a Smart Contract Developer or Auditor, mastering and understanding security is essential to protect the ecosystem we're building. 

Casino Heist is designed as a playground where you can not only learn about vulnerabilities but also try to exploit them yourself. In addition to that, we aim to educate you on how to mitigate these issues, since that's essential, right? Knowing the vulnerability, exploiting it, and understanding how to mitigate it.

## Why Casino Heist?
- ⭐ **EASY TO USE**: Access it effortlessly from localhost (via Docker) or dive right into our [Website](https://casinoheist.xyz).
- 🔍 **OPEN SOURCE**: All source code is available for your analysis and exploration.
- ✋ **HANDS ON**: Exploit real-world scenarios with different difficulties, complete with solutions and mitigation strategy.
- 💰 **COST-FREE**: It’s Free.
- 🌍 **CONTRIBUTE WITH US**: Want to create your own Challenges? [Contribute](/Contribution/) with us!


## (Minimum) Recommended Specification
You can deploy the **Full Website and Challenges** platform so that you can invite other players to play in your own server, or if you fancy playing by yourself-- you can deploy the Challenge-Only Version. We recommened using Ubuntu or Debian OS to deploy Casino Heist.

**Local Challenge-Only Version**
Running single Challenge at a time (not all at once)
- Operating System: Ubuntu or Debian (latest version recommended)
- vCPU: 2 cores
- RAM: 4 GB
- HDD: 40 GB of free space

**Full Website & Challenges**
Running the Entire application (Backend & Frontend) and all Challenges at once
- Challenge server
    - Operating System: Ubuntu or Debian (latest version recommended)
    - vCPU: 8 cores
    - RAM: 16 GB
    - HDD: 40 GB of free space
- Website (Backend & Frontend)
    - Operating System: Ubuntu or Debian (latest version recommended)
    - vCPU: 4 cores
    - RAM: 4 GB
    - HDD: 40 GB of free space

## Requirements
- Node.js
- npm
- Python 3.12
- Ports 80, 443
- Docker
- Docker Compose
- Nginx (only for HTTPS deployment)
- Certbot (only for HTTPS deployment)

**please make sure that the requirements are fulfilled, for the deployment- we'll do it for you!**

## Deployment and Usage
### Local Challenge-Only Version
To deploy Casino Heist Challenges on Local:
1. Clone this repository

```bash
https://github.com/Kiinzu/Casino-Heist.git
```

2. You can use the `deploy.sh` file to deploy and remove any Challenge that you like (we do recommend you to only deploy one Challenge at a time).

3. To deploy a Challenge, you can run the `manager.sh` in `/Casino-Heist` and then choose the option `1. Manage Challenges`.
```bash
  ___   __   ____  __  __ _   __     _  _  ____  __  ____  ____ 
 / __) / _\ / ___)(  )(  ( \ /  \   / )( \(  __)(  )/ ___)(_  _)
( (__ /    \___ \ )( /    /(  O )  ) __ ( ) _)  )( \___ \  )(  
 \___)\_/\_/(____/(__)\_)__) \__/   \_)(_/(____)(__)(____/ (__) 

WELCOME TO CASINO HEIST!
HOW MAY WE HELP YOU TODAY?
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

4. Specify the IP for your Challenge, if you are deploying it locally, insert the `127.0.0.1`, else please specify the IP (ex: your Challenge VPS IP). After you insert the IP, the next menu would look like this.

```bash
Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info

>> 
```
5. To Deploy a Challenge, you just need to choose option `1. Deploy Challenge` and this menu will be open

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
    9  - [COMMON] [Low-leve call] Silent Dealer
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

6. You can choose which Challenge you want to deploy, you just need to give the index, for example if you want to deploy `[COMMON] [Access Control Vulnerability] Bar` you just need to input `2`. 
(**WARNING**: `1337 - Deploy All Challenge` is recommended ONLY if you have the minimum VPS specifications specified [here](#minimum-recommended-specification), because it will consume a lot of CPU to start all Challenges at once.)

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

7. To Stop the Challenge once you're done, you can run the `manager.sh` again with the first option `1. Manage Challenge`, this time choosing the next option `2. Stop Challenge`
```bash
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
8. To stop specific Challenge, you can choose `2. Remove Specific` and enter the index of the Challenge. To Remove All Challenge, choose option `1. Remove All`

9. To see how many active container, you can run `manager.sh` and choose first option `1. Manage Challenge` and then option `3. Containers Info`
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

### Full Website & Challenges Deployment

We offer 2 types of deployment that you can choose, whether you want HTTP or more secure option HTTPS, we got you!

#### HTTPS Deployment (Production Ready)
For this deployment, you are required to have 2 VPS, one is for the Website server and another one for the Challenge server. Ensure your VPS meets the [minimum specification](#minimum-recommended-specification) 

##### Website server(Frontend & Backend)
1. On your Website VPS, git clone this repository in that VPS

```bash
https://github.com/Kiinzu/Casino-Heist.git
```

2. Make sure that Nginx is installed and running.
3. Generate Certificates for your domain using Certbot and make sure that they are generated in the directory below.

```bash
# Generate Certificate using Cert Bot
$ sudo certbot --nginx -d <YOUR_DOMAIN> -d www.<YOUR_DOMAIN> 

# Confirm that Certificate is generated in /etc/letsencrypt/live/<YOUR_DOMAIN>/
/etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem;
/etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem;
```

4. On the root (`CASINO-HEIST/`), run the `manager.sh` and fill the requested input, which is your domain name (same domain name for certbot) and the your Challenge VPS IP; This script will automatically configure your nginx and deploy the backend for you. <br>
```bash
$ ./manager.sh

 ___   __   ____  __  __ _   __     _  _  ____  __  ____  ____ 
/ __) / _\ / ___)(  )(  ( \ /  \   / )( \(  __)(  )/ ___)(_  _)
( (__ /    \___ \ )( /    /(  O )  ) __ ( ) _)  )( \___ \  )(  
\___)\_/\_/(____/(__)\_)__) \__/   \_)(_/(____)(__)(____/ (__) 

WELCOME TO CASINO HEIST!
HOW MAY WE HELP YOU TODAY?
1. Deploy Challenges
2. Deploy HTTPS Casino Heist (require Nginx & certbot)
3. Deploy HTTP Casino Heist (local)


>> 2
Does your VPS Require sudo(yes/no): yes
Enter your domain name: <YOUR_DOMAIN_NAME>
Enter your challenge server IP: <YOUR_CHALLENGE_VPS_IP>
```
**NOTE**: If you choose `yes` on `Does your VPS Require sudo(yes/no)`, the bash will automatically use `sudo` to restart your Nginx, if your VPS doesn't require it, you can simply choose `no`.

7. By now you should have a working Website, to verify this, just head to your domain.

##### Challenge server
1. On your Challenge VPS, git clone this repository

```bash
https://github.com/Kiinzu/Casino-Heist.git
```

2. On `/Casino-Heist`, you'll find `manager.sh`; an interactive deployment helper for the Challenges (refer to this for [usage](#local-Challenge-only-version))

3. You can choose option `1. Manage Challenges` followed by `1. Deploy Challenge` for deployment, `2.Stop Challenge` for removing the docker and `3. Containers Info` to see the active docker containers. 

4. If your server is above the recommendation, you can choose `1.Deploy Challenge` and then `1337 - Deploy All Challenge (Recommended only for Challenge )` to deploy all Challenge at once. NOTE that this will use a lot of CPUs and will take around `25 minutes` to be fully deployed

5. Once done, verify that all Challenge are perfectly deployed by trying to access them. You can access them in the `Challenge_VPS_IP:PORT`. Refer [here](/Challenges/note.txt) for the port of each Challenge.

### HTTP Deployment (Local Usage)
If you prefer not to deploy with HTTPS but still want to experience playing Casino Heist with its UI, you can deploy the website locally and fetch Challenge information and all other data from our official API.

For a limited time, you can have the Casino Heist Website running in your local and fetch the data from our running Website at `casinoheist.xyz/api`, here is how you can deploy your local Casino Heist Website

1. On your local computer, git clone this repository

```bash
https://github.com/Kiinzu/Casino-Heist.git
``` 

2. On `/Casino-Heist`, you'll find the `manager.sh`, run this script and choose option `3. Deploy HTTP Casino Heist (local)`

```bash
$ ./manager.sh


  ___   __   ____  __  __ _   __     _  _  ____  __  ____  ____ 
 / __) / _\ / ___)(  )(  ( \ /  \   / )( \(  __)(  )/ ___)(_  _)
( (__ /    \___ \ )( /    /(  O )  ) __ ( ) _)  )( \___ \  )(  
 \___)\_/\_/(____/(__)\_)__) \__/   \_)(_/(____)(__)(____/ (__) 

WELCOME TO CASINO HEIST!
HOW MAY WE HELP YOU TODAY?
1. Deploy Challenges
2. Deploy HTTPS Casino Heist (require Nginx & certbot)
3. Deploy HTTP Casino Heist (local)


>> 3
Casino Heist Official API is available until the end of 2024.
With the Official API, you don't need to deploy the Challenges
and Backend, however, if you choose to go without it, you'll have
to deploy the Challenges and Backend on your localhost.

Do you wish to use Casino Heist official API? (yes/no) 
```

3. If you choose to use Casino Heist Official API, you won't be required to deploy the Backend and Challenge youself, it will automatically fetch everything from our Official API. (**This option only last until the end of 2024 or until further notice!**)

4. If you choose not to use our Official API, you'll need to deploy the Challenges yourself by following [this](#local-challenge-only-version) deployment, as for the Website (Frontend & Backend), it will be configured by the script to be deployed on `localhost:5173` (Frontend) and `127.0.0.1:5000` (Backend). 

5. Now you have a running Casino Heist Website on your local, you can verify this by navigating to `localhost:5173`

**NOTE** 
This option of communication directly to our API will end in the end of 2024 or until further notice.

## Main Feature
- **Private Blockchain**  
    We use paradigmCTF infrastructure that is further customized by [TCP1P community](https://github.com/TCP1P/Paradigmctf-BlockChain-Infra-Extended) to make it looks better, to run a private blockchain. 
- **Seamless Onboarding**  
    Player doesn't need to setup any wallet of getting Ethers from faucet, making new users that aren't familiar with the setup can play without dealing with that complexities.
- **Playground Experience**  
    Because smart contract hacks can lead to financial losses, we thought the *Casino Heist* theme would be a perfect match for our content.
- **Self-Paced & Guided**  
    Got stuck on a problem? We got you! We provide you with hints and even the Walkthrough of the `common` category Challenges
- **Real-Life Incident Simplified**  
    We’re not here for just the basics. With our VIP category, everyone gets access to real-life hacks that we’ve simplified, which make anyone can feel the thrill of real-world scenarios.
- **Open for Contribution**  
    Do you enjoy playing Casino Heist and want to contribtue? We have 2 ways of contribute to our Open-Source Playground! You can either write a walkthrough for the `common` Challenge in your own way, or you can create your own Challenge and submit to us!
- **Engage with the Community!**  
    Casino Heist is created and backed by [ENUMA ID](https://discord.gg/scwfGkERsj), a community that gathered Smart Contract Security Enthusiast in Indonesia.

## How to Contribute
We are open for contribution, you can contribute in 2 ways. If you like to create a Challenge and want others to try it out or If you like to write writeups and walkthrough and excited for it to be read by other and featured in our Playground, you can do that! 

Just follow the Instruction [here](./Contribution/) to Contribute!

## Authors
- [Kiinzu](github.com/kiinzu)
- [Mewzael](github.com/Mewzael)
- [fefethecyberclown](github.com/fefethecyberclown)

## Feedback
If you have any feedback, please contact us directly on our [Discord server](https://discord.gg/scwfGkERsj)!
