import { CollectionRecordReference, Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

// const { address } = useAccount();

export const db = new Polybase({
  defaultNamespace:
    "pk/0xbaeff2028f7c15332ab23549f09c33eee5cb9231559067afe56f975ea6a4b660b1e32eead19b6a8bd48d8347fa3753c8749d43b9a8716905c0fc8a3c70e3e9b1/navh-2",
  // "pk/0xbaeff2028f7c15332ab23549f09c33eee5cb9231559067afe56f975ea6a4b660b1e32eead19b6a8bd48d8347fa3753c8749d43b9a8716905c0fc8a3c70e3e9b1/navh-frontdoor",
  // "pk/0xbaeff2028f7c15332ab23549f09c33eee5cb9231559067afe56f975ea6a4b660b1e32eead19b6a8bd48d8347fa3753c8749d43b9a8716905c0fc8a3c70e3e9b1/Front-Door",
});

const jobsReference = db.collection("Jobs");
const candidatesReference = db.collection("Candidates");
const companiesReference = db.collection("Companies");

//TODO: Make all functions dynamic

export async function registerCandidate(candidateData: any) {
  const recordData = await candidatesReference.create(candidateData);
  return recordData;
}

export async function readCandidateById(id: string) {
  const record = await candidatesReference.record(id).get();
  const { data } = record;
  console.log(data);
  return data;
}

export async function registerCompany(candidateData: any) {
  const recordData = await companiesReference.create(candidateData);
  return recordData;
}

export async function readCompanyById(id: string) {
  const record = await companiesReference.record(id).get();
  const { data } = record;
  console.log(data);
  return data;
}

export async function createJobListing(jobData: any) {
  const recordData = await jobsReference.create(jobData);
  return recordData;
}

export async function applyforJob(jobId: string, candidateId: string) {
  const recordData = await jobsReference.record(jobId).call("applyCandidate", [candidateId]);
  return recordData;
}

export async function readJobListingById(id: string) {
  const record = await jobsReference.record(id).get();
  const { data } = record;
  console.log(data);
  return data;
}

export async function checkCompanyRegistration(id: string) {
  const record = await companiesReference.record(id).get();
  const exists = record.exists();
  console.log(exists);
  return exists;
}

export async function checkCandidateRegistration(id: string) {
  const record = await candidatesReference.record(id).get();
  const exists = record.exists();
  console.log(exists);
  return exists;
}

export async function readAllJobListings() {
  const records = await jobsReference.get();
  let jobListings: any = [];
  records.data.map(record => {
    jobListings.push(record.data);
  });
  return jobListings;
}

export async function readAllJobListingsForClient(address: string) {
  const records = await jobsReference.where("owner", "==", address).get();
  let jobListings: any = [];
  records.data.map(record => {
    jobListings.push(record.data);
  });
  console.log(jobListings);
  return jobListings;
}

export async function updateJobListing(id: string, jobData: any) {
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await jobsReference.record(id).call("updateJob", jobData);
  return recordData.data;
}
