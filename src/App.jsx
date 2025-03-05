import { Canvas } from "@react-three/fiber";
import { MapControls, PerspectiveCamera } from "@react-three/drei";
import { Map } from "./components/Map";
import { useEffect, useRef } from "react";
import { MathUtils } from "three";

function App() {
  const minZoom = 2.5;
  const maxZoom = 3.5;
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);

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
      <h1>Test</h1>
      <div id="canvas-container">
        <Canvas id="canvas" style={{ height: "60vh", width: "60%" }}>
          <pointLight position={[10, 10, 10]} />

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
            dampingFactor={0.1}
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
        </Canvas>
      </div>
    </>
  );
}

export default App;
