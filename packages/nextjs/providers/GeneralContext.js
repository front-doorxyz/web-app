import React, { useEffect, useState } from "react";
import Recruitment from "../generated/recruitment.json";
import { readAll, write } from "../services/store/playground_store";
import axios from "axios";
import { ethers } from "ethers";
import { useSigner } from "wagmi";

export const GeneralContext = React.createContext();
export const GeneralProvider = ({ children }) => {
  const { data: signer } = useSigner();
  const [walletAddress, setWalletAddress] = useState("");
  const [allJobs, setAllJobs] = useState([]);

  const contractAddress = "0x30852CF041B5aa3964753D928778D0a31837B9C1";

  const [jobInfo, setJobInfo] = React.useState({
    id: 0,
    roleTitle: "Role Title",
    description: "Describe the Role",
    companyName: "Company name",
    location: "Location",
    maxSalary: "Max Salary",
    bounty: "Bounty",
    minSalary: "Min Salary",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log({ name, value });
    setJobInfo({
      ...jobInfo,
      [name]: value,
    });
  };

  const registerJob = async bounty => {
    const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
    const tx = await deployedContract.registerJob(Number(bounty));
    const receipt = await tx.wait();
    // const jobId = receipt.events[0].args[0].toNumber();
    // console.log("Job registered with jobId:", jobId);
    return receipt;
  };

  const getAllJobs = async () => {
    const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);

    const tx = await deployedContract.getAllJobs(1);
    console.log(tx);
  };

  const deleteJob = async jobId => {
    const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
    const del = await deployedContract.deleteJob(jobId);
    await del.wait();
    // Wait for the transaction to be mined and obtain the receipt
    console.log(del.hash);
  };

  const registerReferral = async () => {
    const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
    const regRef = await deployedContract.registerReferral(1, "bhavya.gor9999@gmail.com");
    await regRef.wait();
    console.log(regRef.hash);
  };

  useEffect(() => {
    console.log(jobInfo);
  }, [jobInfo]);

  const value = {
    walletAddress,
    setWalletAddress,
    jobInfo,
    setJobInfo,
    handleChange,
    registerJob,
    getAllJobs,
    deleteJob,
    allJobs,
    setAllJobs,
    registerReferral,
  };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
