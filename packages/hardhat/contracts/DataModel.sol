// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title FrontDoorStructs (Library)
 * @author Zeeshan Jan
 */

library FrontDoorStructs {

    struct Candidate {
        address wallet;
        string email;
        uint256 score;
    }

     struct Referrer{
        address wallet;
        string email;
        uint256 score;
    }

    struct Referee{
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
    }

    struct Referral{
        uint256 id;
        bool confirmed;
        Referrer referrer;
        Referee referee;
        Job job;
    }

    struct Company{
        address wallet;
        uint256 jobsCreated;
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