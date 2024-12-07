import React from "react";
import "./Button1.css";

function Button1({ text }) {
  return (
    <div className="frame">
      <button className="bbn1 custom-btn btn-3 font-semibold">
        <span>{text}</span>
      </button>
    </div>
  );
}

export default Button1;
