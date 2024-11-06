Now that you've successfully completed the heist, we will learn how to fix the problem that you just encountered. First of all, we notice that the contract is already using Solidity version *0.8.26* and can be compiled with the latest version, so the version here is not the problem; the problem seems to lie in the *unchecked*, and let's add some more check &nbsp;  
&nbsp;  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Capitol{
    
    bool public isRicher;
    address public owner;
    mapping(address => uint256) public balanceOf;

    constructor() {
        owner = msg.sender;
        balanceOf[owner] = 1_000_000_000 ether;
    }

    function depositCredit(uint256 _amount) public payable{
        require(_amount > 1 ether, "Minimum deposit is 1 ether");
        require(msg.value == _amount, "There seems to be a mismatch!");
        // Remove the unchecked{}
        balanceOf[msg.sender] += _amount;
    }

    function withdrawCredit(uint256 _amount) public{
        require(_amount > 0, "Must be greater than zero!");
        require(balanceOf[msg.sender] - _amount >= 0, "You don't have this kind of money");
        // Remove the unchecked{}
        balanceOf[msg.sender] -= _amount;
    }

    function richerThanOwner() public{
        // The Casino is Not that stupid, they know that the balance beyond that is CHEATING!
        if(balanceOf[msg.sender] < 10_000_000_000_000 ether && balanceOf[msg.sender] > balanceOf[owner]){
            isRicher = true;
        }
    }
}
```
&nbsp;  
The mitigation above seems enough to fix the vulnerability. There is also another way to make the operation more secure; we can use *OpenZeppelin's SafeMath* library. Here is a little example for the *depositCredit()* function that also uses the *SafeMath* library. &nbsp;  
&nbsp;  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Capitol {
    using SafeMath for uint256;  // Use SafeMath for uint256 operations

    bool public isRicher;
    address public owner;
    mapping(address => uint256) public balanceOf;

    constructor() {
        owner = msg.sender;
        balanceOf[owner] = 1_000_000_000 ether;
    }

    function depositCredit(uint256 _amount) public payable {
        require(_amount > 1 ether, "Minimum deposit is 1 ether");
        require(msg.value == _amount, "There seems to be a mismatch!");
        // SafeMath addition
        balanceOf[msg.sender] = balanceOf[msg.sender].add(_amount);
    }

    function withdrawCredit(uint256 _amount) public {
        require(_amount > 0, "Must be greater than zero!");
        require(balanceOf[msg.sender] >= _amount, "Insufficient balance!");
        // SafeMath subtraction
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_amount);
    }

    function richerThanOwner() public {
        require(
            balanceOf[msg.sender] < 10_000_000_000_000 ether,
            "Invalid balance, suspicious activity!"
        );

        if (balanceOf[msg.sender] > balanceOf[owner]) {
            isRicher = true;
        }
    }
}
```

