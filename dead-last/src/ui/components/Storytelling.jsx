import React, { useState } from "react";
import "./Storytelling.css";
import { getMetaphors } from "./GeminiService";

const Storytelling = () => {
  const [subject, setSubject] = useState("");

  const handleCreateMetaphors = async () => {
    console.log("Creating metaphors for:", subject);
    const results = await getMetaphors(subject);
    console.log(results);
  };

  return (
    <div className="storytelling-wrapper">
      <h2 className="storytelling-title">Storytelling</h2>
      <p className="storytelling-description">
        Create story metaphors to enhance your presentation subject
      </p>

      <label htmlFor="subject" className="storytelling-label">
        Presentation subject
      </label>
      <textarea
        id="subject"
        className="storytelling-textarea"
        placeholder="E.g. Data security"
        maxLength={300}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <div className="storytelling-count">{subject.length}/300</div>

      <button className="storytelling-button" onClick={handleCreateMetaphors}>
        Create metaphors
      </button>
    </div>
  );
};

export default Storytelling;
