import React, { useEffect, useState } from "react";
import Recruitment from "../generated/recruitment.json";
import { notification } from "../utils/scaffold-eth/notification";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { checkCompanyRegistration, checkReferrerRegistration } from "~~/services/APIs/database";

export const GeneralContext = React.createContext();
export const GeneralProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [id, setId] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const contractAddress = "0xA78230280a91C8EEe78C2B2f0AeB7332544dF298";
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [registered, setRegistered] = useState(false);
  const [referrer, setReferrer] = useState(false);
  const [jobInfo, setJobInfo] = React.useState({
    id: 0,
    roleTitle: "Role Title",
    description: "Describe the Role",
    companyName: "Company name",
    location: "Location",
    maxSalary: "Max Salary",
    bounty: "Bounty",
    minSalary: "Min Salary",
    type: "Internship",
  });

  const { address } = useAccount();
  const checkRegistration = async () => {
    if (!address) {
      return;
    }
    let referrerExists;
    try {
      referrerExists = await checkReferrerRegistration(address);
    } catch (e) {
      referrerExists = false;
    }
    let companyExists;
    try {
      companyExists = await checkCompanyRegistration(address);
    } catch (e) {
      companyExists = false;
    }

    if (referrerExists) {
      setReferrer(true);
    }
    if (referrerExists || companyExists) {
      setRegistered(true);
      return;
    }
  };

  useEffect(() => {
    setReferrer(false);
    setRegistered(false);
    checkRegistration();
  }, [address]);

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

  const registerReferral = async (jobId, email) => {
    setLoading(true);
    try {
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const regRef = await deployedContract.registerReferral(jobId, email);
      await regRef.wait();
      console.log("Success! Transaction hash:", regRef.transactionHash);

      const refIds = await deployedContract.getReferralIDs();
      console.log(refIds);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var params = new URLSearchParams();
      params.append("refId", refIds[refIds.length - 1]);
      params.append("email", email);
      let refId = refIds[refIds.length - 1].toString();
      console.log(refId);
      var raw = {
        body: {
          email: email,
          refId: refId,
        },
      };
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow",
      };

      console.log({ requestOptions });
      console.log(params.toString());

      fetch("https://74p0ofti6d.execute-api.eu-north-1.amazonaws.com/dev/mail", requestOptions)
        .then(response => {
          response.text();
          console.log(response.text());
        })
        .then(result => console.log(result))
        .catch(error => console.log("error", error))
        .finally(() =>
          notification.success("An email was sent to this candidate for referral confirmation. Thank you!"),
        );
    } catch (error) {
      console.error("Error:", error);
      notification.error("Failed to register referral");
    } finally {
      setLoading(false);
    }
  };

  const sendInterviewMail = async (roomId, email) => {
    setLoading(true);
    try {
      //Send email
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = {
        body: {
          roomId: roomId,
          email: email,
        },
      };

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow",
      };

      fetch("https://74p0ofti6d.execute-api.eu-north-1.amazonaws.com/dev/mail", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error))
        .finally(() => notification.success("An email was sent to this candidate with the Huddle link!"));
    } catch (error) {
      console.error("Error:", error);
      notification.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const confirmReferral = async (refId, email) => {
    setLoading(true);
    try {
      const deployedContract = new ethers.Contract(contractAddress, Recruitment.abi, signer);
      const confirmRef = await deployedContract.confirmReferral(refId, email);
      await confirmRef.wait();
      console.log("Success! Transaction hash:", confirmRef.transactionHash);
      notification.success("Confirmed Referral successfully");
    } catch (error) {
      console.error("Error:", error);
      notification.error("Failed to Confirm Referral");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    walletAddress,
    setWalletAddress,
    jobInfo,
    setJobInfo,
    handleChange,

    allJobs,
    setAllJobs,
    registerReferral,
    email,
    setEmail,
    id,
    setId,
    loading,
    setLoading,
    sendInterviewMail,
    roomId,
    setRoomId,
    confirmReferral,
    handleDescriptionChange,
    search,
    setSearch,
    registered,
    setRegistered,
    setReferrer,
    referrer,
  };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
