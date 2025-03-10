import { useNavigate } from "react-router-dom";

export const Markers = ({
  markers,
  handlePointerDown,
  handlePointerUp,
  handlePointerMove,
  handlePointerOut,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {markers.map((marker) => (
        <mesh
          key={marker.id}
          position={marker.position}
          onDoubleClick={() => {
            navigate(`/map/${marker.id}`);
          }}
          rotation={[Math.PI / 1, 0, 0]}
          onPointerDown={(e) => handlePointerDown(e, marker.id)}
          onPointerUp={() => handlePointerUp(marker.id)}
          onPointerMove={(e) => handlePointerMove(e, marker)}
          onPointerOver={(e) => {
            e.stopPropagation();
            window.document.body.style.cursor = "grab";
          }}
          onPointerOut={(e) => handlePointerOut(e, marker)}
        >
          <coneGeometry args={marker.size} />
          <meshToonMaterial color={marker.color} />
        </mesh>
      ))}
    </>
  );
};
