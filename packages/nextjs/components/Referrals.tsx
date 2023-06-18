import React from "react";
import Block from "./Block";

type Props = {};

const Referrals = (props: Props) => {
  return (
    <div>
      <div className="card w-[50vw] bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Overall Score</h2>
          <p>13</p>
          <p>Overall Score = Average score out of 5 * # referrals made * % of successful referrals</p>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-8 mt-[2%]">
        <div className="flex flex-col gap-8">
          <Block
            title="Role Title of successful referrals"
            content={["Java Developer", "C++ Developer", "Python Developer"]}
            type="string"
          />
          <Block
            title="Roles referred candidates to"
            content={["Android Developer", "Mobile app dev", "Solidity smart contracts developer"]}
            type="string"
          />
        </div>
        <div className="flex flex-col gap-8">
          <Block title="Awarded Score" content={[1, 3, 5]} type="star" />
          <Block title="Number of Referrals made per role" content={["5", "2", "6"]} type="string" />
        </div>
      </div>
    </div>
  );
};

export default Referrals;
