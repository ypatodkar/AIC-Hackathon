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



const App = ({ addOnUISdk, sandboxProxy }) => {
  const [currentPage, setCurrentPage] = useState("buttons");
  
  const handleSelectMetaphor = (metaphor) => {
    console.log("Selected metaphor:", metaphor);
  };



//   function handleClick2() {
//     sandboxProxy.createPage();
//   }


  function handleAddAll(){
    sandboxProxy.addMetaphorPages();
  }

  function handleOne(){
      //Only for testing:
  const title = "The Dance of the Bees: HCI in Nature";
  const description = "loren ipsum";
    sandboxProxy.insertMetaphor(title,description);
  }

  return (
    <Theme system="express" scale="medium" color="light">
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

          <div className="container">
            <Button size="m" onClick={handleAddAll}>
              Add All Pages
            </Button>
          </div>

          <div className="container">
            <Button size="m" onClick={handleOne}>
              Add metaphor
            </Button>
          </div>

          {/* <div className="container">
            <Button size="m" onClick={() => setCurrentPage("metaphorSelector")}>
              Next Page
            </Button>
          </div> */}
          <div className="app-container">
            <Storytelling />
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