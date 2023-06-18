import React, { useContext, useEffect, useState } from "react";
import Job from "./Job";
import { all } from "axios";
import { type } from "os";
import { useConnect } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";

type Props = {
  type: "all" | "client";
};

const Jobs = (props: Props) => {
  const { allJobs } = useContext(GeneralContext);
  const [jobArr, setJobArr] = useState([]);

  useEffect(() => {
    if (props.type === "all") {
      setJobArr([...allJobs]);
    }
  }, [allJobs]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-start ml-[0.6%] mt-[4%] w-[70vw]">
        <div className="four columns w-[35%]">JOB TITLE</div>
        <div className="two columns w-[25%]">LOCATION</div>
        <div className="two columns w-[25%]">SALARY</div>
        <div className="two columns w-[25%]">BOUNTY</div>
      </div>
      <div className="flex flex-col  gap-2">
        <div className="flex flex-col gap-8 mt-[2%]">
          {allJobs.map(job => (
            <Job
              id={job.id}
              roleTitle={job.roleTitle}
              location={job.location}
              minSalary={job.minSalary}
              maxSalary={job.maxSalary}
              bounty={job.bounty}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
