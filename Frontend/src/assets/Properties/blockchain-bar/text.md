The *Bar* is very exclusive to *member-only*; registering to become one is very easy, but actually becoming one of them is not that easy, it seems. Do you think you got what it takes to become one? If so, go get yourself a drink! &nbsp;  
&nbsp;  
## Access Control Vulnerabilities

Access control vulnerability allow unathorized users to access or modify data or functions through security flaws, the flaw sometimes doesn't need to be extremely hard to find or something, sometimes it's just a tiny little mistake made by the developers, just like in Web2 with loose comparison. In a Solidity Smart Contract, the Access Control Vulnerability means that an unauthorized user may modify or access the contract's data or functions. &nbsp;  
&nbsp;  

Most of the time, the access control vulnerability is just the beginning of the real disaster, as it acts as the entry point to any other vulnerability such as denial of service, reentrancy, etc. &nbsp;  
&nbsp;  

## What are the causes?
Here are the common causes of access control vulnerabilities in the Solidity smart contract. &nbsp;  
&nbsp;  
1. **Missing *OnlyOwner* or Access Modifiers** &nbsp;  
    A function that is only restricted to some people needs to implement a secure modifier that declares that only those specific people can access it. &nbsp;  
    &nbsp;  
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
    &nbsp;  

2. **Incorrectly implemented Role-Based Access Control (RBAC)** &nbsp;  
    Misconfigured roles allow unauthorized users access to restricted functions. &nbsp;  
    &nbsp;  

3. **Privilege Escalation** &nbsp;  
    It's often a condition where regular users are able to escalate their privilege to *admin-level* access, such as owner privilege. &nbsp;  
    &nbsp;   

    ```solidity
    function becomeOwner() public {
        owner = msg.sender; // No restrictions!
    }
    ```
    &nbsp;  

4. **Hardcoding the Owner Address** &nbsp;  
    If the owner's address is hardcoded and cannot be updated, control can be lost if the owner's private key is compromised or lost. &nbsp;  
    &nbsp;  
5. **Overly Permissive *external* Functions** &nbsp;  
    Functions that are declared as *external* are accessible by anyone on-chain and can be mistakenly exposed if not properly secured with access control mechanisms. &nbsp;  
    &nbsp;  

6. **Lack of Proper Checks in Multi-Signature Wallets** &nbsp;  
    If a multi-signature wallet smart contract lacks strict checks, a malicious actor may exploit the process to gain access to restricted funds. &nbsp;  
    &nbsp;  
## Impact of Access Control Vulnerabilities
- **Loss of Funds** &nbsp;  
    Unauthorized users can withdraw or transfer assets from the contract. &nbsp;  
    &nbsp;  
- **Contract Takeover** &nbsp;  
    Attackers may gain ownership or admin access to the contract.  &nbsp;  
    &nbsp;  
- **Disruption of Functionality** &nbsp;  
    Attackers may perform restricted actions like minting, freezing, or destroying tokens. &nbsp;  
    &nbsp;  
- **Damage to Reputation** &nbsp;  
    Vulnerabilities can erode trust in the protocol or project.