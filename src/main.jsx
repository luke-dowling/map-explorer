import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MapProvider } from "./context/MapContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MapProvider>
    <App />
  </MapProvider>
);
