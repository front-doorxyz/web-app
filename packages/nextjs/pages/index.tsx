import React from "react";
import type { NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import Job from "~~/components/Job";

const AllJobs: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-start ml-[0.6%] mt-[4%] w-[70vw]">
        <div className="four columns w-[35%]">JOB TITLE</div>
        <div className="two columns w-[25%]">LOCATION</div>
        <div className="two columns w-[25%]">SALARY</div>
        <div className="two columns w-[25%]">BOUNTY</div>
      </div>
      <div className="flex flex-col  gap-2">
        <div className="mt-[2%]">
          <Job title="Software Engineer" location="San Francisco" salary="$120,000" bounty="$10,000" />
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
