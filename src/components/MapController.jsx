import { MapControls } from "@react-three/drei";

export const MapController = ({ controlsRef, cameraRef, minZoom, maxZoom }) => {
  return (
    <MapControls
      ref={controlsRef}
      camera={cameraRef.current}
      enablePan={true}
      enableZoom={true}
      minZoom={minZoom}
      maxZoom={maxZoom}
      enableRotate={false}
      autoRotate={false}
      screenSpacePanning={true}
      dampingFactor={0.15}
      enableDamping={true}
      minDistance={4}
      maxDistance={20}
      mouseButtons={{
        LEFT: 2,
        MIDDLE: 2,
        RIGHT: 2,
      }}
      touches={{
        ONE: 2,
        TWO: 1,
      }}
    />
  );
};
