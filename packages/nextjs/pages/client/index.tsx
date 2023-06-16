import React, { useState } from "react";
import type { NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import AddJob from "~~/components/JobInfo";
import Jobs from "~~/components/Jobs";

// Import the CSS for styling

const client: NextPage = () => {
  const [active, setActive] = useState<boolean>(true);

  const activeTab = (e: any) => {
    const id = e.target.id;
    if (id === "1") {
      console.log("hiii");
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full  mt-[2%]">
      <div className="tabs tabs-boxed flex justify-center items-center">
        <a id="1" className={`tab tab-lg tab-lifted ${active ? "tab-active" : ""}`} onClick={activeTab}>
          Add a job
        </a>
        <a id="2" className={`tab tab-lg tab-lifted ${!active ? "tab-active" : ""}`} onClick={activeTab}>
          View Previous Jobs
        </a>
      </div>
      {active ? (
        <>
          <div className="px-5 mt-[2%]">
            <h1 className="text-center mb-8">
              <span className="block text-4xl font-bold">Add a Job</span>
            </h1>
          </div>
          <AddJob type="add" />
        </>
      ) : (
        <Jobs type="client" />
      )}
    </div>
  );
};

export default client;
