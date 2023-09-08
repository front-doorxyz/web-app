import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, user, user2] = await ethers.getSigners();

    const FrontDoorToken: ContractFactory = await ethers.getContractFactory("FrontDoorToken");
    const frontDoorToken: Contract = await FrontDoorToken.deploy();
    await frontDoorToken.deployed();
    const frontDoorTokenAddress = frontDoorToken.address;

    const Faucet: ContractFactory = await ethers.getContractFactory("FrontDoorFaucet");
    const faucet: Contract = await Faucet.deploy(frontDoorTokenAddress);
    const faucetAddress = faucet.address;
    const value = ethers.utils.parseEther("500000");
    await frontDoorToken.transfer(faucetAddress, value);

    return { frontDoorToken, faucet, owner, user, user2 };
  }

  describe("Deployment", function () {
    it("Deploy", async function () {
      const { faucet, owner } = await loadFixture(deployFixture);
      const address = await faucet.owner();
      expect(address).to.equal(owner.address);
    });
    it("Balance of Faucet should be 500000", async function () {
      const { frontDoorToken, faucet } = await loadFixture(deployFixture);
      const balance = await frontDoorToken.balanceOf(faucet.address);
      expect(balance).to.equal(ethers.utils.parseEther("500000"));
    });
  });
  describe("Request Tokens", function () {
    it("User should be able to request tokens to Faucet", async function () {
      const { frontDoorToken, faucet, owner, user } = await loadFixture(deployFixture);
      const balanceBefore = await frontDoorToken.balanceOf(user.address);
      await faucet.connect(user).requestTokens(ethers.utils.parseEther("10000"));
      const balanceAfter = await frontDoorToken.balanceOf(user.address);
      expect(balanceAfter).to.equal(balanceBefore + ethers.utils.parseEther("10000"));
    });
    it("User should not be able to request tokens after timelock expires", async function () {
      const { frontDoorToken, faucet, owner, user } = await loadFixture(deployFixture);
      const balanceBefore = await frontDoorToken.balanceOf(user.address);
      await faucet.connect(user).requestTokens(ethers.utils.parseEther("10000"));
      const balanceAfter = await frontDoorToken.balanceOf(user.address);
      expect(balanceAfter).to.equal(balanceBefore + ethers.utils.parseEther("10000"));
      await expect(faucet.connect(user).requestTokens(ethers.utils.parseEther("10000"))).to.revertedWith(
        "You can only request once per day",
      );
    });
    it("If faucet runs out of tokens, user should not be able to request tokens", async function () {
      const { frontDoorToken, faucet, owner, user, user2 } = await loadFixture(deployFixture);
      const balanceBefore = await frontDoorToken.balanceOf(user.address);
      await faucet.connect(user).requestTokens(ethers.utils.parseEther("500000"));
      const balanceAfter = await frontDoorToken.balanceOf(user.address);
      expect(balanceAfter).to.equal(balanceBefore + ethers.utils.parseEther("500000"));
      const balanceOfFaucet = await faucet.getBalance();
      expect(balanceOfFaucet).to.equal(0);
      await expect(faucet.connect(user2).requestTokens(ethers.utils.parseEther("2500000"))).to.revertedWith(
        "Not enough tokens in the faucet",
      );
    });
  });
});
