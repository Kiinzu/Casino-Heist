// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./InjuBank.sol";
import "./InjuCasino.sol";

contract Setup{
    InjuBank public immutable ibank;
    InjuCasino public immutable icasino;

    constructor() payable{
        ibank = new InjuBank();
        icasino = new InjuCasino{value: 30 ether}(payable(address(ibank)));
    }

    function isSolved() public view returns(bool){
        return address(icasino).balance <= 20 ether;
    }

}