"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import DesktopCharacter from "./desktop-character";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [5, 2, 5], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>

        <Suspense fallback={null}>
          <DesktopCharacter />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.49, 0]}
            opacity={0.5}
            scale={20}
            blur={2}
            far={10}
            resolution={512}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.1}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
