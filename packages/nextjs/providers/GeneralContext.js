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
  const [id, setId] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [email, setEmail] = useState("");
  const contractAddress = "0x30852CF041B5aa3964753D928778D0a31837B9C1";
  const [loading, setLoading] = useState(false);
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
    let parsedValue = value; // Initialize parsedValue with the original value

    if (name === "minSalary" || name === "maxSalary" || name === "bounty") {
      parsedValue = parseInt(value); // Convert value to an integer
      // If you want to allow decimal values, use parseFloat instead:
      // parsedValue = parseFloat(value);
    }

    setJobInfo({
      ...jobInfo,
      [name]: parsedValue,
    });
  };

  const registerJob = async bounty => {
    setLoading(true);
    try {
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const tx = await deployedContract.registerJob(Number(bounty));
      const receipt = await tx.wait();
      // const jobId = receipt.events[0].args[0].toNumber();
      // console.log("Job registered with jobId:", jobId);
      console.log("Success! Transaction hash:", receipt.transactionHash);
      return receipt.transactionHash;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const tx = await deployedContract.getAllJobs(1);
      console.log(tx);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async jobId => {
    setLoading(true);
    try {
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const del = await deployedContract.deleteJob(jobId);
      await del.wait();
      // Wait for the transaction to be mined and obtain the receipt
      console.log("Success! Transaction hash:", del.transactionHash);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerReferral = async (jobId, email) => {
    setLoading(true);
    try {
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const regRef = await deployedContract.registerReferral(jobId, email);
      await regRef.wait();
      console.log("Success! Transaction hash:", regRef.transactionHash);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
    email,
    setEmail,
    id,
    setId,
    loading,
    setLoading,
  };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
