# Front-Door

## Introduction

The Recruitment ecosystem is highly fragmented, participants have conflicting incentives, and collaboration is fraught with friction.
Improved collaboration would deepen the talent pools that hiring entities can access, enable recruitment firms to reduce wasted effort and increase client satisfaction, enable individuals and community leads to refer-to-earn from their professional networks.
Front Door uses Web3 tools and technology to solve a Web2 human coordination problem with a huge size of prize.

## Problem

A few key factors block scalable cooperation within the Recruitment ecosystem, revolving around Trust, Reputation, Incentive Design, and Transparency.

- Need for Trust: you give your value up front, having to trust the other party for payment, and employers need to trust the quality of referral.
- Lack of Transparency: referrals you make, whether you’re a professional recruiter, an individual candidate, or referring a friend, feel like they go into a black box and it can be hard to know what (if anything) happened.
- Reputation Locus: if you collaborate with another network participant, you build their reputation and not your own. A painful Catch 22.
- Ephemeral Reputation: it’s hard to tangibly demonstrate your value, so you’re only as good as your last referral, or your personal brand on social.
- Poor Incentive Structures: individuals referring someone from their personal network carry higher reputational risk but with 10x lower rewards.

## Solution

We are building a transparent system that works on referrerals. We believe that that as Web3 world brings oppurtunities to each and every individual, we unlock incentive mechanisms that ensure quality of the jobs being posted + quality of candidates being hired through our platform.
Our solution involves 3 user personas:

- Companies -- Posting jobs and Hiring candidates
- Refferrers -- People involved that refer other people for jobs (could be our ex manager etc)
- Referree/Candidate -- People looking for jobs

#### Companies

Role of a company looking for people to hire is simple. Companies will post jobs, and hire through the platform. Each job being posted has a bounty involved(part of the incentive mechanism). This bounty is collected to make sure the jobs being posted here are important and legit. They also raise the stakes for companies fighting for candidates and want to hire as soon as possible. This bounty is transparent and seen as a part of the Job.
Company can check jobs posted, see candidates that have applied for that job and hire from the site itself!

#### Refferrers

Role of a refferrer is to help other people get jobs by doing a simple referral flow. A referrer will refer a candidate/referree for a job using their emails.

#### Candidate/ Referree

Once a Referrer refers a Candidate, the Candidate receives a mail from Front-Door. This mail has a link to the website that allows the Candidate to confirm the referral
if candidate confirms the referral, candidate is put in the list of people who have applied for that particular job.

# Role of Bounty : Gamechanger

###### Bounty Distribution

- Referrer Share -- 65%
- Candidate Share -- 25%
- Front Door Share -- 10%

The fact that each persona involved gets benefited being involved in this job flow helps a lot. Referrer share being the highest encourages people to refer each other for jobs.
[Future Scope] -- We plan to introduce scoring mechanisms to add more transparency. Each persona Referrer, Company, Candidate will have a Score. This Score can be used to verify the genuineness of the Persona involved and this Score will be on Chain.

# OH SNAP!

Bounty distribution happens directly through a cron job using Snaps! This is truly important for us as we dont need to be involved in distributing the shares at regular time intervals (probation periods for jobs vary).
To automate this is crucial as it makes the system full proof and trustable. The bounty set by the company cant be changed/edited as it is onChain.
As transactions are involved and triggered through the metamask wallets itself, we are able to show the user the right transaction insights, confirm the transaction and let it go through.
With the power of Cron jobs, we are able to trigger this on events, for example after 90 days of the job and the candidate being hired and working properly, the bounty distribution happens.

# Linea

For our use case we have our own Front Door token + Recruitment contract (handles job flow).
Both are hosted on Linea testnets
Contract address for both --

- FrontDoor token -- https://explorer.goerli.linea.build/address/0xC542e24CC12C6ee3F73BFD319895CD348aA486e4
- Recruitment -- https://explorer.goerli.linea.build/address/{add_address}

## Testing Locally

yarn in the web-app directory
yarn start from same web-app

## Smartcontract

yarn compile
yarn deploy
view -- cd packages/hardhat/contracts
