import React, { useContext, useEffect } from "react";
import { readAllJobListings } from "../services/store/store";
import type { NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import Jobs from "~~/components/Jobs";
import { GeneralContext } from "~~/providers/GeneralContext";
import { useSigner } from "wagmi";

const AllJobs: NextPage = () => {
  const { data: signer } = useSigner();
  const { setAllJobs, getAllJobs } = useContext(GeneralContext);
  useEffect(() => {
    if (signer) {
      getAllJobs().then(jobs => console.log(jobs));
      readAllJobListings()
        .then(jobListings => setAllJobs(jobListings))
        .catch(error => {
          // Handle the error appropriately
        });
    }
  }, [signer]);
  return (
    <>
      <Jobs type="all" />
    </>
  );
};

export default AllJobs;
