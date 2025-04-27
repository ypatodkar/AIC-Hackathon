// To support: system="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import React, { useState } from "react";
import { Theme } from "@swc-react/theme";
import MetaphorSelector from "../components/MetaphorSelector";
import Storytelling from "../components/Storytelling";

import "./App.css";

// const metaphors = [
//   {
//     id: 1,
//     title: "The Dance of the Bees: HCI in Nature",
//     description:
//       "Just as bees communicate through intricate dances to share vital information, Human-Computer Interaction (HCI) connects users with technology. By understanding user needs and interactions, we can create a harmonious digital ecosystem. Explore how the elegance of nature inspires efficient design and fosters innovation in technology.",
//   },
//   {
//     id: 2,
//     title: "Roots That Connect: HCI Inspired by Trees",
//     description:
//       "Look to the roots of trees, intertwined underground, for inspiration in HCI. Each root represents a different user's need, and together they create a strong foundation for interaction. Just as trees adapt to their environment, we should design adaptive interfaces that meet diverse user requirements, promoting growth and understanding.",
//   },
//   {
//     id: 3,
//     title: "The Sprinting Cheetah: HCI for Speed and Efficiency",
//     description:
//       "The cheetah, the fastest land animal, teaches us about speed and efficiency in HCI. Just as the cheetah optimizes its movements for maximum performance, interface design must prioritize user efficiency without sacrificing experience. Let's explore how fast-paced sports can inspire quicker, user-friendly technology interactions.",
//   },
// ];

const App = ({ addOnUISdk, sandboxProxy }) => {
  const [currentPage, setCurrentPage] = useState("buttons");
  const [metaphors, setMetaphors] = useState([]);
  const handleSelectMetaphor = (metaphor) => {
    console.log("Selected metaphor:", metaphor); //link to function component slide
    // later: generate slides based on metaphor selection
  };
  function handleClick() {
    sandboxProxy.createRectangle();
  }
  function handleClick2() {
    sandboxProxy.createPage();
  }

  return (
    // Please note that the below "<Theme>" component does not react to theme changes in Express.
    // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
    <Theme system="express" scale="medium" color="light">
      {currentPage === "buttons" && (
        <>
          <div className="container">
            <Button size="m" onClick={handleClick}>
              Create Rectangle
            </Button>
          </div>

          <div className="container">
            <Button size="m" onClick={handleClick2}>
              Create Page
            </Button>
          </div>

          <div className="container">
            <Button size="m" onClick={() => setCurrentPage("metaphorSelector")}>
              Next Page
            </Button>
          </div>
          <div className="app-container">
            <Storytelling
              onGenerate={(newList) => {
                setMetaphors(newList); // store Gemini’s list
                setCurrentPage("metaphorSelector"); // then go to selector
              }}
            />
          </div>
        </>
      )}

      {currentPage === "metaphorSelector" && (
        <MetaphorSelector
          metaphors={metaphors}
          onSelect={handleSelectMetaphor}
        />
      )}
    </Theme>
  );
};

export default App;
