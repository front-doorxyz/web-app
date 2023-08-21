import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import CandidateModal from "~~/components/CandidateModal";
import HireModal from "~~/components/HireModal";
import { checkCandidateRegistration, checkCompanyRegistration } from "~~/services/APIs/database";
import { confirmReferral } from "~~/services/APIs/smartContract";

const RefConfirm: NextPage = () => {
  const [refId, setRefId] = useState(0);
  const [jobId, setJobId] = useState(0);
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [candidateModal, setCandidateModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      const [refid, jobId] = id.split("+");
      setRefId(refid);
      setJobId(jobId);
      if (!refid || !jobId) {
        router.push("/");
      }
    }
  }, [router]);

  const confirmReferralSC = async () => {
    const isCandidate = await checkCandidateRegistration(address);

    if (isCandidate) {
      setIsLoading(true);
      const data = await confirmReferral(refId, jobId);

      return;
    }
    setCandidateModal(true);
  };

  return (
    <>
      {address ? (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="card  rounded-lg shadow-lg p-[2%] w-[30vw]">
            <div className="flex flex-col justify-start items-center gap-4 ">
              <div className="text-md md:text-xl">Confirm your referral</div>
              <div className="flex flex-col items-center justify-center gap-4">
                <input type="text" placeholder="Ref Id" className="input input-bordered w-[20vw]" value={refId} />
                <input type="text" placeholder="Email" className="input input-bordered w-[20vw]" value={jobId} />
              </div>
              <button className="btn btn-primary" disabled={isLoading} onClick={confirmReferralSC}>
                Confirm Referral
              </button>
            </div>
          </div>
          {candidateModal && <CandidateModal address={address} setCandidateModal={() => setCandidateModal(false)} />}
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default RefConfirm;
