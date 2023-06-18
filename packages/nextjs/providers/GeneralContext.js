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
  
  const contractAddress = "0xA78230280a91C8EEe78C2B2f0AeB7332544dF298";

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

  const registerJob = async (bounty) => {
    if (isNaN(bounty)) return undefined
    const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
    const tx = await deployedContract.registerJob(bounty);
    return tx?.data ? tx?.data : null;
  };

  const getAllJobs = async () => {
    const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
    console.log("signer",signer);
    const tx = await deployedContract.getAllJobs(0);
    console.log("getAllJobs", tx);
    return tx;
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
