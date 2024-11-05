## HTTP Deployment (Local Usage)
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
0. Quick Start - Casino Heist
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

4. If you choose not to use our Official API, you'll need to deploy the Challenges yourself by following [this](../Documentation/CHALL-ONLY_deployment.md) deployment, as for the Website (Frontend & Backend), it will be configured by the script to be deployed on `localhost:5173` (Frontend) and `127.0.0.1:5000` (Backend). 

5. Now you have a running Casino Heist Website on your local, you can verify this by navigating to `localhost:5173`

> **NOTE** 
This option of communication directly to our API will end in the end of 2024 or until further notice.