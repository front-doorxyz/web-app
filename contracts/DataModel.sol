// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library FrontDoorStructs {

    struct Candidate {
        address wallet;
        string email;
        uint256 score;
        bool isScoreGivenByCompany ; // bool if company gives score to candidate
        uint256 timeOfHiring; // time at which candidate is hired
        bool isHired;
    }

     struct Referrer{
        address wallet;
        string email;
        uint256 score;
        uint256 numberOfSuccesfullReferrals; // number of referrals made by the referrer
    }

    struct Job {
        uint256 id;
        uint256 bounty;
        bool isRemoved;
        address creator;
        bool issucceed; // is comapny has succesfully hired the candidate
        uint256 numberOfCandidateHired; // number of candidates hired by the company
        uint256 timeAtWhichJobCreated; // indicates time at which job is created job will only be listed for 30 days
    }

    struct Referral{
        uint256 id;
        bool confirmed;
        Referrer referrer;
        Candidate candidate;
        Job job;
        uint256 timeAtWhichReferralStarted; // indicates time at which referral is made 
        uint256 timeAtWhichReferralEnded; // indicates time at which referral is end 
    }


    struct Company{
        address wallet;
        uint256 jobsCreated;
        uint256 time_score;
        address[] candidates; // list of all candidates hired by the company
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