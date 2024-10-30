// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721URIStorage, ERC721} from "./ERC721/ERC721URIStorage.sol";

contract Privileged is ERC721URIStorage{

    error Privileged_NotHighestPrivileged();
    error Privileged_NotManager();

    struct casinoOwnerChallenger{
        address challenger;
        bool isRich;
        bool isImportant;
        bool hasConnection;
        bool hasVIPCard;
    }

    address public challengeManager;
    address public casinoOwner;
    uint256 public challengerCounter = 1;

    mapping(uint256 challengerId => casinoOwnerChallenger) public Requirements;

    modifier onlyOwner() {
        if(msg.sender != casinoOwner){
            revert Privileged_NotHighestPrivileged();
        }
        _;
    }

    modifier onlyManager() {
        if(msg.sender != challengeManager){
            revert Privileged_NotManager();
        }
        _;
    }

    constructor() payable ERC721("Casino Owner", "COS"){
        casinoOwner = msg.sender;
    }

    function setManager(address _manager) public onlyOwner{
        challengeManager = _manager;
    }

    function fireManager() public onlyOwner{
        challengeManager = address(0);
    }

    function setNewCasinoOwner(address _newCasinoOwner) public onlyManager{
        casinoOwner = _newCasinoOwner;
    }

    function mintChallenger(address to) public onlyManager{
        uint256 newChallengerId = challengerCounter++;
        _safeMint(to, newChallengerId);

        Requirements[newChallengerId] = casinoOwnerChallenger({
            challenger: to,
            isRich: false,
            isImportant: false,
            hasConnection: false,
            hasVIPCard: false
        });
    }

    function upgradeAttribute(uint256 Id, bool _isRich, bool _isImportant, bool _hasConnection, bool _hasVIPCard) public onlyManager {
        Requirements[Id] = casinoOwnerChallenger({
            challenger: Requirements[Id].challenger,
            isRich: _isRich,
            isImportant: _isImportant,
            hasConnection: _hasConnection,
            hasVIPCard: _hasVIPCard
        });
    }

    function resetAttribute(uint256 Id) public onlyManager{
        Requirements[Id] = casinoOwnerChallenger({
            challenger: Requirements[Id].challenger,
            isRich: false,
            isImportant: false,
            hasConnection: false,
            hasVIPCard: false
        });
    }

    function getRequirmenets(uint256 Id) public view returns (casinoOwnerChallenger memory){
        return Requirements[Id];
    }

    function getNextGeneratedId() public view returns (uint256){
        return challengerCounter;
    }

    function getCurrentChallengerCount() public view returns (uint256){
        return challengerCounter - 1;
    }
}