import React from "react";
import { useRouter } from "next/router";
import StarRating from "./StarRating";

type Props = {
  id: string;
  roleTitle: string;
  location: string;
  minSalary: number;
  bounty: string;
  maxSalary: number;
};

const Job = (props: Props) => {
  const router = useRouter();
  const handleJobClick = () => {
    router.push(`/jobDescription/${props.id}`);
  };

  return (
    <div
      className="w-[70vw] h-[110px] border-neutral border-2 text-neutral rounded-md hover:border-accent   transition-all duration-300"
      onClick={handleJobClick}
    >
      <div className="ml-[0.2%] flex flex-col">
        <div className="flex  justify-start w-[70vw]">
          <div className="four columns w-[35%]">{props.roleTitle}</div>
          <div className="two columns w-[25%]">{props.location}</div>
          <div className="two columns w-[25%]">
            {props.minSalary}-{props.maxSalary}
          </div>
          <div className="two columns w-[25%]">${props.bounty}</div>
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
