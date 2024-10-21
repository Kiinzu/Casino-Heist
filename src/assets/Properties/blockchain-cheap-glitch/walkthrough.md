We know that from the `Setup.sol` we need to make the `Capitol::isRicher()` bool returns true, in order to do this we need to call the `Capitorl::richerThanOwner()`   

```solidity
function richerThanOwner() public{
    // The Casino is Not that stupid, they know that the balance beyond that is CHEATING!
    if(balanceOf[msg.sender] < 10_000_000_000_000 ether && balanceOf[msg.sender] > balanceOf[owner]){
        isRicher = true;
    }
}
```

based on the code, it will make the `Capitol::isRicher()` true if the our balance is greater the owner itself and it's not greater than `10_000_000_000_000 ether`, because it's ether so add another 18 zero. Now let's see the whole code to see where we can make this possible

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Capitol{
    
    bool public isRicher;
    address public owner;
    mapping(address => uint256) public balanceOf;

    constructor() {
        owner = msg.sender;
        balanceOf[owner] = 1_000_000_000 ether;
    }

    function depositCredit(uint256 _amount) public payable{
        require(_amount > 1 ether, "Minimum deposit is 1 ether");
        require(msg.value == _amount, "There seems to be a mismatch!");
        unchecked{
            balanceOf[msg.sender] += _amount;
        }
    }

    function withdrawCredit(uint256 _amount) public{
        require(_amount > 0, "Must be greater than zero!");
        unchecked{
            balanceOf[msg.sender] -= _amount;
        }
    }

    function richerThanOwner() public{
        // The Casino is Not that stupid, they know that the balance beyond that is CHEATING!
        if(balanceOf[msg.sender] < 10_000_000_000_000 ether && balanceOf[msg.sender] > balanceOf[owner]){
            isRicher = true;
        }
    }
}
```
Looking from the solidity version `^0.8.26`, Arithmeetic overflow-underflow is most likely impossible, but wait, there is `unchecked{}` in both `Capitol::depositCredit()` and `Capitol::withdrawCredit()`, this means the input `uint256 _amount` will be process regardless if it's going to overflow or underflow the value of `balanceOf[msg.sender]` by the end of the operation because they are unchecked!  

Furthermore, in `Capitol::withdrawCredit`, there is no check whether the amount that we are ging to withdraw is exceeding our current balance or not, so we don't have to deposit anything to withdraw. Now calculating the correct amount so that our balance is less than `10_000_000_000_000 ether`, in this walkthrough we are going to create a simple function in solidity and run it  

```solidity

pragma solidity ^0.8.26;

contract Calculate{
    function calculate() public pure returns(uint256){
        return type(uint256).max - 10_000_000_000_000 ether + 2;
    }
}
```

In solidity we can get the max value of a data type using `type(<datatype>).max` just like the code above, to get the max value of uint256. We simply calculate the distance between the max from the target and add 2 at the end, why 2? Notice that our balance start from `0`, meaning we need to `-1` so that our balance become the max number an uint256 can hold, then another `-1` to make sure we are below the `10_000_000_000_000 ether` mark, the function will return a large number that will make our balance `9_999_999_999_999 ether`. 