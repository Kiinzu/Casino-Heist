The vault stands as the heart of the casino, filled with treasures beyond imagination. It’s guarded by layers of intricate security, making it seem impenetrable to the average player. But what if... just what if we could blend in like we’re in the open lobby? No one questions you in the lobby, no ID checks, no suspicions. Now imagine if we could carry that freedom straight into the vault—moving unnoticed, without restrictions, without identification—wouldn’t that be the perfect heist? The trick is simple: all we need is the ability to make the vault act like it's just another carefree space... Can you find the way? &nbsp;  
&nbsp;  

## DelegateCall to Untrusted Calls
*Delegatecall* is a special variant of a message call, it is almost identical to a regular message call except the target address is executed in the context of calling contract and *msg.sender* and *msg.value* remain the same. In short, delegatecall is a call to function outside of the current caller to modify the caller contract. Feeling confused? Don't worry, maybe this video will make you understand. &nbsp;  
&nbsp;  
[Smart Contract Programmer - Delegate Call](https://www.youtube.com/watch?v=uawCDnxFJ-0)&nbsp;  
&nbsp;  
Let's imagine if a crucial function that is required by the contract is run on a *delegatecall* to another contract. Well, you guess it right, if the contract is not whitelisted, let's say we can call a contract we want and run a function there (as long as the function name is the same), we can modify the state of the vulnerable contract! &nbsp;  
&nbsp;  
## Impact of Unsafe Delegatecall
The impact may vary based on what is present in the vulnerable contract, but most of the time the impact an unsafe *delegatecall* can make are: &nbsp;  
&nbsp;  
- **Access Control Vulnerabilities** &nbsp;  
    An attacker takes ownership of the contract via the insecure delegatecall, not only that, since it updates the state of the contract, an attacker could potentially update the state of the contract to their advantage. &nbsp;  
    &nbsp;  
- **Destruction of State Variables** &nbsp;  
    Since the state of the calling contract is manipulated, improperly handled *delegatecall* can corrupt critical data, making the contract unusable or causing irreversible damage. &nbsp;  
    &nbsp;  
- **Increased Attack Surface** &nbsp;  
    Using *delegatecall* introduces additional complexity. If not handled properly, the added complexity provides more opportunities for attackers to exploit vulnerabilities. &nbsp;  
    &nbsp;  
- **Loss of Funds** &nbsp;  
    As mentioned in *Access Control Vulnerabilities* above, an attacker has the power to change the state of the contract, if the contract is used to hold Ether, there may be a potential loss of funds if a delegatecall vulnerability exists.