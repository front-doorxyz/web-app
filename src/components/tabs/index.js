import { useEffect, useRef, useState } from "react"
import { useParams, useLocation, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import Form from "../form/index"
import React from 'react';
import { db } from "../../db"
import { useLiveQuery } from "dexie-react-hooks";
import ContractAddresses from "../../contract-addresses.json";
import abi from "../../abi.json";
import 'draft-js/dist/Draft.css';
import FormJobUpsert from "../../forms/job-upsert.json"
import "./index.css";
const tabEnum = {
    job_create: "add-job",
    job_list: "my-jobs",
}
const Tabs = () => {
    const history = useLocation();
    const { view, jobid } = useParams();
    useEffect(() => {
        setActiveTab(view ? view : tabEnum.job_create);
    },[view])
    console.log("view, jobid", view, jobid)
    const myJobs = useLiveQuery(() => db.myJobs.toArray());
    console.log("myJobs", myJobs)
    const user = useSelector((state) => state.user?.value)
    console.log("user", user);
    const web3 = useSelector((state) => state.web3?.value)
    console.log("web3", web3);
    const web3Recruitment = useSelector((state) => state.web3Recruitment.value)
    console.log("web3Recruitment", web3Recruitment);
    const tabs=[
        { title: "Add job", url: "/client/add-job"},
        { title: "My jobs", url: "/client/my-jobs"}];
    const getView=() => {
        switch (view) {
            case "add-job": return tabEnum.job_create;
            case "my-jobs": return tabEnum.job_list;
            default: return "";
        }
    }
    const [activeTab,setActiveTab] = useState(view ? view : getView())
        console.log("activeTab", activeTab);
    const upsertJob = async (job) => {
        const id = await db.myJobs.add({...job})
        setActiveTab(tabEnum.job_list)
        console.log("myJobs", job, id);
    }
    const publishHandleClick = async () => {
        //web3Recruitment.setP...
    }
    const editHandleClick = async () => {
        alert("todo...")
    }
    return (
    <div className="jobs container main-component">
            <div className="jobs ten columns">
                {activeTab === tabEnum.job_create && FormJobUpsert.fields && (
                    <Form 
                        fields={FormJobUpsert.fields} 
                        cta={FormJobUpsert.cta} 
                        onFormSubmit={(job) => upsertJob(job)} />
                )}
                
                {activeTab === tabEnum.job_list && myJobs && myJobs.map(job => (
                    <div className="row">
                        <div className="four columns">
                        <p>
                            {job.title_text}
                        </p>
                        </div>
                        <div className="two columns">
                        {job.location_text}
                        </div>
                        <div className="two columns">
                        {job.salary_max_number &&
                        job.salary_min_number
                            ? `${job.salary_max_number} - ${job.salary_min_number}`
                            : "Competitive package"}
                        </div>
                        <div className="two columns">
                        {job.bounty_number
                            ? `${job.bounty_number} $`
                            : "Undefined"}
                        </div>
                        <div className="two columns">
                            <button className="button-primary" onClick={()=> publishHandleClick()}>Publish</button>
                            <button className="" onClick={()=> editHandleClick()} >Edit</button>
                        </div>
                    </div>
                 ))}
            </div>
            <div className="two columns">
                <div className="tabs">
                    {tabs.map((tab, idx) => (
                        <Link to={tab.url}>
                            <button className={activeTab===tab.url ? "active" : ""} >{tab.title}</button>
                        </Link>
                        
                    ))}
                </div>
            </div>
    </div>
    


    )
}

export default Tabs;
