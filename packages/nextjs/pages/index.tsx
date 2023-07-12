import React, { useContext, useEffect, useState } from "react";
import { readAllJobListings } from "../services/store/store";
import { Polybase } from "@polybase/client";
import type { NextPage } from "next";
import { useAccount, useSigner } from "wagmi";
import Jobs from "~~/components/Jobs";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { GeneralContext } from "~~/providers/GeneralContext";
import { db } from "~~/services/polybase/database";
import { notification } from "~~/utils/scaffold-eth";

const AllJobs: NextPage = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { setAllJobs, getAllJobs } = useContext(GeneralContext);

  // const collectionReference = db.collection("Jobs");

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
