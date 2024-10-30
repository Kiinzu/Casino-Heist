// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

contract Blackjack{

    address public dealer;
    bool public playerWon;
    bool public dealerMoved;
    bool public playerMoved;
    bool public dealerWon;

    constructor() payable {
        require(msg.value == 30 ether, "Require 30 Ether to Start the game");
        dealer = msg.sender;
    }

    function playBlackjack(uint256 _choice) public {
        require(dealerWon == false, "Dealer has won the game");
        require(playerWon == false, "You've won the game!");
        uint256 playerCards = 17;
        uint256 dealerCards = 15;
        // You Have the first turn each time, you can choose either pass or draw
        // The dealer will always draw each turn, but... you can stall as long as you want.
        if(_choice == 1 && playerMoved != true){
            playerCards += uint256(keccak256(abi.encodePacked(block.timestamp))) % 10;
            playerMoved = true;
        }else if(_choice == 2 && dealerMoved != true){
            // player pass, but the dealer will draw
            uint256 toAdd = 6;
            dealerCards += toAdd;
            dealerMoved = true;
            dealerWon = true;
        }
        // Transfer all balance if the playerWon
        if(playerCards == 21){
            playerWon = true;
            (bool transfered, ) = payable(msg.sender).call{value: address(this).balance}("");
            require(transfered, "Reward failed to sent");
        }
    }

}