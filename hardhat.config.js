require("@nomicfoundation/hardhat-toolbox");
 require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",

  
  networks:{
    linea: {
      url: "https://linea-goerli.infura.io/v3/0f71ce104c5243a0883f996c1020402f",
      accounts: ["edd0a374fb70992c742af5ff48618adf91eb6f97656be5ed122a6fc0ff3aed3e"],
      gas: "auto",
      gasPrice: 80000000000,
      allowUnlimitedContractSize: true
    },
  
  }
};
