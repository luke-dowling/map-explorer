import { useMemo, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const Map = () => {
  const map = useLoader(TextureLoader, "/Parador_Second_Sundering.jpg");

  const [center, setCenter] = useState([0, 0, 0]);
  const [planeGeo, setPlaneGeo] = useState([7, 5]);

  return (
    <mesh position={center}>
      <meshBasicMaterial
        attach="material"
        map={map}
        depthWrite={false}
        transparent
      />
      <planeGeometry args={planeGeo} />
    </mesh>
  );
};
