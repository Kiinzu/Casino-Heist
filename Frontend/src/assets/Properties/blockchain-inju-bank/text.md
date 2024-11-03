Inju Casino, riding the wave of success, set their sights on a new frontier- **Inju Bank**. With grand promises of innovation and trust, they opened its doors, offering customers a vault they claimed was unbreakable. But ambition can cloud judgement. In their rush to launch, they overlooked a crucial detail--a flaw hidden deep within the foundation. A flaw so subtle, it waits patiently like a ticking time bomb for them. They say fortune favors the bold, but in this game, precision and consistent is needed. &nbsp;  
&nbsp;  
## Reentrancy
Reentrancy is an attack that occurs when a bug in a contract may allow a malicious contract to reenter the contract unexpectedly during execution of the original function, hence name "re" "entrance". &nbsp;  
&nbsp;  
## What made it possible?
Only when we have some of these conditions that we can do a reentrancy attack, the conditions are &nbsp;  
&nbsp;  
### External Call
Reentrancy can be executed by the availability of an external call to an attacker controlled contract, this allow the attacker contract to execute arbitrary code. Although its existence is not always obvious, it's very important to be aware of them, some example of this call may include &nbsp;  
&nbsp;  
- ETH Transfer (*call()*, *transfer()*, *send()*)
- *safeMint()* &nbsp;  
&nbsp;  

the examples above has their own traits, like *safeMint()*, let's say we are dealing with ERC-721 here, the *safeMint()* will check whether the receiver (most of the time is code--smart contract) is capable of receiving the token by returning a byte4, well if things like that is left unchecked, the attacker just could do something first before returning the required bytes4, here is the code &nbsp;  
&nbsp;  
```solidity
function _safeMint(
    address to,
    uint256 tokenId,
    bytes memory _data
) internal virtual {
    _mint(to, tokenId);
    require(
        _checkOnERC721Received(address(0), to, tokenId, _data),
        "ERC721: transfer to non ERC721Receiver implementer"
    );
}
```
&nbsp;  
### Incorrect Implementation of CEI
**CEI** or **CHECK-EFFECT-INTERACTIONS** is a pattern that every devs should follow when writting a smart contract. This could prevent common vulnerability like logic error (on voting for example), or even reentrancy. &nbsp;  
&nbsp;  
## Types of Reentrancy
Reentrancy attack can be categorize into 4 different types, &nbsp;   
&nbsp;  
1. **Single Function Reentrancy** &nbsp;  
    This reentrancy attack occurs when a vulnerable function is the same function that an attacker is trying to recursively call. &nbsp;  
    &nbsp;  
2. **Cross-Function Reentrancy** &nbsp;  
    This attack is a little bit more complex, the attack itself require a vulnerable function sharing the same state with a function that an attacker can exploit &nbsp;  
    &nbsp;  
3. **Read-Only Reentrancy** &nbsp;  
    This attack is a novel attack vector in which instead of reentering into the same contract which first being our target, we call a function of another call that is using the state of the not-yet-updated target contract. &nbsp;  
    &nbsp;  
    
If you want to read more about reentrancy, we recommended you to read about them [here](https://scsfg.io/hackers/reentrancy/)