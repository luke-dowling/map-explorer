import "./Map.css";
import paradorMap from "../../assets/Parador_Second_Sundering.jpg";
import { useEffect, useRef, useState } from "react";
import { Markers } from "../Markers/Markers";
import { mapLocations } from "./mapLocations";

const Map = () => {
  const [place, setPlace] = useState("world");
  const mapContainerRef = useRef(null);
  const mapImageRef = useRef(null);
  const markersRef = useRef([]);

  const setZoom = () => {
    const mapContainer = mapContainerRef.current;
    const mapImage = mapImageRef.current;

    const [currPlace] = mapLocations.filter((el) => el.name === place);

    if (mapContainer && mapImage) {
      const containerWidth = window.innerWidth;

      const newZoomLevel =
        (containerWidth / mapImage.width) * currPlace.zoomLvl;

      // if (place !== "world") {
      //   mapContainer.style.overflowX = "hidden";
      // } else {
      //   mapContainer.style.overflowX = "visible";
      // }

      mapContainer.style.height = `${
        (mapImage.height * newZoomLevel) / currPlace.heightRes
      }px`;

      mapContainer.style.width = `${mapImage.width * newZoomLevel}px`;
      mapContainer.style.top = `${currPlace.top * newZoomLevel}px`;
      mapContainer.style.left = `${currPlace.left * newZoomLevel}px`;

      mapImage.style.transform = `scale(${newZoomLevel} `;

      markersRef.current.forEach((marker) => {
        if (marker === null) return;
        const markerLeft = parseFloat(marker.dataset.left) * newZoomLevel;
        const markerTop = parseFloat(marker.dataset.top) * newZoomLevel;

        marker.style.left = `${markerLeft}px`;
        marker.style.top = `${markerTop}px`;

        marker.style.fontSize = `${newZoomLevel * currPlace.fz}%`;
      });
    }
  };

  useEffect(() => {
    setZoom();
    window.addEventListener("resize", setZoom);

    return () => {
      window.removeEventListener("resize", setZoom);
    };
  }, [window.innerWidth, place]);

  return (
    <div
      className={`map-container ${place}`}
      id="zoomable-map"
      ref={mapContainerRef}
    >
      <img
        ref={mapImageRef}
        className={`map-image`}
        src={paradorMap}
        alt="map of parador"
        id="map-image"
      />
      <Markers location={place} markersRef={markersRef} setPlace={setPlace} />
    </div>
  );
};

export default Map;
