import React from "react";

interface Props {
  showError: boolean;
  errorMsg: string;
}

const ErrorHandler = ({ showError, errorMsg }: Props) => (
  <>
    {showError && (
      <div className="w-3/4 mt-5 mx-auto">
        <div className="text-white text-center  p-2 font-bold rounded-md bg-red-600 shadow-2xl">
          <p>{errorMsg}</p>
        </div>
      </div>
    )}
  </>
);

export default ErrorHandler;
