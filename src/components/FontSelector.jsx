import React from "react";

import fonts from "../punt-frontend-assignment (1).json";

const FontSelector = ({ fontFamily, onChange }) => {
  return (
    <div>
      <label>Font Family </label>
      <select value={fontFamily} onChange={(e) => onChange(e.target.value)}>
        {Object.keys(fonts).map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
