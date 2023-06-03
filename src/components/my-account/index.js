import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import StarRating from "../../sections/star-rating/index.js";
import "./index.css";

const tabEnum ={ 
  personal_info: "profile",
  referrals: "referrals",
  earnings: "earnings", // earnings when there are placed candidates
  references: "references",
  referees: "referees"
}
const personaEnum = {
  referrer: "referrer",
  referee: "referee",
  company: "company"
}
const tabs=[
  { title: "Profile", path: "profile"},
  { title: "Referrals", path: "referrals"},
  { title: "Earnings", path: "earnings"},
  { title: "References", path: "references"},
  { title: "Referees", path: "referees"}
];

function MyAccount() {
  const user = useSelector((state) => state.user.value)
  const navigate = useNavigate()
  const { view } = useParams();
  const [referrals, setReferrals] = useState([]),
        [references, setReferences] = useState([]),
        [referees, setReferees] = useState([]),
        [persona, setPersona] = useState(null);
  useEffect(()=>{
    console.log(window.location.hash);
    switch (window.location.hash) {
      case "#referrer": {
          setPersona(personaEnum.referrer);
          setReferrals([{
            role: "Java Developer",
            score: 4,
            placed: true,
            web3Address: "0x56f...ad49",
            earnings: 5000,
            token: "USDC"
          },
          {
            role: "C++ Developer",
            score: 3,
            placed: true,
            web3Address: "0x39j...ke43",
            earnings: 4500,
            token: "USDT"
          },
          {
            role: "Python Developer",
            score: 4,
            placed: true,
            web3Address: "0x83m...jd82",
            earnings: 4000,
            token: "DAI"
          },
          {
            role: "CMO",
            score: 2,
            placed: true,
            web3Address: "0x49x...jd28",
            earnings: 4000,
            token: "USDC"
          },
          {
            role: "Android Developer",
            referralsCount: 5,
            placed: false
          },
          {
            role: "Mobile app dev",
            referralsCount: 2,
            placed: false
          },
          {
            role: "Solidity smart contracts developer",
            referralsCount: 6,
            placed: false
          },
          {
            role: "CMO",
            referralsCount: 1,
            placed: false
          },
          {
            role: "CFO",
            referralsCount: 4,
            placed: false
          }
        ])
        }
        break;
      case "#company": {
          setPersona(personaEnum.company);
          setReferees([{
            web3Address: "0x56f...ad49", 
            referrerScore: 5,
            profileLink: "http://profilelink",
            email: "asfsf@gmail.com",
          },
          {
            web3Address: "0x39j...ke43", 
            referrerScore: 5,
            profileLink: "http://profilelink",
            email: "89j@gmail.com",
          },
          {
            web3Address: "0x83m...jd82", 
            referrerScore: 4,
            profileLink: "http://profilelink",
            email: "kem@gmail.com",
          },
          {
            web3Address: "0x82z...le92", 
            referrerScore: 4,
            profileLink: "http://profilelink",
            email: "desf@gmail.com",
          },
          {
            web3Address: "0x01p...hq71", 
            referrerScore: 3,
            profileLink: "http://profilelink",
            email: "asmk@gmail.com",
          },
          {
            web3Address: "0x45b...hz79", 
            referrerScore: 3,
            profileLink: "http://profilelink",
            email: "asmk@gmail.com",
          },
          {
            web3Address: "0x82x...nk18", 
            referrerScore: 3,
            profileLink: "http://profilelink",
            email: "asmk@gmail.com",
          },
          {
            web3Address: "0x77n...ka89", 
            referrerScore: 1,
            profileLink: "http://profilelink",
            email: "kvid@gmail.com",
          },
          {
            web3Address: "0x77n...lo17", 
            referrerScore: 1,
            profileLink: "http://profilelink",
            email: "kdm@gmail.com",
          },
        ]);
        }
        break;
      case "#referee": {
          setPersona(personaEnum.referee);
          setReferences([{
            role:"Java Developer",
            company: "Javalia"
          },
          {
            role:"Accountant",
            company: "Accounting Dreams"
          },
          {
            role:"CFO",
            company: "Micropop"
          },
          {
            role: "SEO Manager",
            company: "White stone"
          },
          {
            role:"Designer",
            company: "Great upset"
          },
          {
            role:"Copy writer",
            company: "Banked Again"
          },
          {
            role:"CMO",
            company: "DiD"
          },
          {
            role:"Content Writer",
            company: "Turnover AB"
          },
          {
            role:"Marketing Manager",
            company: "ASW"
          },
          {
            role:"Community Manager",
            company: "Appletini"
          }]);
        }
        break;
      default:
        break;
    }
  },[window.location.hash]);
  const getView=() => {
      switch (view) {
          case tabEnum.personal_info: return view;
          case tabEnum.referrals: return view;
          case tabEnum.earnings: return view;
          case tabEnum.references: return view;
          case tabEnum.referees: return view;
          default: return tabEnum.personal_info;
      }
  }
  const activeTab = getView();
  useEffect(() => {
    user && !view && navigate(`/my-account/${tabEnum.personal_info}`);

    setReferrals([{
      role: "Java Developer",
      score: 4,
      placed: true,
      web3Address: "0x56f...ad49",
      earnings: 5000,
      token: "USDC"
    },
    {
      role: "C++ Developer",
      score: 3,
      placed: true,
      web3Address: "0x39j...ke43",
      earnings: 4500,
      token: "USDT"
    },
    {
      role: "Python Developer",
      score: 4,
      placed: true,
      web3Address: "0x83m...jd82",
      earnings: 4000,
      token: "DAI"
    },
    {
      role: "CMO",
      score: 2,
      placed: true,
      web3Address: "0x49x...jd28",
      earnings: 4000,
      token: "USDC"
    },
    {
      role: "Android Developer",
      referralsCount: 5,
      placed: false
    },
    {
      role: "Mobile app dev",
      referralsCount: 2,
      placed: false
    },
    {
      role: "Solidity smart contracts developer",
      referralsCount: 6,
      placed: false
    },
    {
      role: "CMO",
      referralsCount: 1,
      placed: false
    },
    {
      role: "CFO",
      referralsCount: 4,
      placed: false
    }
    ])
    setReferees([{
      web3Address: "0x56f...ad49", 
      referrerScore: 5,
      profileLink: "http://profilelink",
      email: "asfsf@gmail.com",
    },
    {
      web3Address: "0x39j...ke43", 
      referrerScore: 5,
      profileLink: "http://profilelink",
      email: "89j@gmail.com",
    },
    {
      web3Address: "0x83m...jd82", 
      referrerScore: 4,
      profileLink: "http://profilelink",
      email: "kem@gmail.com",
    },
    {
      web3Address: "0x82z...le92", 
      referrerScore: 4,
      profileLink: "http://profilelink",
      email: "desf@gmail.com",
    },
    {
      web3Address: "0x01p...hq71", 
      referrerScore: 3,
      profileLink: "http://profilelink",
      email: "asmk@gmail.com",
    },
    {
      web3Address: "0x45b...hz79", 
      referrerScore: 3,
      profileLink: "http://profilelink",
      email: "asmk@gmail.com",
    },
    {
      web3Address: "0x82x...nk18", 
      referrerScore: 3,
      profileLink: "http://profilelink",
      email: "asmk@gmail.com",
    },
    {
      web3Address: "0x77n...ka89", 
      referrerScore: 1,
      profileLink: "http://profilelink",
      email: "kvid@gmail.com",
    },
    {
      web3Address: "0x77n...lo17", 
      referrerScore: 1,
      profileLink: "http://profilelink",
      email: "kdm@gmail.com",
    },
    ]);
    setReferences([{
      role:"Java Developer",
      company: "Javalia"
    },
    {
      role:"Accountant",
      company: "Accounting Dreams"
    },
    {
      role:"CFO",
      company: "Micropop"
    },
    {
      role: "SEO Manager",
      company: "White stone"
    },
    {
      role:"Designer",
      company: "Great upset"
    },
    {
      role:"Copy writer",
      company: "Banked Again"
    },
    {
      role:"CMO",
      company: "DiD"
    },
    {
      role:"Content Writer",
      company: "Turnover AB"
    },
    {
      role:"Marketing Manager",
      company: "ASW"
    },
    {
      role:"Community Manager",
      company: "Appletini"
    }]);
  },[])

  useEffect(() => {
    !user && navigate('/login');
  },[user])

  if (user?.web3Address && user?.online) return (
    <div className="my-account container main-component">
      <div className="my-account ten columns">
        {activeTab === tabEnum.personal_info && user?.online && (
          <>
            <h5>{"Personal info"}</h5>
            
            <section className="table">
              <div className="row head">
                <div className="twelve columns">
                  <h6>Wallet Address</h6>
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <span className="ellipsis">{user.web3Address}</span>
                </div>
              </div>
            </section>
          </>
        )}  
        {activeTab === tabEnum.referrals && user?.online && (
          <>
            <h5>{"Referrals"}</h5>
            
            <section className="table">
              <div className="row head">
                {referrals?.filter(item=>item.placed).length !== 0 && (
                  <div className="twelve columns">
                    <h6>Overall score</h6>
                  </div>
                )}
              </div>
              <div className="row">
                {referrals?.filter(item=>item.placed).length  !== 0 && (
                  <div className="twelve columns">
                    {referrals.filter(item => item.placed).reduce((accumulator, object) => {
                      return accumulator + object["score"];
                    }, 0)}
                  </div>
                )}
              </div>
            </section>
            {referrals?.filter(item=>item.placed).length !== 0 && (
              <div>
                <i>Overall Score = Average score out of 5 * # referrals made * % of successful referrals</i>
              </div>
            )}
            {referrals?.filter(item=>item.placed).length !== 0 && (
              <>
              <hr />
              <section className="table">
                <div className="row head">
                  <div className="six columns">
                    <h6>Role Title of successful referrals</h6>
                  </div>
                  <div className="six columns">
                    <h6>Awarded Score</h6>
                  </div>
                </div>
                {referrals.filter(item => item.placed)?.map(item => (
                  <div className="row">
                    <div className="six columns">
                      {item.role}
                    </div>
                    <div className="six columns">
                      <StarRating  score={item.score} />
                    </div>
                  </div>
                ))}
              </section>
              </>
            )}
            {referrals?.filter(item=>item.placed).length !== 0 && (
              <>
              <hr/>
              <section className="table">
                <div className="row head">
                  <div className="six columns">
                    <h6>Roles referred candidates to</h6>
                  </div>
                  <div className="six columns">
                    <h6>Number of Referrals made per role</h6>
                  </div>
                </div>
                {referrals.filter(item => !item.placed)?.map(item => (
                  <div className="row">
                    <div className="six columns">
                      {item.role}
                    </div>
                    <div className="six columns">
                      {item.referralsCount}
                    </div>
                  </div>
                ))}
              </section>
              </>
            )}
          </>
        )}  
        {activeTab === tabEnum.earnings && referrals.filter(item=>item.earnings)?.length && (
          <>
            <h5>{"Earnings"}</h5>
            <section className="table">
                <div className="row head">
                  <div className="four columns">
                    <h6 title="Successfully placed Candidate wallet address">Candidate wallet address</h6>
                  </div>  
                  <div className="four columns">
                    <h6>Role</h6>
                  </div>
                  <div className="four columns">
                    <h6>$ Earnings</h6>
                  </div>
                </div>
                {referrals.filter(item=>item.earnings)?.map(item => (
                  <div className="row">
                    <div className="four columns">
                      <span className="ellipsis">{item.web3Address}</span>
                    </div>
                    <div className="four columns">
                      {item.role}
                    </div>
                    <div className="four columns">
                      {item.earnings} {item.token}
                    </div>
                  </div>
                ))}
              </section>
          </>
        )}
        {activeTab === tabEnum.references && references.length && (
          <>
          <h5>{`References for: ${user.web3Address}`}</h5>
          <p>{`Roles this profile has been shared with`}</p>
          <section className="table">
            <div className="row head">
              <div className="six columns">
                <h6 title="Candidate wallet address">
                  Role title
                </h6>
              </div>  
              <div className="six columns">
                <h6>Company</h6>
              </div>
            </div>
          {references.map(item => (
            <div className="row">
              <div className="six columns">
                {item.role}
              </div>
              <div className="six columns">
                {item.company}
              </div>
            </div>
          ))}
          </section>
          </>
        )}
        {activeTab === tabEnum.referees && referees.length && (
            <>
            <h5>{"Referees"}</h5>
            <section className="table">
              <div className="row head">
                <div className="three columns">
                  <h6 title="Candidate wallet address">
                    Wallet address
                  </h6>
                </div>  
                <div className="three columns">
                  <h6>Referrer Feedback Score</h6>
                </div>
                <div className="three columns">
                  <h6>Attached Profile link</h6>
                </div>
                <div className="three columns">
                  <h6>Referees email</h6>
                </div>
              </div>
            {referees.map(item => (
              <div className="row">
                <div className="three columns">
                  {item.web3Address}
                </div>
                <div className="three columns">
                <StarRating  score={item.referrerScore} />
                </div>
                <div className="three columns">
                  <Link to={item.profileLink}>{item.profileLink}</Link>
                </div>
                <div className="three columns">
                  {item.email}
                </div>
              </div>
            ))}
            </section>
            </>
            
        )}  
      </div>
      <div className="two columns">
          <div className="tabs">
              {tabs.map((tab, idx) => {
                  return (
                    <Link to={`/my-account/${tab.path}`}>
                        <button className={activeTab===tab.path ? "active" : ""}>{tab.title}</button>
                    </Link>
                  )
              })}
          </div>
      </div>
    </div>
  );
  else return null
}

export default MyAccount;


//Roles sent to => canditate persona<
//Referrals => referrer/recruiter persona
//Candidates received => company persona