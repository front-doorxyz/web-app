import React, { useContext } from "react";
import Slite, { Editor, Toolbar } from "react-slite";
import { GeneralContext } from "~~/providers/GeneralContext";

type Props = {
  initialValue: string;
  title?: string;
  readOnly: boolean;
};

const TextEditor = (props: Props) => {
  const { handleDescriptionChange } = useContext(GeneralContext);
  return (
    <div>
      <Slite
        initialValue={props.initialValue}
        onChange={currentMarkdown => handleDescriptionChange("description", currentMarkdown)}
        readOnly={props.readOnly}
      >
        {props.title && <div className="p-2 bg-primary text-neutral">{props?.title}</div>}
        {!props.readOnly && <Toolbar />}
        <div className="min-h-[300px] max-h-[80vh] min-w-[40vw] max-w-[700px] overflow-y-scroll first-letter:">
          {/* editor text area */}
          <div className="bg-primary important">
            <Editor readOnly={props.readOnly} />
          </div>
        </div>
      </Slite>
    </div>
  );
};

export default TextEditor;
