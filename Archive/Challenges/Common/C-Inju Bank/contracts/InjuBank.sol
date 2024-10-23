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