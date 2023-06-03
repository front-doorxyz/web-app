import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { db } from "../../db"
import { useLiveQuery } from "dexie-react-hooks";
import { dashedFrom } from "../../utils";
import abi from "../../abi.json";
import ContractAddresses from "../../contract-addresses.json";
import jobsMock from "../jobs-mock.json";
import "./index.css";
import StarRating from "../../sections/star-rating/index.js";

const MinterMock =
  abi.output.contracts["contracts/MinterMock.sol"].MinterMock.abi;
const Recruitment =
  abi.output.contracts["contracts/Recruitment.sol"].Recruitment.abi;
const EnsSubdomainFactory =
  abi.output.contracts["contracts/EnsSubdomainFactory.sol"].EnsSubdomainFactory
    .abi;

function Jobs() {
  const jobApplications = useLiveQuery(
    () => db.jobApplications.toArray()
  );
  const input_month1_pct = useRef(null);
  const input_month2_pct = useRef(null);
  const input_month3_pct = useRef(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [web3, setWeb3] = useState(null);
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
    // setWeb3Modal(
    //   new Web3Modal({
    //     network: "goerli", // optional
    //     cacheProvider: true, // optional
    //     providerOptions: {}, // required
    //   })
    // );
  }, []);

  useEffect(() => {
    web3Modal &&
      web3Modal.connect().then((provider) => {
        setWeb3(new Web3(provider));
      });
    //web3Modal && connectWallet()
  }, [web3Modal]);

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        console.log("accountsChanged", accounts);
        setCurrentAccount(null);
        if (!accounts?.length) {
          setProvider(null);
          setWeb3(null);
          setAddress(null);
        } else {
          setAddress(accounts[0]);
        }
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        console.log("chainChanged", chainId);
      });

      // Subscribe to provider connection
      provider.on("connect", (info) => {
        console.log("connect", info);
      });

      // Subscribe to provider disconnection
      provider.on("disconnect", (error) => {
        console.log("disconnect", error);
        setCurrentAccount(null);
      });
    }

    setWeb3(provider ? new Web3(provider) : null);
  }, [provider]);

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
  console.log();
  return (
    <>
      <div className="jobs container main-component">
        <div className="example-grid">
          <div className="row header">
            <div className="four columns">JOB TITLE</div>
            <div className="two columns">LOCATION</div>
            <div className="two columns">SALARY</div>
            <div className="two columns">BOUNTY</div>
          </div>
          {Array.isArray(jobsMock.hits?.hits) &&
            jobsMock.hits?.hits.map((item, index) => (
              <Link
                key={`job-${index}`}
                to={`/${item._source._id}/${dashedFrom(
                  item._source.company_name
                )}/${dashedFrom(item._source.title_text)}`}
              >
                <div className="row">
                  <div className="four columns">
                    <p>
                      {item._source.title_text}
                      <br />
                      {item._source.company_name} 
                      <br/>
                      <StarRating score={item._source.rating}/>
                    </p>
                  </div>
                  <div className="two columns">
                    {item._source.location_text}
                  </div>
                  <div className="two columns">
                    {item._source.salary_max_number &&
                    item._source.salary_min_number
                      ? `${item._source.salary_max_number} - ${item._source.salary_min_number}`
                      : "Competitive package"}
                  </div>
                  <div className="two columns">
                    {item._source.bounty_number
                      ? `$${item._source.bounty_number}`
                      : ""}
                  </div>
                  <div className="two columns">
                    <button>Refer</button> 
                    {jobApplications?.find(_item => _item.jobId === item._source._id) && <button className="green" disabled="true">Applied</button>}
                    {!jobApplications?.find(_item => _item.jobId === item._source._id) && <button>Apply</button>}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {/* {!currentAccount && (
        <button
          onClick={() => {
            connectWallet();
          }}
        >
          Connect to your wallet!
        </button>
      )}
      {currentAccount && (
        <div className="form">
          <h1>Welcome you are logged in! {currentAccount}</h1>

          <hr />
          <h1>Add initial deposit</h1>
          <div className="inline">
            <input ref={input_month1_pct} placeholder="month1 refund %" />
          </div>
          <div className="inline">
            <input ref={input_month2_pct} placeholder="month2 refund %" />
          </div>
          <div className="inline">
            <button onClick={initialDepositOnClick}>Deposit</button>
          </div>
        </div>
      )}
      {accountMonthlyRefundPcts && (
        <div>
          <hr />
          <h1>Your job deposits and refund rules</h1>
          <table width="100%">
            <thead>
              <tr>
                <td>Amount</td>
                <td>First Month</td>
                <td>Second Month</td>
                <td>Third Month</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {accountMonthlyRefundPcts.length &&
                accountMonthlyRefundPcts.map((item, index) => (
                  <tr key={`monthly-refunds-deposit-${index}`}>
                    <td>1000 USD*</td>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{100 - item[0] - item[1]}</td>
                    <td>
                      <input placeholder="final amount" />
                    </td>
                    <td>
                      <button>Final payment</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <i>* stablecoin</i>
        </div>
        
      )} */}
    </>
  );
}

export default Jobs;
