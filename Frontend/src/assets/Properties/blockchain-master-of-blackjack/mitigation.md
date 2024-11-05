The main problem that we have up there (well it's more to the casino side problem but okay..), is the fact that it use a *block.timestamp* as the source of randomness, well this is not good, since it make us (player) can easily win the game by only playing it when the result of the addition is *4*. &nbsp;  
&nbsp;  

There are a few way how we can mitigate this contract, they are: &nbsp;  
&nbsp;  
1. **Use a Better Randomness Sources**
    Instead of relying on *block.timestamp*, we can use a *commit-reveal scheme* or better one is using the *Chainlink VRF* to generate truly unpredictable randomness.
2. **Remove Timestamp Dependece**
    Removing the *block.timestamp* for anything related to randomness or important decisions is a must, since it a potential for manipulation &nbsp;  
&nbsp;  
The best solution that we can give if you find anything like this in audits are to implement the VRF, well maybe we need to introduce that to you a little bit. &nbsp;  
&nbsp;  

## Chainlink Verifiable Random Function (VRF)

Chainlink VRF is a probably fair and verifiable random number generator (RNG) made by Chainlink that made random values in smart contract much more secure without compromising security or usability of the smart contract. Currently the latest version is VRF2.5 and you can watch the introduction here, &nbsp;  
&nbsp;  
- [What is Chainlink VRF?](https://www.youtube.com/watch?v=eRzLNfn4LGc)
- [Learn VRF v2.5](https://docs.chain.link/vrf/v2-5/overview/subscription)