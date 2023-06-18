import React from "react";
import { useAccount } from "wagmi";

type Props = {};

const Profile = (props: Props) => {
  const { address } = useAccount();
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Wallet Address!</h2>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default Profile;
