import React from "react";
import Block from "./Block";

type Props = {};

const Referres = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-1 gap-8 mt-[2%]">
        <Block title="Wallet address" content={["0x56f...ad49", "0x39j...ke43", "0x83m...jd82"]} type="string" />
        <Block title="Referrer Feedback Score" content={[1, 3, 5]} type="star" />
        <Block
          title="Attached Profile link"
          content={["http://profilelink", "http://profilelink", "http://profilelink"]}
          type="string"
        />
        <Block title="Referees email" content={["asfsf@gmail.com", "89j@gmail.com", "kem@gmail.com"]} type="string" />
      </div>
    </div>
  );
};

export default Referres;
