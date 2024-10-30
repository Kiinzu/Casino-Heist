// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./Roulette.sol";

contract Setup{
    Roulette public roulette;

    constructor() payable {
        roulette = new Roulette{value: 30 ether}();
    }

    function isSolved() public view returns(bool){
        return roulette.stolenEnough();
    }
}