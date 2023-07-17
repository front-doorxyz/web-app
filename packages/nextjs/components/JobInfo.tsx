import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import TextEditor from "./TextEditor";
import * as eth from "@polybase/eth";
import { useAccount, useSigner } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";
import { createJobListing, db, updateJobListing } from "~~/services/polybase/database";
import { notification } from "~~/utils/scaffold-eth";

type Props = {
  type: "edit" | "add";
};

const JobFill = (props: Props) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { jobInfo, handleChange, handleDescriptionChange, registerJob, setJobInfo, id, loading } =
    useContext(GeneralContext);

  const router = useRouter();
  useEffect(() => {
    if (props.type === "add") {
      setJobInfo({
        id: 0,
        roleTitle: "Role Title",
        description: "Describe the Role",
        companyName: "Company name",
        location: "Location",
        maxSalary: "",
        bounty: "",
        minSalary: "",
      });
    }
  }, []);

  db.signer(async (data: string) => {
    // A permission dialog will be presented to the user
    const account = address;
    const sig = await eth.sign(data, account);
    return { h: "eth-personal-sign", sig };
  });

  const handleJob = async () => {
    if (props.type === "add") {
      // let jobId = await registerJob(Number(jobInfo.bounty));
      let jobId = "1";
      if (!jobId) alert("Error in smartcontract transaction: registerJob");
      console.log("jobId", jobId);
      jobInfo.id = jobId;
      const jobData = [
        jobInfo.id,
        jobInfo.roleTitle,
        jobInfo.description,
        jobInfo.location,
        jobInfo.maxSalary,
        jobInfo.minSalary,
        jobInfo.bounty,
        jobInfo.companyName,
      ];
      console.log([jobData]);
      // await createJobListing(jobData);
    } else {
      const jobData = [
        jobInfo.roleTitle,
        jobInfo.description,
        jobInfo.location,
        jobInfo.maxSalary,
        jobInfo.minSalary,
        jobInfo.bounty,
        jobInfo.companyName,
      ];
      const jobUpdated = await updateJobListing(jobInfo.id, jobData);
      if (jobUpdated.id !== "") {
        notification.success("Job Updated");
        router.push("/");
        return;
      }
      notification.error("Error while updating job");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      Company Name
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="companyName"
        value={jobInfo.companyName}
      />
      Description
      <TextEditor readOnly={false} initialValue={jobInfo.description} />
      Location
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="location"
        value={jobInfo.location}
      />
      Role Title
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="roleTitle"
        value={jobInfo.roleTitle}
      />
      Bounty
      <input
        type="number"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="bounty"
        value={jobInfo.bounty}
      />
      Max Salary
      <input
        type="number"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="maxSalary"
        value={jobInfo.maxSalary}
      />
      Min Salary
      <input
        type="number"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="minSalary"
        value={jobInfo.minSalary}
      />
      <button
        className={`btn btn-primary `}
        onClick={handleJob}
        disabled={loading}
        // onClick={() => createJobListing(jobInfo)}
      >
        {props.type === "edit" ? "Edit Job" : "Add Job"}
      </button>
    </div>
  );
};

export default JobFill;
