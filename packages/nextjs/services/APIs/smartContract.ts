import { BigNumber, ethers } from "ethers";
import { Address } from "wagmi";
import contracts from "~~/generated/deployedContracts";
import { notification } from "~~/utils/scaffold-eth";

const RecruitmentContractAddress = contracts[59140][0].contracts.Recruitment.address;
const RecruitmentAbi = contracts[59140][0].contracts.Recruitment.abi;

const FrontDoorTokenAddress = contracts[59140][0].contracts.FrontDoorToken.address;
const FrontDoorTokenAbi = contracts[59140][0].contracts.FrontDoorToken.abi;

let provider, signer;
if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window?.ethereum);
  signer = provider.getSigner();
}

const deployedContract = new ethers.Contract(RecruitmentContractAddress, RecruitmentAbi, signer);
const deployedFrontDoorToken = new ethers.Contract(FrontDoorTokenAddress, FrontDoorTokenAbi, signer);
export const registerCandidate = async (email: string) => {
  try {
    const tx = await deployedContract.registerCandidate(email);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Candidate registered successfully");
  } catch (error) {
    console.error("Error:", error);
    notification.error("Failed to register candidate");
  }
};

export const registerCompany = async () => {
  try {
    const tx = await deployedContract.registerCompany();
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Company registered successfully");
  } catch (error) {
    console.error("Error:", error);
    notification.error("Failed to  register Company");
  }
};

export const registerReferrer = async (email: string) => {
  try {
    const tx = await deployedContract.registerReferrer(email);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Referrer registered successfully");
  } catch (error) {
    console.error("Error:", error);
    notification.error("Failed to register Referrer");
  }
};

export const registerJob = async (bounty: BigNumber) => {
  try {
    const txAllow = await deployedFrontDoorToken.approve(RecruitmentContractAddress, bounty);
    const receiptAllow = await txAllow.wait();
    const tx = await deployedContract.registerJob(bounty);
    const receipt = await tx.wait();
    console.log(receipt);
    const [jobEvent] = receipt.events.filter((el: any) => {
      return el.event == "JobCreated";
    });
    console.log(jobEvent);
    const [address, newjobid] = jobEvent?.args;
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Job registered successfully");
    return newjobid ? Number(newjobid) : null;
    // return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.error("Error:", error);
    notification.error("Failed to register job");
  }
};


export const deleteJob = async (jobId: number) => {
  try {
    const tx = await deployedContract.deleteJob(jobId);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Delete Job successfully");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.error("Error:", error);
    notification.error("Failed to delete job");
  }
};

  export const registerReferral = async(jobId:number,refereeMail:string) =>{
    try{
        const tx = await deployedContract.registerReferral(jobId,refereeMail);
        const receipt = await tx.wait();
        const [registerEvent] = receipt.events.filter((el: any) => {
          return el.event == "RegisterReferral";
        });
        console.log(registerEvent);
        const [refereeMail] = registerEvent?.args;
        console.log("Success! Transaction hash:", receipt.transactionHash);
        notification.success("Referral Registered successfully");
        return receipt?.data ? receipt?.data : null;
    }
    catch(error){
        console.log('Error'+error)
        notification.error("Failed to register Referral")
    }
  }


export const confirmReferral = async (referralCounter: number, jobId: number) => {
  try {
    const tx = await deployedContract.confirmReferral(referralCounter, jobId);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Confirm referral successful");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
    notification.error("Failed to confirm referral");
  }
};

export const hireCandidate = async (candidateAddress: Address, jobId: number) => {
  try {
    const tx = await deployedContract.hireCandidate(candidateAddress, jobId);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Hiring Candidate Successful");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
    notification.error("Failed To hire candidate");
  }
};

export const hireCandidateSuccefullyAfter90Days = async (candidateAddress: Address, jobId: number) => {
  try {
    const tx = await deployedContract.hireCandidateSuccefullyAfter90Days(candidateAddress, jobId);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("90 Days Passed Successfully");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
    notification.error("Error in Execution check 90 days validity");
  }
};

export const getCandidate = async (candidateAddress: Address) => {
  try {
    const tx = await deployedContract.getCandidate(candidateAddress);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Got Candidate");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
    notification.error("Error in Execution check 90 days validity");
  }
};

export const getReferrer = async (referrerAddress: Address) => {
  try {
    const tx = await deployedContract.getReferrer(referrerAddress);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Got Referrer");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
    notification.error("Error in Execution check 90 days validity");
  }
};

export const getReferralScores = async (referrerAddress: Address) => {
  try {
    const tx = await deployedContract.getReferralScores(referrerAddress);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Got Referrer scores");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
    notification.error("Error in Execution check 90 days validity");
  }
};

export const getCompanyScores = async (companyAddress: Address) => {
  try {
    const tx = await deployedContract.getCompanyScores(companyAddress);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    notification.success("Got Company scores");
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
    notification.error("Error in Execution check 90 days validity");
  }
};

export const getAllJobsOfCompany = async (companyAddress: Address) => {
  try {
    const tx = await deployedContract.getAllJobsOfCompany(companyAddress);
    const receipt = await tx.wait();
    console.log("Success! Transaction hash:", receipt.transactionHash);
    return receipt?.data ? receipt?.data : null;
  } catch (error) {
    console.log("Error" + error);
  }
};
