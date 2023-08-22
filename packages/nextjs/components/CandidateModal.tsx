import React, { useState } from "react";
import { registerCandidate as registerCandidateSC } from "../services/APIs/smartContract";
import { Address } from "wagmi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { isValidURL } from "~~/helpers";
import { registerCandidate } from "~~/services/APIs/database";
import { notification } from "~~/utils/scaffold-eth";

type Props = {
  address: Address;
  setCandidateModal: (value: boolean) => void;
};

const CandidateModal = ({ setCandidateModal, address }: Props) => {
  const [name, setName] = useState("");
  const [candidateMail, setCandidateMail] = useState("");
  const [site, setSite] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!isValidURL(site)) {
      notification.error("Valid Url for company site");
      return;
    }

    const candidateData = [address, name, candidateMail, site];

    await registerCandidateSC(candidateMail);
    const candidate = await registerCandidate(candidateData);
    if (candidate.id) {
      setCandidateModal(true);
      notification.success("registration successfull");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative w-[30vw] h-[40vh] bg-secondary p-4 rounded-lg">
        Looks like you are not registered as a candidate... <br />
        <button
          className="absolute top-2 right-2"
          onClick={() => {
            setCandidateModal(false);
          }}
        >
          <XMarkIcon className="h-4 w-4 text-tertiary" />
        </button>
        <div className="flex flex-col items-center h-full mt-[1%] p-8 gap-2">
          <label className="join flex flex-col gap-2">
            <span className="indicator-item badge badge-primary">Name</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input input-bordered w-[200px] md:w-[20vw]"
            />
          </label>
          <label className="join flex flex-col gap-2">
            <span className="indicator-item badge badge-primary">Candidate Email</span>
            <input
              type="text"
              value={candidateMail}
              onChange={e => setCandidateMail(e.target.value)}
              className="input input-bordered w-[200px] md:w-[20vw]"
            />
          </label>
          <label className="join flex flex-col gap-2">
            <span className="indicator-item badge badge-primary">Socials / Portfolio</span>
            <input
              type="text"
              value={site}
              onChange={e => setSite(e.target.value)}
              className="input input-bordered w-[200px] md:w-[20vw]"
            />
          </label>
          <button className={`btn btn-primary mt-[2%]`} onClick={register} disabled={loading}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
