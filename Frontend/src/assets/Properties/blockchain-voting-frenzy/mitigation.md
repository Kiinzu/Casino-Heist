The mistake here lies in the *PrizePool.sol::vote()*, where the status of the voted id *voted* is assigned to *false* even after voting, which it should've been changed to *true`*. This small mistake could lead us to vote as much as wen want, in this case-- enough to make ENUMA won the Voting. To mitigate it we can update the function to this &nbsp;  
&nbsp;  
```solidity
function vote(uint _candidateId) public checkWinner(_candidateId) {
    require(votersExist[msg.sender], "You are not an eligible voter.");
    require(!winnerDeclared, "The winner has already been declared.");
    require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
    uint id = votersID[msg.sender];
    require(voters[id].voted == false, "You already vote!");
    voters[id].voted = true; // update it to true
    candidates[_candidateId].voteCount += voters[id].weight * 1;
    emit Voted(msg.sender, _candidateId);
}
```
&nbsp;  
This mitigation esnure that once the function is called by someone and that individual haven't voted yet, it change the *voters[id].voted* to become true, to prevent that individual submit another vote. With this the smart contract should be secure!