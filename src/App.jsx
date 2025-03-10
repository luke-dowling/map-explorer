import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MapPage } from "./pages/MapPage";
import { Dashboard } from "./pages/Dashboard";
import { SideBar } from "./components/SideBar/SideBar";
import { MarkerArticle } from "./components/SideBar/MarkerArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapPage />}>
          <Route index element={<SideBar />} />
          <Route path=":id" element={<MarkerArticle />} />
        </Route>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
