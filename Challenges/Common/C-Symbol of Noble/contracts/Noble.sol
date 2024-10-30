// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721URIStorage, ERC721} from "./ERC721/ERC721URIStorage.sol";

contract Noble is ERC721URIStorage{

    struct NobilityStatus{
        address NoblePeople;
        bool isNoble;
    }

    address public owner;
    address public administrator;
    uint256 public nobilityCounter = 1;
    mapping(address => uint256) public NobilityInPossession;
    mapping(uint256 => NobilityStatus) public NOBLENFT;

    modifier onlyOwner{
        require(msg.sender == owner, "Owner Only Function");
        _;
    }   

    modifier onlyAdministrator{
        require(msg.sender == administrator);
        _;
    }

    constructor() payable ERC721("Nobility", "NOBLE"){
        owner = msg.sender;
    }


    function setAdministrator(address _administrator) public onlyOwner{
        administrator = _administrator;
    }

    function mintNobility(address _to) public onlyAdministrator{
        uint256 newNobleNFT = nobilityCounter++;
        NobilityInPossession[_to] += 1;

        _safeMint(_to, newNobleNFT);
        NOBLENFT[newNobleNFT] = NobilityStatus({
            NoblePeople: _to,
            isNoble: true
        });
    }

    function getProofOfNobility(uint256 _id) public view returns (NobilityStatus memory){
        return NOBLENFT[_id];
    }

    function getNobilityInPossession(address _who) public view returns(uint256){
        return NobilityInPossession[_who];
    }

}