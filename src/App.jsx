import "./App.css";

import { useState } from "react";

import Map from "./components/Map/Map";
import { Nav } from "./components/Nav/Nav";

function App() {
  return (
    <div className="container">
      <Map />
      {/* <Nav setPlace={setPlace} /> */}
    </div>
  );
}

export default App;
