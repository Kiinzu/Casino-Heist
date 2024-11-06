The vulnerability, or should we say the path that led us to gaining all **Hubert Gallanghar** access, was the *Singularity.sol::getIdentity()*, that's because that function is the one responsible for giving everyone their unique ID. Here is the code &nbsp;  
&nbsp;  
```solidity
function getIdentity(string memory _firstName, string memory _lastName) public pure returns(bytes memory){
    return abi.encodePacked(_firstName, _lastName);
}
```
&nbsp;  
What we can do to make it secure is to use *abi.encode()* instead of *abi.encodePacked()*, Why? Because *abi.encode()* preserves the structure of the inputs, avoiding ambiguous concatenation, here is how we can fix the smart contract by just changing how the *getIdentity()* works &nbsp;  
&nbsp;  
```solidity
function getIdentity(string memory _firstName, string memory _lastName) public pure returns(bytes memory){
    return abi.encode(_firstName, _lastName);
}
```
&nbsp;  
While there may be some other way to mitigate this, such as adding a unique nonce or identifier alongside the *abi.encodePacked()*, or maybe adding delimiters or length prefixes to encoded data, the best way is, of course, just to avoid using it and just use *abi.encode()* AND avoid relying on hashes or bytes alone for critical security checks.