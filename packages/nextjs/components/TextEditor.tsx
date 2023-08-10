import React, { useContext } from "react";
import Slite, { Editor, Toolbar } from "react-slite";
import { GeneralContext } from "~~/providers/GeneralContext";

type Props = {
  initialValue: string;

  readOnly: boolean;
};

const TextEditor = (props: Props) => {
  const { handleDescriptionChange } = useContext(GeneralContext);
  return (
    <div className="w-full ">
      <Slite
        initialValue={props.initialValue}
        onChange={currentMarkdown => handleDescriptionChange("description", currentMarkdown)}
        readOnly={props.readOnly}
      >
        {!props.readOnly && <Toolbar />}
        {/* editor text area */}
        <Editor readOnly={props.readOnly} />
      </Slite>
    </div>
  );
};

export default TextEditor;
