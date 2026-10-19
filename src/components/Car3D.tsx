"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const MODEL = "/models/212.glb";
const LENGTH = 4.6; // target car length in scene units

function Car({ paint }: { paint: string }) {
  const { scene } = useGLTF(MODEL);
  const group = useRef<THREE.Group>(null);

  // Normalise scale/position once and give key materials a showroom look
  const { model, paintMat } = useMemo(() => {
    const model = scene.clone(true);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const s = LENGTH / Math.max(size.x, size.z);
    model.scale.setScalar(s);
    box.setFromObject(model);
    const c = box.getCenter(new THREE.Vector3());
    model.position.set(-c.x, -box.min.y, -c.z);

    const paintMat = new THREE.MeshPhysicalMaterial({
      metalness: 0.25,
      roughness: 0.38,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#0d1014",
      metalness: 0.1,
      roughness: 0.04,
      transparent: true,
      opacity: 0.55,
      envMapIntensity: 2,
    });

    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const next = mats.map((m) => {
        const std = m as THREE.MeshStandardMaterial;
        const name = std.name;
        if (name === "paint") return paintMat;
        if (name === "glass") return glass;
        if (name === "chrome") Object.assign(std, { metalness: 1, roughness: 0.12 });
        if (name.startsWith("tire")) Object.assign(std, { metalness: 0, roughness: 0.92 });
        if (name.startsWith("lamp_red")) Object.assign(std, { emissive: new THREE.Color("#5a0008") });
        return std;
      });
      mesh.material = Array.isArray(mesh.material) ? next : next[0];
    });
    return { model, paintMat };
  }, [scene]);

  // Smoothly blend to the selected paint colour
  const target = useMemo(() => new THREE.Color(), []);
  useEffect(() => {
    target.set(paint);
  }, [paint, target]);
  useFrame((_, dt) => {
    paintMat.color.lerp(target, 1 - Math.exp(-dt * 6));
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

/** Rendered inside Suspense after the model, so it mounts once the GLB has loaded. */
function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#2a2d33"]} />
      <Lightformer intensity={2.2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
      <Lightformer intensity={1.4} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      <Lightformer intensity={1.4} position={[6, 2, -2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
      <Lightformer intensity={0.5} color="#c8103f" position={[0, 0.6, -7]} scale={[12, 0.8, 1]} />
      <Lightformer intensity={0.6} position={[0, 1, 7]} rotation-y={Math.PI} scale={[12, 3, 1]} />
    </Environment>
  );
}

export default function Car3D({ paint, onReady }: { paint: string; onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [5.2, 1.9, 5.2], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      className="!touch-pan-y"
    >
      <Suspense fallback={null}>
        <Car paint={paint} />
        <Ready onReady={onReady} />
        <Studio />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.75} scale={9} blur={2.4} far={2.5} resolution={512} />
      </Suspense>
      <OrbitControls
        target={[0, 0.85, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL);
