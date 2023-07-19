import { CollectionRecordReference, Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

// const { address } = useAccount();

export const db = new Polybase({
  defaultNamespace:
    "pk/0xbaeff2028f7c15332ab23549f09c33eee5cb9231559067afe56f975ea6a4b660b1e32eead19b6a8bd48d8347fa3753c8749d43b9a8716905c0fc8a3c70e3e9b1/Front-Door",
});

const collectionReference = db.collection("Jobs");

//TODO: Make all functions dynamic

export async function createJobListing(jobData: any) {
  const recordData = await collectionReference.create(jobData);
  return recordData;
}

export async function readJobListingById(id: string) {
  const record = await collectionReference.record(id).get();
  // Get data from the record
  const { data } = record;
  console.log(data);
  return data;
}

export async function readAllJobListings() {
  const records = await collectionReference.get();
  let jobListings: any = [];
  records.data.map(record => {
    jobListings.push(record.data);
  });
  return jobListings;
}

export async function readAllJobListingsForClient(address: string) {
  const records = await collectionReference.where("owner", "==", address).get();
  let jobListings: any = [];
  records.data.map(record => {
    jobListings.push(record.data);
  });
  console.log(jobListings);
  return jobListings;
}

export async function updateJobListing(id: string, jobData: any) {
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await collectionReference.record(id).call("updateJob", jobData);
  return recordData.data;
}
