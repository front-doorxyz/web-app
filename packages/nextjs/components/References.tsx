import React from "react";
import Block from "./Block";
import { useAccount } from "wagmi";

type Props = {};

const References = (props: Props) => {
  const { address } = useAccount();
  return (
    <div>
      <div className="card w-[50vw] bg-primary text-primary-content">
        <div className="card-body">
          <div className="flex items-center">
            <div>
              <h2 className="card-title">References for: {address}</h2>
            </div>
          </div>
          <p>Roles this profile has been shared with</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 grid-rows-1 gap-8 mt-[2%]">
          <Block title="Role title" content={["Java Developer", "Accountant", "CFO"]} type="string" />
          <Block title="Company" content={["Javalia", "Accounting Dreams", "Micropop"]} type="string" />
        </div>
      </div>
    </div>
  );
};

export default References;
