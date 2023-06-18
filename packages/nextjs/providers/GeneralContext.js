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
  const contractAddress = "0xA78230280a91C8EEe78C2B2f0AeB7332544dF298";
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
      if (isNaN(bounty)) return undefined
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const tx = await deployedContract.registerJob(bounty);
      return tx?.data ? tx?.data : null;
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
      //register referral
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const regRef = await deployedContract.registerReferral(jobId, email);
      await regRef.wait();
      console.log("Success! Transaction hash:", regRef.transactionHash);

      //Get referrals
      const refIds = await deployedContract.getReferralIDs();

      //Send email
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "body": {
          "refId": refIds[refIds.length-1],
          "email": email
        }
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://74p0ofti6d.execute-api.eu-north-1.amazonaws.com/dev/mail", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .finally(() => alert("An email was sent to this candidate for referral confirmation. Thank you!"));
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
