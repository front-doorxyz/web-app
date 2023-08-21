import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import CandidateModal from "~~/components/CandidateModal";
import HireModal from "~~/components/HireModal";
import { applyforJob, checkCandidateRegistration, checkCompanyRegistration } from "~~/services/APIs/database";
import { confirmReferral } from "~~/services/APIs/smartContract";
import { notification } from "~~/utils/scaffold-eth";

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
    let isCandidate;
    try {
      isCandidate = await checkCandidateRegistration(address);
    } catch (e) {
      isCandidate = false;
    }

    if (isCandidate) {
      setIsLoading(true);
      const data = await confirmReferral(refId, jobId);
      const addCandidate = await applyforJob(String(jobId), address);
      notification.success("Applied for the job!");
      router.push("/");
      return;
    }
    setCandidateModal(true);
  };

  return (
    <>
      {address ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div id="info" className="flex flex-col items-center justify-center gap-2 mb-[2%]">
            <h3 className="text-sm md:text-xl">Thank you for choosing Front-Door</h3>
            <h1 className="text-xl md:text-5xl font-bold font-bai-jamjuree text-black dark:text-gray-300">
              Confirm your Referral and get Hired!
            </h1>
          </div>
          <div className="card  rounded-lg shadow-lg p-[2%] w-[30vw]">
            <div className="flex flex-col justify-start items-center gap-4 ">
              <div className="flex flex-col items-center justify-center gap-4">
                <label className="join flex flex-col gap-2">
                  <span className="indicator-item badge badge-primary">Refid</span>
                  <input type="text" placeholder="Ref Id" className="input input-bordered w-[20vw]" value={refId} />
                </label>
                <label className="join flex flex-col gap-2">
                  <span className="indicator-item badge badge-primary">jobId</span>
                  <input type="text" placeholder="Email" className="input input-bordered w-[20vw]" value={jobId} />
                </label>
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
