Knowing that the problem is very simple, the modifier `onlyMember()` doesn't actually checking for the `msg.sender` is a member or not, but it just make the `msg.sender` a member! To fix this issue we can just modify the modifier to become like this

```solidity
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
        // Change this to require to perform the check
        require(barMember[msg.sender] == true, "only member is allowed to enter!");
        _;
    }

    receive() external payable{
        balance[msg.sender] += msg.value;
    }
    
}
```

by adding the proper check for `barMember` at `onlyMember()` we can make sure that only the `owner` can approve a member registration and make them a member once it done!