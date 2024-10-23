// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./CasinoVault.sol";

contract Setup{
    CasinoVault public CS;

    constructor() payable{
        CS = new CasinoVault{value: 50 ether}();
    }

    function isSolved() public view returns(bool){
        return address(CS).balance == 0;
    }

}