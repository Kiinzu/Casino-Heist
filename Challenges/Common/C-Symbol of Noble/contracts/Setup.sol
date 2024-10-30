// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Administrator.sol";
import "./Noble.sol";

contract Setup{
    Noble public noble;
    Administrator public admin;

    constructor() {
        noble = new Noble();
        admin = new Administrator(address(noble), 1 ether);
        noble.setAdministrator(address(admin));
    }

    function isSolved() public view returns(bool){
        return admin.trueNoble();
    }
}