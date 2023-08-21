import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import * as eth from "@polybase/eth";
import { useAccount } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";
import { db, registerReferrer } from "~~/services/APIs/database";
import { notification } from "~~/utils/scaffold-eth";

const ReferrerRegister = () => {
  const { setRefferer, setRegistered } = useContext(GeneralContext);
  const { address } = useAccount();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  db.signer(async (data: string) => {
    const sig = await eth.sign(data, address);
    return { h: "eth-personal-sign", sig };
  });

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleRegister = async () => {

    const referrerData = [address, name, email];

    const referrer = await registerReferrer(referrerData);
    if (referrer.id) {
      setRefferer(true);
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
          <span className="indicator-item badge badge-primary">Email</span>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
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

export default ReferrerRegister;
