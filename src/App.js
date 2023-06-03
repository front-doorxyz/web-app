import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import { removeWeb3, createWeb3 } from './components/login/web3Slice'
import { createWeb3Modal } from './components/login/web3ModalSlice'
import { login, logout } from './components/login/userSlice'
import { setWeb3Recruitment } from './components/login/web3RecruitmentSlice'
import { createProvider, removeProvider } from './components/login/providerSlice'
import Web3Modal from "web3modal"
import { db } from "./db"
import { useLiveQuery } from "dexie-react-hooks";
import Navbar from "./components/navbar";
import HowItWorksRoute from "./routes/how-it-works";
import AboutUsRoute from "./routes/about-us";
import LoginRoute from "./routes/login";
import MyAccountRoute from "./routes/my-account";
import ClientRoute from "./routes/client";
import JobRoute from "./routes/job";
import JobsRoute from "./routes/jobs";
import ContractAddresses from "../src/contract-addresses.json";
import abi from "../src/abi.json";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./App.css";
const Recruitment =
  abi.output.contracts["contracts/Recruitment.sol"].Recruitment.abi;
function App() {
  const dbUser = useLiveQuery(
    () => 
      db.user.toArray()
  );
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)
  const web3 = useSelector((state) => state.web3.value)
  const web3Modal = useSelector((state) => state.web3Modal.value)
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    console.log("Appp => webModal", web3Modal);
    web3Modal && typeof web3Modal.connect === "function" && web3Modal.connect().then((provider) => {
        setProvider(provider)
      });
    if (web3Modal && typeof web3Modal.connect === "undefined") 
      dispatch(createWeb3Modal(new Web3Modal({
          network: "goerli", // optional
          cacheProvider: true, // optional
          providerOptions: {}, // required
      })));
  },[web3Modal])

  useEffect(() => {
    console.log("APP ************* web3", web3)
    if (web3) {  
      if (web3.eth._provider) {
        web3.eth.getAccounts().then((accounts) => {
          let _user = {id: accounts[0], web3Address: accounts[0] , online: true, email: user.email}
          dispatch(login(_user))
          //dispatch(setWeb3Recruitment(new web3.eth.Contract(Recruitment, ContractAddresses.Recruitment)))
          db.user.where({web3Address: accounts[0]}).then((__user) => { db.user.put({__user, _user}); })
        });
      }
    }
  }, [web3]);

  useEffect(()=> {
    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        console.log("accountsChanged", accounts)
        if (!accounts.length) {
          dispatch(removeWeb3())
          dispatch(logout())
          db.user.clear()
        } else {
          dispatch(login({web3Address: accounts[0], online: true}));
        }
      });
      
      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        console.log("chainChanged", chainId);
      });
      
      // Subscribe to provider connection
      provider.on("connect", (info) => {
        alert("connect")
        console.log("connect",info);
      });
      
      // Subscribe to provider disconnection
      provider.on("disconnect", (error) => {
        alert("disconnect")
        console.log("disconnect",error);
      });
    }
    if (provider)
      dispatch(createWeb3(new Web3(provider)))
  },[provider])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/how-it-works" element={<HowItWorksRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/my-account" element={<MyAccountRoute />} />
          <Route path="/my-account/:view" element={<MyAccountRoute />} />
          <Route path="/client/:view/:jobid" element={<ClientRoute />} />
          <Route path="/client/:view" element={<ClientRoute />} />
          <Route path="/client" element={<ClientRoute />} />
          <Route path="/:jobid/:company/:jobtitle" element={<JobRoute />} />
          <Route path="/about-us" element={<AboutUsRoute />} />
          <Route path="/jobs" element={<JobsRoute />} />
          <Route path="/*" element={<JobsRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
