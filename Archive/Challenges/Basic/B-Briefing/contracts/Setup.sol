// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./Briefing.sol";

contract Setup{
    Briefing public brief;

    constructor(bytes32 _secretPhrase) payable{
        brief = new Briefing(_secretPhrase);
    }

    function isSolved() public view returns(bool){
        return brief.completedBriefing();
    }

}