In the lab you've just done, you know that you can become the FOREVER VVVIP Member by making a smart contract that couldn't receive any Ether in order to make the refund fail, but know we are going to learn hwo to mitigate such vulnerability. The vulnerability lies in here. &nbsp;  
&nbsp;  

```solidity
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
```
&nbsp;  
The easiest mitigation that we can implement here is just not to immediately send the balance if one position is taken by another—by calling this function with higher Ether, what we can do is make a mapping for each balance and a withdraw function to make allow pass VVVIP to withdraw their own balance, so the mitigated contract would look like this. &nbsp;  
&nbsp;  

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

contract VVVIP{
    address private currentVVVIP;
    uint256 private currentBalance;
    mapping(address => uint256) public balances;

    function becomeVVVVIP() external payable{
        balances[msg.sender] += msg.value;
        require(balances[msg.sender] > currentBalance, "You don't have enough money to become VVVIP!");
        currentVVVIP = msg.sender;
        currentBalance = balances[msg.sender];
    }

    function withdraw() public{
        require(msg.sender != currentVVVIP, "VVVIP Cannot withdraw balance!");
        uint256 toWithdraw = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: toWithdraw}("");
        require(sent, "Withdrawal failed!");
    }


    function getVVVVIP() public view returns(address, uint256){
        return (currentVVVIP, currentBalance);
    }

}
```
&nbsp;  
If you want to try your previous exploit against this new mitigated contract, you need to change the *Setup.sol::TryIfSolve()* to the one like below to ensure that the function tries to become VVVIP again. &nbsp;  
&nbsp;  

```solidity
   function TryIfSolve() public payable {
        vvvip.becomeVVVVIP{value: 10 ether}();
    }
```
&nbsp;  
Although most developers take their time and put in much effort to ensure that logic, calculation, and interactions are functioning as intended, some times there will be an unexpected behavior that they may not realize, that often leads to something like DoS.