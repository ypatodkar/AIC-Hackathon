import React from "react";
import "./Slideselection.css";

export default function SlideSelection({
  slides,
  onAddAll,
  onStartOver,
  onAddOne
}) {

  return (
    <div className="ms-container">
      <h1 className="ms-header">Your 5-Slide Deck</h1>

      <div className="ms-list">
        {slides.map((m, idx) => (
          <div
            key={idx}
            className="ms-card"
            onClick={() => onAddOne(m)}   // ← call it with this slide
          >
            <h2 className="ms-card-title">{m.title}</h2>
            <p className="ms-card-text">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="ms-footer">
        <button
          className="ms-btn ms-btn-primary"
          onClick={onAddAll}
        >
          Add all to design
        </button>
        <button
          className="ms-btn"
          onClick={onStartOver}
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
