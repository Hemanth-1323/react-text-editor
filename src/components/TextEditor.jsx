import React, { useState, useEffect } from "react";
import FontSelector from "./FontSelector";
import WeightSelector from "./WeightSelector";
import ItalicToggle from "./ItalicToggle";
import WebFont from "webfontloader";
import fonts from "../punt-frontend-assignment (1).json";

import "../App.css";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [fontWeight, setFontWeight] = useState("400");
  const [isItalic, setIsItalic] = useState(false);

  useEffect(() => {
    const savedText = localStorage.getItem("text");
    const savedFontFamily = localStorage.getItem("fontFamily");
    const savedFontWeight = localStorage.getItem("fontWeight");
    const savedIsItalic = localStorage.getItem("isItalic");

    if (savedText) setText(savedText);
    if (savedFontFamily) setFontFamily(savedFontFamily);
    if (savedFontWeight) setFontWeight(savedFontWeight);
    if (savedIsItalic !== null) setIsItalic(savedIsItalic === "true");

    loadFont(
      savedFontFamily || "Roboto",
      savedFontWeight || "400",
      savedIsItalic === "true"
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("text", text);
    localStorage.setItem("fontFamily", fontFamily);
    localStorage.setItem("fontWeight", fontWeight);
    localStorage.setItem("isItalic", isItalic);
  }, [text, fontFamily, fontWeight, isItalic]);

  const loadFont = (font, weight, italic) => {
    if (font && weight) {
      const italicSuffix = italic ? "italic" : "normal";
      const fontVariants =
        fonts[font][weight].includes("italic") && italic
          ? [weight, "italic"]
          : [weight];
      WebFont.load({
        google: {
          families: [`${font}:${fontVariants.join(",")}`],
        },
      });
      console.log(
        `Loading font: ${font}, weight: ${weight}, italic: ${italic}`
      );
    }
  };

  const handleFontFamilyChange = (font) => {
    setFontFamily(font);
    const { newWeight, newItalic } = getBestVariant(font, fontWeight, isItalic);
    setFontWeight(newWeight);
    setIsItalic(newItalic);
    loadFont(font, newWeight, newItalic);
  };

  const handleFontWeightChange = (weight) => {
    setFontWeight(weight);
    const { newWeight, newItalic } = getBestVariant(
      fontFamily,
      weight,
      isItalic
    );
    setIsItalic(newItalic);
    loadFont(fontFamily, weight, newItalic);
  };

  const handleItalicToggle = () => {
    setIsItalic(!isItalic);
    loadFont(fontFamily, fontWeight, !isItalic);
  };

  const handleReset = () => {
    setText("");
    setFontFamily("Roboto");
    setFontWeight("400");
    setIsItalic(false);
  };

  const getBestVariant = (font, weight, italic) => {
    const variants = fonts[font];
    if (!variants) return { newWeight: "400", newItalic: false };

    const weights = Object.keys(variants).map(Number);
    weights.sort((a, b) => a - b);

    if (italic && variants[weight]?.includes("italic"))
      return { newWeight: weight, newItalic: true };

    const closestItalicWeight = weights.find((w) =>
      variants[w]?.includes("italic")
    );
    if (closestItalicWeight)
      return { newWeight: closestItalicWeight, newItalic: true };

    const closestWeight = weights.reduce(
      (prev, curr) =>
        Math.abs(curr - weight) < Math.abs(prev - weight) ? curr : prev,
      weights[0]
    );
    return { newWeight: closestWeight, newItalic: false };
  };

  return (
    <div>
      <div className="top">
        <FontSelector
          fontFamily={fontFamily}
          onChange={handleFontFamilyChange}
        />
        <WeightSelector
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          onChange={handleFontWeightChange}
        />
        <div className="togglee">
          <label>Italic</label>
          <ItalicToggle
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            isItalic={isItalic}
            onToggle={handleItalicToggle}
          />
        </div>
      </div>
      <textarea
        style={{
          fontFamily,
          fontWeight,
          fontStyle: isItalic ? "italic" : "normal",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
      <button className="save" onClick={() => alert("Saved!")}>
        Save
      </button>
    </div>
  );
};

export default TextEditor;
