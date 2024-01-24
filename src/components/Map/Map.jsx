import "./Map.css";

// eslint-disable-next-line react/prop-types
const Map = ({ location }) => {
  return (
    <div className="map-container">
      <div className={`map-image ${location}`}></div>
    </div>
  );
};

export default Map;
