import React, { useState } from "react";
import { NextPage } from "next";

interface IErrors {
  fullname: boolean;
  email: boolean;
  message: boolean;
}

const ContactUs: NextPage = () => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ fullname: false, email: false, message: false });

  //   Setting submit button status
  const [buttonText, setButtonText] = useState<string>("Submit");
  const [enableSubmit, setEnableSubmit] = useState<boolean>(true);

  // success or failure messages
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showFailureMessage, setShowFailureMessage] = useState<boolean>(false);

  const isEmail = (email: string): boolean => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleValidation = (): boolean => {
    const tempErrors: IErrors = { fullname: false, email: false, message: false };
    let isValid = true;
    if (fullname.length == 0) {
      tempErrors.fullname = true;
      isValid = false;
    }
    if (!isEmail(email)) {
      tempErrors.email = true;
      isValid = false;
    }
    if (message.length == 0){
      tempErrors.message = true;
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

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
