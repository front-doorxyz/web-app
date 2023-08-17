
const hre = require("hardhat");

async function main() {

  const lock = await hre.ethers.deployContract("Recruitment", ['0x6d8727B664D3f877de683F836E75EB2de47FD197' , 20,30,50]);

  await lock.waitForDeployment();

  console.log(
    `Deployed to  ${lock.target}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
