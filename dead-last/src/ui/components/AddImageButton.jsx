// src/components/AddImagePanel.jsx
import React, { useState } from "react";
import { Button } from "@swc-react/button";
import { GoogleGenAI, Modality } from "@google/genai";
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const STYLE_OPTIONS = [
  "Pixelated",
  "Anime-style",
  "Sharp",
  "Photorealistic",
  "Surreal",
];

export default function AddImagePanel() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInspire = () => {
    const examples = [
      "a robot painting a sunset",
      "a mystical forest at dawn",
      "an astronaut exploring an alien planet",
      "a cyberpunk cityscape at night",
    ];
    setPrompt(examples[Math.floor(Math.random() * examples.length)]);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first!");
      return;
    }
    setLoading(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: "AIzaSyBye4qOZDR7Ma5CwANfcvHDCR9mXevqzGE",
      });
      const fullPrompt = selectedStyle
        ? `${prompt}, ${selectedStyle} style`
        : prompt;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: fullPrompt,
        config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
      });
      const parts = response.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find((p) => p.inlineData);
      if (!imgPart) throw new Error("No image returned");

      const byteString = atob(imgPart.inlineData.data);
      const buffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        buffer[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: "image/png" });

      await addOnUISdk.app.document.addImage(blob, {
        title: fullPrompt,
        author: "Gemini AI",
      });
    } catch (e) {
      console.error("Generation error:", e);
      alert("Error generating image — see console.");
    } finally {
      setLoading(false);
    }
  };

  // ---- inline styles for the card + chips ----
  const cardStyle = {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: 20,
    maxWidth: 400,
    margin: "24px auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  };
  const chipStyle = (active) => ({
    padding: "6px 12px",
    borderRadius: 9999,
    fontSize: 13,
    cursor: "pointer",
    userSelect: "none",
    background: active ? "#6366F1" : "#E0E7FF",
    color: active ? "#FFF" : "#4338CA",
  });
  const textareaStyle = {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    fontSize: 14,
    resize: "vertical",
    minHeight: 60,
  };
  const inspireButtonStyle = {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: 8,
    backgroundColor: "rgb(243, 244, 246)",
    border: "1px solid #D1D5DB",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    height: 40,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  return (
    <div style={cardStyle}>
      {/* header (optional) */}
      <h3 style={{ margin: 0, fontSize: 18 }}>Generate an Image</h3>

      {/* prompt + inspire */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <textarea
          rows={3}
          placeholder="Use 'Inspire Me' for prompt xuggestions"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={textareaStyle}
        />
        <button
          style={inspireButtonStyle}
          onClick={handleInspire}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#E5E7EB")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#F3F4F6")
          }
        >
          <div >Inspire me</div>
        </button>
      </div>

      {/* style chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {STYLE_OPTIONS.map((style) => (
          <div
            key={style}
            style={chipStyle(selectedStyle === style)}
            onClick={() => setSelectedStyle(style)}
          >
            {style}
          </div>
        ))}
      </div>

      {/* generate */}
      <Button size="l" onClick={handleGenerate} disabled={loading}  style={{ borderRadius: 8 }}>
        {loading ? "Generating…" : "Generate & Insert Image"}
      </Button>
    </div>
  );
}
