import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, readAllJobListings } from "../services/polybase/database";
import type { NextPage } from "next";
import { useAccount, useSigner } from "wagmi";
import Banner from "~~/components/Banner";
import Jobs from "~~/components/Jobs";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { GeneralContext } from "~~/providers/GeneralContext";

const AllJobs: NextPage = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { setAllJobs, getAllJobs } = useContext(GeneralContext);
  const router = useRouter();
  useEffect(() => {
    // Extract the query parameters from the URL
    const { refId, email } = router.query;

    // Check if the required query parameters exist, and their values match the desired values
    if (refId && email) {
      // Redirect to the specific page if the query parameters match
      router.push(`/${refId}+${email}`);
    }
  }, [router.query]);

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
      <Banner />
      <Jobs />
    </>
  );
};

export default AllJobs;
