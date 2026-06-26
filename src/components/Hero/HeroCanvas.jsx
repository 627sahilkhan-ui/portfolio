import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Trail } from '@react-three/drei'
import * as THREE from 'three'

const FloatingCore = () => {
  const meshRef = useRef()
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3
      meshRef.current.rotation.y = t * 0.4
      meshRef.current.rotation.z = t * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.5 + 1
      ringRef.current.rotation.z = t * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.7
      ring2Ref.current.rotation.z = t * 0.2 + 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Core icosahedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#00d4ff"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Orbit ring 1 */}
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 8, 80]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={1.5}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Orbit ring 2 */}
        <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 5]}>
          <torusGeometry args={[2.2, 0.015, 8, 80]} />
          <meshStandardMaterial
            color="#ff2233"
            emissive="#ff2233"
            emissiveIntensity={1.5}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Satellite spheres */}
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 1.8,
                Math.sin(angle) * 0.8,
                Math.sin(angle) * 1.4
              ]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#00d4ff' : '#ff2233'}
                emissive={i % 2 === 0 ? '#00d4ff' : '#ff2233'}
                emissiveIntensity={3}
              />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

const HeroCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#ff2233" intensity={1.5} />
      <pointLight position={[0, 0, -5]} color="#ffffff" intensity={0.5} />
      <FloatingCore />
    </Canvas>
  )
}

export default HeroCanvas
