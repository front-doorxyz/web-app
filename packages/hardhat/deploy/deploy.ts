import { Contract, ContractFactory } from "ethers";
import hre from "hardhat";

const ethers = hre.ethers;

// async function deployContract() {
//   await hre.run("compile"); // We are compiling the contracts using subtask
//   const [owner, company, referrer, referree, frontDoorWallet] = await ethers.getSigners();

//   console.log("Deploying contracts with the account:", owner.address); // We are printing the address of the deployer

//   const DummyToken: ContractFactory = await ethers.getContractFactory("FrontDoorToken");
//   const dummyToken: Contract = await DummyToken.deploy();
//   await dummyToken.deployed();
//   const tkns = ethers.utils.parseEther("1000");
//   await dummyToken.transfer(company.getAddress(), tkns);
//   await dummyToken.transfer(referrer.getAddress(), tkns);
//   await dummyToken.transfer(referree.getAddress(), tkns);
//   const Recruitment: ContractFactory = await ethers.getContractFactory("Recruitment");
//   const recruitment: Contract = await Recruitment.deploy(dummyToken.address, frontDoorWallet.address);
//   await recruitment.deployed();
//   console.log("DummyToken deployed to:", dummyToken.address);
//   console.log("Recruitment deployed to:", recruitment.address);
// }

// module.exports = deployContract;


import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("YourContract", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

const deployRecruitmentContract: DeployFunction =async function (hre: HardhatRuntimeEnvironment) {

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const FrontDoorToken = await deploy("FrontDoorToken",{
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  })
 
 
  await deploy("Recruitment", {
    from: deployer,
    args: [FrontDoorToken.address,"0xf35239d2c73c1f0e1E5ee8D174E0479a4040c26C"],
    log: true,
    autoMine: true,
  });

  const recruitmentContract = await hre.ethers.getContract("Recruitment", deployer);
  
};

export default deployRecruitmentContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployRecruitmentContract.tags = ["Recruitment"];
