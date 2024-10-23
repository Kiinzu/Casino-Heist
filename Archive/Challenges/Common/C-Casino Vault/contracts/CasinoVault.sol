// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CasinoVault {
    address public gameLogic;
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    function verifyIdentity(address _identity, bytes memory data) public {
        (bool success, ) = _identity.delegatecall(data);
        require(success, "Verifying failed");
    }

    function withdraw() public {
        require(msg.sender == owner, "Not the owner");
        (bool transfered, ) = payable(owner).call{value: address(this).balance}("");
        require(transfered, "Withdrawal Failed!");
    }

    receive() external payable {}
    
}