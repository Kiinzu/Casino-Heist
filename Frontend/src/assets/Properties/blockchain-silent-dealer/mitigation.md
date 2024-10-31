The Silent Dealer *walkAway()* allow you to specify the target with *_to* and the value of the raw data with *data*, this could be dangerous as attacker could make a function call to a specific contract there. The easiest mitigation for this and actually one of the best practices out there, is just to not specity the *_to*, but if it required, we need to make sure that the raw data is empty or just *""*, let's fix the contract! &nbsp;  
&nbsp;  
```solidity
// Unsafe
function walkAway(address _to, uint256 amount, bytes memory data) public {
    (bool success, ) = _to.call{value: amount}(data);
    require(success, "Transfer failed.");
}

// Mitigated
function walkAway(uint256 amount) public {
    require(address(this).balance >= amount, "Insufficient balance.");

    // Send funds only to the caller to prevent misuse
    // Ensure that data is not from input, set to empty
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed.");
}
```
&nbsp;  
This mitigation prevent *Arbitrary Execution* because we remove the *raw bytes* input to the call, and by making the *_to* gone and changed it to *msg.sender* we ensure that it can only make calls to the right *msg.sender*.