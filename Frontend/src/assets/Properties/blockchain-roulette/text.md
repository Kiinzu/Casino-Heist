In the dim, smoke-filled halls of the casino, the wheel spins, a mesmerizing blur of black and red. They tell you it’s all luck—a dance with chance, where the house always wins. But every game has a flaw, every system has a crack. What if the wheel wasn't as random as they claimed? What if the odds could be bent, the future glimpsed just before the ball drops? The stakes are high, and with every spin, the power shifts. This time, the roles are reversed. It’s no longer a game of chance—it’s a game of control. And now the wheel is in **your hands**. &nbsp;  
&nbsp;  

## Insecure Randomness
Just like what it called, insecure randomness, or what is often called *weak source of randomness* in Solidity, refers to the usage of chain attributes for randomness, this can be either one of *block.timestamp*, *block.hash*, *block.difficulty*, *block.number*, or even everything at once. &nbsp;  
&nbsp;  
The problem of using the block attributes is that they are so predictable and can be easily obtained by implementing them in our own attack contract. &nbsp;  
&nbsp;  

## Impact of Insecure Randomness
In Solidity, using predictable sources of randomness can be seen as not using randomness at all, since people could just make a smart contract to handle the same source of randomness and produce the exact same value as the original contract intended. Here is the impact of using it in a smart contract.&nbsp;  
&nbsp;  

- **Predictable Lottery or Casino Outcomes** &nbsp;  
    Attackers can predict the outcome of a lottery or casino game before the results are revealed. This allows them to exploit the randomness to win **consistently**. &nbsp;  
    &nbsp;  
- **Manipulation of Reward Distributions** &nbsp;  
    If the distribution of tokens, NFTs, or a lottery is based on on-chain randomness, attackers can manipulate the randomness to ensure they receive the best outcomes. &nbsp;  
    &nbsp;  
- **Front-running Exploits** &nbsp;  
    It's not directly, but since attackers can monitor pending transactions and predict the outcome of a function that relies on randomness, if they determine a profitable outcome, they can use the front-running technique to submit a transaction with a higher gas fee, ensuring they get the reward. &nbsp;  
    &nbsp;  