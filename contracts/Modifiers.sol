// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.19;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "./Recruitment.sol";

// library Modifiers {
//     modifier checkIfItisACompany(
//         address[] storage companiesAddressList,
//         address companyAddress
//     ) {
//         bool isCompany = false;

//         for (uint256 i = 0; i < companiesAddressList.length; i++) {
//             if (companiesAddressList[i] == companyAddress) {
//                 isCompany = true;
//                 break;
//             }
//         }

//         require(isCompany, "CompanyNotListed");
//         _;
//     }

//     modifier checkIfCandidateHiredByCompany(address candidateAddress , address companyAddress){
//       bool isCandidateHired = false;
//       address[] memory hiredCandidates = companyAddressToHiredCandidateAddress[companyAddress];
//       for(uint256 i = 0 ; i < hiredCandidates.length; i++){
//         if(hiredCandidates[i] == candidateAddress){
//           isCandidateHired = true;
//           break;
//         }
//       }

//       if(isCandidateHired == false){
//         revert Errors.CandidateNotHiredByCompany();
//       }
//       _;
//     }

//     // Define more common modifiers here if needed
// }
