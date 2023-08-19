// SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";

  contract FrontDoorToken is ERC20, Ownable {
    
      // the max total supply is 1000000 for FrontDoor Tokens
      uint256 public constant maxTotalSupply = 1000000 * 10**18;

      constructor() ERC20("FroontDoor Token", "FNDR") {
        _mint(msg.sender, maxTotalSupply);
      }
      
      /**
        * @dev withdraws all ETH and tokens sent to the contract
        * Requirements: 
        * wallet connected must be owner's address
        */
      function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
      }

      // Function to receive Ether. msg.data must be empty
      receive() external payable {}

      // Fallback function is called when msg.data is not empty
      fallback() external payable {}
  }