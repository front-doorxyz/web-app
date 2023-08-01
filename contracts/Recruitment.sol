// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import { FrontDoorStructs } from "./DataModel.sol";



contract Recruitment  is Ownable , ReentrancyGuard{

   /**
    * Events
    */
    event PercentagesCompleted(address indexed sender, uint8 month1RefundPct, uint8 month2RefundPct, uint8 month3RefundPct);
    event DepositCompleted(address indexed sender, uint256 amount);


   /**
    * @dev Defining State Variables 
    */
    address owner;


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



    /**
     * Defininf Counters .sol 
     */
    Counters.Counter private jobIdCounter;
    Counters.Counter private referralCounter;
    uint256 jobListingLimit = 50;
    uint256 initialAmountUSD = 1000;


    /**
     * @notice  Defining Constructor
     */
    constructor() {
        owner = msg.sender;
        }


    //////////////////////////////////////////////////////////////////////////////
    /**
     * Register Functions
     * 
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


}