import React, { useContext, useEffect, useState } from "react";
import { db, readAllJobListings } from "../services/polybase/database";
import type { NextPage } from "next";
import { useAccount, useSigner } from "wagmi";
import Jobs from "~~/components/Jobs";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { GeneralContext } from "~~/providers/GeneralContext";

const AllJobs: NextPage = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { setAllJobs, getAllJobs } = useContext(GeneralContext);

  console.log(address);

  useEffect(() => {
    if (signer) {
      getAllJobs();
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
