import React, { useEffect, useState } from "react";
import Recruitment from "../generated/recruitment.json";
import axios from "axios";
import { ethers } from "ethers";
import { useSigner } from "wagmi";

const { JsonRpcProvider } = require("@ethersproject/providers");
export const GeneralContext = React.createContext();
export const GeneralProvider = ({ children }) => {
  const { data: signer } = useSigner();
  const [walletAddress, setWalletAddress] = useState("");

  const contractAddress = "0xC73A4F24B197b276cf738B0b76EA5b9cf1CB5184";

  const [jobInfo, setJobInfo] = React.useState({
    id: 0,
    title: "Role Title",
    description: "Describe the Role",
    company: "Company name",
    location: "Location",
    maxSalary: "Max Salary",
    bounty: "Bounty",
    minSalary: "Min Salary",
  });

  const handleChange = () => {
    setJobInfo({ ...jobInfo, [e.target.name]: e.target.value });
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

  // useEffect(() => {
  //   getAllJobs();
  // });

  const value = {
    walletAddress,
    setWalletAddress,
    jobInfo,
    setJobInfo,
    handleChange,
    registerJob,
    getAllJobs,
    deleteJob,
  };

  useEffect(() => {
    console.log(walletAddress);
  }, [walletAddress]);

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
