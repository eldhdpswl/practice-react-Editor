import React from "react";
import { Editor } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const Preview = ({ editorState, setEditorState, customStyleMap }) => {
  // const blockStyleFn = (block) => {
  //   const data = block.getData() || new Map(); // 기본값 설정
  //   const textAlign = data.get("textAlign");
  //   // const textAlign = data ? data.get("textAlign") : null;
  //   if (textAlign) {
  //     return `text-align-${textAlign}`;
  //   }
  //   return null;
  // };

  const blockStyleFn = (block) => {
    const data = block.getData();
    const textAlign = data ? data.get("textAlign") : null;
    console.log("Block Data:", data && data.toJS());
    console.log("Text Align:", textAlign);
    if (textAlign) {
      console.log(`Applying block style: text-align-${textAlign}`); // 디버깅용 로그
      return `text-align-${textAlign}`; // 반환되는 클래스 이름
    }
    return null;
  };

  return (
    <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
      <h3>텍스트 미리보기</h3>
      <div style={{ display: "block" }}>
        <Editor
          editorState={editorState}
          onChange={(newEditorState) => {
            setEditorState(newEditorState);
            const htmlContent = stateToHTML(newEditorState.getCurrentContent());
            console.log("현재 HTML 콘텐츠:", htmlContent);
          }}
          customStyleMap={customStyleMap}
          blockStyleFn={blockStyleFn} // Editor에 blockStyleFn 전달
        />
      </div>
    </div>
  );
};

export default Preview;
