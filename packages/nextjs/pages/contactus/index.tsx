import React from "react";
import { NextPage } from "next";

const ContactUs: NextPage = () => {
  return (
    <div className="flex flex-col items-center  mt-[2%]">
      <div id="info" className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-sm md:text-xl">Get in touch</h3>
        <h1 className="text-xl md:text-5xl font-bold font-bai-jamjuree  ">We'd love to hear from you</h1>
      </div>
      <div
        id="form"
        className="w-[300px] md:w-[30vw] bg-[#ade8f4] h-[50vh] rounded-[50%] p-2 mt-[4%] flex flex-col items-center justify-center gap-4 "
      >
        <h3 className="text-sm md:text-xl mt-[-8%] text-black ">Feel free to reach out</h3>
        <input type="text" placeholder="Enter your name" className="input input-bordered  w-[200px] md:w-[20vw] " />
        <input type="text" placeholder="Enter your email" className="input input-bordered w-[200px] md:w-[20vw] " />
        <button className="btn btn-primary w-[200px] md:w-[20vw]">Submit</button>
      </div>
    </div>
  );
};

export default ContactUs;
