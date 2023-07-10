import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { GeneralContext } from "~~/providers/GeneralContext";

const RefConfirm: NextPage = () => {
  const { confirmReferral, loading } = useContext(GeneralContext);
  const [refId, setRefId] = useState(1);
  const [email, setEmail] = useState("bhavya.gor9999@gmail.com");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Recruitment",
    functionName: "confirmReferral",
    args: [refId, email],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="card  rounded-lg shadow-lg p-[2%] w-[30vw]">
        <div className="flex flex-col justify-start items-center gap-4 ">
          <div className="text-md md:text-xl">Confirm your referral</div>
          <div className="flex flex-col items-center justify-center gap-4">
            <input type="text" placeholder="Ref Id" className="input input-bordered w-[20vw]" value={refId} />
            <input type="text" placeholder="Email" className="input input-bordered w-[20vw]" value={email} />
          </div>
          <button
            className="btn btn-primary"
            disabled={isLoading}
            onClick={writeAsync}
            // onClick={() => confirmReferral(refId, email)}
          >
            Confirm Referral
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefConfirm;
