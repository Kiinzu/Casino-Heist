// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {InjuBank} from "./InjuBank.sol";

contract Setup {
    InjuBank public immutable IB;

    constructor() payable{
        IB = new InjuBank{value: 50 ether}();
    }

    function isSolved() public view returns(bool){
        return address(IB).balance == 0;
    }
}