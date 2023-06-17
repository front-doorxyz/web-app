import React, { useEffect, useState } from "react";
import abi from "../generated/ABI";
import axios from "axios";
import { ethers } from "ethers";

const { JsonRpcProvider } = require("@ethersproject/providers");
export const GeneralContext = React.createContext();
export const GeneralProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const contractAddress = "0xC73A4F24B197b276cf738B0b76EA5b9cf1CB5184";

  const [jobInfo, setJobInfo] = React.useState({
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
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`,
    );
    const signer = provider.getSigner();
    console.log("signer", signer);
    const abi = await fetchContractABI(contractAddress);
    const deployedContract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await deployedContract.registerJob(1000);
    await tx.wait();
    console.log("Job registered", tx.hash);
  };

  const value = {
    walletAddress,
    setWalletAddress,
    jobInfo,
    setJobInfo,
    handleChange,
    registerJob,
  };

  useEffect(() => {
    console.log(walletAddress);
  }, [walletAddress]);

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
