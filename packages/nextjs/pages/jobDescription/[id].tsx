import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readJobListingById } from "../../services/store/store";
import { GeneralContext } from "~~/providers/GeneralContext";

const Description = () => {
  const { jobInfo, deleteJob, setJobInfo, registerReferral, email, setEmail, id, setId } = useContext(GeneralContext);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    setId(id);
    readJobListingById(id)
      .then(jobListings => setJobInfo(jobListings))
      .catch(error => {
        // Handle the error appropriately
      });
  }, []);

  const handleEditJob = () => {
    router.push(`/client/editJob/${id}`);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[80vw] justify-center items-start mt-[3%] gap-4 ">
        <div className=" card  bg-primary rounded-lg shadow-lg flex justify-start items-start w-[50vw] flex-col gap-2 pt-[2%] ">
          <div className="text-2xl pl-4">
            {jobInfo.companyName} -- {jobInfo.roleTitle}
          </div>
          <div className="card flex flex-col p-4 gap-4 w-[50vw] rounded-md shadow-md">
            <div className="flex flex-col">
              <span className="font-bold">JOB DESCRIPTION</span>
              <span className="text-sm">{jobInfo.description}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">LOCATION</span>
              <span className="text-sm">{jobInfo.location}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">ROLE TITLE</span>
              <span className="text-sm">{jobInfo.roleTitle}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">BOUNTY</span>
              <span className="text-sm">${jobInfo.bounty}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">MIN Salary</span>
              <span className="text-sm">{jobInfo.minSalary}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">MAX Salary</span>
              <span className="text-sm">{jobInfo.maxSalary}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="card  rounded-lg shadow-lg p-[2%] w-[30vw]">
            <div className="flex flex-col justify-start items-center gap-4 ">
              <div className="text-md md:text-xl">Refer someone and earn XXXXXX$</div>
              <div>
                <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-[20vw]"
                  value={email}
                  onChange={() => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={registerReferral}>
                Refer Candidate
              </button>
            </div>
          </div>
          <div className="card  rounded-lg shadow-lg p-[2%] w-[30vw]">
            <div className="flex flex-col justify-start items-center gap-4 ">
              <div className="text-md md:text-xl">Edit Job or Delete Job as owner</div>
              <button className="btn btn-primary" onClick={handleEditJob}>
                Edit Job
              </button>
              <button className="btn btn-primary" onClick={() => deleteJob(jobInfo.id)}>
                Delete Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
