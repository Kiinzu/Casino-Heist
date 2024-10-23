// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Singularity{

    mapping(bytes=>uint256) public balanceOf;
    mapping(string=>mapping(string=>address)) public Member;

    constructor() {}

    function getIdentity(string memory _firstName, string memory _lastName) public pure returns(bytes memory){
        return abi.encodePacked(_firstName, _lastName);
    }

    function register(string memory _firstName, string memory _lastName) public payable{
        require(Member[_firstName][_lastName] == address(0), "Already Registered");
        require(msg.value > 0);
        bytes memory code = getIdentity(_firstName, _lastName);
        balanceOf[code] += msg.value;
        Member[_firstName][_lastName] = msg.sender;
    }

    function withdraw(string memory _firstName, string memory _lastName, uint256 _amount) public{
        require(Member[_firstName][_lastName] == msg.sender, "You cannot withraw other people money!");
        bytes memory code = getIdentity(_firstName, _lastName);
        require(balanceOf[code] - _amount >= 0, "You don't have this kind of money!");
        balanceOf[code] -= _amount;
    }   

    function checkBalance(string memory _firstName, string memory _lastName) public view returns(uint256){
        bytes memory code = getIdentity(_firstName, _lastName);
        return balanceOf[code];
    }
}