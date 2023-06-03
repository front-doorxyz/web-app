Architecture

Components:
- web-app
  Areas:
  - Enabler form
  - Job referral form
  - Candidate CV form

- smart-contract
  Methods:
  - jobCreate( fromAddress) { enablerAddress guard }
      returns jobTransactionHash (will be our job id)
      notes: amount is locked inside SC and prompted at the transaction approval time.
  - jobRefer(jobTransactionHash, fromAddress, candidateAddress)
  - jobFinalize(jobTransactionHash, candidateAddress, refererAddress) { enablerAddress guard }
        notes: 


