import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobModal from "./JobModal";
import TextEditor from "./TextEditor";
import * as eth from "@polybase/eth";
import { ethers } from "ethers";
import { Address, useAccount } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";
import {
  checkCompanyRegistration,
  createJobListing,
  db,
  readCompanyById,
  readJobListingById,
  updateJobListing,
} from "~~/services/APIs/database";
import { registerJob } from "~~/services/APIs/smartContract";
import { notification } from "~~/utils/scaffold-eth";

type Props = {
  type: "edit" | "add";
};

const JobFill = ({ type }: Props) => {
  const { address } = useAccount();
  const { id } = useContext(GeneralContext);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [jobInfo, setJobInfo] = useState<any>({
    companyName: "",
    description: "",
    location: "",
    roleTitle: "",
    bounty: 0,
    maxSalary: 0,
    minSalary: 0,
    type: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    let parsedValue = value; // Initialize parsedValue with the original value

    setJobInfo({
      ...jobInfo,
      [name]: parsedValue,
    });
  };

  const handleDescriptionChange = (key, value) => {
    setJobInfo({
      ...jobInfo,
      [key]: value,
    });
  };

  const getCompanyData = async (address: Address) => {
    const data = await readCompanyById(address);
    setJobInfo({
      ...jobInfo,
      companyName: data.companyName,
    });
  };

  useEffect(() => {
    if (address && type !== "edit") {
      getCompanyData(address);
    }
  }, [address, type]);

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
    try {
      const bountyEthers = ethers.utils.parseEther(jobInfo.bounty);
      let jobId = await registerJob(bountyEthers);
      console.log(jobId);

      if (!jobId) {
        notification.error("Error in smart contract transaction: registerJob");
        return;
      }

      const date = getDate();
      const jobData = [
        String(jobId),
        jobInfo.roleTitle,
        jobInfo.description,
        jobInfo.location,
        Number(jobInfo.maxSalary),
        Number(jobInfo.minSalary),
        bountyEthers.toHexString(),
        jobInfo.companyName,
        address,
        jobInfo.type,
        date,
      ];
      console.log([jobData]);
      const data = await createJobListing(jobData);
      if (data.id) {
        notification.success("Job Registered sucessfully");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleJob = async () => {
    let companyExists;
    try {
      companyExists = await checkCompanyRegistration(address);
    } catch (e) {
      companyExists = false;
    }
    if (!companyExists) {
      notification.error("Register as a company to post jobs");
      router.push("/register");
      return;
    }

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
        <span className="indicator-item badge badge-primary">Location</span>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-[50vw]"
          onChange={handleChange}
          name="location"
          value={jobInfo.location}
        />
      </label>
      <label className="join flex flex-col gap-2 mb-[-2%]">
        <span className="indicator-item badge badge-primary">Job Description</span>
      </label>
      <TextEditor
        readOnly={false}
        initialValue={jobInfo.description}
        handleDescriptionChange={handleDescriptionChange}
      />
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
      {type !== "edit" && (
        <label className="join flex flex-col gap-2">
          <span className="indicator-item badge badge-primary"> Bounty</span>
          <input
            type="number"
            step="any"
            min="0"
            placeholder="Type here"
            className="input input-bordered w-[50vw]"
            onChange={handleChange}
            name="bounty"
            value={jobInfo.bounty}
          />
        </label>
      )}

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

      <button className={`btn btn-primary`} onClick={handleJob}>
        {type === "edit" ? "Edit Job" : "Add Job"}
      </button>
      {modalOpen && (
        <JobModal setModal={() => setModalOpen(false)} addJob={confirmJob} loading={false} jobInfo={jobInfo} />
      )}
    </div>
  );
};

export default JobFill;
