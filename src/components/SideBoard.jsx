import { div } from "three/tsl";

export const SideBoard = ({ addMarker, markers }) => {
  return (
    <div>
      <h2>Map Information</h2>
      <button onClick={addMarker}>Add Marker</button>

      {markers.map((marker) => {
        return <div id={marker.id}>{marker.label}</div>;
      })}
    </div>
  );
};
