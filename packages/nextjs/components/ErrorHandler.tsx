import React from "react";

interface Props {
  showError: boolean;
  errorMsg: string;
}

const ErrorHandler = ({ showError, errorMsg }: Props) => {
  return (
    <>
      {showError && (
        <div className="text-white text-center  p-2 font-bold  mx-2 rounded-md bg-red-600 shadow-2xl">
          <p>{errorMsg}</p>
        </div>
      )}
    </>
  );
};

export default ErrorHandler;
