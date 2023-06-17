// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/**
 * @title Errors (Library)
 * @author Zeeshan Jan
 */

library Errors {
    error OnlyRefererAllowed();
    error SenderIsNotReferee();
    error OnlyJobCreatorAllowedToDelete(); 
    error JobAlreadyDeleted();
    error JobListingLimitExceed();
}
