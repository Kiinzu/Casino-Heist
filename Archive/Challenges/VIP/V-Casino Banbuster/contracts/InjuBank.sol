// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract InjuBank{
    address public owner;
    mapping(address => bool) public hasWithdrawed;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
    }

    // You Can Deposit ETH to get the equal amount of Inju
    function deposit(uint256 _amount) public payable{
        require(_amount == msg.value, "There seem some mismatch between the input and actual deposit.");
        uint256 depositAmount = msg.value;
        hasWithdrawed[msg.sender] = false;
        balances[msg.sender] += depositAmount;
    }

    // You can Withdraw your Inju back to your ETH
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "You don't have such money!");
        // Tell the bank you withdrawed some money
        hasWithdrawed[msg.sender] = true;
        uint256 newBalance = balances[msg.sender] - _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Sent Failed!");
        hasWithdrawed[msg.sender] = false; // Reset to basic
        balances[msg.sender] = newBalance;
    }

    // The Receive prevent you from accidentally Sending Random ETH
    // It will automatically Deposit the sent Ether
    receive() external payable { 
        deposit(msg.value);
    }

}