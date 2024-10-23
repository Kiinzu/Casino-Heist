// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Briefing{
    bytes32 private secretPhrase;
    
    // Solved Tracker
    bool public completedCall;
    bool public completedInputation;
    bool public completedTransfer;
    bool public completedDeposit;
    bool public completedBriefing;

    constructor(bytes32 _secretPhrase){
        secretPhrase = _secretPhrase;
    } 

    function verifyCall() public {
        completedCall = true;
    }

    function putSomething(uint256 _numberInput, string memory _nameInput, address _player) public{
        require(completedCall, "Accept the Call First!");
        require(_player == msg.sender, "player can only register their own address.");
        require(_numberInput == 1337, "Why not 1337?");
        require(keccak256(abi.encodePacked("Casino Heist Player")) == keccak256(abi.encodePacked(_nameInput)),"Join the game?");
        completedInputation = true;
    }

    function firstDeposit() public payable{
        require(completedCall, "Accept the Call First!");
        require(msg.sender == tx.origin, "This Ensure that you are a Human being, not a Contract");
        require(msg.value == 5 ether, "First deposit amount must be 5 ether");
        completedDeposit = true;
    }

    function Finalize(bytes32 _secret) public{
        require(
            completedCall && 
            completedDeposit && 
            completedInputation &&
            completedTransfer, "To Finalize, everything must be completed before!");
        require(msg.sender == tx.origin, "Only EOA is allowed!");
        if(keccak256(abi.encodePacked(secretPhrase)) == keccak256(abi.encodePacked(_secret))){
            completedBriefing = true;
        }
    }

    receive() external payable{
        if(msg.value == 1 ether){
            completedTransfer = true;
        }
    }
}