import React from "react";
import { Button } from "@swc-react/button";

const MetaphorSelector = ({ metaphors, onSelect }) => {
  return (
    <div
      style={{
        padding: "16px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <h2
        style={{ fontSize: "20px", marginBottom: "16px", fontWeight: "bold" }}
      >
        Choose a metaphor
      </h2>
      {metaphors.map((metaphor) => (
        <div
          key={metaphor.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "0px 16px 16px 16px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: "1px solid #ddd",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#000",
            }}
          >
            {metaphor.title}
          </h4>
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              marginBottom: "12px",
              textAlign: "left",
            }}
          >
            {metaphor.description}
          </p>
          <Button
            size="m"
            style={{
              marginTop: "10px",
              backgroundColor: "#4B56D2",
              color: "#ffffff",
              borderRadius: "20px",
              width: "80px",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => onSelect(metaphor)}
          >
            Select
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MetaphorSelector;
