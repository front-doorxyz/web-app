import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Banner from "~~/components/Banner";
import ErrorHandler from "~~/components/ErrorHandler";
import Jobs from "~~/components/Jobs";
import { getAllJobsOfCompany } from "~~/services/APIs/smartContract";


const AllJobs: NextPage = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    // Extract the query parameters from the URL
    const { refId, jobId } = router.query;

    // Check if the required query parameters exist, and their values match the desired values
    if (refId && jobId) {
      // Redirect to the specific page if the query parameters match
      router.push(`/${refId}+${jobId}`);
    }
  }, [router.query]);

  useEffect(() => {
    if (address) {
      getAllJobsOfCompany(address);
    }
  }, [address]);
  
  return (
    <>
      <Banner />
      <ErrorHandler showError={showError} errorMsg={errorMessage} />
      <Jobs />
    </>
  );
};

export default AllJobs;
