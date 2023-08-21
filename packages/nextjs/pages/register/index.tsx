import React, { useState } from "react";
import { NextPage } from "next";
import register2 from "~~/assets/register2.jpg";
import register from "~~/assets/register.jpg";
import CompanyRegister from "~~/components/CompanyRegister";
import CandidateRegister from "~~/components/ReferrerRegister";

const index: NextPage = () => {
  const [active, setActive] = useState<boolean>(true);

  const activeTab = (e: any) => {
    const id = e.target.id;
    if (id === "1") {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <div className="flex w-full ">
      <div className="pt-[1%] w-[50%]">
        <div className="tabs tabs-boxed flex justify-center  gap-2">
          <a id="1" className={`tab tab-lg tab-lifted ${active ? "tab-active" : ""}`} onClick={activeTab}>
            Company Register
          </a>
          <a id="2" className={`tab tab-lg tab-lifted ${!active ? "tab-active" : ""}`} onClick={activeTab}>
            Referrer Register
          </a>
        </div>
        <div className="flex justify-center">{active ? <CompanyRegister /> : <CandidateRegister />}</div>
      </div>
      <div className="absolute right-0 hidden mt-[0.2%]   md:block lg:w-[47vw]">
        <div
          className="absolute flex h-[94vh] w-full  bg-secondary bg-contain bg-no-repeat bg-start "
          style={{ backgroundImage: active ? `url(${register.src})` : `url(${register2.src})` }}
        />
      </div>
    </div>
  );
};

export default index;
