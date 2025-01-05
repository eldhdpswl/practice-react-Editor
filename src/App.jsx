import React, { useState } from "react";
// import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import { EditorState, RichUtils, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import TextEdit from "./TextEdit";
import Preview from "./Preview";
import "./App.css"; // 또는 CSS 파일 경로에 맞게 import

const customStyleMap = {
  FONTSIZE_12px: { fontSize: "12px" },
  FONTSIZE_14px: { fontSize: "14px" },
  FONTSIZE_16px: { fontSize: "16px" },
  FONTSIZE_18px: { fontSize: "18px" },
  FONTSIZE_20px: { fontSize: "20px" },
};

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // const handleStyle = (style) => {
  //   const selection = editorState.getSelection();

  //   // 선택된 영역이 있는지 확인
  //   if (!selection.isCollapsed()) {
  //     setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  //   } else {
  //     const contentState = editorState.getCurrentContent();
  //     const newContentState = Modifier.applyInlineStyle(
  //       contentState,
  //       selection.merge({
  //         anchorOffset: 0,
  //         focusOffset: contentState.getPlainText().length,
  //       }),
  //       style
  //     );
  //     setEditorState(
  //       EditorState.push(editorState, newContentState, "change-inline-style")
  //     );
  //   }
  // };
  const handleStyle = (style) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    if (selection.isCollapsed()) {
      // 선택 영역이 없을 때 전체 텍스트 선택
      const firstBlock = contentState.getFirstBlock();
      const lastBlock = contentState.getLastBlock();

      const newSelection = selection.merge({
        anchorKey: firstBlock.getKey(),
        anchorOffset: 0,
        focusKey: lastBlock.getKey(),
        focusOffset: lastBlock.getLength(),
      });

      const newContentState = Modifier.applyInlineStyle(
        contentState,
        newSelection,
        style
      );

      setEditorState(
        EditorState.push(editorState, newContentState, "change-inline-style")
      );
    } else {
      // 선택된 영역에 스타일 적용
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }
  };

  const handleFontSize = (fontSize) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    const fontSizeStyles = [
      "FONTSIZE_12px",
      "FONTSIZE_14px",
      "FONTSIZE_16px",
      "FONTSIZE_18px",
      "FONTSIZE_20px",
    ];

    if (selection.isCollapsed()) {
      // 전체 텍스트 선택
      const firstBlock = contentState.getFirstBlock();
      const lastBlock = contentState.getLastBlock();

      const newSelection = selection.merge({
        anchorKey: firstBlock.getKey(),
        anchorOffset: 0,
        focusKey: lastBlock.getKey(),
        focusOffset: lastBlock.getLength(),
      });

      let newContentState = fontSizeStyles.reduce(
        (state, style) =>
          Modifier.removeInlineStyle(state, newSelection, style),
        contentState
      );

      newContentState = Modifier.applyInlineStyle(
        newContentState,
        newSelection,
        `FONTSIZE_${fontSize}`
      );

      setEditorState(
        EditorState.push(editorState, newContentState, "change-inline-style")
      );
    } else {
      // 선택된 영역에만 스타일 적용
      let newContentState = fontSizeStyles.reduce(
        (state, style) => Modifier.removeInlineStyle(state, selection, style),
        contentState
      );

      newContentState = Modifier.applyInlineStyle(
        newContentState,
        selection,
        `FONTSIZE_${fontSize}`
      );

      setEditorState(
        EditorState.push(editorState, newContentState, "change-inline-style")
      );
    }
  };

  // const handleAlignment = (alignment) => {
  //   const selection = editorState.getSelection();
  //   const contentState = editorState.getCurrentContent();

  //   let newContentState = Modifier.setBlockData(contentState, selection, {
  //     textAlign: alignment,
  //   });

  //   setEditorState(
  //     EditorState.push(editorState, newContentState, "change-block-data")
  //   );
  // };
  const handleAlignment = (alignment) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    // 선택된 블록의 시작 및 끝 키 가져오기
    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();

    let blockKey = startKey;
    let newContentState = contentState;

    // 선택된 모든 블록에 대해 반복 처리
    while (blockKey) {
      console.log("Processing Block:", blockKey);
      const blockSelection = selection.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: contentState.getBlockForKey(blockKey).getLength(),
      });

      newContentState = Modifier.setBlockData(newContentState, blockSelection, {
        textAlign: alignment,
      });

      if (blockKey === endKey) break;
      blockKey = contentState.getKeyAfter(blockKey);
    }

    setEditorState(
      EditorState.push(editorState, newContentState, "change-block-data")
    );

    console.log("Updated Content State:", newContentState.toJS());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "20px",
      }}
    >
      <TextEdit
        handleStyle={handleStyle}
        handleFontSize={handleFontSize}
        handleAlignment={handleAlignment}
      />
      <Preview
        editorState={editorState}
        setEditorState={setEditorState}
        customStyleMap={customStyleMap}
      />
    </div>
  );
};

export default App;
