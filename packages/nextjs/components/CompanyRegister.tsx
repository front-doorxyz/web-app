import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { GeneralContext } from "~~/providers/GeneralContext";
import { registerCompany } from "~~/services/polybase/database";
import { notification } from "~~/utils/scaffold-eth";

const CompanyRegister = () => {
  const { setRegistered } = useContext(GeneralContext);
  const { address } = useAccount();
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companySite, setCompanySite] = useState("");

  const handleCompanyNameChange = (event: any) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyDescriptionChange = (event: any) => {
    setCompanyDescription(event.target.value);
  };

  const handleCompanySiteChange = (event: any) => {
    setCompanySite(event.target.value);
  };

  const handleCompanyRegister = async () => {
    if (!isValidURL(companySite)) {
      notification.error("Valid Url for company site");
      return;
    }

    const companyData = [address, companyName, companyDescription, companySite];

    const company = await registerCompany(companyData);
    if (company.id) {
      setRegistered(true);
      notification.success("registration successfull");
      router.push("/client");
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
          <span className="indicator-item badge badge-primary">Company Name</span>
          <input
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
            className="input input-bordered w-[200px] md:w-[20vw]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="indicator-item badge badge-primary">Description</span>
          <textarea
            value={companyDescription}
            onChange={handleCompanyDescriptionChange}
            className="textarea w-[200px] md:w-[20vw]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="indicator-item badge badge-primary">Company Website</span>
          <input
            type="text"
            value={companySite}
            onChange={handleCompanySiteChange}
            className="input input-bordered w-[200px] md:w-[20vw]"
          />
        </div>

        <button className="btn btn-primary w-[200px] md:w-[20vw]" onClick={handleCompanyRegister}>
          Register
        </button>
      </div>
    </>
  );
};

export default CompanyRegister;
