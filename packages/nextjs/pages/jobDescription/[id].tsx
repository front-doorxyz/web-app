import React, { useContext } from "react";
import { useRouter } from "next/router";
import { GeneralContext } from "~~/providers/GeneralContext";

const Description = () => {
  const { jobInfo, deleteJob } = useContext(GeneralContext);
  const router = useRouter();
  const handleEditJob = () => {
    router.push("/client/editJob/1");
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[80vw] justify-center items-start mt-[3%] gap-4 ">
        <div className=" card rounded-lg shadow-lg flex justify-start items-start w-[50vw] flex-col gap-2">
          <div className="text-xl">JOB TITLE</div>
          <div className="text-[12px] mr-[1%]  text-justify">
            JOB DESCRIPTION LOCATION ROLE TITLE BOUNTY MAX Salary Min Salary
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
                <input type="text" placeholder="Email" className="input input-bordered w-[20vw]" />
              </div>
              <button className="btn btn-primary">Refer Candidate</button>
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
