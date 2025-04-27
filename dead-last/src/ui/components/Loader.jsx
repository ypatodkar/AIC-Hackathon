// src/components/Loader.jsx
import React from "react";
import "./Loader.css"; // We'll create nice styles too

const Loader = ({ text, subtext }) => {
  return (
    <div className="loader-container">
      <div className="loader-bar">
        <div className="loader-progress"></div>
      </div>
      <h2 className="loader-text">{text}</h2>
      <p className="loader-subtext">{subtext}</p>
    </div>
  );
};

export default Loader;
