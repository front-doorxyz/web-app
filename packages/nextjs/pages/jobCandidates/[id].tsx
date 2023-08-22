import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readCandidateById, readJobListingById } from "../../services/APIs/database";
import { NextPage } from "next";
import HireModal from "~~/components/HireModal";

const JobCandidates: NextPage = () => {
  const [jobId, setJobId] = useState("");
  const [jobInfo, setJobInfo] = useState<any>({});
  const [hireModal, setHireModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [candidate, setCandidate] = useState({});

  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    console.log(id);
    setJobId(id);

    readJobListingById(id)
      .then(jobListing => {
        setJobInfo(jobListing);
      })
      .catch(error => {
        // Handle the error appropriately
      });
  }, [router]);

  useEffect(() => {
    if (jobInfo?.candidates && jobInfo?.candidates.length > 0) {
      console.log("HERE");
      getCandidatesInfo();
    }
  }, [jobInfo]);
  const [candidates, setCandidates] = useState([]);

  const getCandidatesInfo = async () => {
    console.log("HERE");
    setLoading(true);
    const candidateDataPromises = jobInfo.candidates.map(async (id: string) => {
      const data = await readCandidateById(id);
      console.log(data);
      return {
        id, // Assuming candidate is the ID
        name: data?.name,
        email: data?.email,
        site: data?.site,
      };
    });

    const candidatesData = await Promise.all(candidateDataPromises);
    setLoading(false);
    setCandidates(candidatesData);
  };

  const candidatesPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last candidate to display on the current page
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const confirmHire = () => {};

  return (
    <div>
      {!loading ? (
        <>
          {" "}
          <div id="table-header" className="flex items-center justify-center gap-2 mt-[1%]">
            <div className="w-[400px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
              Wallet Address
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
              Name
            </div>
            <div className="w-[400px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
              Email
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
              Contact candidate
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
              Hire Candidate
            </div>
          </div>
          <div id="table info" className="flex flex-col items-center justify-center gap-2 ">
            {candidates.map((candidate: any) => (
              <div key={candidate.id} className="flex items-center justify-center gap-2 mt-[1%]">
                <div className="w-[400px] h-[40px] border-2 border-accent flex items-center justify-center">
                  {candidate.id}
                </div>
                <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
                  {candidate.name}
                </div>
                <div className="w-[400px] h-[40px] border-2 border-accent flex items-center justify-center">
                  {candidate.email}
                </div>
                <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
                  <button
                    className="px-4 py-1 bg-blue-500 text-sm md:text-sm text-white rounded"
                    onClick={() => {
                      const portfolioLink = candidate?.site;
                      window.open(portfolioLink, "_blank");
                    }}
                  >
                    Contact
                  </button>
                </div>

                <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
                  <button
                    className="px-4 py-1 bg-green-500 text-sm md:text-sm text-white rounded"
                    onClick={() => {
                      setHireModal(!hireModal), setCandidate(candidate);
                    }}
                  >
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(candidates.length / candidatesPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-4 py-2 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {hireModal && (
            <HireModal setHireModal={() => setHireModal(false)} jobId={jobId} jobInfo={jobInfo} candidate={candidate} />
          )}
        </>
      ) : (
        "Loadingg"
      )}
    </div>
  );
};

export default JobCandidates;
