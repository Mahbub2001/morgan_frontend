import React from "react";
import "./Button3.css";

function Button3({ text, backgroundColor, borderColor,textColor }) {
  return (
    <div className="wrapper3">
      <h1
        style={{
          "--dynamic-bg-color": backgroundColor,
          "--dynamic-border-color": borderColor,
          "--dynamic-text-color": textColor,
        }}
      >
        <span>{text}</span>
      </h1>
    </div>
  );
}

export default Button3;
