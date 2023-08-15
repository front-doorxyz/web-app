import React, { useContext, useEffect, useState } from "react";
import Job from "./Job";
import { readAllJobListings, readAllJobListingsForClient } from "~~/services/polybase/database";
import ErrorHandler from "./ErrorHandler";

const Jobs = () => {
  const [jobArr, setJobArr] = useState<any>([]);
  const [showError,setShowError] = useState<boolean>(false);
  const [errorMsg,setErrorMsg] = useState<string>("");

  useEffect(() => {
    readAllJobListings()
      .then(jobListings => setJobArr(jobListings))
      .catch(error => {
        // Handle the error appropriately
        setShowError(true);
        setErrorMsg(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col  gap-2">
        <ErrorHandler showError={showError} errorMsg={errorMsg} />
        <div className="flex flex-wrap items-center justify-center gap-8 mt-[2%]">
          {jobArr.map((job: any) => (
            <Job
              key={job.id}
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
