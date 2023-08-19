
const hre = require("hardhat");

async function main() {

  console.log("Deploying contracts... FrontDoorToken");
  const FrontDoorToken = await hre.ethers.deployContract("FrontDoorToken");
  await FrontDoorToken.waitForDeployment();
  console.log("Deploying contracts... FrontDoorToken Ended. Going to deploy Recruitment");

  console.log(
    `FrontDoor Token  Contract Deployed  to  ${FrontDoorToken.target}`
  );

  
  console.log("Deploying contracts... Recruitment");
  const Recruitment = await hre.ethers.deployContract("Recruitment", [FrontDoorToken.target]);
  await Recruitment.waitForDeployment();
  console.log("Deploying contracts... Recruitment Ended.");

  console.log(
    `Recruitment Contract Deployed  to  ${Recruitment.target}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
