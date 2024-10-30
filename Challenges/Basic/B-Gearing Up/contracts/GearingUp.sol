// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract GearingUp{

    bool public callOne;
    bool public depositOne;
    bool public withdrawOne;
    bool public sendData;
    bool public allFinished;

    constructor() payable{
        require(msg.value == 10 ether);
    }

    function callThis() public{
        // verify that a smart contract is calling this.
        require(msg.sender != tx.origin);
        callOne = true;
    }

    function sendMoneyHere() public payable{
        require(msg.sender != tx.origin);
        require(msg.value == 5 ether);
        depositOne = true;
    }

    function withdrawReward() public{
        require(msg.sender != tx.origin);
        (bool transfered, ) = msg.sender.call{value: 5 ether}("");
        require(transfered, "Failed to Send Reward!");
        withdrawOne = true;
    }

    function sendSomeData(string memory password, uint256 code, bytes4 fourBytes, address sender) public{
        if(
            keccak256(abi.encodePacked(password)) == keccak256(abi.encodePacked("GearNumber1")) &&
            code == 687221 &&
            keccak256(abi.encodePacked(fourBytes)) == keccak256(abi.encodePacked(bytes4(0x1a2b3c4d))) &&
            sender == msg.sender
        ){
            sendData = true;
        }
    }

    function completedGearingUp() public{
        if(
            callOne == true &&
            depositOne == true &&
            withdrawOne == true &&
            sendData == true
        ){
            allFinished = true;
        }
    }

}