import { Canvas } from "@react-three/fiber";
import { MapControls, PerspectiveCamera } from "@react-three/drei";
import { Map } from "./components/Map";
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import * as THREE from "three";
import { SideBoard } from "./components/SideBoard";
import { Markers } from "./components/Markers";
import { MapController } from "./components/MapController";

const minZoom = 2.5;
const maxZoom = 3.5;
const initialMarkers = [
  {
    id: 1,
    position: [2, 1, 0],
    label: "Marker 1",
    isDragging: false,
    color: "red",
    size: [0.08, 0.2, 3],
  },
  {
    id: 2,
    position: [-2, -1, 0],
    label: "Marker 2",
    isDragging: false,
    color: "red",
    size: [0.08, 0.2, 3],
  },
  {
    id: 3,
    position: [0, 2, 0],
    label: "Marker 3",
    isDragging: false,
    color: "red",
    size: [0.08, 0.2, 3],
  },
];

function App() {
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [view, setView] = useState([0, 0, 10]);
  const [markers, setMarkers] = useState(initialMarkers);

  const updateView = () => {
    if (view[1] === 0) {
      setView([0, -18, 10]);
    } else {
      setView([0, 0, 10]);
    }
  };

  const handlePointerDown = (e, markerId) => {
    e.stopPropagation();
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId
          ? {
              ...marker,
              isDragging: true,
              color: "snow",
              size: [0.12, 0.2, 3],
            }
          : marker
      )
    );

    if (controlsRef.current) controlsRef.current.enabled = false;
  };

  const handlePointerUp = (markerId) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId
          ? { ...marker, isDragging: false, color: "red", size: [0.08, 0.2, 3] }
          : marker
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

  const handlePointerOut = (e, marker) => {
    window.document.body.style.cursor = "auto";
    if (marker.isDragging) {
      setMarkers((prevMarkers) =>
        prevMarkers.map((m) =>
          m.id === marker.id
            ? { ...m, isDragging: false, color: "red", size: [0.08, 0.2, 3] }
            : m
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
      <button onClick={updateView}>
        {view[1] === 0 ? "Tilt" : "Straighted"} View
      </button>
      <div id="canvas-container">
        <Canvas
          id="canvas"
          ref={canvasRef}
          style={{ height: "60vh", width: "80vw", margin: "auto" }}
        >
          <ambientLight intensity={2} />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={view}
            fov={50}
          />
          <MapController
            controlsRef={controlsRef}
            cameraRef={cameraRef}
            minZoom={minZoom}
            maxZoom={maxZoom}
          />
          <Map />
          <Markers
            markers={markers}
            handlePointerDown={handlePointerDown}
            handlePointerUp={handlePointerUp}
            handlePointerMove={handlePointerMove}
            handlePointerOut={handlePointerOut}
          />
        </Canvas>

        <SideBoard addMarker={addMarker} markers={markers} />
      </div>
    </>
  );
}

export default App;
