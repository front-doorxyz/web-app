// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

library Errors {
    error OnlyRefererAllowed();
    error SenderIsNotReferee();
    error OnlyJobCreatorAllowedToDelete(); 
    error JobAlreadyDeleted();
    error JobListingLimitExceed();
    error CompanyNotListed();
    error BountyNotPaid();
    error CandidateNotHiredByCompany();
}