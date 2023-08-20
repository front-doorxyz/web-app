import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chip from "./Chip";
import { useAccount } from "wagmi";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { truncateDescription } from "~~/helpers";
import { readAllJobListingsForClient } from "~~/services/APIs/database";
import { Job } from "~~/types/general";

const ClientJob = (props: Job) => {
  const { id, location, bounty, description, maxSalary, minSalary, roleTitle, status, date, type } = props;
  const router = useRouter();
  const viewCandidates = () => {
    router.push(`/jobCandidates/${id}`);
  };

  const handleEditJob = () => {
    router.push(`/client/editJob/${id}`);
  };

  return (
    <div className="flex justify-between flex-col w-[50vw] h-[190px] bg-primary p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          {roleTitle}
          <div className="flex flex-wrap gap-2 ">
            <Chip label={`Bounty: $${bounty}`} color="blue" />
            <Chip label={`Max Salary: $${maxSalary}`} color="green" />
            <Chip label={`Min Salary: $${minSalary}`} color="slate" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <div>{location}</div>
          </div>
          <div>{date}</div>
        </div>
      </div>
      <div className="flex justify-between items-center pb-4">{truncateDescription(description, 20)}</div>
      <div className="flex justify-end items-center gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white text-sm md:text-sm rounded mr-2" onClick={viewCandidates}>
          View Candidates
        </button>
        <button className="px-4 py-2 bg-slate-500 text-white text-sm md:text-sm rounded" onClick={handleEditJob}>
          Edit Job
        </button>
        <button className="px-4 py-2 bg-red-500 text-white text-sm md:text-sm rounded" onClick={handleEditJob}>
          Delete Job
        </button>
      </div>
    </div>
  );
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
        <div className="flex flex-col flex-wrap items-center justify-center gap-8 mt-[2%]">
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
              date={job.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientJobs;
