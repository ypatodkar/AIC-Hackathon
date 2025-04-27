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
        const rawDeck = await getSlideDeck(metaphor.title);
      
        if (rawDeck.length === 5) {
          const deck = rawDeck.map(({ title, text }) => ({
            title,
            text,
            description: text,    // ← populate description here
          }));
      
          setSlides(deck);
          setCurrentPage("slides");
        } else {
          setCurrentPage("error");
        }
      };
    
  function handleAddAll(){
      sandboxProxy.addMetaphorPages(slides);
}

function handleOne(m) {
    sandboxProxy.insertMetaphor(m.title, m.description);
  }

  
  return (
    <Theme system="express" scale="medium" color="light">
      {/* ======== BUTTONS SCREEN ======== */}
      {currentPage === "buttons" && (
        <>
          {/* <div className="container">
            <Button size="m" onClick={handleClick}>
              Create Rectangle
            </Button>
          </div>


          <div className="container">
            <Button size="m" onClick={handleClick2}>
              Create Page
            </Button>
          </div> */}
          <Storytelling
            onGenerate={(newList) => {
              setMetaphors(newList);
              setCurrentPage("metaphorSelector");
            }}
          />

          {/* <div className="container">
            <Button size="m" onClick={handleAddAll}>
              Add All Pages
            </Button>
          </div> */}

          {/* <div className="container">
            <Button size="m" onClick={handleOne(m)}>
              Add metaphor
            </Button>
          </div> */}

          {/* <div className="container">
            <Button size="m" onClick={() => setCurrentPage("metaphorSelector")}>
              Next Page
            </Button>
          </div> */}

        <div className="app-container">
            <AddImageButton />
          </div>

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
          onAddAll={handleAddAll}
          onStartOver={() => setCurrentPage("buttons")}
          onAddOne={handleOne} 
          />
      )}
    </Theme>
  );
};

export default App;