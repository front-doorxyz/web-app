import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import * as eth from "@polybase/eth";
import { useAccount } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";
import { db, registerCandidate } from "~~/services/polybase/database";
import { notification } from "~~/utils/scaffold-eth";

const CandidateRegister = () => {
  const { setCandidate, setRegistered } = useContext(GeneralContext);
  const { address } = useAccount();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portfolio, setPortfolio] = useState("");
  db.signer(async (data: string) => {
    const sig = await eth.sign(data, address);
    return { h: "eth-personal-sign", sig };
  });

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handlePortfolioChange = event => {
    setPortfolio(event.target.value);
  };

  const handleRegister = async () => {
    if (!isValidURL(portfolio)) {
      notification.error("Pls enter a proper url ");
      return;
    }
    const candidateData = [address, name, description, portfolio];

    const candidate = await registerCandidate(candidateData);
    if (candidate.id) {
      setCandidate(true);
      setRegistered(true);
      notification.success("registration successfull");
      router.push("/");
    }
  };

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div
        id="form"
        className="w-[300px] md:w-[30vw]  h-[50vh] p-2  flex flex-col items-center justify-center gap-4 shadow-2xl mt-[2%]"
      >
        <div className="flex flex-col gap-2">
          <span className="indicator-item badge badge-primary">Name</span>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="input input-bordered w-[200px] md:w-[20vw]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="indicator-item badge badge-primary">Description</span>
          <textarea value={description} onChange={handleDescriptionChange} className="textarea w-[200px] md:w-[20vw]" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="indicator-item badge badge-primary">Portfolio / Socials</span>
          <input
            type="text"
            value={portfolio}
            onChange={handlePortfolioChange}
            className="input input-bordered w-[200px] md:w-[20vw]"
          />
        </div>
        <button className="btn btn-primary w-[200px] md:w-[20vw]" onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  );
};

export default CandidateRegister;
