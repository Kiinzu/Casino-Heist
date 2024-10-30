Based on the Heist you just did, you must have already noticed that the problem was the incorrect CEI Implementation

```solidity
function withdraw(uint256 _amount) public{
    // CHECK
    require(_amount <= balanceOf[msg.sender], "Amount to Withdraw exceed Balance");
    require(_amount >= 1 ether, "Minimum Withdrawal is 1 Ether");
    // INTERACTIONS
    uint256 newBalance = balanceOf[msg.sender] - _amount;
    (bool sent, ) = msg.sender.call{value: _amount}("");
    require(sent, "Withdrawal Failed!");
    //EFFECT
    balanceOf[msg.sender] = newBalance;
}
```

The first easily mitigation for this problem is implmeneting the correct CEI pattern, so it would prevent reentrancy because the balance is being set before sending the actual Ether

```solidity
function withdraw(uint256 _amount) public{
    // CHECK
    require(_amount <= balanceOf[msg.sender], "Amount to Withdraw exceed Balance");
    require(_amount >= 1 ether, "Minimum Withdrawal is 1 Ether");
    //EFFECT
    uint256 newBalance = balanceOf[msg.sender] - _amount;
    balanceOf[msg.sender] = newBalance;
    // INTERACTIONS
    (bool sent, ) = msg.sender.call{value: _amount}("");
    require(sent, "Withdrawal Failed!");
}
```

We can add an extra layer of protection by using `Openzeppelin's Library` especially the `ReentrancyGuard.sol`, you can find the contract [here](import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // Using ReentrancyGuard.sol). How it works is basically make sure that there is no recursive call to the function that being protected when an unfinished call is happening, and here is how we can implement it

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // Using ReentrancyGuard.sol

contract InjuBank is ReentrancyGuard{

    mapping(address => uint256) public balanceOf;

    constructor() payable{}

    function deposit() public payable{
        require(msg.value > 1 ether, "Minimum Deposit is 1 ether");
        uint256 toAdd = msg.value;
        balanceOf[msg.sender] += toAdd;
    }


    // Due to Administrator inheriting the attribute of ReentrancyGuard.sol
    // Now it has the modifier "nonReentrant", this modifier will ensure that
    // there is no nested calls to the function that use this modifier
    function withdraw(uint256 _amount) public nonReentrant{
        // CHECK
        require(_amount <= balanceOf[msg.sender], "Amount to Withdraw exceed Balance");
        require(_amount >= 1 ether, "Minimum Withdrawal is 1 Ether");
        //EFFECT
        uint256 newBalance = balanceOf[msg.sender] - _amount;
        balanceOf[msg.sender] = newBalance;
        // INTERACTIONS
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Withdrawal Failed!");
    }

    receive() external payable { 
        deposit();
    }

}
```

With the fix we've done above, the mitigated contract should be secure now!