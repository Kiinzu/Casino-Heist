# HTTPS Deployment (Production Ready)

For this deployment, you are required to have 2 VPS, one for the website server and another one for the challenge server. Ensure your VPS meets the [minimum specification](../README.md#minimum-recommended-specification). We are going to divide the setup process into 2 parts, 
- [Website Server](#website-serverfrontend--backend)
- [Challenge Server](#challenge-server)

## Website server(frontend & backend)
1. On your website VPS, git clone this repository in that VPS.

```bash
https://github.com/Kiinzu/Casino-Heist.git
```

2. Make sure that Nginx is installed and running.
3. Generate certificates for your domain using Certbot and make sure that they are generated in the directory below.

```bash
# Generate Certificate using Cert Bot
$ sudo certbot --nginx -d <YOUR_DOMAIN> -d www.<YOUR_DOMAIN> 

# Confirm that Certificate is generated in /etc/letsencrypt/live/<YOUR_DOMAIN>/
/etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem;
/etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem;
```

4. On the root (`CASINO-HEIST/`), run the `manager.sh` and fill in the requested input, which is your domain name (same domain name for certbot) and your Challenge VPS IP. This script will automatically configure your nginx and deploy the backend for you. <br>
```bash
$ ./manager.sh

 ___   __   ____  __  __ _   __     _  _  ____  __  ____  ____ 
/ __) / _\ / ___)(  )(  ( \ /  \   / )( \(  __)(  )/ ___)(_  _)
( (__ /    \___ \ )( /    /(  O )  ) __ ( ) _)  )( \___ \  )(  
\___)\_/\_/(____/(__)\_)__) \__/   \_)(_/(____)(__)(____/ (__) 

WELCOME TO CASINO HEIST!
HOW MAY WE HELP YOU TODAY?
0. Quick Start - Casino Heist
1. Deploy Challenges
2. Deploy HTTPS Casino Heist (require Nginx & certbot)
3. Deploy HTTP Casino Heist (local)


>> 2
Does your VPS Require sudo(yes/no): yes
Enter your domain name: <YOUR_DOMAIN_NAME>
Enter your challenge server IP: <YOUR_CHALLENGE_VPS_IP>
```
>**NOTE**: If you choose `yes` on `Does your VPS Require sudo(yes/no)`, the bash will automatically use `sudo` to restart your Nginx, if your VPS doesn't require it, you can simply choose `no`.

7. By now you should have a working website, to verify this, just head to your domain.

## Challenge server
1. On your Challenge VPS, git clone this repository.

```bash
https://github.com/Kiinzu/Casino-Heist.git
```

2. On `/Casino-Heist`, you'll find `manager.sh`, an interactive deployment helper for the Challenges (refer to this for [usage](#local-Challenge-only-version)).

3. You can choose option `1. Manage Challenges` followed by `1. Deploy Challenge` for deployment, `2.Stop Challenge` for removing the Docker and `3. Containers Info` to see the active Docker containers. 

4. If your server is above the recommendation, you can choose `1.Deploy Challenge` and then `1337 - Deploy All Challenge (recommended only for Challenge Server)` to deploy all Challenge at once. 
> **NOTE**: This will use a lot of CPUs and will take around `25 minutes` to be fully deployed; if you are not sure, it's better for deploying them one by one.

5. Once done, verify that all Challenges are perfectly deployed by trying to access them. You can access them in the `Challenge_VPS_IP:PORT`. Refer [here](/Challenges/note.txt) for the port of each challenge.