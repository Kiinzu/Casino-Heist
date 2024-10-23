// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Dealer{
    bool public readyToRig;
    address public owner;
    uint256 public rewardPool;
    mapping(address => uint256) public balanceOf;

    constructor() payable{
        owner = msg.sender;
    }

    function joinGame() public payable{
        require(msg.value >= 5 ether, "Must Deposit Minimum of 5 Ether!");
        balanceOf[msg.sender] += msg.value;
    }

    function bet(uint256 _amount) public{
        require(balanceOf[msg.sender] >= 5 ether, "Need 5 Ether to bet");
        require(_amount >= 2 ether, "Start with 2");
        rewardPool += balanceOf[owner];
        balanceOf[owner] = 0;
        rewardPool += _amount;
        balanceOf[msg.sender] -= _amount;
        readyToRig = true;
    }

    function startRiggedBet() public onlyOwner{
        require(readyToRig == true, "Pool is not filled!");
        balanceOf[owner] += rewardPool;
        rewardPool = 0;
        readyToRig = false;
    }

    function endWholeGame() public onlyOwner{
        uint256 toSend = balanceOf[owner];
        (bool sent, ) = owner.call{value: toSend}("");
        require(sent, "Ending Game Failed!");
    }

    function walkAway(address _to, bytes memory message) public {
        require(readyToRig == true, "You want to wal away empty handed?");
        uint256 leftAmount = balanceOf[msg.sender];
        balanceOf[msg.sender] -= leftAmount;
        (bool sent, ) = _to.call{value: leftAmount}(message);
        require(sent, "You can't run it seems.");
    }

    function changeOwner(address _newOwner) public payable{
        require(msg.sender == address(this), "Only Dealer can change owner");
        owner = _newOwner;
        balanceOf[owner] += msg.value;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only Owner can start bet!");
        _;
    }

    receive() external payable {
        if(msg.value == 5 ether){
            balanceOf[msg.sender] += msg.value;
        }else{
            rewardPool += msg.value;
        }
    }
}