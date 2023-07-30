import React, { useState } from "react";
import { NextPage } from "next";

const JobCandidates: NextPage = () => {
  const candidatesPerPage = 5;
  const candidate1 = {
    id: 1,
    walletAddress: "05x123xyz",
    reffererScore: "3",
    link: "link",
  };
  const candidates = [candidate1, candidate1, candidate1, candidate1, candidate1, candidate1];

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last candidate to display on the current page
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div id="table-header" className="flex items-center justify-center gap-2 mt-[1%]">
        <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
          Candidate Wallet Address
        </div>
        <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
          Refferer Feedback Score
        </div>
        <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
          Attached profile link
        </div>
        <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
          Contact candidate
        </div>
        <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
          Reject candidate{" "}
        </div>
        <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center text-bold">
          Hire Candidate
        </div>
      </div>
      <div id="table info" className="flex flex-col items-center justify-center gap-2 ">
        {candidates.map(candidate => (
          <div key={candidate.id} className="flex items-center justify-center gap-2 mt-[1%]">
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
              {candidate.walletAddress}
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
              {candidate.reffererScore}
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
              {candidate.link}
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
              <button className="px-4 py-1 bg-blue-500 text-sm md:text-sm text-white rounded">Contact</button>
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
              <button className="px-4 py-1 bg-red-500 text-sm md:text-sm text-white rounded">Reject</button>
            </div>
            <div className="w-[200px] h-[40px] border-2 border-accent flex items-center justify-center">
              <button className="px-4 py-1 bg-green-500 text-sm md:text-sm text-white rounded">Hire</button>
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
    </div>
  );
};

export default JobCandidates;
