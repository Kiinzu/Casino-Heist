In the dim, smoke-filled halls of the casino, the wheel spins, a mesmerizing blur of black and red. They tell you it’s all luck—a dance with chance, where the house always wins. But every game has a flaw, every system a crack. What if the wheel wasn't as random as they claimed? What if the odds could be bent, the future glimpsed just before the ball drops? The stakes are high, and with every spin, the power shifts. This time, the roles are reversed. It’s no longer a game of chance—it’s a game of control. And now, the wheel is in **your hands**. &nbsp;  
&nbsp;  

## Insecure Randomness
Just like what it called, Insecure Randomness or what often called *Weak Source of Randomness* in Solidity, refers to the usage of chain attribute for randomness, this can be either one of *block.timestamp*, *block.hash*, *block.difficulty*, *block.number* or even everything at once. &nbsp;  
&nbsp;  
The problem of using the block attributes are they are so predictable and can be easily obtained by implementing it to our own attack contract.

## Impact of Insecure Randomness
In Solidity, using predictable sources of randomness can be seen as not using randomness at all, since people could just make a smart contract to handle the same source of randomness and produce the exact same value as the original contract intended, here is the impact of using it in a smart contract

- **Predicatble Lottery or Casino Outcomes**
    Attackers can predict the outcome of a lottery or casino game before the results are revealed. This allows them to exploit the randomness to win **consistently**.
- **Manipulation of Reward Distributions**
    If the distribution of tokens, NFTs or a lottery is based on on-chain randomness, attackers can manipulate the randomness to ensure they receive the best outcomes
- **Front-running Exploits**
    It's not directly, but since attacker can monitor pending transaction and predict the outcome of a function that relise on randomness, if they determine a profitable outcome, they can use front-running technique to submit a transaction with a higher gas fee, ensuring they get the reward