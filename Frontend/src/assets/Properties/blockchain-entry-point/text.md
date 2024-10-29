At the grand gates of the casino, known as the `Entry Point`, only those who managed to get the exact amount of deposit can cross into the high-stakes games. Manye eager players approach with pockets jingling, exchanging their precious ether for tokens at the shimmering kisok. Despite their careful calculations, some finds themselves just shy of the threshold-denied entry by the Gatekeeper. It's rumored that they deals in absolutes, not even the smallest miscalculation leaves hopeful standing on the outside.

## Rounding Error

In Solidity, **rounding errors** occur when performing arithmetic operation with decimal numbers, such as division of multiplication, where the result cannot be represented as a whole number. This happens because Solidity only support integer types (e.g., `uint256`, `int256`) and does not floating-point arithmetic like other languages. When an operation results in a fraction, Solidity will **truncate** the decimal part, leading to a loss of precision, for example

```solidity
uint256 result = 7 / 3 // Result will be 2 instead of 2,33...
```

The snippet above shows that the result will truncate the decimal part, which could introduce small errors in calulations, especially when scaling numbers like tokens or ETH values. In a real-world scenario, this vulnerability is responsible for several incident, for example if the calculation is not perfect, it may leave dust value in the wallet or liquidity pools. These dust balance cannot be used effectively, leading to small but permanent losses over time. 

