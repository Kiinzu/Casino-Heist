Gearing up for every heist is very important, not only every heist has their own unique problem that you need to tackle, but sometimes doing the work manually won't do the job. So what about creating the perfect tools or assistant for every heist? 

In this lab, you are going to create your first ever exploit contract to solve the lab. what? Kinda confuse how to do it? We'll guide you!

# Creating Your First Project
First of all, we need to setup a new project to create our contract, we are going to use **Foundry - Forge** to create the environment, let's do it by using this command

```bash
forge init heist-exploit 
```

NOTE: You may name the folder however you like!  

after running the command now you'd have a folder structure as such
```text
heist-exploit
├── README.md
├── foundry.toml
├── lib
│   └── forge-std
│       ├── ...
├── script
│   └── Counter.s.sol
├── src
│   └── Counter.sol
└── test
    └── Counter.t.sol
```
It is better to remove the *Counter.s.sol*, *Counter.sol* and *Counter.t.sol*, since we are going to write in these 3 directories. Now that you have the project ready, what we want is to create a new folder in the src called "**gearing-up**", then import the `Setup.sol` and `GearingUp.sol` to the folder and create a new file called `Exploit.sol`.

```text
├── src
│   └── Exploit.sol
│   ├── GearingUp.sol
│   ├── Setup.sol
```

# Writting The Prequisite Exploit
Now that we have everything that we need in the `/src`, we can start writting the code, first of all we want to import the contract that we are going to exploit

```solidity
pragma solidity ^0.8.26;

import "./Setup.sol";
import "./GearingUp.sol";

contract Exploit{

}
```

After we import the contracts, we can now make a variable that will reference to a contract instance, for this we need to know the `Contract Name`, this name is defined after the keyword `contract`. To refet to both `Setup` and `GearingUp` with their respective deployed address we can do this

```solidity

contract Exploit{
    Setup public setup;            // You can do this
    GearingUp public immutable GU; // or this is also fine

    constructor(address _setup) {
        setup = Setup(_setup);
        GU = GearingUp(setup.GU());
    }
}
```

You can see aboce, that we can put the address of `Setup` into the constructor and get the address of `Gearing Up` from calling the `GU()` variable from the Setup contract. If you don't want to do that, you can add another input of address in the constructor to add the `Gearing Up` address just like the setup.

## Writting The Exploit
Now before writting the contract, let's analyze the code, what do we need to make the `Setup::isSolved()` returns true.

1. `GearingUp::callOne()` must be `True`
2. `GearingUp::depositOne()` must be `True`
3. `GearingUp::withdrawOne()` must be `True`
4. `GearingUp::sendData()` must be `True`
5. `GearingUp::allFinished()` must be `True`

The `Gearing Up` contract on deployed has 10 Ether, we can see that on the constructor that it required 10 Ether to be deployed. Now that we know what we've to do, let's start analyze-write the Exploit.

### Calling a Function
We are going to make `GearingUp::callOne()` returns true first, let's see the code

```solidity
    function callThis() public{
        // verify that a smart contract is calling this.
        require(msg.sender != tx.origin);
        callOne = true;
    }
```

It compares the `msg.sender` value with the `tx.origin`, we know from the `briefing` that `msg.sender` can be either EOA or Smart Contract, but tx.origin will always be an EOA, so to solve this we need to call the function using a Smart Contract, in this case our Exploit Contract. We can call the function by implementing this in our Smart Contract

```solidity
function solveGearingUp() public {
    GU.callThis(); // Calling function
}
```

running the `Exploit::solveGearingUp()` will call the `GearingUp::callOne()` returns true now.

## Sending & Receiving Ether 
Smart Contract can also sends another Smart Contract Ether, but do take note that we are doing this with the solidity version of `0.8.0`, in another version a different code need to be implemented such as in `0.6.0`, before going there, let's learn about the 3 ways of transferring Ether in Solidity. We have the `transfer(ether_value)`, `send(ether_value)` and `call(ether_value, data)`. So, what's the difference?
- `transfer`
    `transfer` only use 2300 gas and will throws an error upon failure, however this function is no longer recommended for sending Ether.

    ```solidity
    // 0.8.0
    function sendingEther(address payable _to) public payable{
        _to.transfer(msg.value);
    }
    ```

- `send`
    Just like trasnfer, `send` also has the gas limit of 2300, but it won't revert on failure since it returns bool, so we need to check whether the `send` is successful or not.

    ```solidity
    // 0.8.0
    function sendingEther(address payable _to) public payable{
        (bool sent) = address(_to).sed(msg.value);
        require(sent, "Failed to send Ether!");
    }
    ```

- `call`
    `call` is the by far the most recommended method of transferring Ether. It has No limit on how many gas it uses, but it doesn't revert on failure since it's also return bool.

    ```solidity
    // 0.8.0
    function sendingEther(address payable _to) public payable{
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether!");
    }
    ```

    Here is also an example of the implementation of `call` in the earlier version of `0.6.0`

    ```solidity
    // 0.6.0
    function sendingEther(address payable _to) public payable{
        (bool sent, bytes memory data) = _to.call.value(msg.value)("");
        require(sent, "Failed to send Ether!");
    }
    ```

Let's see what we have to deal to make the `GearingUp::depositOne()` returns true

```solidity
    function sendMoneyHere() public payable{
        require(msg.sender != tx.origin);
        require(msg.value == 5 ether);
        depositOne = true;
    }
```

as usual, the first check always check whether the `msg.sender` is an EOA or not, but the second one ensures that the `msg.value` or the amount of Ether send to the function is `5 Ether`. Let's talk about the word `payable` and how Smart Contract Receive Ether first. There are 2 main ways a Smart Contract can "Receive Ether"
- `payable` function
    We can add the word `payable` at the end of function declaration to make the function able to receive ether, we can see that in the `GearingUp::Constructor()` and `GearingUp::sendMoneyHere()`, with the `payable` function, we can send them some Ether. In REMIX, when compile the GearingUp and deploy it, you will notice that the `Deploy` button and `sendMoneyHere` is Red, indicating that it is a `payable` function. By adding the `payable` function, you also unlock the `msg.value` global attribute- indicating the amount of Ether (in wei) sent with the transaction.
- `receive()` and `fallback()`
    While making your constructor payable only give the contract ability to receive Ether upon deployment, adding `receive()` or `fallback()` allow your contract to be receive Ether at any given moment. However we need to understand the difference between them

    ```text
                                send Ether
                    |
            msg.data is empty?
               /          \
             yes           no
            /               \
     receive() exists?     fallback()
         /     \
        yes     no
       /         \
  receive()   fallback()
  ```
    depends on what your smart contract need, you can either implement one or both of them. Here is the example of implementation
    ```solidity
    receive() external payable{
        // some logic here if needed
    }

    fallback() external payable{
        // some logic here if needed
    }
    ```

Not that we already have the knowledge, let's implement the code to make `GearingUp::depositOne()` and `GearingUp::withdrawOne()` return true.

```solidity
function solveGearingUp() public payable{
    GU.callThis();
    GU.sendMoneyHere{value: msg.value}(); // ensure that msg.value == 5
    GU.withdrawReward(); // Take Reward
}

receive() external payable{}
```

That is one way of sending the Ether since the `GearingUp::sendMoneyHere()` is a payable function, but since our contract didn't have Ether, we need to make `Exploit::solveGearingUp()` become a `payable` function by adding the word `payable` there. If you wish to give the contract some balance first is also fine, we can modify the contract to receive an Ether upon deployment and send the amount later when calling the `solveGearingUp()`

```solidity
contract Exploit{

    constructor(...) payable{
        require(msg.value == 5 ether);
        ...
    }

    function solveGearingUp() public{
        ...
    }
}
```

## Sending Data 
Smart Contract can also be used to send data, just like the function `GearingUp:sendSomeData()`, you are going to send a `string`, `uint256`, `bytes` and `address`, let's see the if logic 

```solidity
    function sendSomeData(string memory password, uint256 code, bytes4 fourBytes, address sender) public{
        if(
            keccak256(abi.encodePacked(password)) == keccak256(abi.encodePacked("GearNumber1")) &&
            code == 687221 &&
            keccak256(abi.encodePacked(fourBytes)) == keccak256(abi.encodePacked(bytes4(0x1a2b3c4d))) &&
            sender == msg.sender
        ){
            sendData = true;
        }
    }
```

you might wonder now why we use hash comparison and why not directly compare the input and the values (bytes and string), well solidity can't do that, hence that logic above is implemented. Okay let's write the code now 

```solidity
function solveGearingUp() public payable{
    GU.callThis();
    GU.sendMoneyHere{value: msg.value}();
    GU.withdrawReward(); 
    // Send the required data
    GU.sendSomeData("GearNumber1", 687221, 0x1a2b3c4d, address(this));
}
```

Oh yeah, the `address(what)` is to fulfill the 4th requirement, since it compares that the value of `address sender` is equal with `msg.sender` (our smart contract), we must put our address there. In another case when you need to parse a payable address, you can use `payabel(address(this))`.

## Finishing Up & Deploying Exploit
Now that we have our Exploit for every function, we just need to call `GearingUp::completedGearing()` to make the `Setup::isSolved()` returns true and solved the lab, here is our final Exploit with the Ether send on Deployment (constructor payable)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Setup.sol";
import "./GearingUp.sol";

contract Exploit{
    Setup public setup;
    GearingUp public immutable GU;

    constructor(address _setup) payable{
        require(msg.value == 5 ether);
        setup = Setup(_setup);
        GU = GearingUp(setup.GU());
    }

    function solveGearingUp() public{
        GU.callThis();
        GU.sendMoneyHere{value: 5 ether}();
        GU.sendSomeData("GearNumber1", 687221, 0x1a2b3c4d, address(this));
        GU.withdrawReward();
        GU.completedGearingUp();
    }

    receive() external payable { }

}
```

To Deploy the Exploit, we can use this command below on the root of your project folder

```bash
forge create src/gearing-up/Exploit.sol:Exploit -r $RPC_URL --private-key $PK --constructor-args $SETUP_ADDR --value 5ether
```
you can adjust the command to you needs, by doing this, we are deploying our contract to the network. You will see `Deployer`, `Deployed To`, and `Transaction Hash`, your contract is now deployed with an address of `Deployed To`. To finish up and solve the Lab, let's call our `solveGearingUp()`

```bash
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "solveGearingUp()"
```
And Congratulations! You just Solved Gearing Up and Ready to begin the Real HEIST!

