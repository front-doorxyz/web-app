import React from "react";
import AddJob from "~~/components/JobInfo";

type Props = {};

const EditJob = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full  mt-[2%]">
      <div className="text-xl mb-[2%]">Edit Job with ID</div>
      <AddJob type="edit" />
    </div>
  );
};

export default EditJob;
