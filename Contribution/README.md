If you have a challenge idea that you think fits with our playground, feel free to contribute to us!

# How to Contribute?
You can contribute in 2 ways. If you think you have an interesting idea that you can build in the theme of Casino Heist Challenge, you can contribute your challenge!

If you like writing writeups or walkthroughs and you want yours to be featured in this playground, you can also do that.

# Contributing Challenge
1. Fork this repository and clone the repository.
2. On `/Contribution` notice that there is a directory called `/Template-Challenge`. Copy the directory and change it to your `blockchain-challengeName` format, for example, `blockchain-template`
3. You will find this file structure there.

```text
Template-Challenge
    ├── Challenge
    │      ├── Dockerfile
    │      ├── build.sh
    │      ├── contract
    │      ├── deploy
    │      └── images
    └── Markdown
    │   ├── art.png
    │   ├── description.md
    │   ├── mitigation.md
    │   ├── text.md
    │   └── walkthrough.md
    └──  note.txt
```

4. Based on your challenge difficulty, please edit the following files in the `/Markdown` folder.

    - **Basic**   
        Challenges that introduce a new player to smart contract security could be anything basic, like function introduction, ERC introduction, etc.  
        **Modify**: `art.png`, `text.md`, `description.md`, `note.txt`
         <br>
    - **Common**  
        Challenges that introduce players to vulnerabilities in smart contracts could be any variation of the vulnerability, for example, cross-function reentrancy, read-only reentrancy, etc.  
        **Modify**: `art.png`, `text.md`, `description.md`, `mitigation.md`, `walkthrough.md`, `note.txt`
        <br>
    - **VIP**  
        Challenges that refer to a real-world hack or have a higher level of complexity in the exploit. For this, please also include the reference to the hack in `note.txt`.  
        **Modify**: `art.png`, `text.md`, `description.md`, `note.txt`
        <br>

5. Moving to `/Template/Challenge` here are things that you need to edit.
    
    - `/Challenge/contracts`  
        Your challenge files go here; the `Setup.sol` is a mandatory file that needs to exist there; it'll be the one that deploys your challenge contract.
        <br>
    - `/Challenge/deploy/chal.py`  
        Adjust the Challenge condition; if your setup needs some Ether, you can control it here. As for the player condition, you can set how many Ether the player will get.
        <br>
    - `/Challenge/build.sh`  
        Change the container name to `blockchain-your-challenge-name-lowercase`.
        <br>
    - `/Challenge/.env`  
        Change the port that you are going to use based on the difficulty. We recommend you use the next port after the last challenge; for example, if you are creating a `Basic` challenge, then you could use the next port after the latest `challenge` in `30003`.   
            - `Basic` : 300xx  
            - `Common` : 400xx  
            - `VIP` : 500xx
        <br>
    - `/Challenge/docker-compose.yml`  
        We usually limit the CPU and memory usage to `1.0` and `500 MB`, but if your challenge needs more, you can adjust it here.
        <br>
**NOTE**
If your challenge needs to implement a certain ERC, you can either provide the whole file and localize it, like in `blockchain-injus-gambit`, or you can use Interface.
<br>
6. Finally, make the pull request and we will check it!

# Walkthrough Contribution
1. Fork this repository and clone the repository.
2. On `/Contribution` notice that there is a directory called `/Template/Template-Walkthrough`. Copy the directory and change it to your `walkthrough-contributor_name` format, for example, `walkthrough-mewzaels`.
3. Update the note.txt and adjust it to your needs.
4. Finally, make the pull request and we will check it!