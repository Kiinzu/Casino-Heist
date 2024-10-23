pragma solidity ^0.8.25;

import "./PrizePool.sol";

contract Participant1{
    PrizePoolBattle public immutable prizepool;

    constructor(address _target) payable{
        prizepool = PrizePoolBattle(_target);
        prizepool.addVoter{value: 5 ether}("Michelio");
        prizepool.vote(2);
    }

}

contract Participant2{
    PrizePoolBattle public immutable prizepool;

    constructor(address _target) payable{
        prizepool = PrizePoolBattle(_target);
        prizepool.addVoter{value: 1 ether}("Barnadan");
        prizepool.vote(2);
    }

}

contract Participant3{
    PrizePoolBattle public immutable prizepool;

    constructor(address _target) payable{
        prizepool = PrizePoolBattle(_target);
        prizepool.addVoter{value: 3 ether}("Elizabeth");
        prizepool.vote(2);
    }

}