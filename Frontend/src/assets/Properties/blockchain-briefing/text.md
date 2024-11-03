Briefing is the starting point of your long jounery in Casino Heist, we will walk you through the basic of the smart contract and how do you interact with it using Tools that are design for it. With that being said, we do recommend you to have at least the prequisite of:  
&nbsp;  

- How the Blockchain works
- Smart Contract Basic  
&nbsp;  

Now let's see what we can do to tackle the *Briefing*!

## 1. Setup your tools
Like always, we need to setup before doing anything, hence the challenge name *Briefing*. There are 2 things that will be our main tools for the time being, they are: &nbsp;  
&nbsp;  

- [REMIX IDE](https://remix.ethereum.org/)&nbsp;  
    REMIX is a web-based IDE for EVM (Ethereum Virtual Machine) Smart Contract such as Solidity, Vyper, and Cairo. You can access the IDE directly by clicking the "REMIX IDE" above.&nbsp;  
    &nbsp;  
- [Foundry](https://book.getfoundry.sh/)&nbsp;  
    Foundry is a smart contract development toolchain, it manages your dependencies, compiles your project, run tests, deploys, and lets you interact with the chain from the command-line and via Solidity script. To install it you can go [here](https://book.getfoundry.sh/getting-started/installation) and follow the guide.&nbsp;  
&nbsp;  

To solve *Briefing*, we will utilize both tools that you just discover, we will use REMIX to see what the contract could do and use Foundry to interact with the real deployed contract on the private blockchain.&nbsp;  

## 2. Transaction
A way of communicating in the blockchain is through transaction, we can categorize them by this three different transaction &nbsp;  
- *Transaction with/without Ether*&nbsp;  
    Transasction in blockchain may include transferring Ether to a Smart Contract or an EOA, but we can also do a transaction that doesn't have any Ether, such as calling a function.&nbsp;  
    &nbsp;  
    EOA by default has the ability to receive Ether, but Smart Contract doesn't. A Smart Contract can only receive Ether when they implemented either *receive()* or *fallback()* special methods.&nbsp;  
    &nbsp;  
- *Transaction with/without Data*&nbsp;  
    Like all programming language, some function might require an input like *uint256*, *address*, *bytes32*, etc. Keep in mind that not all function require an input to call them, some might just need to be called without any value, some might require value and Ether, and some only Ether and data.&nbsp;  
    &nbsp;  
    Transaction that require a data and or some value, usually meant to execute some logic from a function and changing the state of the Smart Contract.&nbsp;  
    &nbsp;  
- *Transaction between/to EOA (External Owned Account)/Smart Contract*&nbsp;  
    We know that we can directly send a transaction to either an EOA or a Smart Contract, but one thing to understand here, in Solidity we have special variables that has a type of *address* called *msg.sender* and *tx.origin*.&nbsp;  
    &nbsp;  
    - *msg.sender*&nbsp;  
        This variable allow a smart contract to recognize who is currently interacting with it, for example let's say we have 2 Smart Contract called *SCA* and *SCB*. When SCA send a Transaction to SCB, SCB recognize SCA as the *msg.sender*.&nbsp;  
        &nbsp;  
    - *tx.origin*   
        This variable allow a smart contract to recognize the *origin* or the *initiator* of the transaction, let's see the example that use 2 Smart Contract (SCA & SCB) and an EOA *C*.&nbsp;  
        &nbsp;  
        In SCA exist a function that will send a call a function in SCB- let's call it *function callB()*, when *C* trigger the function *callB()* from Smart Contract A, SCB will be called and it will have the following value, for *msg.sender* since the current interaction is between SCA (sender) and SCB (receiver), SCA will be the *msg.sender*. As for the origin, SCA won't interact will SCB unless the function *callB* is called, the true caller or origin of the transaction is actually and EOA, *C*, thus in this case the *tx.origin* is *C*&nbsp;  
    &nbsp;  

*Important Note:* Smart Contract can call each other using functions, but the initator or the origin (*tx.origin*) will always be an EOA.&nbsp;  
&nbsp;  

## 3. Foundry : cast call & send
In this introduction, we will try to work with the most basic Foundry Cast command, which is *cast call* and *cast send*, now that you've already learned about *Transaction*, this part would be less confusing. Every Smart Contract has their own State, this State meaning that there is a variable value that is saved in the EVM, changing the state would require you to send either Value or Data. &nbsp;  
&nbsp;  
- *cast call*&nbsp;  
    *cast call* is used when we want to make a *Read-Only Interaction*, in other word this command is used when you need to interact with the contract wihout changing the state of the contract, like viewing the current state value. We use this command mostly when we want to itneract with a function that has *view* or *pure*.&nbsp;  
    &nbsp;  
    In the *Briefing.sol* you can see that there are a lot of variables and functions. Function that has visibility of *public* and *external* can be called by us, this is the same for variables, the only difference is variables only has either *public* or *private*. Have you tried to spawn the instance? If not please do so, because we are going to the *Hands-on* now! First thing first, we will see the *Setup.sol*.&nbsp;  
    &nbsp;  
    There you can see that we deploy a new contract which address is stored on the variable *brief*, that is the *Briefing.sol* contract, that's the contract that we want to interact with. To get its Address, we can use the command below:&nbsp;  
    &nbsp;  
    ```text
    cast call -r $RPC_URL $SetupADDR "brief()"
    ```
    &nbsp;  
    You will get a return of 32 bytes, 20 bytes is the real address while the rest is just a padding to fulfill the 32 bytes standard of a SLOT, we will talk about this later in this same challenge.&nbsp; 
    Now that we have the address of *Briefing Contract*, we can then interact with anything inside it, like its Functions and Variables, let's try calling a variable and see its value, let's call *completedCall*, &nbsp;  
    &nbsp; 
    ```text
    cast call -r $RP_URL $BriefADDR "completedCall()"
    ```
    &nbsp;  
    The return value of it will always be hex, you can easily translate it to human readable using tools like Cyberchef, etc.&nbsp;   
    &nbsp; 
- *cast send* &nbsp;  
    Unlike the command the we've learned before, cast send are often use when we want to make a change in the state of the contract, like changing the value, sending Ether, etc.&nbsp; 
    Now let's solve 4 of the 5 functions to complete the *Briefing*, first we are going to solve the *verifyCall()* since it is required by all the function below it, since it doesn't require any input, we can just simply call the function&nbsp;  
    &nbsp; 

    ```text
    cast send -r $RPC_URL --private-key $PK $BriefADDR "verifyCall()"
    ```
    &nbsp;  
    The 2nd objective is the *putSomething(uint256,string,address)*, in this function we are required to provide a correct answer, for the first one we need to put *1337* as you can see in the *require()* built-in function, the second value that we need is a string of *"Casino Heist Player"*, unlike in some programming language, solidity cannot compare a literal string, rather it can only compare the value of an hash like *keccak256* The last thing we need is the address of *_player* which in this case is compared to the *msg.sender*, we can actually use a smart contract for this since there is no validation against it, but let's use our own address which is the *wallet* for this challenge.&nbsp;  
    &nbsp; 

    ```text
    cast send -r $RPC_URL --private-key $PK $BriefADDR "putSomething(uint256,string,address)" 1337 "Casino Heist Player" $WalletADDR
    ```
    &nbsp;  
    The 3rd objective is  *firstDeposit()*, this function doesn't require any input, rather it required you to send *5 Ether* to it, there is also a validation which validate the *msg.sender == tx.origin* this is a validation that force the sender to be from an EOA account, since the interactor and the origin must be the same. The next validation is the *msg.value*, this special global variable will refer to the amount of ether you send in the transaction. Now that we understand the code a bit better, let's try to solve it&nbsp;  
    &nbsp; 
    ```text
    cast send -r $RPC_URL --private-key $PK $BriefADDR "firstDeposit()" --value 5ether
    ```
    &nbsp;  
    The 4th objective that we are going to cover in this section is sending an ether by triggering the special function *receive() external payable{}*. In Solidity 0.8.0, a Smart Contract can receive an ether by implementing the special function of either *receive()* or *fallback()*, they might look alike but we will dive to it deeper in the following challenges. So now how do we send the Ether without specifying the function since both *receive()* and *fallback()* are not callable? The Answer is easy, we don't.&nbsp;  
    &nbsp; 
    ```text
    cast send -r $RPC_URL --private-key $PK $BriefADDR --value 1ether
    ```
    &nbsp;  
    How can this be done? by not providing a function that we want to call, but we are sending some ether, the smart contract will first verify if it can receive ether or not by verify if it has a special function or not, once it verify that it can receive ether, the *receive() external payable{}* in this case, will be the one responsible to receive the ether.&nbsp; 
    &nbsp; 

## 4. Storage in Solidity
Storage, let's learn how solidity store their variable valus. Solidity Storage is known for its SLOT, every SLOT is a 32-bytes long, for each data-type here is the slot required to save them.&nbsp;  
&nbsp;  
- *Address* - 20 bytes
- *uintX* - X/8 bytes
        examples:
        -> uint256 - 32 bytes
        -> uint32 - 4 bytes
- *bytesX* - X bytes
examples:
-> bytes32 - 32 bytes
-> bytes4 - 4 bytes
- *bool* - 1 byte
- *string* - based on the size in bytes
- *array* - based on the data type it stores &nbsp;  
&nbsp;  
Let's take a look at this example of code &nbsp;  
&nbsp;  
```solidity
pragma solidity ^0.8.25;

    contract StorageExample{
        uint256 public number_one;
        uint32 public number_two;
        bytes4 public bytes_one;
        address public owner;
        bool public solved;
        uint256 public number_three;
        address public immutable player;
    }
```
&nbsp;  
The translation for the code above is as follows&nbsp;  
&nbsp; 
```text
SLOT 1| number_one (32 bytes)
SLOT 2| number_two (4 bytes) | bytes_one (4 bytes) | address (20 bytes) | solved (1 bytes) | empty (3 bytes)
SLOT 3| number_three (32 bytes)
```
&nbsp;  
Right now, you maybe have these questions &nbsp;  
&nbsp;  
- Why can't *number_three* be stored 3 bytes on the SLOT 2 and the remaining bytes on SLOT 3?&nbsp;  
The rules of the solidity storage system, prevent this type of storage, a storage that is reserved or required for a certain type of variable is absolute and cannot be divided.&nbsp;  
    &nbsp;  

- Why the address public immutable player is not stored on the Storage?&nbsp;  
Both constant and immutable; a variable that is always has the same value and cannot be changed, are stored in the contract bytecode instead of the EVM Storage.&nbsp;  
    &nbsp;  

Now that you have learned how storage works in Solidity, let's put this in mind...&nbsp; 
*EVERYTHING IN BLOCKCHAIN IS PUBLIC, NO VARIABLE IS TRULY PRIVATE*&nbsp; 
&nbsp; 
## 5. Reading a Storage Variable (cast storage)
Now that we know that nothing is private in the blockchain and how storage works in solidity, we can try to get the answer that we need to solve the *Finalize()*, the *secretPhrase*.&nbsp; 
So, how can we get the location for *secretPhrase*? You have to count it! Just kidding, we can do that too, but there is more easy way to do it, there are several ways,&nbsp;  
&nbsp; 
- *solc* &nbsp;  
    We can use solc to figure out the contract by providing the contract and using the *--storage-layout* command,&nbsp;  
    &nbsp; 
    ```text
    solc --storage-layout
    ```
    &nbsp; 
- *REMIX IDE* &nbsp;  
    We can also use REMIX to figure out the full storage layout of the contract, simply just compile the contract and choose the *Compilation Detail*, under the storage layout you will find the full layout of the contract storage.&nbsp;  
    &nbsp; 

We are going you to do this on your own and figure out the storage slot, after you have figured out the SLOT, this command will help you to fetch that storage value&nbsp;  
&nbsp; 
```text
cast storage -r $RPC_URL $BriefADDR $StorageSLOT
```
&nbsp;  
If you want to read more about storage and how to calculate the location of a specific storage location, you can try to read this documentation from solidity [here](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)&nbsp; 
&nbsp; 

## 6. What to do Next?
Now that you've learned all the prerequisites for solving the challenge and the basic of Smart Contract, go ahead and solve the challenge!&nbsp; 
&nbsp; 