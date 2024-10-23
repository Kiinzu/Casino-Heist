pragma solidity ^0.8.25;

import "./PrizePool.sol";
import "./Participants.sol";

contract Setup{
    PrizePoolBattle public immutable prizepool;
    Participant1 public immutable participant1;
    Participant2 public immutable participant2;
    Participant3 public immutable participant3;


    constructor() payable{
        require(msg.value >= 9 ether, "Need 9 ether to start challenge");
        prizepool = new PrizePoolBattle();
        participant1 = new Participant1{value: 5 ether}(address(prizepool));
        participant2 = new Participant2{value: 1 ether}(address(prizepool));
        participant3 = new Participant3{value: 3 ether}(address(prizepool));
    }

    function isSolved() public view returns(bool){
        (, uint winner) = prizepool.getWinner();
        return winner == 1;
    }

}