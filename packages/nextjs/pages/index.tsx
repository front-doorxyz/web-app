import React, { useContext, useEffect } from "react";
import { readAllJobListings } from "../services/store/store";
import type { NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import Jobs from "~~/components/Jobs";
import { GeneralContext } from "~~/providers/GeneralContext";

const AllJobs: NextPage = () => {
  const { setAllJobs } = useContext(GeneralContext);
  useEffect(() => {
    readAllJobListings()
      .then(jobListings => setAllJobs(jobListings))
      .catch(error => {
        // Handle the error appropriately
      });
  }, []);
  return (
    <>
      <Jobs type="all" />
    </>
  );
};

export default AllJobs;
