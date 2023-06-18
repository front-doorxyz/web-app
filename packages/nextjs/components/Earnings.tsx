import React from "react";
import Block from "./Block";

type Props = {};

const Earnings = (props: Props) => {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-8 mt-[2%]">
      <Block title="Candidate wallet address" content={["0x56fad49", "0x39j...ke43", "0x83m...jd82"]} type="string" />
      <Block title="Role" content={["Java Developer", "C++ Developer", "Python Developer"]} type="string" />
      <Block title="$ Earnings" content={["5000 USDC", "4500 USDT", "4000 DAI"]} type="string" />
    </div>
  );
};

export default Earnings;
