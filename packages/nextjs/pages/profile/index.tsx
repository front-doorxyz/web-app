import React, { useState } from "react";
import Earnings from "~~/components/Earnings";
import Profile from "~~/components/Profile";
import References from "~~/components/References";
import Referrals from "~~/components/Referrals";
import Referees from "~~/components/Referres";

type Props = {};

enum Tab {
  Profile,
  Referrals,
  Earnings,
  References,
  Referees,
}

const Info = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(Tab.Profile);

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case Tab.Profile:
        return <Profile />;
      case Tab.Referrals:
        return <Referrals />;
      case Tab.Earnings:
        return <Earnings />;
      case Tab.References:
        return <References />;
      case Tab.Referees:
        return <Referees />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-[2%]">
      <div className="tabs tabs-boxed flex justify-center items-center">
        <a
          id="1"
          className={`tab tab-lg ${selectedTab === Tab.Profile ? "tab-active" : ""}`}
          onClick={() => handleTabClick(Tab.Profile)}
        >
          Profile
        </a>
        <a
          id="2"
          className={`tab tab-lg ${selectedTab === Tab.Referrals ? "tab-active" : ""}`}
          onClick={() => handleTabClick(Tab.Referrals)}
        >
          Referrals
        </a>
        <a
          id="3"
          className={`tab tab-lg ${selectedTab === Tab.Earnings ? "tab-active" : ""}`}
          onClick={() => handleTabClick(Tab.Earnings)}
        >
          Earnings
        </a>
        <a
          id="4"
          className={`tab tab-lg ${selectedTab === Tab.References ? "tab-active" : ""}`}
          onClick={() => handleTabClick(Tab.References)}
        >
          References
        </a>
        <a
          id="5"
          className={`tab tab-lg ${selectedTab === Tab.Referees ? "tab-active" : ""}`}
          onClick={() => handleTabClick(Tab.Referees)}
        >
          Referees
        </a>
      </div>
      <div className="mt-[1%]">{renderTabContent()}</div>
    </div>
  );
};

export default Info;
