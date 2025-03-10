import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Map } from "../components/Map";
import { useEffect, useRef } from "react";
import { MathUtils } from "three";
import * as THREE from "three";

import { Markers } from "../components/Markers";
import { MapController } from "../components/MapController";
import { useMapContext } from "../hooks/useMapContext";
import { Outlet } from "react-router-dom";

const minZoom = 2.5;
const maxZoom = 3.5;

export const MapPage = () => {
  const { view, markers, setMarkers } = useMapContext();

  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

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
      <Canvas
        id="canvas"
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "#333",
        }}
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

      <div id="sidebar" className={"sidebar"}>
        <Outlet />
        <button
          onClick={() => {
            document
              .getElementById("sidebar")
              .classList.toggle("sidebar-closed");
          }}
          id="toggle-sidebar"
        >
          Toggle
        </button>
      </div>
    </>
  );
};
