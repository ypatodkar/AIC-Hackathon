// src/components/AddImageButton.jsx
import React, { useState } from "react";
import { Button } from "@swc-react/button";
import { GoogleGenAI, Modality } from "@google/genai";
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

export default function AddImageButton() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first!");
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: "AIzaSyBye4qOZDR7Ma5CwANfcvHDCR9mXevqzGE",
      });

      // 1) Generate image from Gemini based on user's prompt
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });



      const parts = response.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find((p) => p.inlineData);

      if (!imgPart) throw new Error("No image returned");

      // 2) Convert base64 to Blob
      const byteString = atob(imgPart.inlineData.data);
      const len = byteString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "image/png" });

      // 3) Insert the Blob into Adobe Express
      await addOnUISdk.app.document.addImage(blob, {
        title: prompt,
        author: "Gemini AI",
      });

    } catch (e) {
      console.error("Failed to generate/insert image:", e);
      alert("Error generating image. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <textarea
        rows={3}
        placeholder="Enter an image prompt (e.g. 'a robot painting a sunset')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
          width: "100%",
          fontSize: "14px",
        }}
      />
      <Button size="m" onClick={handleAddImage} disabled={loading}>
        {loading ? "Generating…" : "Generate & Insert Image"}
      </Button>
    </div>
  );
}