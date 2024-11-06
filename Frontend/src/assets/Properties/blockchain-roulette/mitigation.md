The heist you just did has the vulnerability of insecure randomness because it's using *block.timestamp* in these two functions &nbsp;  
&nbsp;  

```solidity
function randomGenerator() internal view returns(uint256){
    return uint256(keccak256(abi.encodePacked(block.timestamp))) % 100;
}

function biggerRandomGenerator() internal view returns(uint256){
    return uint256(keccak256(abi.encodePacked(block.timestamp))) % 10000000;
}
```

The only way to mitigate this if we really need the randomness is to use *Chainlink VRF*. To see how you can implement the verifiable random function, you can refer to these docs. &nbsp;  
&nbsp;  

- https://docs.chain.link/vrf