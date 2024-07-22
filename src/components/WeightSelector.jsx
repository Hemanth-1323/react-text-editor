import React from "react";

import fonts from "../punt-frontend-assignment (1).json";

const WeightSelector = ({ fontFamily, fontWeight, onChange }) => {
  const weights = fonts[fontFamily] ? Object.keys(fonts[fontFamily]) : [];
  return (
    <div>
      <label>Variant </label>
      <select value={fontWeight} onChange={(e) => onChange(e.target.value)}>
        {weights.map((weight) => (
          <option key={weight} value={weight}>
            {weight}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WeightSelector;
