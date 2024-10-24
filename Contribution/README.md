If you have a Challenge Idea that you think fits with our playground, feel free to Contribute to us!

# How to Contribute?
You can contribute in 2 ways, if you think you have an interesting Idea that you can build in the theme of Casino Heist Challenge, you can contribute your Challenge!

If you like writting writeups or walkthrough and you want yours to be featured in this playground, you can also do that!

# Contributing Challenge
1. Fork this repository & Clone the repository
2. On `/Contribution` notice that there is a directory called `/Template-Challenge`. Copy the Directory and change it to your `blockchain-challengeName` format, for example `blockchain-template`
3. You will find this file structure there 

```text
Template
    ├── Challenge
    │      ├── Dockerfile
    │      ├── build.sh
    │      ├── contract
    │      ├── deploy
    │      └── images
    └── Markdown
        ├── art.png
        ├── description.md
        ├── mitigation.md
        ├── text.md
        └── walkthrough.md
```

4. Based on your challenge difficulty, please edit the following files in the `/Markdown` folder

    - **Basic** 
        Challenge that introduce new Player to Smart Contract Security, could be anything basic like function introduction, ERC Introduction etc.
        **Modify**: `art.png`, `text.md`, `descriptiong.md`, `note.txt`
         <br>
    - **Common**
        Challenge that introduce Player to vulnerabilities in Smart Contract, this could be any variation of the vulnerability, for example Cross-Function Reentrancy, Read-Only Reentrancy,etc.
        **Modify**: `art.png`, `text.md`, `description.md`, `mitigation.md`, `walkthrough.md`, `note.txt`
        <br>
    - **VIP**
        Challenge that refer from a real-world hack or have a higher level of complexity in the exploit. For this, please also include the reference of the hack on `note.txt`
        **Modify**: `art.png`, `text.md`, `description.md`, `note.txt`
        <br>

5. Moving to `/Template/Challenge` here are things that you need to edit
    
    - `/Challenge/contracts`
        Your challenge files goes here, the `Setup.sol` is a mandatory file that need to be exist there, it'll be the one that deploy your challenge contract.
        <br>
    - `/Challenge/deploy/chal.py`
        Adjust the Challenge condition, if your Setup need some Ether you can control it here. As for Player condition, you can set how many Ether the Player will get.
        <br>
    - `/Challenge/build.sh`
        Change the container name to `blockchain-your-challenge-name-lowercase`
        <br>
    - `/Challenge/.env`
        change the Port that you are going to use based on the difficulty, we recommend you to use the next port after the last challenge, for example if you are creating a `Basic` challenge, then you could use the next port after the latest `challenge` in `30003`. 
            - `Basic` : 300xx
            - `Common` : 400xx
            - `VIP` : 500xx
        <br>
    - `/Challenge/docker-compose.yml`
        We usually limit the CPU and Memory usage to `1.0` and `500Mb`, but if your challenge need more, you can adjust it here.
        <br>
**NOTE**
If your challenge need to implement a certain ERC, you can either provide the whole file and localize them like in `blockchain-injus-gambit` or you can use Interface.
<br>
6. Finally Make the Pull Request & We will Check it!

# Walkthrough Contribution
1. Fork this repository & Clone the repository
2. On `/Contribution` notice that there is a directory called `/Template/Template-Walkthrough`. Copy the Directory and change it to your `walkthroguh-contributor_name` format, for example `walkthrough-mewzaels`
3. Update the note.txt, adjust it to your needs
4. Finally Make the Pull Request & We will Check it!

