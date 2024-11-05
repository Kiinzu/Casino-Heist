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

**Please make sure that the requirements are fulfilled, for the deployment- we'll do it for you!**

## Deployment and Usage

You can choose one of the three methods provided to use the application, however if you want a quick look at Casino Heist, you can try the [Quick Start Casino Heist](#quick-start).

1. Challenge-Only Version
    If you wish to only play the challenge locally or deploy them in your VPS, this is the perfect version for you! Follow the guide [here](./Documentation/CHALL-ONLY_deployment.md)
2. HTTPS Full Website & Challenge Server
    If you have 2 VPS and want a more secure way of deployment, you can choose this option by following the guide [here](./Documentation/HTTPS_deployment.md)
3. HTTP Version
    If you want to enjoy the UI and and to do it locally, you can setup Casino Heist to run locally on your machine, and if you fancy, you can fetch the data from our official API at `https://casinoheist.xyz/api`, follow the guide [here](./Documentation/HTTP_deployment.md)

> **NOTE**
This option of communication directly to our API will end in the end of 2024 or until further notice.

### Quick Start
To deliver the experience without much hussle, you can follow this guide to deploy **Quick Start - Casino Heist**. It will deploy the `Frontend` locally in your machine and fetch everything from our official API at `https://casinoheist.xyz/api`
1. Clone this repository

```bash
https://github.com/Kiinzu/Casino-Heist.git
```

2. On `/Casino-Heist`, you'll find the `manager.sh`, run this script and choose option `0. Quick Start - Casino Heist` and choose `y`.
```bash
$ ./manager.sh

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


>> 0

This is a Quick Start version of Casino Heist,
You will be able to play Casino Heist with its UI locally
and fetch the data from our official API at

| https://casinoheist.xyz/api


Do you wish to launch Quick Start Casino Heist? (y/n) y
```

3. Now You should have a working Casino Heist website that fetch the data from our official API and start playing!

## Main Feature
- **Private Blockchain**  
    We use [paradigmCTF](https://github.com/paradigmxyz/paradigm-ctf-infrastructure) infrastructure that is further customized by [TCP1P community](https://github.com/TCP1P/Paradigmctf-BlockChain-Infra-Extended) to make it looks better, to run a private blockchain. 
- **Seamless Onboarding**  
    Player doesn't need to setup any wallet of getting Ethers from faucet, making new users that aren't familiar with the setup can play without dealing with that complexities.
- **Playground Experience**  
    Because smart contract hacks can lead to financial losses, we thought the *Casino Heist* theme would be a perfect match for our content.
- **Self-Paced & Guided**  
    Got stuck on a problem? We got you! We provide you with hints and even the Walkthrough of the `common` category Challenges
- **Real-Life Incident Simplified**  
    We’re not here for just the basics. With our VIP category, everyone gets access to real-life hacks that we’ve simplified, which make anyone can feel the thrill of real-world scenarios.
- **Open for Contribution**  
    Do you enjoy playing Casino Heist and want to contribute? We have 2 ways of contribute to our Open-Source Playground! You can either write a walkthrough for the `common` Challenge in your own way, or you can create your own Challenge and submit to us!
- **Engage with the Community!**  
    Casino Heist is created and backed by [ENUMA ID](https://discord.gg/scwfGkERsj), a community that gathered Smart Contract Security Enthusiast in Indonesia.

## How to Contribute
We are open for contribution, you can contribute in 2 ways. If you like to create a Challenge and want others to try it out or If you like to write writeups and walkthrough and excited for it to be read by other and featured in our Playground, you can do that! 

Just follow the Instruction [here](./Contribution/) to Contribute!

## Authors
- [Kiinzu](https://github.com/kiinzu)
- [Mewzael](https://github.com/Mewzael)
- [fefethecyberclown](https://github.com/fefethecyberclown)

## Feedback
If you have any feedback, please contact us directly on our [Discord server](https://discord.gg/scwfGkERsj)!
