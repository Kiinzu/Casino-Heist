// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./VVVIP.sol";

contract Setup{
    VVVIP public immutable vvvip;
    bool public solved;

    constructor() payable {
        require(msg.value == 15 ether);
        vvvip = new VVVIP();
        vvvip.becomeVVVVIP{value: 3 ether}();
    }

    function TryIfSolve() public payable {
        try vvvip.becomeVVVVIP{value: 10 ether}() {
            (address amIVVVVIP, ) = vvvip.getVVVVIP();
            require(amIVVVVIP != address(this), "You are still VVVIP member!");
            solved = false;
        } catch {
            solved = true;
        }
    }

    function isSolved() public view returns(bool){
        return solved;
    }

    receive() external payable{}

}