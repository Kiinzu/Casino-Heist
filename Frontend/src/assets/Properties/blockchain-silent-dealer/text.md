In the dimly lit corners of the casino, whispers swirl about a certain game—one that always seems to favor the house. They call it the Silent Dealer’s table, where every bet feels like a trap. "The house never loses," they say. But here’s the twist: what if the game isn’t just rigged for the owner—but with the right sleight of hand, it could be rigged for you? What if, with just the right move, you could flip the script, slip into the dealer’s seat, and call yourself the new owner? Well, the odds may not matter now... because this time, you're playing to take control. &nbsp;  
&nbsp;  
## Low-Level Call
In Solidity, you can either use low-level calls such as *address.call()*, *address.callcode()*, *address.delegatecall()*, and *address.send()*, or maybe you are more familiar with this type *contractAddress.function()* since we used it more frequently. Low-level calls can be a good way to efficiently or arbitrarily make contract calls. However, we always need to be aware of the danger it brings. &nbsp;  
&nbsp;  
## How can Low-level Call be Unsafe?
As mentioned above, we need to make sure that the low-level calls we're making are actually secure, so let's learn what makes a low-level call unsafe. &nbsp;  
&nbsp;  
- **Unchecked call return value** &nbsp;  
    Some functions that are used to send ether might return something, in this case, it is either *send()* or *call()*. As the best practice said, the return value (bool) needs to be checked. This is because if the return value is not checked, the execution may resume even if the function call throws an error, which may be intended by an attacker to further exploit the contract. &nbsp;  
    &nbsp;  

    ```solidity
    // Best Practice for call
    (bool sent, ) = msg.sender.call{value: 1 ether}("");
    require(sent, "Failed to send Ether!");
    ```
    &nbsp;  

- **Unauthorized Function Execution** &nbsp;  
    Since *call()* takes raw data (byte representation), users can potentially trigger any function in the target contract, including private or administrative functions. &nbsp;  
    &nbsp;  

- **Successful call to non-existent contract** &nbsp;  
    Quoting from Solidity docs, EVM considers a call to a non-existing contract to always succeed. Solidity uses the *extcodesize* opcode to check whether the contract exists (containing code) and throw an exception if not. But like always, this check is not implemented in the low-level calls. &nbsp;  
    &nbsp;  

## Impact of Unsafe Low-Level Call
The impact of an unsafe low-level call varies based on the function and argument that the attacker can control. For example, if the address can be controlled and the data can be controlled (both from input), then the attacker could call another contract and execute the function on that contract on behalf of the vulnerable contract. &nbsp;  
&nbsp;  

## How a Function really called?
In Solidity, a function call is structured with a combination of the *Function Selector* or *bytes4 signature* and the argument required by the function. Let's have a look here at *putMeAsOwner(address)* and how to get the selector, and let's say we want to give the argument of the address of *0x0000000000000000000000000000000000000001* &nbsp;  
&nbsp;  
```solidity
function a() public pure returns(bytes memory, bytes memory, bytes32){
    return (
        abi.encodeWithSignature("putMeAsOwner(address)", 0x0000000000000000000000000000000000000001), 
        abi.encodeWithSelector(0x59911ffe, 0x0000000000000000000000000000000000000001),
        keccak256(abi.encodePacked("putMeAsOwner(address)"))
    );
}
```
&nbsp;  
The first two returns will give you what the function looks like, and the last one will give you the keccak256 from the function name and argument required by the function. Here is the result. &nbsp;  
&nbsp;  

```text
0:
bytes: 0x59911ffe0000000000000000000000000000000000000000000000000000000000000001
1:
bytes: 0x59911ffe0000000000000000000000000000000000000000000000000000000000000001
2:
bytes32: 0x59911ffeb0af05d1771826635151eacb03622304a92941feeb770a21b5becbdc
```
&nbsp;  
Notice that the *bytes32* return is a hash, we only take the first 4 bytes, and there you have a *function selector* for *putMeAsOwner(address)*, so next is how it is actually structured? Let's see the output *0* and *1*. &nbsp;  
&nbsp;  
```text
0x  59911ffe 0000000000000000000000000000000000000000000000000000000000000001
   |4 bytes||                          32 bytes                                       |
       ^                                   ^
    selector                        Argument (address)
```
&nbsp;  
So essentially, it first uses the 4 bytes signature followed by the argument in a 32-byte (slot) format. Well, if the function requires more arguments, it could be longer, but it will always be the multiple of 32/ slot.