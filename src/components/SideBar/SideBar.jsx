import { Link } from "react-router-dom";
import { useMapContext } from "../../hooks/useMapContext";

export const SideBar = () => {
  const { addMarker, markers, view, updateView } = useMapContext();

  return (
    <div id="sidebar-content">
      <h2>Map Information</h2>
      <button onClick={updateView}>
        {view[1] === 0 ? "Tilt" : "Straighted"} View
      </button>
      <button onClick={addMarker}>Add Marker</button>

      {markers.map((marker) => {
        return (
          <div key={marker.id} id={marker.id}>
            <Link to={`/map/${marker.id}`}>{marker.title}</Link>
          </div>
        );
      })}
    </div>
  );
};
