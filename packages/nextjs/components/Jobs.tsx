import React, { useContext, useEffect, useState } from "react";
import Job from "./Job";
import { readAllJobListings, readAllJobListingsForClient } from "~~/services/APIs/database";

const Jobs = () => {
  const [jobArr, setJobArr] = useState<any>([]);

  useEffect(() => {
    readAllJobListings()
      .then(jobListings => setJobArr(jobListings))
      .catch(error => {
        // Handle the error appropriately
      });
  }, []);

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
