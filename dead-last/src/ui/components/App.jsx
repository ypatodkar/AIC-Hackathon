// src/App.jsx
import React, { useState } from "react";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import MetaphorSelector from "../components/MetaphorSelector";
import AddImageButton from "./AddImageButton";
import Storytelling from "../components/Storytelling";
import SlideSelection from "../components/Slideselection";
import Loader from "../components/Loader";
import { getSlideDeck } from "./geminislidecreation";
import "./App.css";

const App = ({ addOnUISdk, sandboxProxy }) => {
  const [currentPage, setCurrentPage] = useState("buttons");
  const [metaphors, setMetaphors] = useState([]);
  const [slides, setSlides] = useState([]);

  // 1) User clicks “Create Presentation”
  //    -> fire the metaphor‐loader immediately
  const handleStartMetaphors = () => {
    setCurrentPage("metaphorLoading");
  };

  // 2) Once metaphors arrive
  const handleGenerate = (newList) => {
    setMetaphors(newList);
    setCurrentPage("metaphorSelector");
  };

  // 3) User picks a metaphor -> slide loader
  const handleSelectMetaphor = async (metaphor) => {
    setCurrentPage("loading");
    const rawDeck = await getSlideDeck(metaphor.title);
    if (rawDeck.length === 5) {
      const deck = rawDeck.map(({ title, text }) => ({
        title,
        text,
        description: text,
      }));
      setSlides(deck);
      setCurrentPage("slides");
    } else {
      setCurrentPage("error");
    }
  };

  const handleAddAll = () => sandboxProxy.addMetaphorPages(slides);
  const handleOne = (m) => sandboxProxy.insertMetaphor(m.title, m.description);

  return (
    <Theme system="express" scale="medium" color="light">
      {currentPage === "buttons" && (
        <>
          <Storytelling
            onStart={handleStartMetaphors} // ← show loader right away
            onGenerate={handleGenerate} // ← then replace with metaphors
          />

          <div className="app-container">
            <AddImageButton />
          </div>
        </>
      )}

      {currentPage === "metaphorLoading" && (
        <Loader
          text="Generating metaphors..."
          subtext="Metaphors most suited to your subject are being generated"
        />
      )}

      {currentPage === "metaphorSelector" && (
        <MetaphorSelector
          metaphors={metaphors}
          onSelect={handleSelectMetaphor}
        />
      )}

      {currentPage === "loading" && (
        <Loader
          text="Generating slides..."
          subtext="Creating a stunning deck based on your metaphor"
        />
      )}

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

      {currentPage === "slides" && (
        <SlideSelection
          slides={slides}
          onAddAll={handleAddAll}
          onStartOver={() => setCurrentPage("buttons")}
          onAddOne={handleOne}
        />
      )}
    </Theme>
  );
};

export default App;
