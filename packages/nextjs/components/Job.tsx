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
  companyName: string;
};

const Job = (props: Props) => {
  const router = useRouter();
  const handleJobClick = () => {
    router.push(`/jobDescription/${props.id}`);
  };

  return (
    <div
      className="shadow-xl w-[300px] h-[200px] md:w-[450px] md:h-[300px]  text-neutral rounded-2xl transition-all duration-300"
      onClick={handleJobClick}
    >
      <div className="flex flex-col justify-between h-[100%]">
        <div className="bg-accent h-[20%] rounded-t-2xl flex items-center justify-center gap-2">
          <div className="text-sm md:text-xl">{props.companyName}</div>
          <StarRating score={4.5} />
        </div>
        <div className="p-2 h-[60%]">
          <div className="flex flex-col gap-2 text-sm md:text-lg">
            <div>Role Title: {props.roleTitle}</div>
            <div>Location: {props.location}</div>
            <div>Bounty: {props.bounty}</div>
            <div>
              Salary Range: {props.minSalary}-{props.maxSalary}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[20%] gap-2">
          <button className="px-2 py-2 bg-blue-500 text-sm md:text-lg  text-white rounded">Refer</button>
          <button className="px-4 py-2 bg-green-500 text-sm md:text-lg text-white rounded">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Job;
