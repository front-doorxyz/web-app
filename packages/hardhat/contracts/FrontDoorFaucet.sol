// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FrontDoorFaucet is Ownable {
    // FNDR token address
    address public FNDRAddress;

    mapping(address => uint) lastRequest;

    constructor(address _ERC20Address) {
        FNDRAddress = _ERC20Address;
    }

    function requestTokens(uint _amount) external {
        require(
            lastRequest[msg.sender] + 1 days < block.timestamp,
            "You can only request once per day"
        );
        require(
            IERC20(FNDRAddress).balanceOf(address(this)) >= _amount,
            "Not enough tokens in the faucet"
        );
        lastRequest[msg.sender] = block.timestamp;
        IERC20(FNDRAddress).transfer(msg.sender, _amount);
        emit TokensTransfered(msg.sender, _amount);
    }

    function getBalance() external view returns (uint) {
        return IERC20(FNDRAddress).balanceOf(address(this));
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    event TokensTransfered(address indexed user, uint256 amount);
}
