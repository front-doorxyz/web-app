import React, { useContext, useEffect, useState } from "react";
import { readAllJobListings } from "../services/store/store";
import { Polybase } from "@polybase/client";
import * as eth from "@polybase/eth";
import type { NextPage } from "next";
import { useAccount, useSigner } from "wagmi";
import Jobs from "~~/components/Jobs";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { GeneralContext } from "~~/providers/GeneralContext";
import { notification } from "~~/utils/scaffold-eth";

const AllJobs: NextPage = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { setAllJobs, getAllJobs } = useContext(GeneralContext);

  const db = new Polybase({
    defaultNamespace:
      "pk/0xbaeff2028f7c15332ab23549f09c33eee5cb9231559067afe56f975ea6a4b660b1e32eead19b6a8bd48d8347fa3753c8749d43b9a8716905c0fc8a3c70e3e9b1/Front-Door",
  });

  db.signer(async (data: string) => {
    // A permission dialog will be presented to the user

    const account = address;

    const sig = await eth.sign(data, account);

    return { h: "eth-personal-sign", sig };
  });

  const collectionReference = db.collection("Jobs");

  // async function createRecord() {
  //   // .create(args) args array is defined by the constructor fn
  //   const recordData = await collectionReference.create([
  //     "3",
  //     "SDE check",
  //     "LESGOO yooo",
  //     "London",
  //     170000,
  //     90000,
  //     5000,
  //     "Niti AI",
  //   ]);
  // }

  // async function getRecord() {
  //   const record = await collectionReference.record("1").get();
  //   // Get data from the record
  //   const { data } = record;
  //   console.log(data);
  //   // or const data = record.data
  //   // Record is CollectionRecordResponse instance, so you can also get again to refresh
  //   const updatedRecord = record.get();
  // }

  // async function getAllRecords() {
  //   const jobIds = ["1", "2"];
  //   jobIds.map(async id => {
  //     const record = await collectionReference.record(id).get();
  //     // Get data from the record
  //     const { data } = record;
  //     console.log(data);
  //   });
  // }

  // async function getFilteredRecords() {
  //   const jobIds = ["1", "2", "3"];

  //   const record = await collectionReference.where("publicKey", "==", address);
  //   // Get data from the record
  //   const { data } = record;
  //   console.log(data);
  // }

  // async function updateRecord() {
  //   // .create(functionName, args) args array is defined by the updateName fn in collection schema
  //   const recordData = await collectionReference
  //     .record("2")
  //     .call("updateJob", ["Solidity", "hotttt", "Bangalore", 170000, 90000, 5000, "Google"]);

  //   if (!recordData) {
  //     notification.error("Not the Owner");
  //     return;
  //   }
  //   notification.success("Job updated");
  // }

  useEffect(() => {
    // updateRecord();
    // getAllRecords();
    // createRecord();
    // getFilteredRecords();
  }, []);

  useEffect(() => {
    if (signer) {
      // getAllJobs();
      readAllJobListings()
        .then(jobListings => setAllJobs(jobListings))
        .catch(error => {
          // Handle the error appropriately
        });
    }
  }, [signer]);

  const { data: jobs, isLoading: isJobsLoading } = useScaffoldContractRead({
    contractName: "Recruitment",
    functionName: "getAllJobs",
    args: [1],
  });

  return (
    <>
      {/* {jobs ? jobs[0]["bounty"].toString() : "Loading......"} */}
      <Jobs type="all" />
    </>
  );
};

export default AllJobs;
