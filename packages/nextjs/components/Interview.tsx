import React from "react";
import { HuddleIframe } from "@huddle01/iframe";

type Props = {};

const Interview = (props: Props) => {
  //this component will be used to display the interview section. Connecting candidate and interviewer
  return (
    <div>
      <div className="card  rounded-lg shadow-lg p-[2%] w-[30vw]">
        <div className="flex flex-col justify-start items-center gap-4 ">
          <div className="text-md md:text-xl">Send someone Room Id for an interview</div>
          <div>
            <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
          </div>
          <div>
            <input type="text" placeholder="Email" className="input input-bordered w-[20vw]" />
          </div>
          <button className="btn btn-primary">Refer Candidate</button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
