// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./InjuBank.sol";

contract InjuCasino{
    InjuBank public injubank;

    address public owner;
    mapping (address => bool) isMember;

    constructor(address payable _bank) payable {
        injubank = InjuBank(_bank);
    }

    function registerMember() public payable{
        require(msg.value == 1 ether, "Pay exactly 1 ETH to become a member.");
        isMember[msg.sender] = true;
    }

    function getSpecialReward() public {
        require(injubank.hasWithdrawed(msg.sender) == true, "Not Currently Withdrawing");
        require(isMember[msg.sender], "Only Registered Casino Member can claim this Special Benefit.");
        uint256 bonusBalance = injubank.balances(msg.sender) * 2;
        (bool success, ) = msg.sender.call{value: bonusBalance}("");
        require(success, "Bonus failed to be sent");
    }


}