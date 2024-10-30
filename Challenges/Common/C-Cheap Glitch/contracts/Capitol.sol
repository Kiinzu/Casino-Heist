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
        unchecked{
            balanceOf[msg.sender] += _amount;
        }
    }

    function withdrawCredit(uint256 _amount) public{
        require(_amount > 0, "Must be greater than zero!");
        unchecked{
            balanceOf[msg.sender] -= _amount;
        }
    }

    function richerThanOwner() public{
        // The Casino is Not that stupid, they know that the balance beyond that is CHEATING!
        if(balanceOf[msg.sender] < 10_000_000_000_000 ether && balanceOf[msg.sender] > balanceOf[owner]){
            isRicher = true;
        }
    }
}
