// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

library Event {
    event PercentagesCompleted(address indexed sender, uint8 month1RefundPct, uint8 month2RefundPct, uint8 month3RefundPct);
    event DepositCompleted(address indexed sender, uint256 amount);
    event ReferralScoreSubmitted(address senderAddress, address referrerWallet, uint256 score); 
    event CompanyScoreSubmitted(address senderAddress, address companyAddress, uint256 score);
    event ReferCandidateSuccess(address indexed sender, address indexed candidateAddress, uint256 indexed jobId);
    event CandidateHired(address indexed companyAddress, address  candidateAddress, uint256  jobId);
    event ReferralConfirmed(address indexed candidateAddress , uint256 indexed referralId , uint256 indexed jobId);
    event ReferralRejected(address indexed candidateAddress , uint256 indexed referralId , uint256 indexed jobId);
    event CandidateHiredSuccesfullyAfter90Days(address indexed companyAddress, address  candidateAddress, uint256  jobId);
}