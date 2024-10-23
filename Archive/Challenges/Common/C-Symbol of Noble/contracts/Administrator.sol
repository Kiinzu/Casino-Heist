// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Noble.sol";

contract Administrator{

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

    function proofNobility() public payable{
        require(msg.value == fee, "The Fee, you must pay it!");
        require(joined[msg.sender] == false, "You are one of them already!");
        noble.mintNobility(msg.sender);
        joined[msg.sender] = true;
    }

    function isTrueNoble() public{
        require(joined[msg.sender] == true, "Must be at least Noble!");
        if(noble.getNobilityInPossession(msg.sender) == 10){
            trueNoble = true;
        }
    }

}