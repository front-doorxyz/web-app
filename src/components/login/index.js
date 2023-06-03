import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { db } from "../../db"
import { useLiveQuery } from "dexie-react-hooks";
import { login, logout } from './userSlice'
import Web3Modal from "web3modal";
import data from "./data.json";
import "./index.css";
import ContractAddresses from "../../contract-addresses.json";
import abi from "../../abi.json";
import { create } from "./providerSlice";
import { createWeb3Modal } from "./web3ModalSlice";
const Recruitment =
  abi.output.contracts["contracts/Recruitment.sol"].Recruitment.abi;


function Login() {
  const navigate = useNavigate()
  const dbUser = useLiveQuery(
    () => 
      db.user.toArray()
  );
  
  const user = useSelector((state) => state.user.value)
  const web3 = useSelector((state) => state.web3.value)
  const web3Recruitment = useSelector((state) => state.web3Recruitment.value)
  const dispatch = useDispatch()
  //remove
  const [provider, setProvider] = useState(null)
  
  useEffect(() => {
    console.log("LOGIN USER =>", user)
    user?.online && navigate('/my-account');
  },[user])

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      network: 'goerli', // optional
      //network: 'mainnent', // optional
      cacheProvider: true, // optional
      providerOptions: {}, // required
    })
    dispatch(createWeb3Modal(web3Modal));
  }

  const handleWeb3Login = () => {
    if (!user?.email) {
      dispatch(logout())
      return
    }
    connectWallet()
  }

  return (
    <div className="login container main-component">
      <div className="row">
        <div className="twelve columns">
          {!user?.online && (
            <>
            <h5>{data.title}</h5>
            <div>
              <input type="email" 
              className={user?.email === false ? "warning" : ""}
              placeholder={user?.email ? user.email : "your email so we can get back to you!"}
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+" 
              onBlur={(e)=>{
                if (e.target.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))
                  dispatch(login({email: e.target.value, online: false}))
                else 
                  dispatch(logout())
              }}
              />
            </div>
            <div>
              <button className="button-primary" onClick={()=>{ handleWeb3Login() }}>
                {data.metamask.buttonText}
              </button>
            </div>
            <div>
              <button>{data.magiclinks.buttonText}</button>
            </div>
          </>
          )}
          {user?.online && (
            <>
              <h5>{data.title_loggedin}</h5>
              {user.web3Address && (
                <div>
                  address: {user.web3Address}
                </div>
              )}
              {user.email && (
                <div>
                  email: {user.email}
                </div>
              )}
              <div>
                online: {user.online.toString()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
