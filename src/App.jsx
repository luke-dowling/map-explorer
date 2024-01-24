import "./App.css";

import { useState } from "react";

import Map from "./components/Map/Map";

function App() {
  const [place, setPlace] = useState("world");

  return (
    <div>
      <Map location={place} />
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <button onClick={() => setPlace("world")}>World</button>
        <button onClick={() => setPlace("parador")}>Parador</button>
      </div>
    </div>
  );
}

export default App;
