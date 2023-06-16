import React from "react";
import type { NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import Jobs from "~~/components/Jobs";

const AllJobs: NextPage = () => {
  return (
    <>
      <Jobs type="all" />
    </>
  );
};

export default AllJobs;
