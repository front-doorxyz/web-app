import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { db } from "../../db"
import { useLiveQuery } from "dexie-react-hooks";
import abi from "../../abi.json";
import Form from "../form";
import ContractAddresses from "../../contract-addresses.json";
import FormJobApplication from "../../forms/job-application.json"
import jobs from "../jobs-mock.json";
import "./index.css";

const MinterMock =
  abi.output.contracts["contracts/MinterMock.sol"].MinterMock.abi;
const Recruitment =
  abi.output.contracts["contracts/Recruitment.sol"].Recruitment.abi;

const EnsSubdomainFactory =
  abi.output.contracts["contracts/EnsSubdomainFactory.sol"].EnsSubdomainFactory
    .abi;

function Job() {
  const web3 = useSelector((state) => state.web3.value)
  const user = useSelector((state) => state.user.value)
  const jobApplications = useLiveQuery(
    () => db.jobApplications.toArray()
  );

  let { jobid, company, jobtitle } = useParams();
  const [job, setJob] = useState(null);
  const [candidateEmail, setCandidateEmail] = useState(null);
  const input_month1_pct = useRef(null);
  const input_month2_pct = useRef(null);
  const input_month3_pct = useRef(null);
  
  const [web3Modal, setWeb3Modal] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract_EnsSubdomainFactory, setContract_EnsSubdomainFactory] =
    useState(null);
  const [contract_Recruitment, setContract_Recruitment] = useState(null);
  const [contract_MinterMock, setContract_MinterMock] = useState(null);
  const [accountMonthlyRefundPcts, setAccountMonthlyRefundPcts] =
    useState(null);
  useEffect(() => {
    if (!job) {
      const _job = jobs?.hits?.hits?.find((item) => item._source._id === jobid);
      _job && setJob(_job);
    }
  }, []);
  const [applyMode, setApplyMode] = useState(false);

  useEffect(() => {
    if (web3) {
      setContract_EnsSubdomainFactory(
        new web3.eth.Contract(
          EnsSubdomainFactory,
          ContractAddresses.EnsSubdomainFactory
        )
      );
      setContract_Recruitment(
        new web3.eth.Contract(Recruitment, ContractAddresses.Recruitment)
      );
      setContract_MinterMock(
        new web3.eth.Contract(MinterMock, ContractAddresses.MinterMock)
      );
      web3.eth.getAccounts().then((accounts) => {
        setCurrentAccount(accounts[0]);
      });
    }
  }, [web3]);

  useEffect(() => {
    if (contract_Recruitment && currentAccount) {
      contract_Recruitment.methods
        .getWhitelistedTokenAddresses(web3.utils.asciiToHex("DAI"))
        .call({ from: currentAccount }, function (error, result) {
          console.log("getWhitelistedTokenAddresses", error, result);
        });

      // contract_Recruitment.methods.whitelistToken(
      //   web3.utils.asciiToHex('DAI'),
      //   ContractAddresses.MinterMock,
      //   18
      // ).send({from: currentAccount, gas: 1000000}).then(res => { console.log(res) })

      contract_MinterMock.methods
        .balanceOf(currentAccount)
        .call()
        .then((result) => {
          console.log("daiContract balanceOf", result);
        });

      getMonthlyRefunds();
    }
  }, [contract_Recruitment, currentAccount]);

  const getMonthlyRefunds = () => {
    contract_Recruitment.methods
      .getAccountMonthlyRefundPcts()
      .call({ from: currentAccount })
      .then((result) => {
        result?.length && setAccountMonthlyRefundPcts([...result]);
      });
  };

  const connectWallet = async () => {
    const _provider = await web3Modal.connect();
    _provider && setProvider(_provider);
  };

  const initialDepositOnClick = async () => {
    if (!input_month1_pct.current.value || !input_month2_pct.current.value) {
      alert("please add values to initial 2 months refunds");
      return;
    }

    let txCount = await web3.eth.getTransactionCount(currentAccount),
      decimals = await contract_MinterMock.methods
        .decimals()
        .call({ from: currentAccount }),
      value = `1000${"0".repeat(decimals)}`;
    console.log("decimals", decimals);
    console.log("txCount", txCount, await web3.eth.getGasPrice());
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      from: currentAccount,
      //gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      gas: 10000000,
      //gasLimit: 8000000
    };

    // const gasAmmount = await getGasAmountFor_Recruitment_initialDepositDAI();
    // console.log("gasAmmount", gasAmmount);
    // return;

    let approveReceipt = await contract_MinterMock.methods
      .approve(ContractAddresses.Recruitment, value)
      .send({ from: currentAccount });
    console.log("approveReceipt", approveReceipt);
    let initialDepositReceipt = await contract_Recruitment.methods
      .setPercentages(
        input_month1_pct.current.value,
        input_month2_pct.current.value,
        input_month3_pct.current.value
      )
      .send(txObject);
    console.log(initialDepositReceipt);

    getMonthlyRefunds();
  };
  const addJobApplication = async (jobApplication) => {
    const id = await db.jobApplications.add({...jobApplication, jobId: jobid});
    console.log("jobApplication, id", jobApplication, id);
  }

  return (
    <div className="job container main-component">
      <div className="row">
        <div className="nine columns">
          {applyMode && (
            <>
              <div>
                <i
                  className="ico-close u-pull-right"
                  onClick={() => {
                    setApplyMode(false);
                  }}
                ></i>
              </div>

              <form
                style={{
                  display: "block",
                  clear: "both",
                }}
              >
                {FormJobApplication.fields && 
                <Form fields={FormJobApplication.fields}
                    cta={FormJobApplication.cta}
                    onFormSubmit={(jobApplication) => addJobApplication(jobApplication)} /> }
                
              </form>
            </>
          )}
          {!applyMode && (
            <>
              {job?._source?.title_text && <h1> {job?._source?.title_text}</h1>}
              {job?._source?.job_description_text && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${job?._source?.job_description_text
                      .replace(/[\[']+/g, "<")
                      .replace(/[\]']+/g, ">")}`,
                  }}
                ></div>
              )}
            </>
          )}
        </div>
        
        
        <div className="three columns">
        <h5>
          Refer someone{" "}
          {job?._source?.bounty_number
            ? ` and earn ${"XXXXXX"}$`
            : ""}
        </h5>
        <input
          className="u-full-width"
          type="file"
          id="cvInput"
          placeholder="candidates CV"
        ></input>
        <input
          className="u-full-width"
          type="email"
          placeholder="Candidate email"
          id="candidateEmailInput"
          onInput={(event) => event.target.value && setCandidateEmail(event.target.value) }
        ></input>
        <button className="button button-primary" style={{ width: "100%" }} 
          onClick={async () => {
            if (candidateEmail && user.web3Address) {
              const txObject = {
                nonce: web3.utils.toHex(await web3.eth.getTransactionCount(user.web3Address)),
                from: currentAccount,
                gas: 500000,
              },
              id=jobid.split('x')[0];
              console.log("contract_Recruitment.methods", contract_Recruitment.methods);
              let receipt = await contract_Recruitment.methods
                .registerReferral(id, candidateEmail)
                .send(txObject);
              console.log("register referral", receipt);
              
              if (!receipt.transactionHash) {
                alert("something went wrong registering referral!")
                return;
              }
              const refIds = await contract_Recruitment.methods.getReferralIDs().call({ from: user.web3Address });
              if (refIds.length) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                  "body": {
                    "refId": refIds[refIds.length-1],
                    "email": candidateEmail
                  }
                });

                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };

                fetch("https://74p0ofti6d.execute-api.eu-north-1.amazonaws.com/dev/mail", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error))
                  .finally(() => alert("An email was sent to this candidate for referral confirmation. Thank you!"))
              }
            }
            
          }}>
          Refer candidate
        </button>
      </div>
        

      </div>
    </div>
  );
}

export default Job;
