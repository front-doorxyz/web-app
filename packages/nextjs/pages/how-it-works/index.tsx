import React from "react";
import Image from "next/image";
import "../../i18";
import i18next from "i18next";
import type { NextPage } from "next";
import authImg from "~~/assets/frontdoor.jpg";
import howitworks from "~~/assets/howitworks.png";
import ContentBody from "~~/components/How";

const HowItWorks: NextPage = () => {
  return (
    <div className="flex  ml-[2%]  justify-center  w-[80vw] md:w-[40vw]">
      <div className="mt-[4%] md:mt-[8%]">
        <ContentBody heading={"Approach"} body={i18next.t("how_it_works.body")} />
        <div className="mt-[2%] block md:hidden ">
          <Image src={howitworks} alt="how it works" />
        </div>
      </div>
      <div className="absolute right-0 hidden   md:block lg:w-[55vw]">
        <div
          className="absolute flex h-[95vh] w-full  bg-[#edf6f9] bg-contain bg-no-repeat bg-start "
          style={{ backgroundImage: `url(${howitworks.src})` }}
        />
      </div>
    </div>
  );
};

export default HowItWorks;
