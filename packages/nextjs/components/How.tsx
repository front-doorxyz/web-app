import React from "react";

const How = ({ heading, body }) => {
  return (
    <div className="content-body container main-component">
      <div className="flex flex-col gap-2">
        <h2 className="heading font-bold md:text-4xl text-xl">{heading}</h2>
        <div className="body text-md md:text-2xl font-bai-jamjuree" dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </div>
  );
};

export default How;
