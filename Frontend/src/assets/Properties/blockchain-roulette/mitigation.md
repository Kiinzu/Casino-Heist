The Heist you just done has the vulnerability of Insecure Randomness because it's using `block.timestamp` in this two functions

```solidity
function randomGenerator() internal view returns(uint256){
    return uint256(keccak256(abi.encodePacked(block.timestamp))) % 100;
}

function biggerRandomGenerator() internal view returns(uint256){
    return uint256(keccak256(abi.encodePacked(block.timestamp))) % 10000000;
}
```

The only way to mitigate this if we really need the randomness is to use `Chainlink VRF`, to see how you can implement the Verifiable Random Function, you can refer to this docs.

- https://docs.chain.link/vrf