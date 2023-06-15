import React from "react";
import Block from "./Block";

type Props = {};

const Referres = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-1 gap-8 mt-[2%]">
        <Block title="Average score out of 5" content={["Referral 1", "Referral 2", "Referral 3"]} type="string" />
        <Block title="Awarded Score" content={[1, 3, 5]} type="star" />
        <Block title="Average score out of 5" content={["Referral 1", "Referral 2", "Referral 3"]} type="string" />
        <Block title="Awarded Score" content={[1, 3, 5]} type="star" />
      </div>
    </div>
  );
};

export default Referres;
