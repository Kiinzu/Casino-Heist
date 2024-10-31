# CASINO HEIST : Where Blockchain Vulnerabilities Meet the Thrill of the Heist!
![Logo](./casino-heist.png)
# Casino Heist
**We are open source blockchain playground where we provide challenges that featured OWASP Top 10 Smart Contract and the Mitigation**

Are you a Blockchain Developer, Auditor, Enthusiast, or just starting your journey into the world of blockchain?🧐

**You’re in the right place🎉**

The web3 and blockchain community in Indonesia is rapidly growing, with more individuals pursuing careers as Blockchain Engineers or Smart Contract Engineers. However, many developers face a significant knowledge gap in security, particularly regarding Solidity Smart Contracts. This presents a valuable opportunity for them to not only become Solidity developers but also to step into the role of Smart Contract Auditors.

To address this challenge, we proudly present **"Casino Heist"**, a Playground built on Private Blockchain infrastructure from ParadigmXYZ, specifically designed to train Smart Contract Developers and Auditors. This interactive platform features a user-friendly web interface that educates users about vulnerabilities in Solidity Smart Contracts and offers guidance on how to mitigate these risks. Experience the thrill of our casino-themed challenges, where you can enjoy gambling without the risk of being caught! 

## Why Casino Heist?
- ⭐ **EASY TO USE**: Access it effortlessly from localhost (via Docker) or dive right into our website.
- 🔍 **OPEN SOURCE**: All source code is available for your analysis and exploration.
- ✋ **HANDS ON**: Engage with challenges ranging from beginner to advanced, based on real-world scenarios faced by blockchain auditors, complete with solutions for mitigation.
- 💰 **COST-FREE**: It’s Free.
- 🌍 **CONTRIBUTE WITH US**: Want to create your own challenges? Join us in showcasing your ideas and making an enhancement to the community!


## (Minimum) Recommended Specification
Since the demand of having an interactive UI/UX and Light System kinda hard to achieve for this kind of playground, we offer the solution of running the Challenge instance only locally OR runningg the whole setup at once, here arae the minimum requirements.

**Local Challenge-Only Version**
Running single challenge at a time (not all at once)
- Operating System: Ubuntu or Debian (latest version recommended)
- vCPU: 2 cores
- RAM: 4 GB
- HDD: 40 GB of free space

**Full Website & Challenges**
Running the Entire application (Backend & Frontend) and all Challenges at once
- Challenge Server
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
- Node JS
- NPM
- Python 3.12
- Port 80, 443
- Docker
- Docker Compose
- NGINX (only for HTTPS Deployment)
- Certbot (only for HTTPS Deployment)

**please make sure that the requirements are fulfilled, for the deployment- we'll do it for you!**

## Deployment and Usage
### Local Challenge-Only Version
To deploy Casino Heist:
1. Clone this repository

```bash
git clone https://github.com/Kiinzu/react-casino-heist/
cd react-casino-heist/Challenges/
```

2. You can use the `deploy.sh` file to deploy and remove any challenge that you like (we do recommend you to only deploy one at a time).

```bash
  ___   __   ____  __  __ _   __     _  _  ____  __  ____  ____ 
 / __) / _\ / ___)(  )(  ( \ /  \   / )( \(  __)(  )/ ___)(_  _)
( (__ /    \___ \ )( /    /(  O )  ) __ ( ) _)  )( \___ \  )(  
 \___)\_/\_/(____/(__)\_)__) \__/   \_)(_/(____)(__)(____/ (__) 


Welcome to Casino Heist Challenge Deployer!

Anything we can help?
1. Deploy Challenge
2. Stop Challenge
3. Containers Info

>> 
```
**WARNING** 
The option `1337` sometimes doesn't work well since it deployes all challenge at once, making the VPS CPU consumption skyrocket in a short time.

### Full Website & Challenges Deployment

We offer 2 types of deployment that you can choose, whether you want HTTP or more secure option HTTPS, we got you!

#### HTTPS Deployment (Production Ready)

##### Website Server(Frontend & Backend)
1. First prepare your VPS for the Website.

2. On your Website VPS, git clone this repository in that VPS

```bash
git clone https://github.com/Kiinzu/react-casino-heist/
```

4. Make sure that NGINX is installed and running.
5. Generate Certificates for your domain using Certbot and make sure this two files present in this directory

```
/etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem;
/etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem;
```

6. On the Root Folder, run the `deploy_https.sh` and fill the requested input, which is your domain name (same domain name for certbot) and the your Challenge VPS IP; This script will automatically configure your nginx and deploy the backend for you. 

**NOTE**: `sudo service nginx restart` may failed if your VPS doesn't have sudo, in taht case please restart the nginx manually using `service nginx restart`

7. By now you should have a working Website.

##### Challenge Server
1. On your Challenge VPS, git clone this repository

```bash
git clone https://github.com/Kiinzu/react-casino-heist/
```

2. Navigate to `/Challenges`, there you'll find `deploy.sh`; an interactive deployment helper for the challenges

3. You can choose option `1` for deployment and `2` for removing the docker. 

4. If your Server is above the recommendation, you can choose `1` and then `1337` to deploy all challenge at once. NOTE that this will use a lot of CPUs and will take around `25 minutes` to be fully deployed

5. Once done, verify that all challenge are perfectly deployed by trying to access them.

### HTTP Deployment (Local Usage)
For a limited time, you can have the Casino Heist website running in your local and fetch the data from our running website at `casinoheist.xyz/api`, here is how you can deploy your local Casino Heist Website

1. Go to `/Frontend` directory 
2. Configure the `/Frontend/.env` to poiting to `casinoheist.xyz/api`
3. Run the `./start.sh` to run the website on `dev` mode
4. Now you have Casino Heist Website running on your Local, with the api from the officail server!

**NOTE** 
This Option of communication directly to our backend will end in the end of 2024.

## Main Feature
- **Private Blockchain**  
    We use paradigmCTF infrastructure that is further customized by TCP1P community to make it looks better, to run a private blockchain.
- **Seamless Onboarding**  
    Player doesn't need to setup any wallet of getting Ethers from faucet, making new users that aren't familiar with the setup can play without dealing with that complexities.
- **Playground Experience**  
    Many Cybersecurity Platform offer a gamified content, Casino Heist also built around the theme of gamified "Heist"
- **Self-Paced & Guided**  
    Got stuck on a problem? We got you! We provide you with hints and even the Walkthrough of the `common` category Challenges
- **Real-Life Incident Simplified**  
    We don't want player to just learn the basic, we got the `VIP` category challenge, which is a simplified version of a real-life hack.
- **Open for Contribution**  
    Do you enjoy playing Casino Heist and want to contribtue? We have 2 ways of contribute to our Open-Source Playground! You can either write a walkthrough for the `common` challenge in your own way, or you can create your own Challenge and submit to us!
- **Engage with the Community!**  
    Casino Heist is created and backed by ENUMA ID, a community that gathered Smart Contract Security Enthusiast in Indonesia.

## How to Contribute
We are open for contribution, you can contribute in 2 ways. If you like to create a challenge and want others to try it out or If you like to write writeups and walkthrough and excited for it to be read by other and featured in our Playground, you can do that! 

Just follow the Instruction [here](./Contribution/) to Contribute!

## Authors
- [Kiinzu](github.com/kiinzu)
- [Mewzael](github.com/Mewzael)
- [fefethecyberclown](github.com/fefethecyberclown)

## Feedback
If you have any feedback, please contact us directly on our [Discord Server](https://www.discord.com)!
