import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readJobListingById } from "../../services/polybase/database";
import { useAccount } from "wagmi";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import StarRating from "~~/components/StarRating";
import TextEditor from "~~/components/TextEditor";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { GeneralContext } from "~~/providers/GeneralContext";

const Description = () => {
  const { jobInfo, deleteJob, setJobInfo, registerReferral, email, setEmail, id, setId, loading } =
    useContext(GeneralContext);
  const { address } = useAccount();

  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    setId(id);
    readJobListingById(id)
      .then(jobListing => {
        setJobInfo(jobListing);
      })
      .catch(error => {
        // Handle the error appropriately
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[90vw]  md:w-[50vw]  border-neutral border-[0.7px] text-neutral rounded-md transition-all duration-300 mt-[2%]">
        <div className="flex flex-col justify-between h-[100%]">
          <div className="bg-accent h-[50px] flex items-center justify-between  gap-2">
            <div className="flex items-center justify-center gap-2 ml-[2%]">
              <div className="text-sm md:text-xl">{jobInfo.companyName}</div>
              <StarRating score={4.5} />
            </div>
          </div>
          <div className="p-2 pt-0 h-[60%]">
            <div className="flex flex-col gap-2 text-sm md:text-lg">
              <TextEditor readOnly={true} initialValue={jobInfo.description} />
              {/* <div>Job Description: {jobInfo.description}</div> */}
              <div>Role Title: {jobInfo.roleTitle}</div>
              <div>Location: {jobInfo.location}</div>
              <div>Bounty: {jobInfo.bounty}</div>
              <div>
                Salary Range: {jobInfo.minSalary}-{jobInfo.maxSalary}
              </div>
              <div className="flex flex-col mt-[2%]">
                Refer Candidate:
                <div className="flex flex-col items-center justify-center gap-4">
                  <div>
                    <input
                      type="file"
                      className="text-sm file-input file-input-bordered file-input-primary  max-w-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Email"
                      className="text-sm input input-bordered max-w-xs"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[20%] gap-2 mt-6">
            <button
              className="px-2 py-2 bg-blue-500 text-sm md:text-lg  text-white rounded"
              disabled={loading}
              onClick={() => registerReferral("0x01", email)}
            >
              Refer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
