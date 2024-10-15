Briefing is the starting point of your long jounery in Casino Heist, we will walk you through the basic of the smart contract and how do you interact with it using Tools that are design for it. With that being said, we do recommend you to have at least the prequisite of:  
&nbsp;  

- How the Blockchain works
- Smart Contract Basic  
&nbsp;  

Now let's see what we can do to tackle the **Briefing**!

## Setup your tools
Like always, we need to setup before doing anything, hence the challenge name **Briefing**. There are 2 things that will be our main tools for the time being, they are:

- [REMIX IDE](https://remix.ethereum.org/)&nbsp;  
    REMIX is a web-based IDE for EVM (Ethereum Virtual Machine) Smart Contract such as Solidity, Vyper, and Cairo. You can access the IDE directly by clicking the "REMIX IDE" above.&nbsp;  
    &nbsp;  
- [Foundry](https://book.getfoundry.sh/)&nbsp;  
    Foundry is a smart contract development toolchain, it manages your dependencies, compiles your project, run tests, deploys, and lets you interact with the chain from the command-line and via Solidity script. To install it you can go [here](https://book.getfoundry.sh/getting-started/installation) and follow the guide.&nbsp;  
&nbsp;  

To solve **Briefing**, we will utilize both tools that you just discover, we will use REMIX to see what the contract could do and use Foundry to interact with the real deployed contract on the private blockchain.&nbsp;  

## Transaction
A way of communicating in the blockchain is through transaction, we can categorize them by this three different transaction
- **Transaction with/without Ether**&nbsp;  
    Transasction in blockchain may include transferring Ether to a Smart Contract or an EOA, but we can also do a transaction that doesn't have any Ether, such as calling a function.&nbsp;  
    &nbsp;  
    EOA by default has the ability to receive Ether, but Smart Contract doesn't. A Smart Contract can only receive Ether when they implemented either **receive()** or **fallback()** special methods.&nbsp;  
    &nbsp;  
- **Transaction with/without Data**&nbsp;  
    Like all programming language, some function might require an input like **uint256**, **address**, **bytes32**, etc. Keep in mind that not all function require an input to call them, some might just need to be called without any value, some might require value and Ether, and some only Ether and data.&nbsp;  
    &nbsp;  
    Transaction that require a data and or some value, usually meant to execute some logic from a function and changing the state of the Smart Contract.&nbsp;  
    &nbsp;  
- **Transaction between/to EOA (External Owned Account)/Smart Contract**&nbsp;  
    We know that we can directly send a transaction to either an EOA or a Smart Contract, but one thing to understand here, in Solidity we have special variables that has a type of **address** called **msg.sender** and **tx.origin**.&nbsp;  
    &nbsp;  
    - **msg.sender**&nbsp;  
        This variable allow a smart contract to recognize who is currently interacting with it, for example let's say we have 2 Smart Contract called **SCA** and **SCB**. When SCA send a Transaction to SCB, SCB recognize SCA as the **msg.sender**.&nbsp;  
        &nbsp;  
    - **tx.origin**&nbsp;  
        This variable allow a smart contract to recognize the **origin** or the **initiator** of the transaction, let's see the example that use 2 Smart Contract (SCA & SCB) and an EOA **C**.&nbsp;  
        &nbsp;  
        In SCA exist a function that will send a call a function in SCB- let's call it **function callB()**, when **C** trigger the function **callB()** from Smart Contract A, SCB will be called and it will have the following value, for **msg.sender** since the current interaction is between SCA (sender) and SCB (receiver), SCA will be the **msg.sender**. As for the origin, SCA won't interact will SCB unless the function **callB** is called, the true caller or origin of the transaction is actually and EOA, **C**, thus in this case the **tx.origin** is **C**&nbsp;  
    &nbsp;  

**Important Note:** Smart Contract an call each other using functions, but the initator or the origin (**tx.origin**) will always be an EOA.&nbsp;  
&nbsp;  

## Foundry : cast call & send


&nbsp; 
```python
    print("this is love")
```