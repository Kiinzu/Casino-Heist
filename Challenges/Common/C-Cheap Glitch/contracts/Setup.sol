// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Capitol.sol";

contract Setup {
    Capitol public capitol;

    constructor() {
        capitol = new Capitol();
    }

    function isSolved() public view returns(bool){
        return capitol.isRicher();
    }

}