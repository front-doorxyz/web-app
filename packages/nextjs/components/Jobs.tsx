import React, { useContext, useEffect, useState } from "react";
import Job from "./Job";
import { all } from "axios";
import { type } from "os";
import { useAccount, useConnect } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";
import { readAllJobListings, readAllJobListingsForClient } from "~~/services/polybase/database";

type Props = {
  type: "all" | "client";
};

const Jobs = (props: Props) => {
  const [jobArr, setJobArr] = useState<any>([]);
  const { address } = useAccount();
  const { search } = useContext(GeneralContext);
  useEffect(() => {
    if (props.type === "all") {
      readAllJobListings()
        .then(jobListings => setJobArr(jobListings))
        .catch(error => {
          // Handle the error appropriately
        });
    }
    if (props.type === "client") {
      readAllJobListingsForClient(address).then(jobListing => setJobArr([...jobListing]));
    }
  }, [props.type]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col  gap-2">
        <div className="flex flex-wrap items-center justify-center gap-8 mt-[2%]">
          {jobArr.map((job: any) => (
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
