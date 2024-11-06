Our objective here is to make *EntryPoint::entered()* returns true, we can only do this by giving the correct amount to the *EntryPoint::getCoin()*, let's see the code &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract EntryPoint{

    uint256 public constant TOKENS_PER_ETHER = 0.1910191 ether;
    bool public entered;
    mapping(address => uint256) public ownedCoin;

    // The Casino is not open for everyone, only those who have at least a coin can enter.
    function getCoin() public payable{
        require(msg.value > 0, "Must send ether to receive tokens");
        require(msg.value > 7000 wei && msg.value < 8000, "7 is not a lucky number here");
        uint256 coins = (msg.value * TOKENS_PER_ETHER) / 1 ether;
        if(coins == 1367){
            ownedCoin[msg.sender] += coins;
            entered = true;
        }
    }

    receive() external payable{}

} 
```
&nbsp;  
We can see that only when *coins == 1367*, the *entered()* will be true. There are also 2 restrictions there; the first one is checking whether the *msg.value* is greater than zero, and the second one checks whether the *msg.value* is between 7000 and 8000 wei. The next line is the calculation; however, the calculation seems not to be that right. After going around some number between 7000 and 8000, we found no exact number that will give 1367, but there is one that is close enough, or at least has 1367 in front of the coma. Here is the calculation using Python. &nbsp;  
&nbsp;  
```text
Formula:
(Value * TOKEN_PER_ETHER) / 1 Ether

Ranges that got 1367 before coma are 7157 - 7161
> (7157 wei * 0.1910191 * 10e18) / 10 e18
> 1367.1236987

> (7161 wei * 0.1910191 * 10e18) / 10 e18
> 1367.8877751
```
&nbsp;  
Why does it matter—it's not 1367 to be exact? Because Solidity cannot handle floating points,  the number behind the comma will be ignored, making the calculation end with only *1367*, meaning we successfully got in! We can try to send the deposit amount of, let's say, 7157 and try to solve the lab &nbsp;  
&nbsp;  
```bash
// Getting the EntryPoint Contract Address
cast call -r $RPC_URL $SETUP_ADDR "EP()"

// Sending the correct value to get 1367
cast send -r $RPC_URL --private-key $PK $EP_ADDR "getCoin()" --value 7157
```
&nbsp;  
After running the command above, you should've solved the lab!