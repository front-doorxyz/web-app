import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Web3Modal from "web3modal";
import Web3 from "web3";
import abi from "../../abi.json";
import { chatFrom } from "../../utils";
import ContractAddresses from "../../contract-addresses.json";
import jobs from "../jobs-mock.json";
import "./index.css";

function How({heading, body}) {
  const chatRef = useRef();
  useEffect(() => {
    //chatEffect();
  }, []);
  
  return (
    <div className="content-body container main-component">
      <div className="row">
        <h2 className="heading">{ heading }</h2>
        <div
          className="body"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
    </div>
  );
}

export default How;
