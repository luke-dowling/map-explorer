import { div } from "three/tsl";

export const SideBoard = ({ addMarker, markers, view, updateView }) => {
  return (
    <div className="side-board">
      <h2>Map Information</h2>
      <button onClick={updateView}>
        {view[1] === 0 ? "Tilt" : "Straighted"} View
      </button>
      <button onClick={addMarker}>Add Marker</button>

      {markers.map((marker) => {
        return (
          <div key={marker.id} id={marker.id}>
            {marker.label}
          </div>
        );
      })}
    </div>
  );
};
