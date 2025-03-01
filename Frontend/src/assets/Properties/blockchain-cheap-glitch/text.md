At Inju Casino, wealth wasn’t just admired—it was the only key to the inner circle, a private enclave reserved for the richest of the rich, known as the Capitol Club. Membership required not only vast fortune but also impeccable status—at least, that’s what everyone thought. Unbeknownst to the elites, a cunning individual discovered a **Cheap Glitch**—an unwanted guest in the capitol’s smart contracts. With precision manipulation of the system, they inflated their balance beyond recognition. Before anyone could notice, the glitch-wielder stood among the most powerful members, sipping champagne and exchanging glances with billionaires, a wolf disguised in golden silk. &nbsp;  
&nbsp;  
## Arithmetic Underflow / Overflow

Solidity is a language that processes integers based on how many bits they can contain, like *uint8*, meaning it can only have 8 bits, thus setting the maximum value it can hold to 255 (2^8 - 1). Integer Overflow happens when the uint (unsigned integer) reaches its byte size, but then we add something that, when added, will exceed the max balance and return to the first variable element, for example if it's an *uint8*, the maximum value it can hold is 255, if we add 1 to it it won't become 256, but it will turn into 0 (first variable element). The underflow is just the opposite, let's say we have the same *uint8* and its current value is 0, then we subtract 1 from it, it won't become -1 since unsigned cannot be a negative number, instead it will become 255 (the maximum variable element). &nbsp;  
&nbsp;  

## How can Integer Overflow-Underflow happen?
There are many factors how it can happen, here are some of them, ranging from the compiler version to the low-level code like *inline assembly*. &nbsp;  
&nbsp;  

### Solidity Version

Solidity with Version *0.6.0* to *0.7.0* compiler has the risk of integer underflow/overflow by default because there was no checking implemented in that compiler version, but the newest version of *0.8.0* compiler will automatically take care of checking for overflows and underflows.&nbsp;  
&nbsp;  
### The *Unchecked*

The Solidity *unchecked* keyword can play a crucial role in certain scenarios, offering the advantages of lower gas costs and bypassing certain checks. This keyword should only be used when the developers are sure the operation won't result in any security implication, like in this scenario. &nbsp;  
&nbsp;  
```solidity
function division(uint256 a, uint256 b) public pure returns(uint256){
    require(b < a, "Denominator cannot be smaller than Nominator");
    unchecked{
        return a / b;
    }
}
```
&nbsp;  
Only if it is used in a process like this, then we can just call it "save," or else maybe it possesses a security implication, just like in this scenario. &nbsp;  
&nbsp;  
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
&nbsp;  
In the example above, we used it in Solidity version *0.8.0*, which should be safe, but no, if the *unchecked* keyword is also used, it tells the compiler not to check the result or possibility in this operation, meaning it tells the compiler not to check for integer underflow and overflow. Let's say we input *61* as the value for the *a*, it will then return *5* because *255* is the max it can hold, it has extra 6, since the overflow starts from 0, so it's like a *6 - 1*, thus returning *5*. &nbsp;  
&nbsp;  

### Inline Assembly
Inline assembly in Solidity is performed using the YUL language. Because YUL is a low-level language, integer overflow and underflow are possible since the compiler won't automatically check for them. Take this code as an example. &nbsp;  
&nbsp;  

```solidity 
uint8 test = 255;

function add() public pure returns(uint8 result){
    assembly{
        result := add(sload(test.slot), 1)
    }
    return result;
}
```
&nbsp;  
Running the code above would return *0* since the maximum for type *uint8* is 255, and adding 1 to it will make it overflow and return *0*. &nbsp;  
&nbsp;  

### Using Shift Operators
In solidity, overflow and underflow checks are not performed for shift operations like they are performed for other arithmetic operations. Thus, overflow and underflow are possible.&nbsp;  
&nbsp;  

### Typecasting
A very common way this vulnerability exists is by typecasting a higher integer type like *uint256* to a lower one like *uint8*.