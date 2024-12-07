import React from "react";
import "./Button2.css";

function Button2({ text }) {
  return (
    <div className="frame2">
      <button className="bbn2 custom-btn2 btn-32 font-semibold">
        <span className="!px-5">{text}</span>
      </button>
    </div>
  );
}

export default Button2;
