At Inju Casino, wealth wasn’t just admired—it was the only key to the inner circle, a private enclave reserved for the richest of the rich, known as the Capitol Club. Membership required not only vast fortune but also impeccable status—at least, that’s what everyone thought. Unbeknownst to the elites, a cunning individual discovered a **Cheap Glitch**—an unwanted guest in the capitol’s smart contracts. With precision manipulation of the system, they inflated their balance beyond recognition. Before anyone could notice, the glitch-wielder stood among the most powerful members, sipping champagne and exchanging glances with billionaires, a wolf disguised in golden silk.

## Arithmetic Underflow / Overflow

Solidity is a language that process integer based on how many bits it can contain, like `uint8` meaning it can only have 8 bits, thus setting the maximum value it can holds to 255 (2^8 - 1). Integer Overflow happens when the uint (unsigned integer) reches its byte size, but then we add something that when added will exceed the max balance and returning to the first variable element, for example if it's an `uint8` the maximum value it can hold is 255, if we add 1 to it it won't become 256, but it will turn into 0 (first variable element). The Underflow is just the oposite, let's say we have the same `uint8` and it's current value is 0, then we substract 1 from it, it won't become -1 since unsigned cannot be negative number, instead it will become 255 (maximum variable element).

So what's the factor or condition where it can happened?

### Solidity Version

Solidity with Version `0.6.0` to `0.7.0` compiler has the risk of Integer Underflow/Overflow by default because there were no checking implemented in that compiler version, but the newest version of `0.8.0` compiler will automatically take care of checking for overflows and underflows.

### The *Unchecked*

The Solidity `unchecked` keyword can play a crucial role in certain scenarios, offering the advantages of lower gas cost and bypass certain checks. This keyword should only be used when the devs are sure about the operation won't resulting in any security implication, like in this scenario

```solidity

function division(uint256 a, uint256 b) public pure returns(uint256){
    require(b < a, "Denominator cannot be smaller than Nominator");
    unchecked{
        return a / b;
    }
}
```

Only if it used in a process like this, then we can just call it "save", else maybe it possess a security implication, just like in this scenario

```solidity
pragma solidity ^0.8.0;

contract exampleOUInteger{
    function addition(uint8 a) public pure returns(uint8){
        unchecked{
            return 200 + a;
        }
    }
}
```

In the example above, we used it in solidity version `0.8.0`, which should be safe, but no, if the `unchecked` keyword is also used, it tells the compiler not to check the result or possibility in this operation, meaning it tells the compiler not to check for interger underflow and overflow. Let's say we input `61` as the value for the `a`, it will then return `5` because `255` is the max it can hold, it has extra 6, since the overflow start from 0, so it's like a `6 - 1`, thus returning `5`.