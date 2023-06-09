import React from "react";

type Props = {};

const AddJob = (props: Props) => {
  const [jobInfo, setJobInfo] = React.useState({
    title: "Role Title",
    description: "Describe the Role",
    company: "Company name",
    location: "Location",
    maxSalary: "Max Salary",
    bounty: "Bounty",
    minSalary: "Min Salary",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobInfo({ ...jobInfo, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="company"
        value={jobInfo.company}
      />
      <input
        type="text-area"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="description"
        value={jobInfo.description}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="location"
        value={jobInfo.location}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="title"
        value={jobInfo.title}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="bounty"
        value={jobInfo.bounty}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="maxSalary"
        value={jobInfo.maxSalary}
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-[50vw]"
        onChange={handleChange}
        name="minSalary"
        value={jobInfo.minSalary}
      />
      <button className="btn btn-primary">Add a job</button>
    </div>
  );
};

export default AddJob;
