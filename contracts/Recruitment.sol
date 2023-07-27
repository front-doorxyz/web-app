// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import { FrontDoorStructs } from "./DataModel.sol";



contract Recruitment  is Ownable , ReentrancyGuard{

    // events 
    event PercentagesCompleted(address indexed sender, uint8 month1RefundPct, uint8 month2RefundPct, uint8 month3RefundPct);
    event DepositCompleted(address indexed sender, uint256 amount);


    // defining owner
    address owner;


    // mappings
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



    // counters
    Counters.Counter private jobIdCounter;
    Counters.Counter private referralCounter;
    uint256 jobListingLimit = 50;
    uint256 initialAmountUSD = 1000;
    constructor() {
        owner = msg.sender;
        }



    

}