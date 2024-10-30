// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./NewBank.sol";

contract Setup{
    NewBank public NB;
    address public player;

    constructor(uint256 _initialSupply) {
        NB = new NewBank(_initialSupply);
    }

    function setPlayer() public{
        require(msg.sender == tx.origin, "Only Human are allowed to be Player");
        player = msg.sender;
    }

    function isSolved() public view returns(bool){
        return NB.balanceOf(player) > 10 ether;
    }
}