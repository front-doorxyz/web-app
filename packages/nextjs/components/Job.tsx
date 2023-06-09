import React from "react";
import StarRating from "./StarRating";

type Props = {
  title: string;
  location: string;
  salary: string;
  bounty: string;
};

const Job = (props: Props) => {
  return (
    <div className="w-[70vw] h-[110px] border-neutral border-2 text-neutral rounded-md hover:border-accent   transition-all duration-300">
      <div className="ml-[0.2%] flex flex-col">
        <div className="flex  justify-start w-[70vw]">
          <div className="four columns w-[35%]">Engineering Manager Amazonas</div>
          <div className="two columns w-[25%]">Remote (Europe/Uk/Russia)</div>
          <div className="two columns w-[25%]">Competitive Package</div>
          <div className="two columns w-[25%]">$10000</div>
          <div className="flex flex-col justify-start items-end mr-[1%] gap-2 absolute right-[15vw]">
            <button className="btn btn-success">Refer</button>
            <button className="btn btn-warning">Apply</button>
          </div>
        </div>
        <StarRating score={4.5} />
      </div>
    </div>
  );
};

export default Job;
