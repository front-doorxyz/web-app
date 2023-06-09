import React from "react";

const How = ({ heading, body }) => {
  return (
    <div className="content-body container main-component">
      <div className="row">
        <h2 className="heading">{heading}</h2>
        <div className="body" dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </div>
  );
};

export default How;
