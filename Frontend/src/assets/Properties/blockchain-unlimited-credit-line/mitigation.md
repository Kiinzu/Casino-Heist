The `NewBank Contract` use a `BetterERC20`, at least that's what they thought, but no, it's not secure at all. As mentioned in the prologue, that `Any deviation from the standard doesn't necessarily introduce vulnerability, but it could`, this is the perfect case of that, let's compare it

```solidity
// NewBank.sol::burn()
    function burn(address _who, uint256 _value) external override {
        require(balanceOf[_who] <= _value, "Insufficient balance to burn");
        balanceOf[_who] += _value;
    }

// How it should be implemented
    function burn(uint256 _value) external {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance to burn");
        
        balanceOf[msg.sender] -= _value; // Decrease balance
        totalSupply -= _value; // Adjust total supply 

        emit Transfer(msg.sender, address(0), _value); // Emit Transfer event to address(0)
    }
```

Well, there the `mint()` is designed like that so that player would look over another function to begin with, so we are not going to talk about it, instead we are going to talk about the one which could give us the openning to solve the challenge. `burn()` was meant to permanently remove tokens from circulation, but this one, this one could give you token just like `mint()`, that's why to correctly adopt the ERC-20 standard, the implementation must be at least following the original one, or if there are any deviation from the standard, it needs to be checked to make sure it doesn't introduce any vulnerability.