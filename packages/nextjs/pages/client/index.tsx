import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import howitworks from "~~/assets/howitworks.png";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import AddJob from "~~/components/JobInfo";
import Jobs from "~~/components/Jobs";
import { GeneralContext } from "~~/providers/GeneralContext";

// Import the CSS for styling

const client: NextPage = () => {
  const [active, setActive] = useState<boolean>(true);
  const { address } = useAccount();
  const activeTab = (e: any) => {
    const id = e.target.id;
    if (id === "1") {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div className="flex flex-col  justify-center w-full  mt-[2%]">
      <div className="tabs tabs-boxed flex justify-center items-center">
        <a id="1" className={`tab tab-lg tab-lifted ${active ? "tab-active" : ""}`} onClick={activeTab}>
          Add a job
        </a>
        <a id="2" className={`tab tab-lg tab-lifted ${!active ? "tab-active" : ""}`} onClick={activeTab}>
          View Previous Jobs
        </a>
      </div>
      {active ? (
        <div className="flex items-center justify-center">
          <AddJob type="add" />
        </div>
      ) : (
        <>{address ? <Jobs type="client" /> : "Login to see your jobs"}</>
      )}
    </div>
  );
};

export default client;
