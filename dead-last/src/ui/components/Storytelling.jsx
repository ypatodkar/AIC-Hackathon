// src/components/Storytelling.jsx
import React, { useState } from "react";
import "./Storytelling.css";
import { getMetaphors } from "./GeminiService";

// Now receives both onStart and onGenerate callbacks from App
const Storytelling = ({ onStart, onGenerate }) => {
  const [subject, setSubject] = useState("");

  const handleCreateMetaphors = async () => {
    if (onStart) {
      onStart(); // ← show loader immediately
    }
    console.log("Creating metaphors for:", subject);
    const results = await getMetaphors(subject);
    console.log("Metaphors received:", results);
    if (onGenerate) {
      onGenerate(results); // ← then hand results back up
    }
  };

  return (
    <div className="storytelling-wrapper">
      <h2 className="storytelling-title">Presentation</h2>
      <p className="storytelling-description">
        Create story style to enhance your presentation subject
      </p>

      <label htmlFor="subject" className="storytelling-label">
        Presentation subject
      </label>
      <textarea
        id="subject"
        className="storytelling-textarea"
        placeholder="Eg: Adobe x AI "
        maxLength={300}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <div className="storytelling-count">{subject.length}/300</div>

      <button
        className="storytelling-button"
        onClick={handleCreateMetaphors}
        disabled={!subject.trim()}
      >
        Create Presentation
      </button>
    </div>
  );
};

export default Storytelling;
