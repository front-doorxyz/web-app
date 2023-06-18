import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddJob from "~~/components/JobInfo";
import { GeneralContext } from "~~/providers/GeneralContext";

const EditJob = () => {
  const { id, setId } = useContext(GeneralContext);
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    setId(id);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full  mt-[2%]">
      <div className="text-xl mb-[2%]">Edit Job {id}</div>
      <AddJob type="edit" />
    </div>
  );
};

export default EditJob;
