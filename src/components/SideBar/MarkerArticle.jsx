import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMapContext } from "../../hooks/useMapContext";

export const MarkerArticle = () => {
  const { id } = useParams();
  const { markers } = useMapContext();

  console.log(id);
  const marker = markers.find((marker) => marker.id === Number(id));
  console.log(marker);

  useEffect(() => {
    if (marker) {
      document.title = marker.title;
    }

    return () => {
      document.title = "Map Explorer";
    };
  });

  return (
    <div id="sidebar-content" className="marker-article">
      <Link to="/map">Back to Map</Link>
      <h2>{marker.title}</h2>
      <p>{marker.body}</p>
    </div>
  );
};
