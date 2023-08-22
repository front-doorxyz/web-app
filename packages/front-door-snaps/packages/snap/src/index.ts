import { OnCronjobHandler, OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { ethers } from 'ethers';
import contracts from '../../../../nextjs/generated/deployedContracts'

const abi = contracts[59140][0].contracts.Recruitment.abi;

const getJobsFromCompany = async () => {
  const now = Date.now();
  const jobsToDiburse = [];
  console.log('from Snap');
  if (ethereum === null) {
    return 'Not Conected';
  }
  console.log(' Snap connected');
  
  
  const provider = new ethers.BrowserProvider(ethereum);
  const contract = new ethers.Contract(
    '0xCA9DeC4a4aEfA15B36D3a09bAD66bf0564C24005',
    abi,
    provider,
  );
  const from = await (await provider.getSigner()).getAddress();
  console.log(from);

  if (await contract.isCompanyRegistered(from) === true) {
    try {
      const jobs = await contract.getAllJobsOfCompany(from);
      for(let i = 0; i < jobs.length; i++) {
        if(jobs[i][4] === true) {
          if(jobs[i][7]=== false){
            const candidate =  await contract.getCandidateListForJob(jobs[i][0]);
            const timeFromHired = now - candidate[4];
            if(timeFromHired > 60000) {
              jobsToDiburse.push(jobs[i][0]);
          }
        }
      }

    }}
    catch(err) {
      console.log(err);
    }
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'checkStatus':
      const jobsToDiburse = await getJobsFromCompany();
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: "prompt",
          heading: "You have jobs to diburse",
          text: `You have ${jobsToDiburse?.length} jobs to diburse`,
        },
      });

    default:
      throw new Error('Method not found.');
  }
};

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
