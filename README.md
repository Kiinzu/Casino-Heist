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

**please make sure that the requirements are fulfilled, for the deployment- we'll do it for you!**

## Deployment and Usage
### Local Challenge-Only Version
To deploy Casino Heist:
1. Clone this repository

```bash
git clone https://github.com/Kiinzu/react-casino-heist/
cd react-casino-heist/Challenges/challenge-only-v/
```

2. We have some make file there:

```bash
To be create makefile command

start

stop

clear
```

3. Use the make file to start and stop the container and clear your docker images list.

### Full Website & Challenges
1. Clone this repository in both your `Challenge-server` and `Website-server`

```bash
git clone https://github.com/Kiinzu/react-casino-heist/
```

2. In your `Challenge-server` go to the `/Challenges/full-challenges/` and run this command (it will take a couple of minutes)

```bash
cd react-casino-heist/Challenges/full-challenges/
make start-all
```

3. The Challenges docker should be up by now, you can verify this by accessing the port of respective container.

4. Now move to your `Website-server`, please modify the `.env` variable to point to the Backend IP. 

```
VITE_something....
blum di implement?
```

5. Run the `start.sh` in the root directory to run both the Backend and the Frontend (this might takes a couple of minutes)

6. You should've a working Casino Heist Website now!

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
- Blom di pul @kiinzu

## Authors
- [Kiinzu](github.com/kiinzu)
- [Mewzael](github.com/Mewzael)
- [fefethecyberclown](github.com/fefethecyberclown)

## Feedback
If you have any feedback, please contact us directly on our [Discord Server](https://www.discord.com)!
