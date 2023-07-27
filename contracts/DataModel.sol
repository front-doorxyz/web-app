// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library FrontDoorStructs {

    struct Candidate {
        address wallet;
        string email;
        uint256 score;
        bool isScoreGivenByCompany ; // bool if company gives score to candidate
    }

     struct Referrer{
        address wallet;
        string email;
        uint256 score;
    }

    struct Referee{ //  candidate who is being referred
        address wallet;
        string email;
        bytes32 emailHash;
        uint256 score;
    }

    struct Job {
        uint256 id;
        uint256 bounty;
        bool isRemoved;
        address creator;
        bool Issucceed; // is comapny has succesfully hired the candidate
    }

    struct Referral{
        uint256 id;
        bool confirmed;
        Referrer referrer;
        Referee referee;
        Job job;
        uint256 timeAtWhichReferralStarted; // indicates time at which referral is made 
        uint256 timeAtWhichReferralEnded; // indicates time at which referral is made 
    }


    struct Company{
        address wallet;
        uint256 jobsCreated;
        uint256 time_score;
        mapping(address => uint256) addressToScore; // candiate address which gives score to the company 
        address[] candidates; // list of all candidates hired by the company
        mapping(address => uint256) addressofCandidateToScore ; // address of candidate to score giving my company 
    }


    struct CompanyScore{
      uint256 score; //score given to the company
      address senderAddress; //address of the candidate
    }

    struct ReferralScore {
        uint256 score;  //Score given by the hiring company to the candidate 
        address senderAddress; // Wallet address of the hiring company
  }
}