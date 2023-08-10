import React from "react";
import type { NextPage } from "next";
import authImg from "~~/assets/frontdoor.jpg";
import ContentBody from "~~/components/How";

const AboutUs: NextPage = () => {
  return (
    <div className="flex  ml-[2%]  justify-center  w-[80vw] md:w-[50vw]">
      <div className="mt-[8%]">
        <ContentBody
          heading={"The Open Referrals Protocol"}
          body={`
        <p>
        Front Door unlocks collaboration in the fragmented $420 billion recruitment ecosystem. 
        </p>
        <p>
        The ecosystem is highly fragmented, participants have conflicting incentives, and collaboration is fraught with friction. Reputation is built on personal brand instead of performance, and transparency is limited.
        </p>
        <p>
        Front Door improves collaboration, deepening the talent pools that hiring managers can access, enables recruitment firms to reduce wasted effort and increases client satisfaction, enabling individuals and community leads to refer-to-earn from their professional networks.
        </p>
        <p>
        Front Door uses Web3 tools and technology to solve a Web2 human coordination problem with a huge size of prize for you, the members of the recruitment ecosystem.
        </p>
      `}
        />
      </div>
      <div className="absolute right-0 hidden  md:block lg:w-[49vw] 2xl:w-[44vw]">
        <div
          className="absolute flex h-[95vh] w-full items-end justify-center bg-cover bg-center "
          style={{ backgroundImage: `url(${authImg.src})` }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
