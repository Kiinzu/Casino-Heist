In a world where reputations are forged and shattered with every roll of the dice, one name has remained untouchable: **Hubert Gallanghar**, the elusive legend. He was once the pinnacle of every gambler’s dream, a ghost of fortune no one could surpass—and then, he vanished. No photos, no records, just whispers of his former glory. But here’s the catch: what if you could slip into his identity, just like a shadow slipping through cracks? It's just like, **becoming the legend**  to rewriting history... if no one notices you’re not the real thing. &nbsp;  
&nbsp;  

## Hash Collisions
A Hash Collision occurs when two different input produce the same hash value using a specific hash function, since hash functions are designed to map a large input space to a fixed-size output, it's possible (though rare) for two distinct inputs to generate the same hash. This violates the principle that every unique input should have a unique hash. &nbsp;  
&nbsp;  

## What's the Causes?
In solidity, the root of the problem is often *abi.encodePacked()* function that normally then be hashed using *keccak256()*. When *abi.encodePacked()* is used with multiple variable-length arguments (such as strings and array), the packed encoding does not include information about the boundaries between different arguments and just combine them, this can lead to situations where different combinations of arguments result in the same encoded output, causing hash collisions, take this for example &nbsp;  
&nbsp;  

```solidity
abi.encodePacked(["a"], ["b"], ["c"]);
abi.encodedPacked(["a", "b"], ["c"]);
```
&nbsp;  
both of the example above could potentially produce the same encoding, okay let's take another one &nbsp;  
&nbsp;  
```solidity
abi.encodePacked("testing", "forfun")
abi.encodePacked("testingfor", "fun")
```
&nbsp;  
The example above will resulting the same encoding to, since there are no delimiter between the concatenated string, thus if we proceed to *keccak256()* both of them, the hash result will be the same! &nbsp;  
&nbsp;  
## The Impact of Hash Collision
Hash Collision could holds several impact depending on what the result of the collision, but often the impact are **severe**, namely &nbsp;  
&nbsp;  
- **Identity Forgery**
- **Unauthorized Access**
- **Double Spending or Fund Manipulation**
&nbsp;  
If one can match another person verification, let's say it use *keccak256(abi.encodePacked(<data>))*, then the attacker could do anything that require the correct hash of the owner, possibly draining funds, or any Access-related stuff.