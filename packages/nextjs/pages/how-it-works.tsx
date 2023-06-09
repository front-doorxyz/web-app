import React from "react";
import "../i18";
import i18next from "i18next";
import type { NextPage } from "next";
import authImg from "~~/assets/frontdoor.jpg";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import ContentBody from "~~/components/How";

const HowItWorks: NextPage = () => {
  return (
    <div className="flex  ml-[2%]  justify-center  w-[80vw] md:w-[50vw]">
      <div className="mt-[8%]">
        <ContentBody heading={i18next.t("how_it_works.heading")} body={i18next.t("how_it_works.body")} />
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

export default HowItWorks;
