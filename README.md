# CASINO HEIST : Where Blockchain Vulnerabilities Meet the Thrill of the Heist!
![Logo](./casino-heist.png)
# Casino Heist
**We are an open-source blockchain playground where we provide challenges that featured the OWASP Top 10 Smart Contracts and the Mitigation**

Are you a blockchain developer, auditor, enthusiast, or just starting your journey into the world of blockchain?

**You’re in the right place.**

The Web3 and blockchain space has grown significantly over the past few years, with many real-world applications of blockchain in areas like finance, voting, and gaming. Advanced technology doesn’t come without security risks. Whether you're looking to gain new skills (such as smart contract security) or explore a career as a smart contract developer or auditor, mastering and understanding security is essential to protecting the ecosystem we're building.

Casino Heist is designed as a playground where you can not only learn about vulnerabilities but also try to exploit them yourself. In addition to that, we aim to educate you on how to mitigate these issues, since that's essential, right? Knowing the vulnerability, exploiting it, and understanding how to mitigate it.

## Why Casino Heist?
- ⭐ **EASY TO USE**: Access it effortlessly from localhost (via Docker) or dive right into our [website](https://casinoheist.xyz).
- 🔍 **OPEN SOURCE**: All source code is available for your analysis and exploration.
- ✋ **HANDS ON**: Exploit real-world scenarios with different difficulties, complete with solutions and mitigation strategy.
- 💰 **COST-FREE**: It’s Free.
- 🌍 **CONTRIBUTE WITH US**: Want to create your own challenges? [Contribute](/Contribution/) with us!


## (Minimum) Recommended Specification
You can deploy the **Full Website and Challenges** platform so that you can invite other players to play in your own server, or if you fancy playing by yourself-- you can deploy the Challenge-Only Version. We recommend using Ubuntu or Debian OS to deploy Casino Heist.

**Local Challenge-Only Version**  
Running a single challenge at a time (not all at once)
- Operating System: Ubuntu or Debian (latest version recommended)
- vCPU: 2 cores
- RAM: 4 GB
- HDD: 40 GB of free space

**Full Website and Challenges**  
Running the entire application (backend and frontend) and all challenges at once
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

**Please make sure that the requirements are fulfilled for the deployment—we'll do it for you!**

## Deployment and Usage

You can choose one of the three methods provided to use the application; if you want a quick look at Casino Heist, you can try the [Quick Start Casino Heist](#quick-start).

1. Challenge-Only Version
    If you wish to only play the challenge locally or deploy them in your VPS, this is the perfect version for you! Follow the guide [here](./Documentation/CHALL-ONLY_deployment.md)
2. HTTPS Full Website & Challenge Server
    If you have 2 VPS and want a more secure way of deployment, you can choose this option by following the guide [here](./Documentation/HTTPS_deployment.md)
3. HTTP Version
    If you want to enjoy the UI and and do it locally, you can setup Casino Heist to run locally on your machine, and if you fancy, you can fetch the data from our official API at `https://casinoheist.xyz/api`. Follow the guide [here](./Documentation/HTTP_deployment.md)

> **NOTE**
This option of communicating directly to our API will end at the end of 2024 or until further notice.

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

3. Now you should have a working Casino Heist website that fetches the data from our official API and start playing!

## Main Feature
- **Private Blockchain**  
    We use [paradigmCTF](https://github.com/paradigmxyz/paradigm-ctf-infrastructure) infrastructure that is further customized by [TCP1P community](https://github.com/TCP1P/Paradigmctf-BlockChain-Infra-Extended) to make it look better and to run a private blockchain.
- **Seamless Onboarding**  
    Player doesn't need to setup any wallet for getting Ethers from faucet, making new users that aren't familiar with the setup can play without dealing with those complexities.
- **Playground Experience**  
    Because smart contract hacks can lead to financial losses, we thought the *Casino Heist* theme would be a perfect match for our content.
- **Self-Paced and Guided**  
    Got stuck on a problem? We got you! We provide you with hints and even the walkthrough of the `common` category challenges
- **Real-Life Incident Simplified**  
    We’re not here for just the basics. With our VIP category, everyone gets access to real-life hacks that we’ve simplified, which make anyone can feel the thrill of real-world scenarios.
- **Open for Contribution**  
    Do you enjoy playing Casino Heist and want to contribute? We have 2 ways to contribute to our open-source playground! You can either write a walkthrough for the `common` challenge in your own way, or you can create your own challenge and submit it to us!
- **Engage with the community!**  
    Casino Heist is created and backed by [ENUMA ID](https://discord.gg/scwfGkERsj), a community that gathered smart contract security enthusiast in Indonesia.

## How to Contribute
We are open for contributions; you can contribute in 2 ways. If you like to create a challenge and want others to try it out or If you like to write writeups and walkthroughs and are excited for them to be read by others and featured in our playground, you can do that!

Just follow the instruction [here](./Contribution/) to contribute!

## Authors
- [Kiinzu](https://github.com/kiinzu)
- [Mewzael](https://github.com/Mewzael)
- [fefethecyberclown](https://github.com/fefethecyberclown)

## Feedback
If you have any feedback, please contact us directly on our [Discord server](https://discord.gg/scwfGkERsj)!
