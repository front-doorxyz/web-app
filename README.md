# Front-Door

## Introduction

The Recruitment ecosystem is highly fragmented, participants have conflicting incentives, and collaboration is fraught with friction.
Improved collaboration would:

- Deepen the talent pools that hiring entities can access
- Enable recruitment firms to reduce wasted effort and increase client satisfaction
- Enable individuals and community leads to refer-to-earn from their professional networks
  Front Door uses Web3 tools and technology to solve a Web2 human coordination problem with a huge size of prize.

## Problem

A few key factors block scalable cooperation within the Recruitment ecosystem, revolving around Trust, Reputation, Incentive Design, and Transparency.

- Need for Trust: you give your value up front, having to trust the other party for payment, and employers need to trust the quality of referral.
- Lack of Transparency: referrals you make, whether you’re a professional recruiter, an individual candidate, or referring a friend, feel like they go into a black box and it can be hard to know what (if anything) happened.
- Reputation Locus: if you collaborate with another network participant, you build their reputation and not your own. A painful Catch 22.
- Ephemeral Reputation: it’s hard to tangibly demonstrate your value, so you’re only as good as your last referral, or your personal brand on social.
- Poor Incentive Structures: individuals referring someone from their personal network carry higher reputational risk but with 10x lower rewards.

## Solution

We are building a transparent referral system. We believe that as the Web3 world brings opportunities to each and every individual, Front Door can unlock incentive mechanisms that ensure quality of the jobs being posted & quality of candidates being hired through our platform.
Our solution involves 3 user personas:

- Companies -- Posting jobs and hiring candidates. Providing the recruitment bounty to incentivise referrals
- Referrers -- Introducing trusted candidates to jobs, this activity forms the basis of an on-chain reputation system
- Referee/Candidate -- People looking for jobs

#### Data Model

Core logic and data is stored in Smart contracts, namely like information about jobId, bounty, registration of referrals and so on.
Polybase for Off chain data as jobs, candidates and referrers have so much data to work with we store data off chain that is not required by the on chain methods.
Polybase collection -- https://explorer.testnet.polybase.xyz/studio/pk%2F0xbaeff2028f7c15332ab23549f09c33eee5cb9231559067afe56f975ea6a4b660b1e32eead19b6a8bd48d8347fa3753c8749d43b9a8716905c0fc8a3c70e3e9b1%2Fnavh-final

#### Companies

Companies require candidate applicants and post jobs to source candidates and hire through the platform. Each job posted has a bounty associated (part of the incentive mechanism). This bounty is collected to make sure the jobs being posted are important and legitimate. Bounties incentivise Referrers to refer their contacts to the Companies job.

Companies can control their applicant pool, hire, review and pay for the recruitment service all through the site.

#### Referrers

Referrers are the introducers of high-quality candidates to jobs. Referrer reputations are based on the reviews Hiring Companies give their candidates on chain.
Referrers introduce a candidate/referee with the candidates email and CV/profile.

#### Candidate/ Referee

Once a Referrer refers a Candidate, the Candidate receives an email from Front Door. This mail has a link to the website that allows the Candidate to confirm the referral. Upon confirmation the candidate is added to the Hiring Companies applicant pool for that specific job.

# Role of Bounty : Gamechanger

###### Bounty Distribution

- Referrer Share -- 65%
- Candidate Share -- 10%
- Front Door Share -- 25%

Bounties are fairly distributed to the key stakeholders to incentivise productive behavior and encourage broad adoption.
[Future Scope] -- We plan to introduce scoring mechanisms to add more transparency. Each persona Referrer, Company, Candidate will have an on Chain Score. This Score can be used to verify the authenticity of stakeholders.

# OH SNAP!

Bounty distribution happens directly through a cron job using Snaps! Centralisation risk is eliminated from the distribution of funds at regular time intervals (probation periods for jobs vary).
Automatic Bounty distribution is crucial as it makes the system foolproof and trustworthy. The bounty set by the company cant be changed/edited as it is onChain.
Transactions are triggered through the metamask wallets itself, users have the required transaction insights, confirmations and trust in the system.
With the power of Cron jobs, transactions are triggered on predetermined events, for example 90 days from the candidate start date the final bounty distribution occurs.

# Linea

For our use case we have our own Front Door token + Recruitment contract (handles job flow).
Both are hosted on Linea testnets
Contract address for both --

- FrontDoor token -- https://explorer.goerli.linea.build/address/0x0A3170807ccC30aDbbA5C6487E755Ff0Ab12f3b0
- Recruitment -- https://explorer.goerli.linea.build/address/0xCA9DeC4a4aEfA15B36D3a09bAD66bf0564C24005

# Testing using URL

Currently Jobs are only created by the contract owner as FrontDoor Tokens distribution is a Future Use case.
(if you want you can use the contact us page and send us your information, we will forward you some Front Door tokens to be registered as a company).
So for testing other flows, like refer candidates ... register as a referrer first
You will need a wallet address with Linea Goerli TestEth. (referrer wallet)
And have another wallet address with Linea Goerli TestEth. (candidate wallet)

Refer the candidate using refer options and use Candidate email, as a parameter. The candidate will receive an email for the confirmReferral. Once that is done the jobOwner can see the list of candidates applied for the job. Currently this will only be available to us as contract owners. Make sure to add Candidate Social profiles like github, that can be viewed by the company to contact the candidate.
Only the unique candidates, get pushed to candidate array in the Jobs

Note: [As this is a development build, there might be some places where loading states are not defined due to the rush of the hackathon, Be patient with the transactions!]

## Testing frontend

yarn in root directory
yarn start

## Smartcontract

yarn compile
yarn deploy
view -- cd packages/hardhat/contracts

## Snaps
