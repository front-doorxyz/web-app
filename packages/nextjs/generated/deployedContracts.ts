const contracts = {
  59140: [
    {
      name: "linea",
      chainId: "59140",
      contracts: {
        FrontDoorToken: {
          address: "0xC542e24CC12C6ee3F73BFD319895CD348aA486e4",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "maxTotalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        Recruitment: {
          address: "0x6535cef02f696FD01789124d63D0EaDd79f795f2",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_acceptedTokenAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "BountyNotPaid",
              type: "error",
            },
            {
              inputs: [],
              name: "JobAlreadyDeleted",
              type: "error",
            },
            {
              inputs: [],
              name: "JobListingLimitExceed",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughFundDepositedByCompany",
              type: "error",
            },
            {
              inputs: [],
              name: "OnlyJobCreatorAllowedToDelete",
              type: "error",
            },
            {
              inputs: [],
              name: "SameCandidateCannotBeReferredTwice",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_candidateAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_jobId",
                  type: "uint256",
                },
              ],
              name: "ReferCandidate",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "candidateList",
              outputs: [
                {
                  internalType: "address",
                  name: "wallet",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "email",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isScoreGivenByCompany",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "timeOfHiring",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isHired",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "jobConfirmed",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "companiesAddressList",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "companyAddressToCandidateScore",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "companyAddressToHiredCandidateAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "companyList",
              outputs: [
                {
                  internalType: "address",
                  name: "wallet",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "jobsCreated",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "time_score",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "companyScores",
              outputs: [
                {
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "senderAddress",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "companyaccountBalances",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "companyaddressToScore",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_referralCounter",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_jobId",
                  type: "uint256",
                },
              ],
              name: "confirmReferral",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "deleteJob",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "startId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "companyWallet",
                  type: "address",
                },
              ],
              name: "getAllJobsOfCompany",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bounty",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isRemoved",
                      type: "bool",
                    },
                    {
                      internalType: "address",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "bool",
                      name: "issucceed",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "numberOfCandidateHired",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "timeAtWhichJobCreated",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Job[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "wallet",
                  type: "address",
                },
              ],
              name: "getCandidate",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "wallet",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "email",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isScoreGivenByCompany",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "timeOfHiring",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isHired",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "jobConfirmed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Candidate",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "companyAddress",
                  type: "address",
                },
              ],
              name: "getCompanyScores",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "senderAddress",
                      type: "address",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.CompanyScore[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "referrerWallet",
                  type: "address",
                },
              ],
              name: "getReferralScores",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "senderAddress",
                      type: "address",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.ReferralScore[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "wallet",
                  type: "address",
                },
              ],
              name: "getReferrer",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "wallet",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "email",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "numberOfSuccesfullReferrals",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Referrer",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "hasScoredCompany",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_candidateAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_jobId",
                  type: "uint256",
                },
              ],
              name: "hireCandidate",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "isCompany",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "jobList",
              outputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bounty",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isRemoved",
                  type: "bool",
                },
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "issucceed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "numberOfCandidateHired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timeAtWhichJobCreated",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "referralIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "referralList",
              outputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "confirmed",
                  type: "bool",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "wallet",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "email",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "numberOfSuccesfullReferrals",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Referrer",
                  name: "referrer",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "wallet",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "email",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isScoreGivenByCompany",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "timeOfHiring",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isHired",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "jobConfirmed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Candidate",
                  name: "candidate",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bounty",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isRemoved",
                      type: "bool",
                    },
                    {
                      internalType: "address",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "bool",
                      name: "issucceed",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "numberOfCandidateHired",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "timeAtWhichJobCreated",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Job",
                  name: "job",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "timeAtWhichReferralStarted",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timeAtWhichReferralEnded",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isConfirmed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "referralEnd",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "referralScores",
              outputs: [
                {
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "senderAddress",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "referrerList",
              outputs: [
                {
                  internalType: "address",
                  name: "wallet",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "email",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "numberOfSuccesfullReferrals",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "email",
                  type: "string",
                },
              ],
              name: "registerCandidate",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "registerCompany",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "bounty",
                  type: "uint256",
                },
              ],
              name: "registerJob",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "refereeMail",
                  type: "string",
                },
              ],
              name: "registerReferral",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "email",
                  type: "string",
                },
              ],
              name: "registerReferrer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
