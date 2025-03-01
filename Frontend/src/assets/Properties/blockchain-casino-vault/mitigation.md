In the heist you just did, you discovered a vulnerability of *delegatecall* because we can put the *address* of our own contract and put some *raw data* to be executed there. We can then just create an exploit contract that changes the state of the value in *SLOT 1*, where the *owner* resides, and takes over the contract. This can be mitigated by adding a simple whitelist to the contract, such as this. &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CasinoVault {
    address public owner;
    mapping(address => bool) public whitelist; // Whitelist for authorized logic contracts

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() payable {
        owner = msg.sender;
    }

    // Add an address to the whitelist (only the owner can do this)
    function addToWhitelist(address _logicContract) external onlyOwner {
        whitelist[_logicContract] = true;
    }

    // Remove an address from the whitelist
    function removeFromWhitelist(address _logicContract) external onlyOwner {
        whitelist[_logicContract] = false;
    }

    // Verifies identity with only whitelisted logic contracts
    function verifyIdentity(address _identity, bytes memory data) public {
        require(whitelist[_identity], "Unauthorized logic contract"); // Whitelist check

        (bool success, ) = _identity.delegatecall(data);
        require(success, "Verifying failed");
    }

    // Withdraw function restricted to the owner
    function withdraw() public onlyOwner {
        (bool transferred, ) = payable(owner).call{value: address(this).balance}("");
        require(transferred, "Withdrawal failed!");
    }

    receive() external payable {}
}
```
&nbsp;  
With the mitigated contract, now we check the *owner* by a modifier called *onlyOwner()* and make sure that only the owner can register an address on the *whitelist*. Plus, we add a check on *verifyIdentity()* to check whether the *address* input is whitelisted.