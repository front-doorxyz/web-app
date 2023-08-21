import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  setHireModal: (value: boolean) => void;
  confirmHire: () => void;
  jobInfo: any;
  loading: boolean;
};

const HireModal = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative w-[30vw] h-[45vh] bg-secondary p-4 rounded-lg">
        Confirm your hire
        <button
          className="absolute top-2 right-2"
          onClick={() => {
            props.setHireModal(false);
          }}
        >
          <XMarkIcon className="h-4 w-4 text-tertiary" />
        </button>
        <div className="flex flex-wrap flex-col items-center h-full mt-[1%] p-8 gap-2">
          <div id="headers" className="flex flex-wrap gap-2 items-center">
            <div className="md:w-[10vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
              Role title
            </div>
            <div className="md:w-[10vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
              {props.jobInfo.roleTitle}
            </div>
          </div>
          <div id="info" className="flex flex-wrap gap-2 items-center">
            <div className="md:w-[10vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
              Candidate Address
            </div>
            <div className="md:w-[10vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
              05xasaa...asa
            </div>
          </div>
          <div id="date" className="flex flex-wrap gap-2 items-center">
            <div className="md:w-[10vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
              Starting Date
            </div>
            <div className="md:w-[10vw] h-[50px] p-2 border-2 border-accent flex items-center justify-center text-bold">
              <input type="date" className="bg-primary text-tertiary" placeholder="Select date" />
            </div>
          </div>
          <div id="confirm" className="flex flex-col mt-[2%] gap-2  items-center">
            <button
              className={`btn btn-primary`}
              onClick={props.confirmHire}
              disabled={props.loading}
              // onClick={() => createJobListing(jobInfo)}
            >
              Confirm Hire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireModal;
