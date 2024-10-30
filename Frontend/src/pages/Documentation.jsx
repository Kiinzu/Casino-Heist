import React from 'react';
import cheistlogo from "../assets/images/colored-logo.png";
import '../App.css';

const DocumentLayout = () => {
  return (
    <div className="document-layout">
      <div className="content-area">
        <div className='content-image'>
            <img src={cheistlogo}/>
        </div>
        <div className='content-content'>
            <h1 id="introduction">I. INTRODUCTION</h1>
                <p>Welcome to <b>Casino Heist</b>, the ultimate playground for smart contract enthusiasts! We’re not just about rolling dice or spinning wheels—we’re here to equip you with the skills you need to uncover and patch vulnerabilities in Solidity Smart Contracts, all while enjoying the thrill of a casino-themed adventure.</p>
                <p>Blockchain has reshaped the world with its magic trio: <b>Cryptography</b>, <b>decentralization</b>, and <b>consensus</b>—the pillars behind cryptocurrencies like Bitcoin and programmable blockchains like Ethereum. As this ecosystem has grown, countless protocols, coins, and challenges have surfaced, pushing innovation to new heights. But with every leap forward, new vulnerabilities emerge, making security a <b>non-negotiable</b> priority. In an ever-evolving space where one exploit can dismantle even the most reputable projects, understanding and safeguarding smart contracts is not just a skill—it’s a necessity.</p>
                <p>This is where Casino Heist comes in. Built on a private blockchain powered by <b>ParadigmXYZ</b> and <b>TCP1P</b>, we provide an engaging platform for developers and auditors to explore vulnerabilities lurking within Solidity code. Whether you're here to sharpen your security skills, master the art of smart contract audits, or just love a good challenge, we've got you covered. With every challenge you solve, you’re one step closer to becoming the master of the game—and the best part? You can experience all the thrill without risking it all!</p>
            <h2 id="introduction-why">I.I WHY LEARN SMART CONTRACT SECURITY?</h2>
                <p>Understanding smart contract security is crucial for ensuring the integrity of DeFi protocols, dApps, and other blockchain-based solutions. These platforms manage financial transactions and sensitive data, making them prime targets for exploitation. If you aim to become a developer, having security knowledge is a valuable asset that sets you apart. Whether you're interested in transitioning to security auditing or simply expanding your skill set, mastering smart contract security equips you to create safer applications and stay ahead in the fast-evolving blockchain ecosystem.</p>
            <h2 id="introduction-community">I.II COMMUNITY</h2>
                <p>The <b>Casino Heist</b> community is the perfect place for blockchain enthusiasts, smart contract developers, and security enthusiasts to connect and grow. If you're looking for a community, especially one based in Indonesia or just want to connect with like-minded individuals, we’ve got you covered—since Casino Heist was built by <a href="https://discord.gg/scwfGkERsj"><b>ENUMA ID</b></a>. Whether you're just starting out or already deep into smart contract security, our community offers a space to collaborate, learn, and share insights. So, if you’re ready to level up your skills and be part of something exciting, join us and become the next mastermind in the heist!</p>

            <h1 id='challenge-intro'>II. CHALLENGES</h1>
                <p>At Casino Heist, challenges are at the heart of the experience. Think of each challenge as a high-stakes puzzle—your mission is to uncover vulnerabilities and exploit them just like a real-world attacker. Whether it's sneaking away with stolen funds or seizing control of a smart contract, each <b>Heist</b> or <b>Lab</b> (just to make it sounds cooler) has its own unique target. Your task is simple: find the flaw, exploit it, and walk away victorious. Every challenge is designed to sharpen your skills, putting you in the shoes of a mastermind pulling off the perfect digital caper.</p>
            <h2 id='challenge-type'>II.I CHALLENGE TYPES</h2>
                <p>We have something for everyone—choose your heist level based on your skills and mastery.</p>
                <ul>
                    <li>
                        <code className='content-basic'>INTRODUCTION / BASIC</code>
                        <br />
                        <br />
                        <p><b>Introduction</b> level challenges are designed to walk you through the basics of this playground. They cover fundamental skills like interacting with smart contracts and deploying attack contracts. As <b>GUIDED CHALLENGES</b>, they’re perfect for anyone just starting out!</p>
                    </li>
                    <li>
                        <code className='content-common'>COMMON</code>
                        <br />
                        <br />
                        <p><b>Common</b> level challenges introduce you to some of common vulnerabilities found in EVM smart contracts. Each challenge starts with a brief reading to help you understand the vulnerability. Then, it's time to get your hands dirty and tackle the challenge! Once you solve it, a mitigation box will unlock, showing you how to address the issue. Some Challenges even include a patched version of the contract you just exploited in the mitigation box, giving you practical insight into how to secure it!</p>
                    </li>
                    <li>
                        <code className='content-vip'>VIP</code>
                        <br />
                        <br />
                        <p><b>VIP</b> level challenges are inspired by real-world attacks, simplified for you to experience the thrill of executing exploits that have actually occurred. These heists let you step into the shoes of real attackers, giving you a taste of the tactics used in notable breaches. Each challenge is designed to immerse you in the excitement of discovering and exploiting vulnerabilities, just as they unfolded in real scenarios. This level is perfect for those looking to push their skills further and see how theoretical knowledge translates into action.</p>
                    </li>
                </ul>
                <p>If you get stuck, no worries! We’ve got hints and walkthroughs ready to guide you. Use them however you like, but keep in mind that every hint or walkthrough you rely on will show up in your heist history on your profile. Choose wisely, Mastermind!</p>
            <h2 id='challenge-prerequisites'>II.II PREREQUISITES</h2>
                <p>To dive into the action and take on the heists, all you need is a way to interact with the deployed smart contracts on an EVM chain through RPC. The choice of tools is yours—go with whatever you feel most comfortable with. However, throughout this playground, <b>Foundry</b> will be our tool of choice for all walkthroughs. Sleek, fast, and powerful—Foundry offers everything you need to pull off the perfect heist.</p>
                <ul>
                    <li><b>Foundry</b> (recommended)</li>
                    <li><b>Hardhat</b>, <b>Web3JS</b> or <b>EthersJS</b> for JavaScript</li>
                    <li><b>Web3.py</b>, <b>foundpy</b> or <b>Cheb3</b> for Python</li>
                    <li><b>REMIX IDE</b></li>
                </ul>
                <br />
            <h2 id='challenge-solving'>II.III DOING THE HEIST</h2>
                <p>Once you’ve chosen which Heist to start, you'll see a description box containing the challenge details and storyline, designed to explain the vulnerabilities involved and provide additional context for the task. There’s also a download button that gives you access to a folder with essential files. The folder will always contain more than two files, but here’s what you need to take note of:</p>
                <ul>
                    <li>
                        <b>Setup.sol</b>
                        <p>This is the contract that deploys all the challenge components (the challenge contracts are the other files in the folder) and determines the solve condition for each Heist.</p>
                    </li>
                </ul>
                <p>
                    To complete the Heist, you need to make the <code className='content-default'>Setup.sol::isSolved()</code> function return true. You can spawn an instance by clicking <b>"HERE"</b> in the Hands-On box, 
                    which will redirect you to a web-based interface created by the TCP1P Community. There, you'll encounter a Proof-of-Work (PoW) that needs to be completed before deploying an instance.
                    This will involve running a curl command below all the buttons (you just need to copy paste and run it in your terminal). Once executed, submit the result in the provided input box and press <b>"Submit Solution"</b>. 
                    After that, you can deploy your instance by clicking the <b>"Launch"</b> button. The <b>"Terminate"</b> button allows you to terminate the current active instance. 
                    Finally, the <b>"Flag"</b> button checks your private contract to see if the challenge is solved. If isSolved returns true, the flag will be displayed.
                    All that’s left to do is copy the flag and submit it in the corresponding Heist's Hands-On box on Casino Heist.
                </p>
            <h1 id='profile'>III. PROFILE</h1>
                <p>In the profile menu, you'll see your name, email, and a selection of characters you can choose as your profile picture. You’ll also find a lab list displaying available challenges, along with their completion status (Solved or Not). Every decision you make in the casino matters! If you decide to use hints, you'll receive a hint badge; similarly, using a walkthrough will earn you a different badge. If you solve a challenge on your own without assistance, you’ll receive a special badge celebrating your achievement. Your badges reflect your journey and choices. And don’t worry—each solution is backed by a reassurance for accuracy. Here are the tags you can earn</p>
                <ul className='content-tags'>
                    <li>
                        <code className='solo-tag'>PERFECT SOLO HEIST!</code>
                    </li>
                    <li>
                        <code className='hints-tag'>#X-Assists!</code>  
                    </li>
                    <li>
                        <code className='walkthrough-tag'>Guided Heist!</code>
                    </li>
                </ul>
                <br />
            <h1 id='contribute'>IV. CONTRIBUTE</h1>
                <p>We are open for contribution, you can contribute in 2 ways. If you like to create a challenge and want others to try it out or If you like to write writeups and walkthrough and excited for it to be read by other and featured in our Playground, you can do that!</p>
                <p>Just follow the Instruction <a href="github.com"><b>here</b></a> to Contribute!</p>
            <h1 id='faq'>V. FAQ</h1>
            <div class="qa-section">
                <div class="question">
                    <strong>Q:</strong> Do I have to prepare anything other than the tools for interacting with the challenges, like wallet or testnet Ethers?
                </div>
                <div class="answer">
                    <strong>A:</strong> No you don't! The Challenge Infrastructure will provide you with everything you need to solve the challenge!
                </div>

                <div class="question">
                    <strong>Q:</strong> Is there a local version like challenge-only version of Casino Heist?
                </div>
                <div class="answer">
                    <strong>A:</strong> Yes, we got you! You can just clone our repo and follow the instruction to deploy the challenge-only version in your setup.
                </div>

                <div class="question">
                    <strong>Q:</strong> Can I publish a Writeup about Casino Heist's Challenges, even the VIP?
                </div>
                <div class="answer">
                    <strong>A:</strong> Sure you can, we even have a place where your writeup can be featured in the <b>Walkthrough</b> section for <code className='content-common'>Common</code>!
                </div>
            </div>
            <br />
            <h1 id='external-resource'>VI. EXTERNAL RESOURCES</h1>
            <div className='external-resource'>
                <p>Bug Bounty platforms</p>
                <ul>
                    <li><a href="https://immunefi.com/hackers/">Immunefi</a></li>
                    <li><a href="https://hashlock.com/bug-bounty">Hahslock</a></li>
                </ul>
                <br />
                <p>Auditing platforms</p>
                <ul>
                    <li><a href="https://code4rena.com/"></a>code4rena</li>
                    <li><a href="https://codehawks.cyfrin.io/"></a>codehawks</li>
                    <li><a href="https://cantina.xyz/competitions">Cantina</a></li>
                    <li><a href="https://audits.sherlock.xyz/contests">Sherlock</a></li>
                    <li><a href="https://app.hats.finance/audit-competitions">Hats finance</a></li>
                </ul>
                <br />
                <p>Goot to Read</p>
                <ul>
                    <li><a href="https://www.rareskills.io/">Rareskills</a></li>
                </ul>
            </div>
        </div>
      </div>
      <div className="bookmark-navigation">
        <p className='bookmark-navigation-head'><a href="#introduction">I. INTRODUCTION</a></p>
        <div className='bookmark-navigation-sub'>
            <p><a href="#introduction-why">I.I WHY LEARN SMART CONTRACT SECURITY?</a></p>
            <p><a href="#introduction-community">I.II COMMUNITY</a></p>
        </div>
        <p className='bookmark-navigation-head'><a href="#challenge-into">II. CHALLENGES</a></p>
        <div className='bookmark-navigation-sub'>
            <p><a href="#challenge-type">II.I CHALLENGE TYPES</a></p>
            <p><a href="#challenge-prerequisite">II.II PREREQUISITES</a></p>
            <p><a href="#introduction-solving">II.III DOING THE HEIST</a></p>
        </div>
        <p><a href="#profile">III. PROFILE</a> </p>
        <p><a href="#contribute">IIV. CONTRIBUTE</a></p>
        <p><a href="#faq">V. FAQ</a></p>
        <p><a href="#external-resource">VI. EXTERNAL RESOURCES</a></p>
      </div>
    </div>
  );
};

export default DocumentLayout;
