// src/App.jsx
import React, { useState } from "react";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";

import Storytelling from "../components/Storytelling";
import MetaphorSelector from "../components/MetaphorSelector";
import SlideSelection from "../components/Slideselection";
import { getSlideDeck } from "./geminislidecreation";

import "./App.css";

const App = ({ addOnUISdk, sandboxProxy }) => {
  // Routing & data state
  const [currentPage, setCurrentPage] = useState("buttons"); // buttons | metaphorSelector | loading | error | slides
  const [metaphors, setMetaphors] = useState([]); // array from Storytelling
  const [slides, setSlides] = useState([]); // 5-slide deck from Gemini

  // Canvas actions
  const handleClick = () => sandboxProxy.createRectangle();
  const handleClick2 = () => sandboxProxy.createPage();

  // When a metaphor is picked, generate 5 slides via Gemini
  const handleSelectMetaphor = async (metaphor) => {
    setCurrentPage("loading");
    const deck = await getSlideDeck(metaphor.title);

    if (deck.length === 5) {
      setSlides(deck);
      setCurrentPage("slides");
    } else {
      setCurrentPage("error");
    }
  };

  return (
    <Theme system="express" scale="medium" color="light">
      {/* ======== BUTTONS SCREEN ======== */}
      {currentPage === "buttons" && (
        <>
          <div className="container">
            <Button size="m" onClick={handleClick2}>
              Create Page
            </Button>
          </div>

          <Storytelling
            onGenerate={(newList) => {
              setMetaphors(newList);
              setCurrentPage("metaphorSelector");
            }}
          />
        </>
      )}

      {/* ======== METAPHOR SELECTOR ======== */}
      {currentPage === "metaphorSelector" && (
        <MetaphorSelector
          metaphors={metaphors}
          onSelect={handleSelectMetaphor}
        />
      )}

      {/* ======== LOADING & ERROR STATES ======== */}
      {currentPage === "loading" && <p>Generating slides…</p>}
      {currentPage === "error" && (
        <>
          <p style={{ color: "red" }}>
            Error generating slides. Please try again.
          </p>
          <Button size="m" onClick={() => setCurrentPage("metaphorSelector")}>
            Back to Metaphors
          </Button>
        </>
      )}

      {/* ======== SLIDE SELECTION (RESULTS) ======== */}
      {currentPage === "slides" && (
        <SlideSelection
          slides={slides}
          onAddAll={() => {
            slides.forEach((s) => {
              sandboxProxy.createRectangle();
              // Optionally add text:
              // sandboxProxy.createText({ text: `${s.title}\n\n${s.text}` });
            });
          }}
          onStartOver={() => setCurrentPage("buttons")}
        />
      )}
    </Theme>
  );
};

export default App;
