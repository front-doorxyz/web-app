import React from "react";

type Chip = {
  label: string;
  color: string;
};

const Chip = (props: Chip) => {
  const { label, color } = props;
  return <span className={`px-2 py-1 rounded-full text-white text-xs font-bold bg-${color}-500`}>{label}</span>;
};

export default Chip;
