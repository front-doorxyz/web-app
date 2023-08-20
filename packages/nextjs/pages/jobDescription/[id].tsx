import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chip from "../../components/Chip";
import { readCompanyById, readJobListingById } from "../../services/APIs/database";
import { Address, useAccount } from "wagmi";
import { MapPinIcon } from "@heroicons/react/24/outline";
import StarRating from "~~/components/StarRating";
import TextEditor from "~~/components/TextEditor";
import { truncateDescription } from "~~/helpers";
import { GeneralContext } from "~~/providers/GeneralContext";

const Description = () => {
  const { deleteJob, registerReferral, email, setEmail, id, setId } = useContext(GeneralContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [jobInfo, setJobInfo] = useState<any>({});
  const [companyInfo, setCompanyInfo] = useState<any>({});
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (jobInfo?.description && companyInfo?.companyName) {
      setLoading(false);
    }
  }, [jobInfo]);

  useEffect(() => {
    const { id } = router.query;
    console.log(id);
    setId(id);

    readJobListingById(id)
      .then(jobListing => {
        setJobInfo(jobListing);
      })
      .catch(error => {
        // Handle the error appropriately
      });
  }, [router]);

  const getCompanyData = async (address: Address) => {
    const data = await readCompanyById(address);
    setCompanyInfo(data);
  };

  useEffect(() => {
    if (address) {
      getCompanyData(address);
    }
  }, [address]);

  return (
    <>
      {!loading ? (
        <div className="flex justify-around   w-[100vw]">
          {/* <div className="flex flex-col h-full">
            <div>
              <div className="flex flex-col gap-2 text-sm md:text-lg p-2">
                <div className="flex flex-wrap gap-2 ">
                  <Chip label={`Bounty: $${jobInfo.bounty}`} color="blue" />
                  <Chip label={`Max Salary: $${jobInfo.maxSalary}`} color="green" />
                  <Chip label={`Min Salary: $${jobInfo.minSalary}`} color="slate" />
                </div>
                <div>Company Name: {jobInfo.companyName}</div>
                <div>Role Title: {jobInfo.roleTitle}</div>
                <div>Location: {jobInfo.location}</div>

                <div className="flex flex-col mt-2">
                  Refer Candidate:
                  <div className="flex flex-col items-center justify-center gap-4 mt-2">
                    <div>
                      <input
                        type="file"
                        className="text-sm file-input file-input-bordered file-input-primary max-w-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Email"
                        className="text-sm input input-bordered max-w-xs"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center h-[20%] gap-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-sm md:text-lg text-white rounded"
                disabled={loading}
                onClick={() => registerReferral("0x01", email)}
              >
                Refer
              </button>
            </div>
          </div> */}
          <div className="mt-[0.5%] flex flex-col gap-8">
            <div className="flex justify-between flex-col w-[40vw] h-[190px] bg-primary p-4 rounded-lg shadow-md mt-[2%]  ">
              <div className="flex justify-between mb-4">
                <div className="flex flex-col">
                  <div className="text-[10px]"> Job Info</div>
                  {jobInfo.roleTitle}
                  <div className="flex flex-wrap gap-2 mt-[2%] ">
                    <Chip label={`Bounty: $${jobInfo.bounty}`} color="blue" />
                    <Chip label={`Max Salary: $${jobInfo.maxSalary}`} color="green" />
                    <Chip label={`Min Salary: $${jobInfo.minSalary}`} color="slate" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex justify-center gap-2">
                    <MapPinIcon className="h-5 w-5" />
                    <div>{jobInfo.location}</div>
                  </div>
                  <div>{jobInfo.date}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button className="px-10 py-3 bg-green-500 text-white text-sm md:text-md rounded">Apply</button>
                <button className="px-10 py-3 bg-blue-500 text-white text-sm md:text-md rounded">Refer</button>
              </div>
            </div>
            <div className="flex flex-col w-[40vw] h-[200px] bg-primary p-4 rounded-lg shadow-md mt-[2%]  ">
              <div className="text-[10px]"> Organization Details</div>
              <div className="flex items-center justify-between">
                <div className="text-xl"> {companyInfo.companyName}</div> <StarRating score={4.5} />
              </div>
              <div>{truncateDescription(companyInfo.description, 30)}</div>
              <a>{companyInfo.companySite}</a>
            </div>
            <div className="flex flex-col w-[40vw] h-[150px] bg-primary p-4 rounded-lg shadow-md mt-[2%]  ">
              <div className="text-[10px]">Tags</div>
              <div className="flex flex-wrap gap-2 mt-[2%] ">
                <Chip label={`Engineering`} color="blue" />
                <Chip label={`CTO`} color="green" />
                <Chip label={`Infrastructure`} color="slate" />
              </div>
            </div>
          </div>
          <div className="h-[60vh]">
            <TextEditor readOnly={true} initialValue={jobInfo.description} title={"Job Details"} />
          </div>
        </div>
      ) : (
        "Job info loading"
      )}
    </>
  );
};

export default Description;
