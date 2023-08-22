import React, { useContext, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  setModal: (value: boolean) => void;
  addJob: () => void;
  jobInfo: any;
};

const JobModal = (props: Props) => {
  const { jobInfo } = props;
  const [referrerShare, setRefferrerScore] = useState(0);
  const [candidateShare, setCandidateScore] = useState(0);
  const [frontDoorShare, setFrontDoorShare] = useState(0);

  useEffect(() => {
    let bountyNumber = Number(jobInfo.bounty);
    setRefferrerScore(() => (65 / 100) * bountyNumber);
    setCandidateScore(() => (10 / 100) * bountyNumber);
    setFrontDoorShare(() => (25 / 100) * bountyNumber);
  }, [jobInfo]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative w-[60vw] h-[60vh] bg-secondary p-4 rounded-lg">
        <div className="font-bold text-xl">Client Fees Page</div>
        <button
          className="absolute top-2 right-2"
          onClick={() => {
            props.setModal(false);
          }}
        >
          <XMarkIcon className="h-4 w-4 text-tertiary" />
        </button>
        <div className="flex flex-wrap flex-col items-center h-full mt-[1%] p-8">
          <div id="headers" className="flex flex-wrap gap-2 items-center">
            <div className="md:w-[710px] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
              Total fee structure excluding Taxes to pay for the sourcing of a Successful Candidate
            </div>
          </div>
          <div id="info" className="flex flex-col gap-2  mt-[1%] items-center">
            <div className="flex flex-wrap gap-2">
              <div className="md:w-[350px] h-[40px] border-2 border-accent flex items-center justify-center">
                Role -- {jobInfo.roleTitle}
              </div>
              <div className="md:w-[350px] h-[40px] border-2 border-accent flex items-center justify-center">
                Bounty -- {jobInfo.bounty}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="md:w-[350px] h-[40px] border-2 border-accent flex items-center justify-center">
                Referrer Share[65%]
              </div>
              <div className="md:w-[350px] h-[40px] border-2 border-accent flex items-center justify-center">
                {referrerShare} ETH
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="md:w-[350px] h-[40px] border-2 border-accent flex items-center justify-center">
                Candidate Share[10%]
              </div>
              <div className="md:w-[350px] h-[40px] border-2 border-accent flex items-center justify-center">
                {candidateShare} ETH
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="md:w-[350px] h-[40px] border-2 border-accent flex items-center justify-center">
                Front Door Share[25%]
              </div>
              <div className="md:w-[350px] h-[40px] border-2 border-accent  flex items-center justify-center">
                {frontDoorShare} ETH
              </div>
            </div>
          </div>
          <div id="confirm" className="flex flex-col gap-2 mt-[1%] items-center">
            <button
              className={`btn btn-primary`}
              onClick={props.addJob}

              // onClick={() => createJobListing(jobInfo)}
            >
              Confirm Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
