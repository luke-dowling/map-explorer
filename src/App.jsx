import { Canvas } from "@react-three/fiber";
import {
  MapControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { Map } from "./components/Map";
import { useEffect, useRef } from "react";
import { MathUtils } from "three";

function App() {
  const controlsRef = useRef();
  const cameraRef = useRef();

  // Define panning bounds
  const minPan = { x: -2.5, z: -2.5 };
  const maxPan = { x: 2.5, z: 2.5 };

  useEffect(() => {
    const attachEventListener = () => {
      const controls = controlsRef.current;
      const camera = cameraRef.current;

      console.log(controls);

      controls.dollyIn = () => {};
      controls.dollyOut = () => {};

      console.log(camera);

      if (camera) {
        // camera.up.set(0, 1, 0); // Ensure Y-axis is up
        // camera.lookAt(0, 0, 0);
      }

      if (controls) {
        controls.minZoom = 250;
        controls.maxZoom = 300;

        controls.addEventListener("change", () => {
          const { target } = controls;

          console.log("Target:", target);
          console.log(camera);

          // Clamp the camera's target to keep within bounds
          // target.x = MathUtils.clamp(target.x, minPan.x, maxPan.x);
          // target.z = MathUtils.clamp(target.z, minPan.z, maxPan.z);

          // Also clamp the camera's position directly to avoid unwanted movement
          // const position = controls.object.position;
          // position.x = MathUtils.clamp(position.x, minPan.x, maxPan.x);
          // position.z = MathUtils.clamp(position.z, minPan.z, maxPan.z);

          // Prevent the camera from rotating by setting the up direction
          // camera.up.set(0, 1, 0);

          // camera.lookAt(target);
          // controls.update(); // Important to update the controls
        });
      }
    };

    // Use requestAnimationFrame to ensure the controls are ready
    const animationFrame = requestAnimationFrame(attachEventListener);

    // Cleanup event listener on unmount
    return () => {
      const controls = controlsRef.current;
      if (controls) {
        controls.removeEventListener("change", attachEventListener);
      }
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <h1>Test</h1>
      <div id="canvas-container">
        <Canvas style={{ height: "60vh", width: "60%" }}>
          <pointLight position={[10, 10, 10]} />

          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 10]}
            fov={50} // Field of view
            near={0.1}
            far={1000}
          />

          <MapControls
            ref={controlsRef}
            autoRotate={false}
            enableRotate={false}
            camera={cameraRef.current}
            minZoom={200}
            maxZoom={300}
            dampingFactor={0.1}
            maxDistance={20}
            enableDamping={true}
            mouseButtons={{
              LEFT: 2,
              MIDDLE: 2,
              RIGHT: 2,
            }}
            touches={{
              ONE: 2,
              TWO: 2,
            }}
          />
          <Map />
        </Canvas>
      </div>
    </>
  );
}

export default App;
