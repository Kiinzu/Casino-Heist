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
