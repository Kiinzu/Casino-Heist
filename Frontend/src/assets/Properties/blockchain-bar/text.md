The *Bar* is very exlusive to *member-only*, registering to become one is very easy, but actually becoming one of them is not that easy it seems, do you think you got what it takes to become one? If so, go get yourself a drink! &nbsp;  
&nbsp;  
## Access Control Vulnerabilities

Access control vulnerability allow unathorized users to access or modify data or functions through security flaws, the flaw some times doesn't need to be extremely hard to find or something, sometime it's just a tiny little mistake made by the devs just like in web2 with loose comparison. In Solidity Smart Contract, the Access Control Vulnerability means that unauthorized user may modify or access the contract's data or functions.

Most of the time, the access control vulnerability is just the beginning of the real disaster, as it acts as the entry point to any other vulnerability such as Denial of Service, Reentrancy, etc.

## What are the causes?
Here are the common causes of access control vulnerabilities in solidity smart contract

1. **Missing `OnlyOwner` or Access Modifiers**
    A function that only restricted to some people need to implement a secure modifier that declares that only that specific people can access it

    ```solidity
    // Bad Example (the case: Only Owner can Withdraw)
    function withdraw() public {
    // Anyone can call this function, leading to theft of funds
        payable(msg.sender).transfer(address(this).balance);
    }

    // Good Example (the case: Only Owner can withdraw)
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
    ```

2. **Incorrectly implemented Role-Based Access Control (RBAC)**
    Misconfigured roles allow unauthorized users access to restricted functions.

3. **Privilege Escalation**
    It's often a condition where regular users able to escalate their privilege to `admin-level` access such as owner

    ```solidity
    function becomeOwner() public {
        owner = msg.sender; // No restrictions!
    }
    ```

4. **Hardcoding the Owner Address**
    If the owner's address is hardcoded and cannot be updated, control can be lost if the owner's private key is compromised or lost

5. **Overly Permissive `external` Functions**
    Function that declared as `external` are accessible by anyone on-chain and can be mistakenly exposed if not properly secured with access control mechanisms.

6. **Lack of Proper Checks in Multi-Signature Wallets**
    If a multi-signature wallet smart contract lacks strict checks, a malicious actor may exploit the process to gain access to restricted funds

## Impact of Access Control Vulnerabilities
- **Loss of Funds**
    Unauthorized users can withdraw or transfer assets from the contract
- **Contract Takeover**
    Attackes may gain ownership or admin access to the contract
- **Disruption of Functionality**
    Attackers may perform restricted actions like minting, freezing, or destroying tokens.
- **Damage to Reputation**
    Vulnerabilities can erode trust in the protocol or project.