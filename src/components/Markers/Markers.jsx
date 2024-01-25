import "./Markers.css";
import { markersData } from "./markerData";

export const Markers = ({ location, markersRef, setPlace }) => {
  const currentLocation = markersData.filter(
    (marker) => marker.location === location
  );
  console.log(currentLocation);

  return (
    currentLocation[0].places.length > 0 &&
    currentLocation[0].places.map((place, index) => {
      return (
        <div
          key={place.name}
          onClick={() => {
            setPlace(place.link.toLowerCase());
          }}
          ref={(el) => (markersRef.current[index] = el)}
          data-left={place.left}
          data-top={place.top}
          className={`map-marker ${place.type}`}
        >
          {place.name}
        </div>
      );
    })
  );
};
