The Vault stands as the heart of the Casino, filled with treasures beyond imagination. It’s guarded by layers of intricate security, making it seem impenetrable to the average player. But what if... just what if we could blend in like we’re in the open lobby? No one questions you in the lobby, no ID checks, no suspicions. Now imagine if we could carry that freedom straight into the vault—moving unnoticed, without restrictions, without identification—wouldn’t that be the perfect heist? The trick is simple: all we need is the ability to make the vault act like it's just another carefree space... Can you find the way?

## DelegateCall to Untrusted Calls
`Delegatecall` is a special variant of message call, it is almost identical to a regular message call except the target address is executed in the context of calling contract and `msg.sender` and `msg.value` remain the same. In short delegatecall is a call to function outsite of the current caller to modify the caller contract, feeling confuse? don't worry, maybe this image will make it a little bit clearer for you!

<img src="../src/assets/properties/blockchain-casino-vault/delegatecall.png">

once, again if you see the image above, let's say we call a function in `Contract A` that has a delegatecall implemented to `Contract B`, then when the function in `Contract B` has finished running, it then make an update to the state of the `Contract A`. This is likely the dangerous part!

Let's imagine if a crucial function that are required by the contract is run on a `delegatecall` to another contract. Well, you guess it riht, if the contract is not whitelisted, let's say we can call an contract we want and run a function there (as long the function name is the same), we can modify the state of the vulnerable contract!

## Impact of Unsafe Delegatecall
The impact may be vary based on what present in the vulnerable contract, but most of the time the imapct an unsafe `delegatecall` can make are:

- **Access Control Vulnerabilities**
    An Attacker take ownership of the contract via the insecure delegatecall, not only that since it updating the state of the contract, an attacker could potentially update the state of the contract to their advantages.
- **Destruction of State Variables**
    Since the state of the calling contract is manipulated, improperly handled `delegatecall` can corrupt ciritcal data, making the contract unsuable or causing irreversible damage
- **Increased Attack Surface**
    Using `delegatecall` introduce additional complexity. If not handled properly, the added complexity provides more opportunities for attackers to exploit vulnerabilities
- **Loss of Funds**
    As mentioned in `Accesss Control Vulnerabilities` above, attacker has the power to change the state of the contract, if the contract is used to hold Ether, there may be a potential loss of fund if a delegatecall vulnerability exist.