// src/components/AddImageButton.jsx
import React from "react";
import { Button } from "@swc-react/button";

export default function AddImageButton({ addOnUISdk }) {
  const handleAddImage = async () => {
    try {
      // 1) Download your image as a Blob
      const resp = await fetch("https://placehold.co/600x400.png");
      const blob = await resp.blob();

      // 2) Insert into the Express document
      await addOnUISdk.app.document.addImage(blob, {
        title: "Placeholder",
        author: "Demo",
      });
    } catch (e) {
      console.error("Failed to add image:", e);
    }
  };

  return (
    <Button size="m" onClick={handleAddImage}>
      Add Image
    </Button>
  );
}
