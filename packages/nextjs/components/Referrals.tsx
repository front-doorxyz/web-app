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
      <Block title="Average score out of 5" content={["Referral 1", "Referral 2", "Referral 3"]} type="string" />
      <Block title="Role Title of successful referrals" content={[1, 3, 5]} type="star" />
    </div>
  );
};

export default Referrals;
