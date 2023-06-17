import React, { useEffect, useState } from "react";
import axios from "axios";

export const GeneralContext = React.createContext();
export const GeneralProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const value = {
    walletAddress,
    setWalletAddress,
  };

  useEffect(() => {
    console.log(walletAddress);
  }, [walletAddress]);

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
