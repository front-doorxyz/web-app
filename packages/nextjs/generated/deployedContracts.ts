const contracts = {
  59140: [
    {
      name: "linea",
      chainId: "59140",
      contracts: {
        FrontDoorToken: {
          address: "0x0A3170807ccC30aDbbA5C6487E755Ff0Ab12f3b0",
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
          address: "0xCA9DeC4a4aEfA15B36D3a09bAD66bf0564C24005",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_acceptedTokenAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_frontDoorAddress",
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
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "companyAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "candidateAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "CandidateHired",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "companyAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "candidateAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "CandidateHiredSuccesfullyAfter90Days",
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
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "jobId",
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
                  name: "companyAddress",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "JobCreated",
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
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "candidateAddress",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "ReferCandidateSuccess",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "candidateAddress",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "referralId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "ReferralConfirmed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "candidateAddress",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "referralId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
              ],
              name: "ReferralRejected",
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
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "string",
                  name: "email",
                  type: "string",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "refferer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "jobId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "referralId",
                  type: "uint256",
                },
              ],
              name: "RegisterReferral",
              type: "event",
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
                {
                  internalType: "address",
                  name: "referrer",
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
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "candidateListForJob",
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
                {
                  internalType: "address",
                  name: "referrer",
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
                  name: "_candidateAddress",
                  type: "address",
                },
              ],
              name: "candidateStatus",
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
                  name: "_jobId",
                  type: "uint256",
                },
              ],
              name: "diburseBounty",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
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
                    {
                      internalType: "bool",
                      name: "isDibursed",
                      type: "bool",
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
                    {
                      internalType: "address",
                      name: "referrer",
                      type: "address",
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
                  internalType: "uint256",
                  name: "_jobId",
                  type: "uint256",
                },
              ],
              name: "getCandidateHiredJobId",
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
                    {
                      internalType: "address",
                      name: "referrer",
                      type: "address",
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
                  internalType: "uint256",
                  name: "_jobId",
                  type: "uint256",
                },
              ],
              name: "getCandidateListForJob",
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
                    {
                      internalType: "address",
                      name: "referrer",
                      type: "address",
                    },
                  ],
                  internalType: "struct FrontDoorStructs.Candidate[]",
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
              inputs: [],
              name: "getMyRefferals",
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
                  internalType: "address",
                  name: "_company",
                  type: "address",
                },
              ],
              name: "isCompanyRegistered",
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
              name: "jobCandidatehire",
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
                {
                  internalType: "address",
                  name: "referrer",
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
                {
                  internalType: "bool",
                  name: "isDibursed",
                  type: "bool",
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
                    {
                      internalType: "address",
                      name: "referrer",
                      type: "address",
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
                    {
                      internalType: "bool",
                      name: "isDibursed",
                      type: "bool",
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
