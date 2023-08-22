import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Banner from "~~/components/Banner";
import ErrorHandler from "~~/components/ErrorHandler";
import Jobs from "~~/components/Jobs";
import { MetaMaskContext, MetamaskActions } from "~~/hooks/MetamaskContext";
import { getAllJobsOfCompany } from "~~/services/APIs/smartContract";
import { connectSnap, getSnap } from "~~/utils/snap";

const AllJobs: NextPage = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [state, dispatch] = useContext(MetaMaskContext);
  useEffect(() => {
    // Extract the query parameters from the URL
    const { refId, jobId } = router.query;

    // Check if the required query parameters exist, and their values match the desired values
    if (refId && jobId) {
      // Redirect to the specific page if the query parameters match
      router.push(`/${refId}+${jobId}`);
    }
  }, [router.query]);

  useEffect(() => {
    if (address) {
      getAllJobsOfCompany(address);
    }
  }, [address]);
  useEffect(() => {
    const dectectProvider = async () => {
      const provider = await detectEthereumProvider();

      // web3_clientVersion returns the installed MetaMask version as a string
      const isFlask = (await provider?.request({ method: "web3_clientVersion" }))?.includes("flask");

      if (!isFlask) {
        setShowError(true);
        setErrorMessage("Please install MetaMask Flask to use this application");
      } else {
        (async () => {
          try {
            await connectSnap();
            const installedSnap = await getSnap();
            dispatch({
              type: MetamaskActions.SetInstalled,
              payload: installedSnap,
            });
          } catch (e) {
            console.error(e);
            dispatch({ type: MetamaskActions.SetError, payload: e });
          }
        })();
      }
    };
    dectectProvider();
  }, []);
  return (
    <>
      <Banner />
      <ErrorHandler showError={showError} errorMsg={errorMessage} />
      <Jobs />
    </>
  );
};

export default AllJobs;
