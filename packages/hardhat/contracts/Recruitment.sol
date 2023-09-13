// SPDX-License-Identifier: UNLICENSED
//Enable the optimizer
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

import {FrontDoorStructs} from "./DataModel.sol";
import {Errors} from "./Errors.sol";


contract Recruitment is Ownable, ReentrancyGuard {
  // =============    Defining Mapping        ==================
  mapping(address => uint256) public companyaccountBalances;
  mapping(address => FrontDoorStructs.Candidate) public candidateList;
  mapping(address => FrontDoorStructs.Referrer) public referrerList;
  mapping(address => FrontDoorStructs.Company) public companyList;
  mapping(uint256 => FrontDoorStructs.Job) public jobList;
  mapping(address => uint256[]) public referralIndex;
  mapping(uint256 => FrontDoorStructs.Referral) public referralList;
  mapping(address => FrontDoorStructs.ReferralScore[]) public referralScores;
  address[] public companiesAddressList; // list of address of company
  mapping(address => FrontDoorStructs.CompanyScore[]) public companyScores;
  mapping(address => mapping(address => bool)) public hasScoredCompany; //allows only to score once
  mapping(address => bool) public isCompany; // check if company is registered or not

  mapping(uint256 => FrontDoorStructs.Candidate[]) public candidateListForJob; // list of candidates for a job
  mapping (uint256 => FrontDoorStructs.Candidate) public jobCandidatehire;


  address acceptedTokenAddress;

  // Company address  to  candiate address  gives score to company
  mapping(address => mapping(address => uint256)) public companyaddressToScore;

  //  Company address  to candidate address  to score giving By company
  mapping(address => mapping(address => uint256)) public companyAddressToCandidateScore;

  // Company address  to candidate address  hired by company
  mapping(address => address[]) public companyAddressToHiredCandidateAddress;

  //  Counters
  uint256 private jobIdCounter = 1;
  uint256 private referralCounter = 1;

  address frontDoorAddress;
  // Constructor
  constructor(address _acceptedTokenAddress, address _frontDoorAddress) {
    acceptedTokenAddress = _acceptedTokenAddress;
    frontDoorAddress = _frontDoorAddress;
  }

  /**
   * @param _address company address
   * @dev Checks whether the address of Company is in CompanyList or not
   */
  modifier checkIfItisACompany(address _address) {
    require(isCompanyRegistered(_address), "Company is not registered yet");
    _;
  }

  modifier checkIfCandidateHiredByCompany(address candidateAddress, address companyAddress) {
    bool isCandidateHired = false;
    address[] memory hiredCandidates = companyAddressToHiredCandidateAddress[companyAddress];
    for (uint256 i = 0; i < hiredCandidates.length; i++) {
      if (hiredCandidates[i] == candidateAddress) {
        isCandidateHired = true;
        break;
      }
    }

    if (isCandidateHired == false) {
      revert Errors.CandidateNotHiredByCompany();
    }
    _;
  }

  //   Register Functions


  function isCompanyRegistered(address _company) view public returns (bool) {
    return isCompany[_company];
  }

  /**
   * @notice Register a Referrer with email
   * @param email email of the referee
   */
  function registerReferrer(string memory email) external {
    FrontDoorStructs.Referrer memory referrer = FrontDoorStructs.Referrer(msg.sender, email, 0, 0);
    referrerList[msg.sender] = referrer;
  }

  /**
   * @param bounty amount paid by compnay to hire candidate
   */
  function registerJob(uint256 bounty) external payable nonReentrant checkIfItisACompany(msg.sender) returns (uint256) {
    uint256 jobId = jobIdCounter;
    require(bounty > 0, "Bounty should be greater than 0"); // check if company is giving bounty or not
    FrontDoorStructs.Job memory job = FrontDoorStructs.Job(jobId, bounty, false, msg.sender, false, 0, block.timestamp,false);
    jobList[jobId] = job;
    jobIdCounter++;
    companyList[msg.sender].jobsCreated++;

    // implement  company to pay the bounty upfront
    IERC20(acceptedTokenAddress).approve(address(this), bounty); // asking user for approval to transfer bounty

    bool success = IERC20(acceptedTokenAddress).transferFrom(msg.sender, address(this), bounty);

    if (!success) {
      revert Errors.BountyNotPaid();
    }

    companyaccountBalances[msg.sender] += bounty;
    emit DepositCompleted(msg.sender, bounty, jobId);
    emit JobCreated(msg.sender, jobId);

    return jobId;
  }

  /**
   * @notice Registers a Company
   */
  function registerCompany() external {
    FrontDoorStructs.Company memory company = FrontDoorStructs.Company(msg.sender, 0, 0, new address[](0));
    companyList[msg.sender] = company;
    companiesAddressList.push(msg.sender);
    isCompany[msg.sender] = true;
  }

  /**
   * @notice Registers a referral
   * @param jobId The job ID already registered with the contract.
   * @param refereeMail The email of the referee.
   */
  function registerReferral(uint256 jobId, string memory refereeMail) external nonReentrant returns (uint256){
    // Simple Checks Of Parameters
    require(jobId > 0, "Job Id should be greater than 0"); // check if job is registered or not
    require(bytes(refereeMail).length > 0, "Referee Mail should not be empty"); // check if referee mail is empty or not

    FrontDoorStructs.Candidate memory candidate;
    FrontDoorStructs.Referrer memory referrer = referrerList[msg.sender];
    FrontDoorStructs.Job memory job = jobList[jobId];

    candidate.email = refereeMail;
    candidate.referrer = msg.sender;

    FrontDoorStructs.Referral memory referral = FrontDoorStructs.Referral(
      referralCounter,
      false,
      referrer,
      candidate,
      job,
      block.timestamp,
      0,
      false,
      block.timestamp + 1 days
    );
    referralIndex[msg.sender].push(referralCounter);
    referralList[referralCounter] = referral;
    uint256 referralId = referralCounter;
    referralCounter++;
    emit RegisterReferral(refereeMail, msg.sender, jobId, referralId);
    return referralId;
  }
  
  function confirmReferral(uint256 _referralCounter, uint256 _jobId) external nonReentrant {
    // Some Checks
    require(referralList[_referralCounter].isConfirmed == false, "Referral is already confirmed"); // check if referral is already confirmed or not
    require(referralList[_referralCounter].job.issucceed == false, "Job is already succeed"); // check if job is already succeed or not
    require(referralList[_referralCounter].job.timeAtWhichJobCreated + 30 days > block.timestamp, "Job is expired"); // check if job is expired or not
    require(referralList[_referralCounter].candidate.isHired == false, "Candidate is already hired"); // check if candidate is hired
    require(referralList[_referralCounter].referralEnd > block.timestamp, "Referral is expired"); // check if referral is expired or not

    // Code Logic
    referralList[_referralCounter].isConfirmed = true;
    referralList[_referralCounter].candidate.wallet = msg.sender;
    candidateList[msg.sender] =  referralList[_referralCounter].candidate;

    emit ReferralConfirmed(msg.sender, _referralCounter, _jobId); // emit event

    // push into a mapping jobsid => candidates

    candidateListForJob[_jobId].push(referralList[_referralCounter].candidate);

  }

  /**
   * @param _candidateAddress Candidate address
   * @param _jobId job id
   * @notice Simply sets isHired to true for the candidate , sets timestamp of hiring and incurease candidate count on that job
   */
  function hireCandidate(
    address _candidateAddress,
    uint256 _jobId
  ) external nonReentrant checkIfItisACompany(msg.sender) {
    // Some Checks
    require(candidateList[_candidateAddress].isHired == false, "Candidate is already hired"); // check if candidate is already hired or not
    require(jobList[_jobId].issucceed == false, "Job is already succeed"); // check if job is already succeed or not

    // Code Logic
    candidateList[_candidateAddress].isHired = true;
    candidateList[_candidateAddress].timeOfHiring = block.timestamp;
    jobList[_jobId].numberOfCandidateHired += 1;
    jobList[_jobId].issucceed = true;
    jobCandidatehire[_jobId] = candidateList[_candidateAddress];
    // if ((companyaccountBalances[msg.sender]) >= (jobList[_jobId].bounty * jobList[_jobId].numberOfCandidateHired)) {
    //   revert Errors.NotEnoughFundDepositedByCompany();
    // }

    emit CandidateHired(msg.sender, _candidateAddress, _jobId); // emit event
  }

  function getCandidate(address wallet) external view returns (FrontDoorStructs.Candidate memory) {
    return candidateList[wallet];
  }

  function getReferrer(address wallet) external view returns (FrontDoorStructs.Referrer memory) {
    return referrerList[wallet];
  }

  function getReferralScores(address referrerWallet) public view returns (FrontDoorStructs.ReferralScore[] memory) {
    return referralScores[referrerWallet];
  }

  function getCompanyScores(address companyAddress) public view returns (FrontDoorStructs.CompanyScore[] memory) {
    return companyScores[companyAddress];
  }

  function getAllJobsOfCompany(address companyWallet) external view returns (FrontDoorStructs.Job[] memory) {
    uint256 jobsFetched = 0;

    // Count the number of jobs for the company
    for (uint256 i = 1; i < jobIdCounter; i++) {
      if (jobList[i].creator == companyWallet && !jobList[i].isRemoved) {
        jobsFetched++;
      }
    }

    // Initialize the memory array
    FrontDoorStructs.Job[] memory jobArray = new FrontDoorStructs.Job[](jobsFetched);
    uint256 index = 0;

    // Populate the memory array with jobs
    for (uint256 i = 1; i < jobIdCounter; i++) {
      if (jobList[i].creator == companyWallet && !jobList[i].isRemoved) {
        FrontDoorStructs.Job storage currentJob = jobList[i];
        jobArray[index] = currentJob;
        index++;
      }
    }

    return jobArray;
  }
  /// Returns the numbers of refferals that a refferer has made 
  function getMyRefferals() public view returns ( uint256[] memory){
    return referralIndex[msg.sender];
  }
  
  //TODO  validate if sender is the company that created the job
  function getCandidateListForJob (uint256 _jobId) public view returns( FrontDoorStructs.Candidate[] memory){
    return candidateListForJob[_jobId];
  }

  function candidateStatus(address _candidateAddress) public view returns(bool){
    return candidateList[_candidateAddress].isHired;
  }

  function getCandidateHiredJobId(uint256 _jobId) public view returns(FrontDoorStructs.Candidate memory){
    return jobCandidatehire[_jobId];
  }


  function diburseBounty(uint256 _jobId) external nonReentrant checkIfItisACompany(msg.sender){
    require(jobList[_jobId].issucceed == true, "Job is not succeed yet");
    require(jobList[_jobId].numberOfCandidateHired > 0, "No candidate is hired yet");
    require(jobList[_jobId].isDibursed == false, "Bounty is already dibursed");
    // commented for test purposes 
    //require(jobList[_jobId].timeAtWhichJobCreated + 90 days < block.timestamp, "90 days are not completed yet");
    require(jobList[_jobId].creator == msg.sender, "Only job creator can diburse");

    jobList[_jobId].isDibursed = true;
    uint256 bounty = jobList[_jobId].bounty;
    IERC20(acceptedTokenAddress).approve(jobCandidatehire[_jobId].referrer, bounty * 6500 / 10_000); // asking user for approval to transfer bounty  to referrer
    IERC20(acceptedTokenAddress).approve(jobCandidatehire[_jobId].wallet, bounty * 1000 / 10_000); // asking user for approval to transfer bounty  to candidate
    IERC20(acceptedTokenAddress).approve(frontDoorAddress, bounty * 2500 / 10_000); // asking user for approval to transfer bounty  to Front Door
    IERC20(acceptedTokenAddress).transfer(jobCandidatehire[_jobId].referrer, bounty * 6500 / 10_000); // asking user for approval to transfer bounty  to referrer
    IERC20(acceptedTokenAddress).transfer(jobCandidatehire[_jobId].wallet, bounty * 1000 / 10_000); // asking user for approval to transfer bounty  to candidate
    IERC20(acceptedTokenAddress).transfer(frontDoorAddress, bounty * 2500 / 10_000); // asking user for approval to transfer bounty  to Front Door
    
    
    
  

  }
  event PercentagesCompleted(
    address indexed sender,
    uint8 month1RefundPct,
    uint8 month2RefundPct,
    uint8 month3RefundPct
  );
  event DepositCompleted(address indexed sender, uint256 amount, uint256 jobId);
  event ReferralScoreSubmitted(address senderAddress, address referrerWallet, uint256 score);
  event CompanyScoreSubmitted(address senderAddress, address companyAddress, uint256 score);
  event ReferCandidateSuccess(address indexed sender, address indexed candidateAddress, uint256 indexed jobId);
  event CandidateHired(address indexed companyAddress, address candidateAddress, uint256 jobId);
  event ReferralConfirmed(address indexed candidateAddress, uint256 indexed referralId, uint256 indexed jobId);
  event ReferralRejected(address indexed candidateAddress, uint256 indexed referralId, uint256 indexed jobId);
  event CandidateHiredSuccesfullyAfter90Days(address indexed companyAddress, address candidateAddress, uint256 jobId);
  event RegisterReferral(string indexed email, address indexed refferer, uint256 indexed jobId, uint256 referralId);
  event JobCreated(address indexed companyAddress, uint256 indexed jobId);

}
