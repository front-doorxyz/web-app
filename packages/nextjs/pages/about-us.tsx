import React from "react";
import type { NextPage } from "next";
import authImg from "~~/assets/frontdoor.jpg";
import ContentBody from "~~/components/How";

const AboutUs: NextPage = () => {
  return (
    <div className="flex  ml-[2%]  justify-center  w-[80vw] md:w-[50vw]">
      <div className="mt-[8%]">
        <ContentBody
          heading={"Front Door - The Open Referrals Network "}
          body={`
        <p>
        Front Door unlocks collaboration in the fragmented $420 billion recruitment ecosystem. 
        </p>
        <p>
        The number of professional recruiters / recruitment agencies is large and growing. Employees and executives sometimes refer their network into roles.  Community leads are increasingly getting involved in referrals. There is a never ending stream of new projects hiring and the projects change with the cycles.
        </p>
        <p>
        The ecosystem is highly fragmented, participants have conflicting incentives, and collaboration is fraught with friction. Reputation is built on personal brand instead of performance, and transparency is limited.
        </p>
        <p>
        Within each of these ecosystem participants, there are deep pools of value.
        </p>
        <p>
        This is a Web2 human coordination problem with a huge size of prize. 
        </p>
        <p>
        Front Door uses Web3 tools and technology to solve it.
        </p>
      `}
        />
      </div>
      <div className="absolute right-0 hidden  md:block lg:w-[49vw] 2xl:w-[44vw]">
        <div
          className="absolute flex h-[92vh] w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
          style={{ backgroundImage: `url(${authImg.src})` }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
