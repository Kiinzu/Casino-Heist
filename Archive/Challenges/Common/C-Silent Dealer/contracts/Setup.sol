// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Dealer.sol";

contract Setup{
    Dealer public dealer;

    constructor() payable{
        dealer = new Dealer();
        dealer.joinGame{value: 50 ether}();
    }

    function isSolved() public view returns(bool){
        return address(dealer).balance == 0 && dealer.owner() != address(this);
    }

}