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
      <div className="flex flex-col  gap-2">
        <div className="flex flex-wrap items-center justify-center gap-8 mt-[2%]">
          {allJobs.map(job => (
            <Job
              id={job.id}
              companyName={job.companyName}
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
