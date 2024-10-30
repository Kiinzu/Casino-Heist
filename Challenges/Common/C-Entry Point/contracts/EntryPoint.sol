// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract EntryPoint{

    uint256 public constant TOKENS_PER_ETHER = 0.1910191 ether;
    bool public entered;
    mapping(address => uint256) public ownedCoin;

    // The Casino is not open for everyone, only those who have at least a coin can enter.
    function getCoin() public payable{
        require(msg.value > 0, "Must send ether to receive tokens");
        require(msg.value > 7000 wei && msg.value < 8000, "7 is not a lucky number here");
        uint256 coins = (msg.value * TOKENS_PER_ETHER) / 1 ether;
        if(coins == 1367){
            ownedCoin[msg.sender] += coins;
            entered = true;
        }
    }

    receive() external payable{}

} 