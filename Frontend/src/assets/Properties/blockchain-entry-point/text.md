At the grand gates of the casino, known as the *Entry Point*, only those who managed to get the exact amount of deposit can cross into the high-stakes games. Many eager players approach with pockets jingling, exchanging their precious ether for tokens at the shimmering kiosk. Despite their careful calculations, some find themselves just shy of the threshold-denied entry by the Gatekeeper. It's rumored that they deal in absolutes, not even the smallest miscalculation leaves hopeful standing on the outside.&nbsp;  
&nbsp;  

## Rounding Error

In Solidity, **rounding errors** occur when performing arithmetic operations with decimal numbers, such as division of multiplication, where the result cannot be represented as a whole number. This happens because Solidity only supports integer types (e.g., *uint256*, *int256*) and does not support floating-point arithmetic like other languages. When an operation results in a fraction, Solidity will **truncate** the decimal part, leading to a loss of precision, for example. &nbsp;  
&nbsp;  

```solidity
uint256 result = 7 / 3 // Result will be 2 instead of 2,33...
```
&nbsp;  
The snippet above shows that the result will truncate the decimal part, which could introduce small errors in calulations, especially when scaling numbers like tokens or ETH values. In a real-world scenario, this vulnerability is responsible for several incidents, for example, if the calculation is not perfect, it may leave dust value in the wallet or liquidity pools. These dust balances cannot be used effectively, leading to small but permanent losses over time.

