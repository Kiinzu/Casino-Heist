pragma solidity ^0.8.25;

contract Bar{

    address public owner;
    mapping(address => bool) public barMember;
    mapping(address => uint) public beerGlass;
    mapping(address => uint256) public balance;

    constructor() payable{
        owner = msg.sender;
    }

    function register() public payable isHuman{
        // You can register here, but still need the Onwer to add you in.
        require(msg.value >= 1e18, "Need 1 ether deposit.");
        balance[msg.sender] += msg.value;
    }

    function addMember(address _addMember) public isHuman onlyOwner(_addMember){
        require(balance[_addMember] > 0, "You need to deposit some money to become a member.");
        barMember[_addMember] = true;
    }

    function getDrink() public isHuman onlyMember{
        require(balance[msg.sender] > 0, "You need to deposit some money.");
        beerGlass[msg.sender]++;
    }

    modifier isHuman(){
        require(msg.sender == tx.origin, "Only Human Allowed in this Bar!");
        _;
    }

    modifier onlyOwner(address _addMember) {
        require(owner == msg.sender, "Only Owner can add Member!");
        _;
    }

    modifier onlyMember() {
        barMember[msg.sender] = true;
        _;
    }

    receive() external payable{
        balance[msg.sender] += msg.value;
    }
    
} 