import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readAllJobListingsForClient } from "~~/services/polybase/database";

type Job = {
  bounty: number;
  companyName?: string;
  description: string;
  location: string;
  id: string;
  maxSalary: string;
  minSalary: string;
  roleTitle: string;
  status?: boolean;
};

const ClientJob = (props: Job) => {
  return <div>hi</div>;
};

const ClientJobs = () => {
  const [jobArr, setJobArr] = useState([]);
  const { address } = useAccount();
  useEffect(() => {
    readAllJobListingsForClient(address).then(jobListing => setJobArr([...jobListing]));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col  gap-2">
        <div className="flex flex-wrap items-center justify-center gap-8 mt-[2%]">
          {jobArr.map((job: Job) => (
            <ClientJob
              id={job.id}
              location={job.location}
              status={job.status}
              maxSalary={job.maxSalary}
              minSalary={job.minSalary}
              roleTitle={job.roleTitle}
              bounty={job.bounty}
              description={job.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientJobs;
