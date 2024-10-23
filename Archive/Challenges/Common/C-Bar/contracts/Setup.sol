pragma solidity ^0.8.25;

import "./Bar.sol";

contract Setup{
    Bar public immutable bar;
    bool public playerSolved;

    constructor() payable{
        bar = new Bar();
    }

    function solvedByPlayer() public {
        playerSolved = bar.beerGlass(msg.sender) >= 1 ? true : false;
    }

    function isSolved() public view returns(bool){
        return playerSolved;
    }

}