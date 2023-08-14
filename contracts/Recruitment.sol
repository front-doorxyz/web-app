// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import { FrontDoorStructs } from "./DataModel.sol";
import { Errors } from "./Errors.sol";
import {Event} from "./Events.sol";

contract Recruitment  is Ownable , ReentrancyGuard {

   // =============    Defining Mapping        ================== 
    mapping(address =>  uint256) public companyaccountBalances;
    mapping(address => uint8[3][]) public accountMonthlyRefundPcts;
    mapping(address => uint8[]) public accountCompleteDeposits;
    mapping(address => uint)public balances;
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

    address acceptedTokenAddress;
   
     // Company address mapped to  candiate address which gives score to the company 
    mapping(address => mapping(address => uint256)) private companyaddressToScore; 
  
   //  Company address mapped to address of candidate to score giving By company 
    mapping(address => mapping(address => uint256)) private  companyAddressToCandidateScore;
  
   // Company address mapped to address of candidate hired by company
    mapping(address => address[]) private companyAddressToHiredCandidateAddress;

    
     // =============        Defininf Counters    ================= 
    uint256  private jobIdCounter;
    uint256  private referralCounter;

   // Defining Constructor
    constructor(address _acceptedTokenAddress) {
      acceptedTokenAddress = _acceptedTokenAddress;
    }

    /** ==============          Modifiers          ===================== */

    /**
     * @param _address address of the company
     * @dev Checks whether the address of Company is in CompanyList or not
     */
    modifier  checkIfItisACompany(address _address) {
      bool isCompany = false;

        for(uint256 i = 0 ; i < companiesAddressList.length; i++){
            if(companiesAddressList[i] == _address){
              isCompany = true;
              break;         
            }
        }

        if(isCompany == false){
          revert Errors.CompanyNotListed();
        }
        _;
    }

    modifier checkIfCandidateHiredByCompany(address candidateAddress , address companyAddress){
      bool isCandidateHired = false;
      address[] memory hiredCandidates = companyAddressToHiredCandidateAddress[companyAddress];
      for(uint256 i = 0 ; i < hiredCandidates.length; i++){
        if(hiredCandidates[i] == candidateAddress){
          isCandidateHired = true;
          break;
        }
      }

      if(isCandidateHired == false){
        revert Errors.CandidateNotHiredByCompany();
      }
      _;
    }
    
     // ============    Register Functions       ========================


  // ============================================================================
    /**
     * @notice Register a Candidate with email 
     * @param email email of the candidate
     */
   function registerCandidate(string memory email)  external {
    FrontDoorStructs.Candidate memory candidate = FrontDoorStructs.Candidate(msg.sender, email,0,false,0,false,false);
    candidateList[msg.sender] = candidate;
  } 
  // ============================================================================
    
    /**
     * @notice Register a Referrer with email
     * @param email email of the referee
     */
    function registerReferrer(string memory email)  external {
        FrontDoorStructs.Referrer memory referrer = FrontDoorStructs.Referrer(msg.sender, email,0,0);
        referrerList[msg.sender] = referrer;
    }

  // ============================================================================
  /**
   * @param bounty amount paid by compnay to hire candidate 
   */
  function registerJob(uint256 bounty) external payable nonReentrant checkIfItisACompany(msg.sender) returns(uint256) {
    uint256 jobId = jobIdCounter;
    require(bounty > 0 , "Bounty should be greater than 0"); // check if company is giving bounty or not
    FrontDoorStructs.Job memory job = FrontDoorStructs.Job(jobId, bounty, false, msg.sender,false,0,block.timestamp);
    jobList[jobId] = job;
    jobIdCounter++;
    companyList[msg.sender].jobsCreated++;
    
    // implement  company to pay the bounty upfront
    ERC20(acceptedTokenAddress).approve( address(this) , bounty); // asking user for approval to transfer bounty

    require(ERC20(acceptedTokenAddress).allowance(msg.sender, address(this)) >= bounty , "Bounty not approved"); // check if bounty is approved or not
    
    bool success =  ERC20(acceptedTokenAddress).transferFrom(msg.sender, address(this), bounty);

    if(!success){
      revert Errors.BountyNotPaid();
    }
    
    companyaccountBalances[msg.sender] += bounty;
    emit Event.DepositCompleted(msg.sender , bounty);

    return jobId;
  }

  // ============================================================================

 /**
    * @notice Flags a job as deleted. Sets the status of a job from `true` to `false`
    * @param jobId The ID of a job to be marked as deleted.
    * @dev Only the creator of a job can delete it.
    * @dev ==============      Have to review this function more ====================
  */
  function deleteJob(uint256 jobId) external payable nonReentrant checkIfItisACompany(msg.sender) {
    FrontDoorStructs.Job memory job = jobList[jobId];
    if (job.creator != msg.sender) revert Errors.OnlyJobCreatorAllowedToDelete(); 
    if (job.isRemoved == true) revert Errors.JobAlreadyDeleted();

    require(job.issucceed == true , "Job is not succeed yet"); // check if job is succeed or not

    job.isRemoved = true;
    delete jobList[jobId]; // deleting a job from jobList
  }

  // ============================================================================

  /**
   * @notice Registers a Company
   */
  function registerCompany()  external {
    FrontDoorStructs.Company memory company = FrontDoorStructs.Company(msg.sender,0,0,new address[](0));
    companyList[msg.sender] = company;
    companiesAddressList.push(msg.sender);
  }

  // ============================================================================

   /**
    * @notice Registers a referral
    * @param jobId The job ID already registered with the contract.
    * @param refereeMail The email of the referee.
  */
  function registerReferral(uint256 jobId, string memory refereeMail) nonReentrant external {

    // Simple Checks Of Parameters
    require(jobId > 0 , "Job Id should be greater than 0"); // check if job is registered or not
    require(bytes(refereeMail).length > 0  , "Referee Mail should not be empty"); // check if referee mail is empty or not

    FrontDoorStructs.Candidate memory candidate;
    FrontDoorStructs.Referrer memory referrer = referrerList[msg.sender];
    FrontDoorStructs.Job memory job = jobList[jobId];
    
    candidate.email =  refereeMail;
    FrontDoorStructs.Referral memory referral = FrontDoorStructs.Referral(referralCounter, false, referrer, candidate, job,block.timestamp,0,false,block.timestamp + 1 days);

    referralIndex[msg.sender].push(referralCounter);
    referralList[referralCounter] = referral;
    referralCounter++;
  }

  // ============================================================================

  function submitReferralScore( uint256 score,address referrerWallet) nonReentrant public checkIfItisACompany(msg.sender) returns  (bytes32) {

    FrontDoorStructs.ReferralScore memory newReferralScore = FrontDoorStructs.ReferralScore(score, msg.sender);
    
    referralScores[referrerWallet].push(newReferralScore);
    emit Event.ReferralScoreSubmitted(msg.sender, referrerWallet, score);

    companyAddressToCandidateScore[msg.sender][referrerWallet] = score;
    
    return keccak256(abi.encodePacked(score, msg.sender, referrerWallet));
  }

  // ============================================================================

  /**
   * @param score score given to the company
   * @param companyAddress company address 
   */
   function submitCompanyScore(uint256 score,address companyAddress) nonReentrant  checkIfCandidateHiredByCompany(msg.sender ,companyAddress) public returns (bytes32) {
    require(!hasScoredCompany[msg.sender][companyAddress], "You have already scored this company");
    FrontDoorStructs.CompanyScore[] storage scores = companyScores[companyAddress];
    FrontDoorStructs.CompanyScore memory newScore = FrontDoorStructs.CompanyScore(score, msg.sender);
    scores.push(newScore);
    hasScoredCompany[msg.sender][companyAddress] = true;
    companyaddressToScore[companyAddress][msg.sender] = score; // mapping of company address to score given by candidate
    emit Event.CompanyScoreSubmitted(msg.sender, companyAddress, score);
    return keccak256(abi.encodePacked(score, msg.sender, companyAddress));
  }


// ==========================================================================================================

  /**
   * @param _candidateAddress Address of candidate
   * @param _jobId Job id which referr is referring too
   * @notice Refer a candidate to a job
   */
  function ReferCandidate(address _candidateAddress , uint256 _jobId) nonReentrant external  {
    // --- Simple  Checks
    require(_candidateAddress != address(0) , "Candidate address should not be empty"); // check if candidate address is empty or not
    require(_jobId > 0 , "Job Id should be greater than 0"); // check if job id is greater than 0 or not
    require(_jobId < jobIdCounter , "Job Id should be less than job id counter"); // check if job id is less than job id counter or not
    require(jobList[_jobId].timeAtWhichJobCreated + 30 days > block.timestamp , "Job is expired"); // check if job is expired or not

    // Check if the referrer has already referred the candidate for the specified job
    for (uint256 i = 0; i < referralIndex[msg.sender].length; i++) {
        uint256 referralId = referralIndex[msg.sender][i];
        FrontDoorStructs.Referral memory existingReferral = referralList[referralId];
        if (existingReferral.referrer.wallet == msg.sender && existingReferral.job.id == _jobId) {
            revert Errors.SameCandidateCannotBeReferredTwice();
        }
    }
  // ---- Code logic 
      FrontDoorStructs.Candidate memory candidate = candidateList[_candidateAddress];
      FrontDoorStructs.Job memory job = jobList[_jobId];
      FrontDoorStructs.Referrer memory referrer = referrerList[msg.sender];
      FrontDoorStructs.Referral memory referral = FrontDoorStructs.Referral(referralCounter, false, referrer, candidate, job,block.timestamp,0,false,block.timestamp + 1 days);
      referralIndex[msg.sender].push(referralCounter);
      referralList[referralCounter] = referral;
      referralCounter++;
      emit Event.ReferCandidateSuccess(msg.sender,_candidateAddress,_jobId); // emit event

  }

  // ============================================================================

  function confirmReferral(uint256 _referralCounter , uint256 _jobId) external nonReentrant{
    // Some Checks 
    require(referralList[_referralCounter].isConfirmed == false , "Referral is already confirmed"); // check if referral is already confirmed or not
    require(referralList[_referralCounter].job.issucceed == false , "Job is already succeed"); // check if job is already succeed or not
    require(referralList[_referralCounter].job.timeAtWhichJobCreated + 30 days > block.timestamp , "Job is expired"); // check if job is expired or not
    require(referralList[_referralCounter].candidate.wallet == msg.sender , "Candidate is already hired"); // check if candidate is calling this function or 
    require(referralList[_referralCounter].referralEnd > block.timestamp , "Referral is expired"); // check if referral is expired or not

    // Code Logic
    referralList[_referralCounter].isConfirmed = true;
    emit Event.ReferralConfirmed(msg.sender , _referralCounter , _jobId); // emit event
  }

  // ============================================================================



  // do confirm referral function by candidate , mappend that refrral id to referrer  address , job id to job , 
  // loopholes ,, anyone can call the confirm referrl function as paramters are public 


  // ============================================================================
  /**
   * @param _candidateAddress Candidate address
   * @param _jobId job id 
   * @notice Simply sets isHired to true for the candidate , sets timestamp of hiring and incurease candidate count on that job
   */
  function hireCandidate(address _candidateAddress , uint256 _jobId) nonReentrant  checkIfItisACompany(msg.sender) external {
    // Some Checks 
    require(candidateList[_candidateAddress].isHired == false , "Candidate is already hired"); // check if candidate is already hired or not
    require(jobList[_jobId].issucceed == false , "Job is already succeed"); // check if job is already succeed or not

    // Code Logic
    candidateList[_candidateAddress].isHired = true;
    candidateList[_candidateAddress].timeOfHiring = block.timestamp;
    jobList[_jobId].numberOfCandidateHired += 1;

    if((companyaccountBalances[msg.sender]) >= (jobList[_jobId].bounty * jobList[_jobId].numberOfCandidateHired)) {
        revert Errors.NotEnoughFundDepositedByCompany();
    }

    emit Event.CandidateHired(msg.sender,_candidateAddress,_jobId); // emit event
  }

  // ============================================================================
    /**
   * @param _candidateAddress Candidate address
   * @param _jobId job id 
   * @notice sets jobConfirmed to true for the candidate
   * sets candidate score and company score , check everything should happen after 90 days of hiring
   */
  function hireCandidateSuccefullyAfter90Days(address _candidateAddress , uint256 _jobId) nonReentrant  checkIfItisACompany(msg.sender) external {
    // Some Checks 
    require(candidateList[_candidateAddress].isHired == true , "Candidate is already hired"); // check if candidate is already hired or not
    require(jobList[_jobId].issucceed == false , "Job is already succeed"); // check if job is already succeed or not
    require(candidateList[_candidateAddress].timeOfHiring + 90 days >  block.timestamp , "90 days are not passed yet"); // check if 90 days are passed or not

    // Code Logic
    candidateList[_candidateAddress].isHired = true;
    candidateList[_candidateAddress].timeOfHiring = block.timestamp;
    jobList[_jobId].numberOfCandidateHired += 1;
    candidateList[_candidateAddress].jobConfirmed = true;

    if((companyaccountBalances[msg.sender]) >= (jobList[_jobId].bounty * jobList[_jobId].numberOfCandidateHired)) {
        revert Errors.NotEnoughFundDepositedByCompany();
    }

    emit Event.CandidateHiredSuccesfullyAfter90Days(msg.sender,_candidateAddress,_jobId); // emit event
  }

  /* *  -----------------------------          Set Data/Var Functions          ----------------------------- */

  // ============================================================================
  /**
   * @notice set the percentages for monthy refund pact 
   * @dev Got getting this function to work?
   */
    function setPercentages(
    uint8 month1RefundPct
    ,uint8 month2RefundPct
    ,uint8 month3RefundPct
  ) external onlyOwner nonReentrant {
    require(month1RefundPct >= 0 && month1RefundPct <= 100, "Month 1 percentage between 0 and 100!");
    require(month2RefundPct >= 0 && month2RefundPct <= 100, "Month 2 percentage between 0 and 100!");
    require(month3RefundPct >= 0 && month3RefundPct <= 100, "Month 3 percentage between 0 and 100!");

    // implement check if total percentage is 100 or not
    require(month1RefundPct + month2RefundPct + month3RefundPct == 100, "Total percentage should be 100%!") ;
    emit Event.PercentagesCompleted(msg.sender, month1RefundPct, month2RefundPct, month3RefundPct);
  }

  // ============================================================================

  /** =============    View/Pure/Returns Functions       ============================= */

     // ============================================================================
    /**
    * @notice Getter function of Candidate.
    * @param wallet The wallet address of a candidate to be fetched from the mapping
    * @return Candidate The type of FrontDoorStruct.Candidate 
  */  
  function getCandidate(address wallet) external view returns(FrontDoorStructs.Candidate memory) {
    return candidateList[wallet];
  }

  // ============================================================================
  /**
    * @notice Getter function of Referrer.
    * @param wallet The wallet address of a referrer to be fetched from the mapping
    * @return Referrer The type of FrontDoorStruct.Referrer 
  */
  function getReferrer(address wallet) external view returns(FrontDoorStructs.Referrer memory) {
    return referrerList[wallet];
  }

  // ============================================================================
  /**
   * @notice Getter function of referrer score .
   * @param referrerWallet address of the referrer
   */
  function getReferralScores(address referrerWallet) public view returns (FrontDoorStructs.ReferralScore[] memory) {
    return referralScores[referrerWallet];
  }
  // ============================================================================
    /**
   * @notice Getter function of company score .
   * @param companyAddress address of the company
   */
  function getCompanyScores(address companyAddress) public view returns (FrontDoorStructs.CompanyScore[] memory) {
    return companyScores[companyAddress];
  }
  // ============================================================================

   /**
    * @notice Gets all the jobs created by a Company(starting from an ID upto the limit)
    * @param startId The offset id of job to be fetched from the array.
    * @param companyWallet The wallet address of the company
    * @return FrontDoorStructs.Job[] an Array of Job struct
  */
  function getAllJobsOfCompany(uint256 startId, address companyWallet) external view returns (FrontDoorStructs.Job[] memory) {
    if (startId > jobIdCounter) revert Errors.JobListingLimitExceed();
    uint256 jobsFetched = 0;
    FrontDoorStructs.Job[] memory jobArray;
    for (uint i=startId; i < jobIdCounter; i++) {
      if (jobList[i].creator == companyWallet) {
        if (jobList[i].isRemoved == false) {
          jobArray[jobsFetched] = jobList[i];
          jobsFetched++;
        }
      }
    }
    return jobArray;
  }
 }