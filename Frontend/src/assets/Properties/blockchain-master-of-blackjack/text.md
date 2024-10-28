*Beginner's Luck* is a curious phenomenon often whispered about in the lively halls of casinos, where first-times seem to defy the odds and walk away with unxepected wins. Whether it's hitting a blackjack, landing a lucky number on the roulette wheel, or scoring a jackpot on the slots, these early victories cam feel almost magical, right? But you are not one of them, luck is not a factor in your journey, you have no luck, you just, PRECISE!

## Timestamp Dependence

Timestamp dependence is a type of vulnerability in smart contracts where a contract relies on the `block timestamp` to make critical decisions. This is due to the block timestamp itself can be easily manipulated by miners within certain limits, therefore using it carelessly could bring a security implications to your contract.

## How Timestamp Dependence becomes a vulnerability?

The Timestamp can be exploited in some ways depending on how the contract use it, here are few examples:

- Using timestamp to influence `payouts`, `game result`, `access control`, etc.
- Miners can manipulate timestamps by adjusting them slightly to gain an advantage (e.g., to win a game or getting more rewards).

## How Miners Manipulate Block Timestamps?

Miners can maniplate block timestamps only to a certain degree, that degree being

1. Miner can set the timestamp to **No Ealier** than the parent block`s timestamp
2. **No more than 900 seconds (15 minutes)** *relative to the node's clock

This small window give miners some control over the timestamp, which they can exploit to their advantage.

