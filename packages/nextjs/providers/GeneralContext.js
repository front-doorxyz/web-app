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

  const contractAddress = "0xC73A4F24B197b276cf738B0b76EA5b9cf1CB5184";

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

  const registerJob = async () => {
    const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);

    const tx = await deployedContract.registerJob(1000);
    await tx.wait();
    // Wait for the transaction to be mined and obtain the receipt
    console.log(tx.hash);
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
