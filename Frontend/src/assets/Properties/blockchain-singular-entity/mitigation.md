The vulnerability or should we say the path that lead us to gaining all **Hubert Gallanghar** access waas the `Singularity.sol::getIdentity()`, that's because that function is the one responsible to giving everyone their unique ID, here is the code

```solidity
function getIdentity(string memory _firstName, string memory _lastName) public pure returns(bytes memory){
    return abi.encodePacked(_firstName, _lastName);
}
```

What we can do to make it secure is to use `abi.encode()` instead of `abi.encodePacked()`, why? Because `abi.encode()` preserves the structure of the inputs, avoiding ambiguous concatenation, here is how we can fix the smart contract by just changing hwo the `getIdentity()` works

```solidity
function getIdentity(string memory _firstName, string memory _lastName) public pure returns(bytes memory){
    return abi.encode(_firstName, _lastName);
}
```

While there maybe some other way to mitigate this such aas adding a unique nonce or identifier alongside the `abi.encodePacked()`, or maybe adding a delimiters or length prefixes to encoded data, the best way is of course just to avoid using it and just use `abi.encode()` AND avoid relying on Hashes or bytes alone for Critical security Checks