const contracts = {
  5: [
    {
      name: "goerli",
      chainId: "5",
      contracts: {
        Recruitment: {
          address: "0xA78230280a91C8EEe78C2B2f0AeB7332544dF298",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
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
              name: "OnlyJobCreatorAllowedToDelete",
              type: "error",
            },
            {
              inputs: [],
              name: "SenderIsNotReferee",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "senderAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "companyAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
              ],
              name: "CompanyScoreSubmitted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "DepositCompleted",
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
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "month1RefundPct",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "month2RefundPct",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "month3RefundPct",
                  type: "uint8",
                },
              ],
              name: "PercentagesCompleted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "senderAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "referrerWallet",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
              ],
              name: "ReferralScoreSubmitted",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "accountBalances",
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
              name: "accountCompleteDeposits",
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
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "accountMonthlyRefundPcts",
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
                  name: "",
                  type: "address",
                },
              ],
              name: "balances",
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
                  internalType: "uint256",
                  name: "refId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "email",
                  type: "string",
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
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAccountCompleteDeposits",
              outputs: [
                {
                  internalType: "uint8[]",
                  name: "",
                  type: "uint8[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAccountMonthlyRefundPcts",
              outputs: [
                {
                  internalType: "uint8[3][]",
                  name: "",
                  type: "uint8[3][]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "startId",
                  type: "uint256",
                },
              ],
              name: "getAllJobs",
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
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "getJob",
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
                  ],
                  internalType: "struct FrontDoorStructs.Job",
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
                  name: "wallet",
                  type: "address",
                },
              ],
              name: "getReferee",
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
                      internalType: "bytes32",
                      name: "emailHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Referee",
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
                  internalType: "uint256",
                  name: "refId",
                  type: "uint256",
                },
              ],
              name: "getReferral",
              outputs: [
                {
                  components: [
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
                          internalType: "bytes32",
                          name: "emailHash",
                          type: "bytes32",
                        },
                        {
                          internalType: "uint256",
                          name: "score",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct FrontDoorStructs.Referee",
                      name: "referee",
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
                      ],
                      internalType: "struct FrontDoorStructs.Job",
                      name: "job",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Referral",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getReferralIDs",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
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
              ],
              name: "refereeList",
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
                  internalType: "bytes32",
                  name: "emailHash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "score",
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
                      internalType: "bytes32",
                      name: "emailHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "score",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Referee",
                  name: "referee",
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
                  ],
                  internalType: "struct FrontDoorStructs.Job",
                  name: "job",
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
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "referredEmails",
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
              name: "registerReferee",
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
                  internalType: "bytes32",
                  name: "symbol",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "index",
                  type: "uint8",
                },
              ],
              name: "setFinalDeposit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "month1RefundPct",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "month2RefundPct",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "month3RefundPct",
                  type: "uint8",
                },
              ],
              name: "setPercentages",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "companyAddress",
                  type: "address",
                },
              ],
              name: "submitCompanyScore",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "referrerWallet",
                  type: "address",
                },
              ],
              name: "submitReferralScore",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
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
              inputs: [
                {
                  internalType: "uint256",
                  name: "newLimit",
                  type: "uint256",
                },
              ],
              name: "updateJobListingLimit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "whitelistedTokenDecimals",
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
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "whitelistedTokens",
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
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
