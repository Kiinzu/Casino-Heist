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

}