// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Blackjack.sol";

contract Setup {
    Blackjack public blackjack;
    bool private solved;

    constructor() payable {
        require(msg.value == 30 ether, "Require 30 Ether to Deploy.");
        blackjack = new Blackjack{value: 30 ether}();
    }

    function isSolved() external view returns (bool) {
        return blackjack.playerWon();
    }
}