// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "./EntryPoint.sol";

contract Setup{
    EntryPoint public EP;

    constructor() {
        EP = new EntryPoint();
    }

    function isSolved() public view returns(bool){
        return EP.entered();
    }

}