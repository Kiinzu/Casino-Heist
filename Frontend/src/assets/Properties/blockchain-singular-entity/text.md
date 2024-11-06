In a world where reputations are forged and shattered with every roll of the dice, one name has remained untouchable: **Hubert Gallanghar**, the elusive legend. He was once the pinnacle of every gambler’s dream, a ghost of fortune no one could surpass—and then he vanished. No photos, no records, just whispers of his former glory. But here’s the catch: what if you could slip into his identity, just like a shadow slipping through cracks? It's just like **becoming the legend** to rewrite history... if no one notices you’re not the real thing. &nbsp;  
&nbsp;  

## Hash Collisions
A hash collision occurs when two different inputs produce the same hash value using a specific hash function. Since hash functions are designed to map a large input space to a fixed-size output, it's possible (though rare) for two distinct inputs to generate the same hash. This violates the principle that every unique input should have a unique hash. &nbsp;  
&nbsp;  

## What's the Causes?
In Solidity, the root of the problem is often the *abi.encodePacked()* function, which is normally then hashed using *keccak256()*. When *abi.encodePacked()* is used with multiple variable-length arguments (such as strings and arrays), the packed encoding does not include information about the boundaries between different arguments and just combines them. This can lead to situations where different combinations of arguments result in the same encoded output, causing hash collisions. Take this below as an example. &nbsp;  
&nbsp;  

```solidity
abi.encodePacked(["a"], ["b"], ["c"]);
abi.encodedPacked(["a", "b"], ["c"]);
```
&nbsp;  
Both of the examples above could potentially produce the same encoding. Okay, let's take another one. &nbsp;  
&nbsp;  
```solidity
abi.encodePacked("testing", "forfun")
abi.encodePacked("testingfor", "fun")
```
&nbsp;  
The example above will result in the same encoding since there are no delimiters between the concatenated strings, thus if we proceed to *keccak256()* both of them, the hash result will be the same! &nbsp;  
&nbsp;  
## The Impact of Hash Collision
Hash Collision could holds several impact depending on what the result of the collision, but often the impact are **severe**, namely &nbsp;  
&nbsp;  
- **Identity Forgery**
- **Unauthorized Access**
- **Double Spending or Fund Manipulation**
&nbsp;  
If one can match another person's verification, let's say it uses *keccak256(abi.encodePacked(<data>))*, then the attacker could do anything that requires the correct hash of the owner, possibly draining funds, or any Access-related stuff.