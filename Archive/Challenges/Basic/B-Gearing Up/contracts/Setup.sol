// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./GearingUp.sol";

contract Setup {
    GearingUp public GU;

    constructor() payable{
        GU = new GearingUp{value: 10 ether}();
    }

    function isSolved() public view returns(bool){
        return GU.allFinished();
    }

}
