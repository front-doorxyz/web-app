import React, { useState } from "react";
import { NextPage } from "next";
import ErrorHandler from "~~/components/ErrorHandler";

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
  const [submitButtonText, setSubmitButtonText] = useState<string>("Submit");
  const [enableSubmit, setEnableSubmit] = useState<boolean>(true);

  // success or failure messages
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showFailureMessage, setShowFailureMessage] = useState<boolean>(false);

  // form validation
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
    if (message.length == 0) {
      tempErrors.message = true;
      isValid = false;
    }
    setErrors(tempErrors);
    if(!isValid){
      console.log(tempErrors);
    }
    return isValid;
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = handleValidation();
    if (isFormValid) {
      setSubmitButtonText("Submit");
      setEnableSubmit(false);
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: "New message to Front Door",
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        setShowFailureMessage(true);
        setShowSuccessMessage(false);
        return;
      }
      setShowFailureMessage(false);
      setShowSuccessMessage(true);
      setSubmitButtonText("Submit");
      setEnableSubmit(true);
    }
  };

  return (
    <div className="flex flex-col items-center  mt-[2%]">
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <div id="info" className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-sm md:text-xl">Get in touch</h3>
          <h1 className="text-xl md:text-5xl font-bold font-bai-jamjuree text-black dark:text-gray-500">
            We&apos;d love to hear from you
          </h1>
        </div>
        <div
          id="form"
          className="w-[300px] mx-auto md:w-[30vw] bg-white rounded-[2%] p-10 mt-[4%] flex flex-col items-center justify-center gap-5 "
        >
          <h3 className="text-sm md:text-xl  text-black ">Feel free to reach out</h3>
          {errors.fullname && <ErrorHandler showError={errors.fullname} errorMsg="Name cannot be empty." />}
          {errors.email && <ErrorHandler showError={errors.email} errorMsg="Invalid email." />}
          {errors.message && <ErrorHandler showError={errors.message} errorMsg="Message cannot be empty." />}
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered  w-[200px] md:w-[20vw]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullname(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="Enter your email"
            className="input input-bordered w-[200px] md:w-[20vw]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
          />
          <textarea
            placeholder="Enter your message"
            className="peer h-3/4 min-h-[100px] w-[200px] md:w-[20vw] input input-bordered p-3"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)}
          />
          <button
            disabled={enableSubmit ? false : true}
            className={
              enableSubmit
                ? "px-8 py-3 btn btn-primary text-white rounded focus:outline-none w-[200px] md:w-[20vw] hover:scale-110 "
                : "px-8 py-3 bg-slate-500 text-white rounded focus:outline-none w-[200px] md:w-[20vw]"
            }
            type="submit"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
      {showSuccessMessage && (
        <p className="text-green-500 font-semibold text-sm my-2">Thank you! Your Message has been delivered.</p>
      )}

      {showFailureMessage && <p className="text-red-500">Oops! Something went wrong, please try again.</p>}
    </div>
  );
};

export default ContactUs;
