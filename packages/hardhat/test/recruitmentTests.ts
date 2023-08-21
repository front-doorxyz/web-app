import { getReferrer } from "./../../nextjs/services/APIs/smartContract";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import crypto from "crypto";
import { BigNumber, Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Recruitment", () => {
  const fixture = async () => {
    const [owner, company, referrer, referree, frontDoorWallet] = await ethers.getSigners();
    const DummyToken: ContractFactory = await ethers.getContractFactory("FrontDoorToken");
    const dummyToken: Contract = await DummyToken.deploy();
    await dummyToken.deployed();
    const tkns = ethers.utils.parseEther("1000");
    await dummyToken.transfer(company.getAddress(), tkns);
    await dummyToken.transfer(referrer.getAddress(), tkns);
    await dummyToken.transfer(referree.getAddress(), tkns);
    const Recruitment: ContractFactory = await ethers.getContractFactory("Recruitment");
    const recruitment: Contract = await Recruitment.deploy(dummyToken.address, frontDoorWallet.address);
    await recruitment.deployed();
    return { dummyToken, recruitment, owner, company, referrer, referree };
  };

  describe("Initial deploy", () => {
    it("Owner in contract should be the deployer", async () => {
      const { recruitment, owner } = await loadFixture(fixture);
      const address = await recruitment.owner();
      expect(address).to.equal(owner.address);
    });
  });

  describe("Register Company", () => {
    it("Register company", async () => {
      const { recruitment, company } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
    });
    it("Register a job failed with no allowance", async () => {
      const { recruitment, company } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
      const bounty = ethers.utils.parseEther("500");
      await expect(recruitment.connect(company).registerJob(bounty)).to.rejectedWith("ERC20: insufficient allowance");
    });
    it("Register a job", async () => {
      const { dummyToken, recruitment, company } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
      const bounty = ethers.utils.parseEther("750");
      await dummyToken.connect(company).approve(recruitment.address, bounty);
      const jobId = await recruitment.connect(company).callStatic.registerJob(bounty);
      expect(jobId).to.equal(1);
    });
    it("Register a job (no callstatic), company account balance should increase", async () => {
      const { dummyToken, recruitment, company } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
      const bounty = ethers.utils.parseEther("150");
      await dummyToken.connect(company).approve(recruitment.address, bounty);
      const jobId = await recruitment.connect(company).registerJob(bounty);
      await jobId.wait();
      const companyBal = await recruitment.companyaccountBalances(company.address);
      expect(bounty).to.equal(companyBal);
    });
    it("Retrieve all jobs from company, should retreive 2 jobs", async () => {
      const { dummyToken, recruitment, company } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
      const bounty = ethers.utils.parseEther("150");
      await dummyToken.connect(company).approve(recruitment.address, bounty);
      const jobId = await recruitment.connect(company).registerJob(bounty);
      await jobId.wait();
      const companyBal = await recruitment.companyaccountBalances(company.address);
      expect(bounty).to.equal(companyBal);
      const bounty2 = ethers.utils.parseEther("150");
      await dummyToken.connect(company).approve(recruitment.address, bounty2);
      const jobId2 = await recruitment.connect(company).registerJob(bounty2);
      await jobId2.wait();
      const companyBal2 = await recruitment.companyaccountBalances(company.address);
      expect(ethers.utils.parseEther("300")).to.equal(companyBal2);
      const jobs = await recruitment.getAllJobsOfCompany(company.address);
      expect(jobs.length).to.equal(2);
    });
    it("Retrieve all jobs when no job is created", async () => {
      const { recruitment, company } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
      const jobs = await recruitment.getAllJobsOfCompany(company.address);
      expect(jobs.length).to.equal(0);
    });
  });
  describe("Register Referrer", () => {
    it("Register referrer", async () => {
      const { recruitment, referrer } = await loadFixture(fixture);
      const email: string = "john.doe@mail.com";
      await recruitment.connect(referrer).registerReferrer(email);
      const referrerData = await recruitment.getReferrer(referrer.address);
      expect(referrerData.email).to.equal(email);
    });
    it("Register referree with same email", async () => {
      const { recruitment, referrer,referree } = await loadFixture(fixture);
      const email: string = "john.doe@mail.com";
      await recruitment.connect(referrer).registerReferrer(email);
      const referrerData = await recruitment.getReferrer(referrer.address);
      expect(referrerData.email).to.equal(email);
      await recruitment.connect(referree).registerReferrer(email);
      const referreeData = await recruitment.getReferrer(referree.address);
    });
  });
  describe("Register Referral", () => {
    it("Register referral", async () => {
      const { dummyToken, recruitment, company, referrer } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
      const bounty = ethers.utils.parseEther("750");
      await dummyToken.connect(company).approve(recruitment.address, bounty);
      const jobId = await recruitment.connect(company).registerJob(bounty);
      await jobId.wait();
      const email: string = "john.doe@mail.com";
      await recruitment.connect(referrer).registerReferrer(email);
      const referrerData = await recruitment.getReferrer(referrer.address);
      expect(referrerData.email).to.equal(email);
      const emailReferral: string = "referralemail@mail.com";
      await recruitment.connect(referrer).registerReferral(1, emailReferral);
      const jobs = await recruitment.getAllJobsOfCompany(company.address);
    });
    it("Refer a candidate and apply for a job", async () => {
      const { dummyToken, recruitment, company, referrer, referree } = await loadFixture(fixture);
      await recruitment.connect(company).registerCompany();
      const companyStruct = await recruitment.companyList(company.address);
      expect(company.address).to.equal(companyStruct.wallet);
      const bounty = ethers.utils.parseEther("100");
      await dummyToken.connect(company).approve(recruitment.address, bounty);
      const jobId = await recruitment.connect(company).registerJob(bounty);
      console.log("transaction: ", jobId);
      const receipt = await jobId.wait();
      console.log("receipt: ", receipt.events);

      const email: string = "john.doe@mail.com";
      await recruitment.connect(referrer).registerReferrer(email);
      const referrerData = await recruitment.getReferrer(referrer.address);
      expect(referrerData.email).to.equal(email);
      const emailReferral: string = "referralemail@mail.com";
      const tx = await recruitment.connect(referrer).registerReferral(1, emailReferral);
      await tx.wait();
      const jobsReffers = await recruitment.connect(referree).confirmReferral(1, 1);
      const data2 = await jobsReffers.wait();
      const candadidatesForJob = await recruitment.getCandidateListForJob(1);
      const hire = await recruitment.connect(company).hireCandidate(referree.address, 1);
      await hire.wait();
      await recruitment.connect(company).diburseBounty(1);

    });
  });
});
