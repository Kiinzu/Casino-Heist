// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Singularity.sol";

contract Setup{
    Singularity public singular;

    constructor() payable{
        singular = new Singularity();
        singular.register{value: 20 ether}("Hubert", "Gallanghar");
    }

    function isSolved() public view returns(bool){
        return singular.checkBalance("Hubert", "Gallanghar") == 0;
    }

}