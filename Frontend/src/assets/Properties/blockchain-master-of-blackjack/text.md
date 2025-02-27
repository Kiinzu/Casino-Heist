*Beginner's Luck* is a curious phenomenon often whispered about in the lively halls of casinos, where first-timers seem to defy the odds and walk away with unexpected wins. Whether it's hitting a blackjack, landing a lucky number on the roulette wheel, or scoring a jackpot on the slots, these early victories can feel almost magical, right? But you are not one of them, luck is not a factor in your journey, you have no luck, you just, PRECISE! &nbsp;  
&nbsp;  

## Timestamp Dependence

Timestamp dependence is a type of vulnerability in smart contracts where a contract relies on the *block timestamp* to make critical decisions. This is due to the block timestamp itself, which can be easily manipulated by miners within certain limits, therefore, using it carelessly could have security implications for your contract. &nbsp;  
&nbsp;  

## How Timestamp Dependence becomes a vulnerability?

The timestamp can be exploited in some ways depending on how the contract uses it. Here are a few examples: &nbsp;  
&nbsp;  
- Using timestamps to influence *payouts*, *game result*, *access control*, etc.
- Miners can manipulate timestamps by adjusting them slightly to gain an advantage (e.g., to win a game or get more rewards). &nbsp;  
&nbsp;  

## How Miners Manipulate Block Timestamps?

Miners can manipulate block timestamps only to a certain degree, that degree being: &nbsp;  
&nbsp;  
1. Miner can set the timestamp to **No Earlier** than the parent block`s timestamp.
2. **No more than 900 seconds (15 minutes)** *relative to the node's clock. &nbsp;  
&nbsp;  

This small window gives miners some control over the timestamp, which they can exploit to their advantage.

