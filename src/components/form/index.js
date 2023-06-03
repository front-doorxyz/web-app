import { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { BlockStyleControls, InlineStyleControls } from "../../sections/draft";
import 'draft-js/dist/Draft.css';
import './index.css'


function Form({ fields, cta, onFormSubmit = null }) {
    const editorRef = useRef(null)
    const fieldsRef = useRef([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    // const editorValue = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    // const editorHtml = editorRef?.current?.editor?.innerHTML
    //console.log("editorValue",  editorValue, editorHtml);

    const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
    const formSubmit = async (e) => {
        e.preventDefault();
        let formObj = {}
        fields.forEach((item, index) => {
            formObj[item.key] = fieldsRef.current[index].editor ? fieldsRef.current[index].editor.innerHTML : fieldsRef.current[index].value
        })
        typeof onFormSubmit === "function" && onFormSubmit(formObj);    
    }
    return (
        <div className="form">
            <form
            style={{
                display: "block",
                clear: "both",
            }}
            >
            {fields.map((item, index) => (
                <div key={`${item.key}`} className={item.className}>
                {item.type === "html" ? 
                    <div className="editor__container">
                        <div className="toolbar">
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={toggleBlockType}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={toggleInlineStyle}
                        />
                        </div>
                        <div className="editor">
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                            ref={ref => {
                                fieldsRef.current[index] = ref
                              }}
                        />
                        </div>
                  </div>
                    :
                    <input
                    className={"u-full-width"}
                    type={item.type}
                    placeholder={item.placeholder || item.label}
                    ref={ref => {
                        fieldsRef.current[index] = ref
                      }} />
                }
                </div>
            ))}
            {cta && (
                <div>
                    <button className="button-primary" onClick={(e) => formSubmit(e) }>
                        {cta.buttonText}
                    </button>
                </div>
            )} 
            </form>
        </div>
        
    );
}

export default Form;
