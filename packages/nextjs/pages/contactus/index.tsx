import React from "react";
import { NextPage } from "next";

const ContactUs: NextPage = () => {
  return (
    <div className="flex flex-col items-center  mt-[2%]">
      <div id="info" className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-sm md:text-xl">Get in touch</h3>
        <h1 className="text-xl md:text-5xl font-bold font-bai-jamjuree text-black dark:text-gray-500">
          We&apos;d love to hear from you
        </h1>
      </div>
      <div
        id="form"
        className="w-[300px] md:w-[30vw] bg-[#ade8f4] rounded-[2%] p-10 mt-[4%] flex flex-col items-center justify-center gap-5 "
      >
        <h3 className="text-sm md:text-xl  text-black ">Feel free to reach out</h3>
        <input type="text" placeholder="Enter your name" className="input input-bordered  w-[200px] md:w-[20vw] " />
        <input type="text" placeholder="Enter your email" className="input input-bordered w-[200px] md:w-[20vw] " />
        <textarea
          placeholder="Enter your message"
          className="peer h-3/4 min-h-[100px]  w-[200px] md:w-[20vw] input input-bordered"
        />
        <button className="btn btn-primary w-[200px] md:w-[20vw] hover:scale-110">Submit</button>
      </div>
    </div>
  );
};

export default ContactUs;
