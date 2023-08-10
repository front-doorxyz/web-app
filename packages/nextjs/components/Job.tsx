import React from "react";
import { useRouter } from "next/router";
import StarRating from "./StarRating";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

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

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Recruitment",
    functionName: "deleteJob",
    args: [0x03],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleEditJob = () => {
    router.push(`/client/editJob/${props.id}}`);
  };

  return (
    <div className="shadow-xl w-[300px] h-[200px] md:w-[450px] md:h-[300px]  text-neutral rounded-2xl transition-all duration-300">
      <div className="flex flex-col justify-between h-[100%]">
        <div className="bg-accent h-[20%] rounded-t-2xl flex items-center justify-center  gap-2">
          <div className="flex items-center gap-2 ml-[2%] ">
            <div className="text-sm md:text-xl">{props.companyName}</div>
            <StarRating score={4.5} />
          </div>
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
          <button className="px-2 py-2 bg-blue-500 text-sm md:text-lg  text-white rounded" onClick={handleJobClick}>
            Refer
          </button>
          <button className="px-4 py-2 bg-green-500 text-sm md:text-lg text-white rounded" onClick={handleJobClick}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
