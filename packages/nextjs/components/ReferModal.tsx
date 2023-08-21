import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { GeneralContext } from "~~/providers/GeneralContext";
import { registerReferral } from "~~/services/APIs/smartContract";
import { notification } from "~~/utils/scaffold-eth";

type Props = {
  jobId: string;
  setReferModal: (value: boolean) => void;
};

const ReferModal = ({ setReferModal, jobId }: Props) => {
  const { referrer } = useContext(GeneralContext);
  const [refereeMail, setRefereeMail] = useState("");
  const [loading, setLoading] = useState(false);

  const registerReferralSC = async () => {
    if (!referrer) {
      notification.error("Please register as a referrer");

      return;
    }
    setLoading(true);
    const tx = await registerReferral(Number(jobId), refereeMail);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative w-[30vw] h-[25vh] bg-secondary p-4 rounded-lg">
        Refer a suitable candidate
        <button
          className="absolute top-2 right-2"
          onClick={() => {
            setReferModal(false);
          }}
        >
          <XMarkIcon className="h-4 w-4 text-tertiary" />
        </button>
        <div className="flex flex-col items-center h-full mt-[1%] p-8 gap-2">
          <label className="join flex flex-col gap-2">
            <span className="indicator-item badge badge-primary">Candidate Email</span>
            <input
              type="text"
              value={refereeMail}
              onChange={e => setRefereeMail(e.target.value)}
              className="input input-bordered w-[200px] md:w-[20vw]"
            />
          </label>
          <button className={`btn btn-primary mt-[2%]`} onClick={registerReferralSC} disabled={loading}>
            Refer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferModal;
