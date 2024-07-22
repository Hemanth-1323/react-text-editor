import React from "react";
import fonts from "../punt-frontend-assignment (1).json";
import "./ItalicToggle.css";

const ItalicToggle = ({ fontFamily, fontWeight, isItalic, onToggle }) => {
  const isItalicAvailable = fonts[fontFamily][fontWeight]?.includes("italic");

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={isItalic}
          onChange={onToggle}
          disabled={!isItalicAvailable}
        />
        <span
          className={`slider round ${isItalicAvailable ? "" : "disabled"}`}
        ></span>
      </label>
    </div>
  );
};

export default ItalicToggle;
