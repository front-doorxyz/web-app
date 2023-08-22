import React, { useState } from "react";
import { useRouter } from "next/router";
import { BigNumber, ethers } from "ethers";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { hireCandidate } from "~~/services/APIs/smartContract";

type Props = {
  setHireModal: (value: boolean) => void;
  candidate: any;
  jobInfo: any;
  jobId: string;
};

const HireModal = ({ setHireModal, candidate, jobInfo, jobId }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const confirmHire = async () => {
    const candidateAddress = candidate.id;
    setLoading(true);
    const data = await hireCandidate(candidateAddress, Number(jobId));
    setLoading(false);
    router.push("/");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative w-[40vw] h-[35vh] bg-secondary p-4 rounded-lg">
        Confirm your hire
        <button
          className="absolute top-2 right-2"
          onClick={() => {
            setHireModal(false);
          }}
        >
          <XMarkIcon className="h-4 w-4 text-tertiary" />
        </button>
        <div className="flex flex-wrap flex-col items-center h-full mt-[1%] p-8 gap-2">
          <div id="headers" className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-col gap-2">
              <span className="indicator-item badge badge-primary">Role Title</span>
              <div className="md:w-[30vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
                {jobInfo.roleTitle}
              </div>
            </div>
          </div>
          <div id="info" className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-col gap-2">
              <span className="indicator-item badge badge-primary">Candidate Address</span>
              <div className="md:w-[30vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
                {candidate.id}
              </div>
            </div>
          </div>

          <div id="confirm" className="flex flex-col mt-[2%] gap-2  items-center">
            <button
              className={`btn btn-primary`}
              onClick={confirmHire}
              disabled={loading}
              // onClick={() => createJobListing(jobInfo)}
            >
              {!loading ? "Confirm" : "Loadinggg"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireModal;
