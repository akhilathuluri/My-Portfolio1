"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Cylinder, Text, Float, Grid } from "@react-three/drei";
import * as THREE from "three";

export default function DesktopCharacter() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);
  const data2 = useRef<THREE.Group>(null);
  const data3 = useRef<THREE.Group>(null);

  // Animate the character looking around and data floating
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle head movement (looking around confused at the screens)
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 1.5) * 0.4;
      head.current.rotation.z = Math.sin(t * 2) * 0.05;
    }

    if (data2.current) data2.current.position.y = Math.sin(t * 3.5 + 1) * 0.2 + 2.2;
    if (data3.current) data3.current.position.y = Math.sin(t * 2.5 + 2) * 0.2 + 2.4;
  });

  return (
    <group ref={group} position={[0, -1.5, 0]}>
      {/* High-tech Grid Floor */}
      <Grid 
        position={[0, -0.5, 0]}
        args={[20, 20]} 
        cellSize={0.5} 
        cellThickness={1} 
        cellColor="#0ea5e9" 
        sectionSize={2} 
        sectionThickness={1.5} 
        sectionColor="#3b82f6" 
        fadeDistance={10} 
        fadeStrength={1} 
      />

      {/* Cyber Desk */}
      <group position={[0, 0, 0.5]}>
        {/* Table Top (Dark Metal/Glass) */}
        <Box args={[5, 0.1, 2.5]} position={[0, 1, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </Box>
        {/* Glowing Edge */}
        <Box args={[5.05, 0.05, 2.55]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} transparent opacity={0.8} />
        </Box>
        {/* Desk Legs */}
        <Box args={[0.2, 1, 1.5]} position={[-2.2, 0.5, 0]} castShadow>
          <meshStandardMaterial color="#222" metalness={0.8} />
        </Box>
        <Box args={[0.2, 1, 1.5]} position={[2.2, 0.5, 0]} castShadow>
          <meshStandardMaterial color="#222" metalness={0.8} />
        </Box>
      </group>

      {/* Main Server/PC */}
      <group position={[1.8, 1.4, 0.2]}>
        <Box args={[0.8, 1.2, 1]} castShadow>
          <meshStandardMaterial color="#111" metalness={0.9} />
        </Box>
        {/* Glowing Fans */}
        <Cylinder args={[0.2, 0.2, 0.05]} position={[0, 0.3, 0.51]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
        </Cylinder>
        <Cylinder args={[0.2, 0.2, 0.05]} position={[0, -0.3, 0.51]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={2} />
        </Cylinder>
      </group>

      {/* Triple Monitor Setup */}
      <group position={[0, 1.1, 0.2]}>
        {/* Center Monitor */}
        <group position={[0, 0.6, -0.2]}>
          <Box args={[1.6, 1, 0.1]} castShadow>
            <meshStandardMaterial color="#222" />
          </Box>
          <Box args={[1.5, 0.9, 0.01]} position={[0, 0, 0.06]}>
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
          </Box>
          <Text position={[0, 0, 0.07]} fontSize={0.2} color="#ffffff">404 ERROR</Text>
        </group>

        {/* Left Monitor */}
        <group position={[-1.6, 0.6, 0]} rotation={[0, 0.4, 0]}>
          <Box args={[1.2, 1, 0.1]} castShadow>
            <meshStandardMaterial color="#222" />
          </Box>
          <Box args={[1.1, 0.9, 0.01]} position={[0, 0, 0.06]}>
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
          </Box>
          <Text position={[0, 0.2, 0.07]} fontSize={0.1} color="#ffffff" anchorX="center">SEARCHING...</Text>
          <Text position={[0, -0.1, 0.07]} fontSize={0.08} color="#000000">{"10101010\n01010101\n11100011"}</Text>
        </group>

        {/* Right Monitor */}
        <group position={[1.6, 0.6, 0]} rotation={[0, -0.4, 0]}>
          <Box args={[1.2, 1, 0.1]} castShadow>
            <meshStandardMaterial color="#222" />
          </Box>
          <Box args={[1.1, 0.9, 0.01]} position={[0, 0, 0.06]}>
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
          </Box>
          <Text position={[0, 0, 0.07]} fontSize={0.15} color="#ffffff">SYSTEM OK</Text>
        </group>
      </group>

      {/* Hacker Character */}
      <group position={[0, 0, 1.5]}>
        {/* Ergonomic Cyber Chair */}
        <Cylinder args={[0.6, 0.6, 0.1]} position={[0, 0.05, 0]} castShadow>
          <meshStandardMaterial color="#111" />
        </Cylinder>
        <Cylinder args={[0.1, 0.1, 0.8]} position={[0, 0.4, 0]} castShadow>
          <meshStandardMaterial color="#333" metalness={0.8} />
        </Cylinder>
        <Box args={[1, 0.15, 1]} position={[0, 0.85, 0]} castShadow>
          <meshStandardMaterial color="#0ea5e9" />
        </Box>
        {/* Backrest */}
        <Box args={[1, 1.2, 0.15]} position={[0, 1.5, 0.4]} castShadow>
          <meshStandardMaterial color="#0ea5e9" />
        </Box>

        {/* Character Body (Hoodie) */}
        <Box args={[0.9, 1, 0.7]} position={[0, 1.4, 0]} castShadow>
          <meshStandardMaterial color="#1f2937" />
        </Box>
        
        {/* Character Head (Facing Monitors: -z) */}
        <Sphere ref={head} args={[0.45, 32, 32]} position={[0, 2.1, -0.1]} castShadow>
          <meshStandardMaterial color="#fcd34d" />
          {/* Eyes (Facing monitors, at -z) */}
          <Box args={[0.08, 0.08, 0.05]} position={[-0.15, 0.05, -0.4]} rotation={[0, 0, 0.2]}>
            <meshStandardMaterial color="#000" />
          </Box>
          <Box args={[0.08, 0.08, 0.05]} position={[0.15, 0.05, -0.4]} rotation={[0, 0, -0.2]}>
            <meshStandardMaterial color="#000" />
          </Box>
          {/* Mouth (Confused 'o') */}
          <Sphere args={[0.05, 16, 16]} position={[0, -0.15, -0.42]}>
            <meshStandardMaterial color="#000" />
          </Sphere>
        </Sphere>

        {/* Arms (Typing furiously) */}
        <Box args={[0.25, 0.9, 0.25]} position={[-0.6, 1.4, -0.4]} rotation={[-0.5, 0, 0]} castShadow>
          <meshStandardMaterial color="#1f2937" />
        </Box>
        <Box args={[0.25, 0.9, 0.25]} position={[0.6, 1.4, -0.4]} rotation={[-0.5, 0, 0]} castShadow>
          <meshStandardMaterial color="#1f2937" />
        </Box>

        {/* Floating Holographic Data */}
        <group ref={data2} position={[1, 2.5, -0.5]}>
          <Float speed={3} rotationIntensity={1} floatIntensity={2}>
            <Text fontSize={0.5} color="#ec4899" anchorX="center" anchorY="middle">?</Text>
          </Float>
        </group>
        <group ref={data3} position={[-1, 2.8, -0.5]}>
          <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
            <Text fontSize={0.7} color="#0ea5e9" anchorX="center" anchorY="middle">404</Text>
          </Float>
        </group>
      </group>
    </group>
  );
}
