import React, { useContext, useEffect } from "react";
import { createJobListing } from "../services/store/store";
import { type } from "os";
import { useSigner } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { GeneralContext } from "~~/providers/GeneralContext";

type Props = {
  type: "edit" | "add";
};

const JobFill = (props: Props) => {
  const { data: signer } = useSigner();

  const { jobInfo, handleChange, registerJob, setJobInfo } = useContext(GeneralContext);

  useEffect(() => {
    if (props.type === "add") {
      setJobInfo({
        id: 0,
        roleTitle: "Role Title",
        description: "Describe the Role",
        companyName: "Company name",
        location: "Location",
        maxSalary: "Max Salary",
        bounty: "Bounty",
        minSalary: "Min Salary",
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="companyName"
        value={jobInfo.companyName}
      />
      <input
        type="text-area"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="description"
        value={jobInfo.description}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="location"
        value={jobInfo.location}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="roleTitle"
        value={jobInfo.roleTitle}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="bounty"
        value={jobInfo.bounty}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="maxSalary"
        value={jobInfo.maxSalary}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="minSalary"
        value={jobInfo.minSalary}
      />
      <button
        className={`btn btn-primary `}
        // onClick={async () => {
        //   await registerJob();
        // }}
        onClick={async () => {
          let jobId = await registerJob(Number(jobInfo.bounty));
          if (!jobId) alert("Error in smartcontract transaction: registerJob");
          console.log("jobId", jobId);
          jobInfo.id = jobId;
          await createJobListing(jobInfo);
        }}
      >
        {props.type === "edit" ? "Edit Job" : "Add Job"}
      </button>
    </div>
  );
};

export default JobFill;
