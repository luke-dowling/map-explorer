import { createContext, useState } from "react";
import { markersData } from "../data/markers";

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const [center, setCenter] = useState([0, 0, 0]);
  const [planeGeo, setPlaneGeo] = useState([7, 5]);
  const [view, setView] = useState([0, 0, 10]);
  const [markers, setMarkers] = useState(markersData);

  const updateView = () => {
    if (view[1] === 0) {
      setView([0, -18, 10]);
    } else {
      setView([0, 0, 10]);
    }
  };

  const addMarker = () => {
    // add a new marker
    const newMarker = {
      id: Math.random(),
      articleId: newArticle.id,
      position: [0, 0, 0],
      title: `Marker ${markers.length + 1}`,
      isDragging: false,
      color: "red",
      size: [0.08, 0.2, 3],
      content: "This is a new marker",
    };
    setMarkers([...markers, newMarker]);
  };

  const values = {
    center,
    planeGeo,
    markers,
    setMarkers,
    view,
    updateView,
    addMarker,
  };
  return <MapContext.Provider value={values}>{children}</MapContext.Provider>;
};
