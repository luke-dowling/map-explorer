import { Canvas } from "@react-three/fiber";
import { MapControls, PerspectiveCamera } from "@react-three/drei";
import { Map } from "./components/Map";
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { SideBoard } from "./components/SideBoard";

const minZoom = 2.5;
const maxZoom = 3.5;
const initialMarkers = [
  { id: 1, position: [2, 1, 0], label: "Marker 1" },
  { id: 2, position: [-2, -1, 0], label: "Marker 2" },
  { id: 3, position: [0, 2, 0], label: "Marker 3" },
];

function App() {
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);

  const [markers, setMarkers] = useState(initialMarkers);

  const addMarker = () => {
    // add a new marker
  };

  useEffect(() => {
    const controls = controlsRef.current;
    const camera = cameraRef.current;

    if (controls) {
      controls.minZoom = minZoom;
      controls.maxZoom = maxZoom;

      controls.dollyIn = () => {};
      controls.dollyOut = () => {};

      controls.addEventListener("change", () => {
        camera.zoom = MathUtils.clamp(camera.zoom, minZoom, maxZoom);
        camera.updateProjectionMatrix();
      });
    }

    return () => {
      if (controls) {
        controls.removeEventListener("change", () => {
          camera.zoom = MathUtils.clamp(camera.zoom, minZoom, maxZoom);
          camera.updateProjectionMatrix();
        });
      }
    };
  }, []);

  return (
    <>
      <h1>Map Explorer</h1>
      <div id="canvas-container">
        <Canvas id="canvas" style={{ height: "60vh", width: "60%" }}>
          <ambientLight intensity={2} />

          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 10]}
            fov={50}
          />

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
          <Map />

          {markers.map((marker) => (
            <mesh
              key={marker.id}
              position={marker.position}
              onDoubleClick={() => {
                console.log(`Clicked ${marker.label}`);
                // open an extended view in the sideboard
              }}
              rotation={[Math.PI / 1, 0, 0]}
              onPointerEnter={() => {
                // bring up tooltip that gives the name of the label
              }}
            >
              <coneGeometry args={[0.1, 0.25, 3]} />
              <meshStandardMaterial color="white" />
            </mesh>
          ))}
        </Canvas>

        <SideBoard addMarker={addMarker} markers={markers} />
      </div>
    </>
  );
}

export default App;
