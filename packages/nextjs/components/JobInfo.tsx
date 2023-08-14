import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobModal from "./JobModal";
import TextEditor from "./TextEditor";
import * as eth from "@polybase/eth";
import { useAccount } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";
import { createJobListing, db, readJobListingById, updateJobListing } from "~~/services/polybase/database";
import { notification } from "~~/utils/scaffold-eth";

type Props = {
  type: "edit" | "add";
};

const JobFill = ({ type }: Props) => {
  const { address } = useAccount();
  const { handleChange, registerJob, id, loading } = useContext(GeneralContext);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [jobInfo, setJobInfo] = useState<any>({});

  useEffect(() => {
    if (type === "edit") {
      readJobListingById(id).then(job => {
        setJobInfo(job);
      });
    }
  }, [type, id]);

  db.signer(async (data: string) => {
    const account = address;
    const sig = await eth.sign(data, account);
    return { h: "eth-personal-sign", sig };
  });

  const getDate = () => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let date = cDay + "/" + cMonth + "/" + cYear;
    return date;
  };

  const confirmJob = async () => {
    let jobId = await registerJob(Number(jobInfo.bounty));

    if (!jobId) {
      notification.error("Error in smart contract transaction: registerJob");
      return;
    }
    console.log("jobId", jobId);
    jobInfo.id = jobId;
    const date = getDate();
    const jobData = [
      jobInfo.id,
      jobInfo.roleTitle,
      jobInfo.description,
      jobInfo.location,
      jobInfo.maxSalary,
      jobInfo.minSalary,
      jobInfo.bounty,
      jobInfo.companyName,
      jobInfo.type,
      date,
    ];
    console.log([jobData]);
    await createJobListing(jobData);
  };

  const handleJob = async () => {
    const requiredFields = ["companyName", "description", "roleTitle", "bounty", "maxSalary", "minSalary"];
    const isMissingFields = requiredFields.some(field => !jobInfo[field]);

    if (isMissingFields) {
      notification.warning("Please fill in all the required fields.");
      return;
    }

    if (type === "add") {
      setModalOpen(true);
    } else {
      const date = getDate();
      const jobData = [
        jobInfo.roleTitle,
        jobInfo.description,
        jobInfo.location,
        jobInfo.maxSalary,
        jobInfo.minSalary,
        jobInfo.bounty,
        jobInfo.companyName,
        jobInfo.type,
        date,
      ];
      const jobUpdated = await updateJobListing(jobInfo.id, jobData);
      if (jobUpdated.id !== "") {
        notification.success("Job Updated");
        router.push("/");
      } else {
        notification.error("Error while updating job");
      }
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
          value={jobInfo.companyName}
        />
      </label>
      <label className="join flex flex-col gap-2 mb-[-2%]">
        <span className="indicator-item badge badge-primary"> Description</span>
      </label>
      <TextEditor readOnly={false} initialValue={jobInfo.description} />
      <label className="join flex flex-col gap-2">
        <span className="indicator-item badge badge-primary">Role Title</span>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="roleTitle"
          value={jobInfo.roleTitle}
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
          value={jobInfo.bounty}
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
          value={jobInfo.maxSalary}
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
          value={jobInfo.minSalary}
        />
      </label>
      <label className="join flex flex-col gap-2">
        <span className="indicator-item badge badge-primary">Type of job</span>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="type"
          value={jobInfo.type}
        />
      </label>

      <button className={`btn btn-primary`} onClick={handleJob} disabled={loading}>
        {type === "edit" ? "Edit Job" : "Add Job"}
      </button>
      {modalOpen && <JobModal setModal={() => setModalOpen(false)} addJob={confirmJob} loading={loading} />}
    </div>
  );
};

export default JobFill;
