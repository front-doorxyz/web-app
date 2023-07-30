import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobModal from "./JobModal";
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
  const { address } = useAccount();
  const { jobInfo, handleChange, handleDescriptionChange, registerJob, setJobInfo, id, loading } =
    useContext(GeneralContext);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  db.signer(async (data: string) => {
    // A permission dialog will be presented to the user
    const account = address;
    const sig = await eth.sign(data, account);
    return { h: "eth-personal-sign", sig };
  });

  const confirmJob = async () => {
    let jobId = await registerJob(Number(jobInfo.bounty));

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
    await createJobListing(jobData);
  };

  const handleJob = async () => {
    if (props.type === "add") {
      setModalOpen(true);
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
    <div className="shadow-2xl flex flex-col justify-center gap-4 p-4">
      <label className="join flex flex-col gap-2">
        <span className="indicator-item badge badge-primary">Company Name</span>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="companyName"
        />
      </label>
      <label className="join flex flex-col gap-2 mb-[-2%]">
        <span className="indicator-item badge badge-primary"> Description</span>
      </label>
      <TextEditor readOnly={false} initialValue={""} />
      <label className="join flex flex-col gap-2">
        <span className="indicator-item badge badge-primary">Role Title</span>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="roleTitle"
        />
      </label>
      <label className="join flex flex-col gap-2">
        <span className="indicator-item badge badge-primary"> Bounty</span>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="bounty"
        />
      </label>
      <label className="join flex flex-col gap-2">
        <span className="indicator-item badge badge-primary"> Max Salary</span>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="maxSalary"
        />
      </label>
      <label className="join flex flex-col gap-2">
        <span className="indicator-item badge badge-primary">Min Salary</span>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="minSalary"
        />
      </label>

      <button
        className={`btn btn-primary`}
        onClick={handleJob}
        disabled={loading}
        // onClick={() => createJobListing(jobInfo)}
      >
        {props.type === "edit" ? "Edit Job" : "Add Job"}
      </button>
      {modalOpen && <JobModal />}
    </div>
  );
};

export default JobFill;
