The problem with the contract is present due to not following the best practice of CEI in *Administrator.sol::proofNobiliy()*, &nbsp;  
&nbsp;  

```solidity
function proofNobility() public payable{
    // CHECK
    require(msg.value == fee, "The Fee, you must pay it!");
    require(joined[msg.sender] == false, "You are one of them already!");
    // INTERACTION
    noble.mintNobility(msg.sender);
    // EFFECT
    joined[msg.sender] = true;
}
```
&nbsp;  
So, the easiest mitigation that we can provide to our "client" here is to modify the code to follow the **CEI** pattern correctly. To add additional security, we can also use *Openzeppelin Library*, especially the *ReentrancyGuard.sol*, you can find the contract [here](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol) or you can look it directly in your *@openzeppelin/contracts/security/ReentrancyGuard.sol*. Let's try to implement both in this mitigation &nbsp;  
&nbsp;  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Noble.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // Using ReentrancyGuard.sol

contract Administrator is ReentrancyGuard{

    Noble public noble;

    bool public trueNoble;
    uint256 public fee;
    address public owner;

    mapping(address => bool) public joined;

    constructor(address _noble, uint256 _fee) {
        owner = msg.sender;
        noble = Noble(_noble);
        fee = _fee;
    }

    // Due to Administrator inheriting the attribute of ReentrancyGuard.sol
    // Now it has the modifier "nonReentrant", this modifier will ensure that
    // there is no nested calls to the function that use this modifier
    function proofNobility() public payable nonReentrant{
        // Correcting the pattern to CEI
        // CHECK
        require(msg.value == fee, "The Fee, you must pay it!");
        require(joined[msg.sender] == false, "You are one of them already!");
        
        // EFFECT
        joined[msg.sender] = true; 
        
        // INTERACTION
        noble.mintNobility(msg.sender);
    }

    function isTrueNoble() public{
        require(joined[msg.sender] == true, "Must be at least Noble!");
        if(noble.getNobilityInPossession(msg.sender) == 10){
            trueNoble = true;
        }
    }

}
```
&nbsp;  
If you are interested to learn more about reentrancy and alternatives way to defend your contract against it, you can check the blog post made by Openzeppelin in the link below &nbsp;  
&nbsp;  

- https://blog.openzeppelin.com/reentrancy-after-istanbul