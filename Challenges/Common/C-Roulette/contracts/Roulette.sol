// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Roulette{

    bool public stolenEnough = false;
    mapping(address => uint) public wonRoulette;

    modifier _kickedOut(){
        require(wonRoulette[msg.sender] <= 100, "You've stolen enough, get out!");
        _;
    }

    modifier _hasStolenEnough(){
        _;
        if(address(msg.sender).balance > 20 ether){
            stolenEnough = true;
        }
    }

    constructor() payable {}

    function randomGenerator() internal view returns(uint256){
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 100;
    }

    function biggerRandomGenerator() internal view returns(uint256){
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 10000000;
    }

    function playRoulette(uint256 _guess) public _kickedOut{
        require(wonRoulette[msg.sender] < 5, "You cannot play this game again!");
        uint256 playerGuess = _guess;
        uint256 randomNumber = randomGenerator();
        if(randomNumber == playerGuess){
            wonRoulette[msg.sender]++;
            (bool winningMoney, ) = msg.sender.call{value: 1 ether}("");
            require(winningMoney, "Fail to claim winning money");
        }
    }

    function playBiggerRoulette(uint256 _guess) public _kickedOut _hasStolenEnough{
        require(wonRoulette[msg.sender] >= 5, "You haven't met the requirement to play the game!");
        uint256 playerGuess = _guess;
        uint256 randomNumber = biggerRandomGenerator();
        if(randomNumber == playerGuess){
            wonRoulette[msg.sender] += 50;
            (bool winningMoney, ) = msg.sender.call{value: 10 ether}("");
            require(winningMoney, "Fail to claim winning money");
        }
    }
    
}