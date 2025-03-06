import { Canvas } from "@react-three/fiber";
import { MapControls, PerspectiveCamera } from "@react-three/drei";
import { Map } from "./components/Map";
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import * as THREE from "three";
import { SideBoard } from "./components/SideBoard";

const minZoom = 2.5;
const maxZoom = 3.5;
const initialMarkers = [
  { id: 1, position: [2, 1, 0], label: "Marker 1", isDragging: false },
  { id: 2, position: [-2, -1, 0], label: "Marker 2", isDragging: false },
  { id: 3, position: [0, 2, 0], label: "Marker 3", isDragging: false },
];

function App() {
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [markers, setMarkers] = useState(initialMarkers);

  const handlePointerDown = (e, markerId) => {
    e.stopPropagation();
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId ? { ...marker, isDragging: true } : marker
      )
    );

    if (controlsRef.current) controlsRef.current.enabled = false;
  };

  const handlePointerUp = (markerId) => {
    console.log("pointer up");
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId ? { ...marker, isDragging: false } : marker
      )
    );

    if (controlsRef.current) controlsRef.current.enabled = true;
  };

  const handlePointerMove = (e, marker) => {
    e.stopPropagation();
    if (marker && marker.isDragging && cameraRef.current && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const vec = new THREE.Vector3();
      const pos = new THREE.Vector3();

      vec.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
        0
      );

      vec.unproject(cameraRef.current);
      vec.sub(cameraRef.current.position).normalize();

      const distance = -cameraRef.current.position.z / vec.z;
      pos.copy(cameraRef.current.position).add(vec.multiplyScalar(distance));

      setMarkers((prevMarkers) =>
        prevMarkers.map((m) =>
          m.id === marker.id ? { ...m, position: [pos.x, pos.y, 0] } : m
        )
      );
    }
  };

  const handlePointOut = (e, marker) => {
    window.document.body.style.cursor = "auto";
    if (marker.isDragging) {
      setMarkers((prevMarkers) =>
        prevMarkers.map((m) =>
          m.id === marker.id ? { ...m, isDragging: false } : m
        )
      );
    }
    if (controlsRef.current) controlsRef.current.enabled = true;
  };

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
        <Canvas
          id="canvas"
          ref={canvasRef}
          style={{ height: "60vh", width: "60%" }}
        >
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
              onPointerDown={(e) => handlePointerDown(e, marker.id)}
              onPointerUp={() => handlePointerUp(marker.id)}
              onPointerMove={(e) => handlePointerMove(e, marker)}
              onPointerOver={(e) => {
                e.stopPropagation();
                window.document.body.style.cursor = "grab";
              }}
              onPointerOut={(e) => handlePointOut(e, marker)}
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
