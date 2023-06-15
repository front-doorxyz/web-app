import React from "react";
import Block from "./Block";

type Props = {};

const References = (props: Props) => {
  return (
    <div>
      <div className="card w-[50vw] bg-primary text-primary-content">
        <div className="card-body">
          <div className="flex items-center">
            <div>
              <h2 className="card-title">References for: Wallet Address</h2>
            </div>
          </div>
          <p>Roles this profile has been shared with</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 grid-rows-1 gap-8 mt-[2%]">
          <Block title="Average score out of 5" content={["Referral 1", "Referral 2", "Referral 3"]} type="string" />
          <Block title="Awarded Score" content={[1, 3, 5]} type="star" />
        </div>
      </div>
    </div>
  );
};

export default References;
