import React from "react";
import { useRouter } from "next/router";

type Props = {};

const Signin = (props: Props) => {
  const router = useRouter();
  const redirect = () => {
    router.push("/client");
  };
  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Front Door</h4>
        <p className="mb-4 ml-1 text-lg text-gray-600">The Open Referrals Network</p>
        <p className="mb-4 ml-1 text-lg text-gray-600">
          Front Door unlocks collaboration in the fragmented $420 billion recruitment ecosystem.
        </p>
        <p className="mb-4 ml-1 text-lg text-gray-600">Get Started with Front Door</p>
        <button
          className="btn btn-primary"
          // onClick={connectWallet}
          // onClick={polybaseSignIn} //implement in future
          onClick={redirect}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Signin;
