import React from "react";

const TextEdit = ({ handleStyle, handleFontSize, handleAlignment }) => {
  const fontSizes = ["12px", "14px", "16px", "18px", "20px"]; // 선택 가능한 폰트 크기

  return (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "10px" }}>
      <h3>텍스트 스타일 편집</h3>
      <button onClick={() => handleStyle("BOLD")}>굵게</button>
      <button onClick={() => handleStyle("ITALIC")}>기울임</button>
      <button onClick={() => handleStyle("UNDERLINE")}>밑줄</button>
      <div style={{ marginTop: "10px" }}>
        <label htmlFor="fontSize">폰트 크기: </label>
        <select
          id="fontSize"
          onChange={(e) => handleFontSize(e.target.value)}
          defaultValue={"16px"}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <h4>정렬:</h4>
        <button onClick={() => handleAlignment("left")}>왼쪽 정렬</button>
        <button onClick={() => handleAlignment("center")}>가운데 정렬</button>
        <button onClick={() => handleAlignment("right")}>오른쪽 정렬</button>
        <button onClick={() => handleAlignment("justify")}>양쪽 정렬</button>
      </div>
    </div>
  );
};

export default TextEdit;