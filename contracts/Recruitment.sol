// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import { FrontDoorStructs } from "./DataModel.sol";
import { Errors } from "./Errors.sol";



contract Recruitment  is Ownable , ReentrancyGuard{

   /**
    * Events
    */
    event PercentagesCompleted(address indexed sender, uint8 month1RefundPct, uint8 month2RefundPct, uint8 month3RefundPct);
    event DepositCompleted(address indexed sender, uint256 amount);

    /**
     * @notice Defining Mapping 
     */
    mapping(bytes32 => address) public whitelistedTokens;
    mapping(bytes32 => uint8) public whitelistedTokenDecimals;
    mapping(address => mapping(bytes32 => uint256)) public accountBalances;
    mapping(address => uint8[3][]) public accountMonthlyRefundPcts;
    mapping(address => uint8[]) public accountCompleteDeposits;
    mapping(address => uint)public balances;
    mapping(address => string[])public referredEmails;
    mapping(address => FrontDoorStructs.Candidate) public candidateList;
    mapping(address => FrontDoorStructs.Referee) public refereeList;
    mapping(address => FrontDoorStructs.Referrer) public referrerList;
    mapping(address => FrontDoorStructs.Company) public companyList;
    mapping(uint256 => FrontDoorStructs.Job) public jobList;
    mapping(address => uint256[]) public referralIndex;
    mapping(uint256 => FrontDoorStructs.Referral) public referralList;
    address[] public companiesAddressList; // list of address of company


    // Company Mapping 
    /**
     * @dev Company address mapped to  candiate address which gives score to the company 
     */
    mapping(address => mapping(address => uint256)) private companyaddressToScore; 

  /**
   * @dev Company address mapped to address of candidate to score giving By company 
   */
    mapping(address => mapping(address => uint256)) private  addressofCandidateToScore;




    /**
     * Defininf Counters .sol 
     */
    uint256  private jobIdCounter;
    uint256  private referralCounter;
    uint256 jobListingLimit = 50;
    uint256 initialAmountUSD = 1000;


    /**
     * @notice  Defining Constructor
     */
    constructor() {}
    

    /**Modifiers */

    /**
     * 
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
      
    


    //////////////////////////////////////////////////////////////////////////////
    /**
     * Register Functions
     */
    ///////////////////////////////////////////////////////////////////////////////


    /**
     * @notice Register a Candidate with email 
     * @param email email of the candidate
     */
   function registerCandidate(string memory email) external {
    FrontDoorStructs.Candidate memory candidate = FrontDoorStructs.Candidate(msg.sender, email,0,false);
    candidateList[msg.sender] = candidate;
  } 
    
    /**
     * @notice Register a Referrer with email
     * @param email email of the referee
     */
    function registerReferrer(string memory email) external {
        FrontDoorStructs.Referrer memory referrer = FrontDoorStructs.Referrer(msg.sender, email,0);
        referrerList[msg.sender] = referrer;
    }


     /**
    * @notice Registers a referee with their email
    * @param email The email of the referee to be registered.
  */
  function registerReferee(string memory email) external {
    FrontDoorStructs.Referee memory referee = FrontDoorStructs.Referee(msg.sender, email,keccak256(abi.encodePacked(email)), 0);
    refereeList[msg.sender] = referee;
  }


  function registerJob(uint256 bounty) external checkIfItisACompany(msg.sender) returns(uint256) {
    uint256 jobId = jobIdCounter;
    require(bounty > 0 , "Bounty should be greater than 0"); // check if company is giving bounty or not
    FrontDoorStructs.Job memory job = FrontDoorStructs.Job(jobId, bounty, false, msg.sender,false);
    jobList[jobId] = job;
    jobIdCounter++;
    companyList[msg.sender].jobsCreated++;
    return jobId;
  }


  /**
   * @notice Registers a Company
   */
  function registerCompany() external {
    FrontDoorStructs.Company memory company = FrontDoorStructs.Company(msg.sender,0,0,new address[](0));
    companyList[msg.sender] = company;
    companiesAddressList.push(msg.sender);
  }

   /**
    * @notice Registers a referral
    * @param jobId The job ID already registered with the contract.
    * @param refereeMail The email of the referee.
  */
  function registerReferral(uint256 jobId, string memory refereeMail) external {

    // Simple Checks Of Parameters
    require(jobId > 0 , "Job Id should be greater than 0"); // check if job is registered or not
    require(bytes(refereeMail).length > 0  , "Referee Mail should not be empty"); // check if referee mail is empty or not

    FrontDoorStructs.Referee memory referee; // = refereeList[refereeWallet];
    FrontDoorStructs.Referrer memory referrer = referrerList[msg.sender];
    FrontDoorStructs.Job memory job = jobList[jobId];

    
    referee.email =  refereeMail;
    referee.emailHash = keccak256(abi.encodePacked(refereeMail));
    FrontDoorStructs.Referral memory referral = FrontDoorStructs.Referral(referralCounter, false, referrer, referee, job,block.timestamp,0);

    referralIndex[msg.sender].push(referralCounter);
    referralList[referralCounter] = referral;
    referralCounter++;

  }


}