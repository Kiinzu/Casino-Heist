// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

contract VVVIP{
    address private currentVVVIP;
    uint256 private currentBalance;

    function becomeVVVVIP() external payable{
        require(msg.value > currentBalance, "You don't have enough money to become VVVIP!");
        (bool refund, ) = currentVVVIP.call{value: currentBalance}(""); 
        require(refund, "The fund is not given back!");
        if(currentVVVIP == address(0)){
            currentVVVIP = msg.sender;
            currentBalance = msg.value;
        }
        currentVVVIP = msg.sender;
        currentBalance = msg.value;
    }

    function getVVVVIP() public view returns(address, uint256){
        return (currentVVVIP, currentBalance);
    }

}