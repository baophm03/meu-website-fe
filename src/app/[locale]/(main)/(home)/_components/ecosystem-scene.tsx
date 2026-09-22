"use client";

/* eslint-disable react-hooks/immutability -- three.js geometries are mutated per-frame by design */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;
const LINK_DIST = 1.5;
const MAX_LINKS = 4;

const DIM_COLOR = new THREE.Color("#31417c");
const BASE_COLOR = new THREE.Color("#4d6bfe");
const ACCENT_COLOR = new THREE.Color("#00f0ff");

type EcosystemData = {
  base: Float32Array;
  live: Float32Array;
  phase: Float32Array;
  speed: Float32Array;
  amp: Float32Array;
  colors: Float32Array;
  pairs: Array<[number, number]>;
};

function buildEcosystem(): EcosystemData {
  const base = new Float32Array(NODE_COUNT * 3);
  const phase = new Float32Array(NODE_COUNT);
  const speed = new Float32Array(NODE_COUNT);
  const amp = new Float32Array(NODE_COUNT);
  const colors = new Float32Array(NODE_COUNT * 3);

  for (let i = 0; i < NODE_COUNT; i++) {
    // Ellipsoid cloud: wider than it is tall.
    const r = Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    base[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 3.1;
    base[i * 3 + 1] = r * Math.cos(phi) * 2.15;
    base[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 2.15;

    phase[i] = Math.random() * Math.PI * 2;
    speed[i] = 0.25 + Math.random() * 0.5;
    amp[i] = 0.05 + Math.random() * 0.14;

    const roll = Math.random();
    const c = roll > 0.88 ? ACCENT_COLOR : roll > 0.45 ? BASE_COLOR : DIM_COLOR;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  // Connect each node to its closest neighbours.
  const pairs: Array<[number, number]> = [];
  const linkCount = new Array(NODE_COUNT).fill(0);
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (linkCount[i] >= MAX_LINKS || linkCount[j] >= MAX_LINKS) continue;
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
        pairs.push([i, j]);
        linkCount[i]++;
        linkCount[j]++;
      }
    }
  }

  return { base, live: new Float32Array(base), phase, speed, amp, colors, pairs };
}

function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const data = useMemo(() => buildEcosystem(), []);

  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.live, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
    return geo;
  }, [data]);

  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(data.pairs.length * 6), 3));
    return geo;
  }, [data]);

  useEffect(() => {
    return () => {
      pointsGeo.dispose();
      linesGeo.dispose();
    };
  }, [pointsGeo, linesGeo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { base, live, phase, speed, amp, pairs } = data;

    for (let i = 0; i < NODE_COUNT; i++) {
      live[i * 3] = base[i * 3] + Math.sin(t * speed[i] + phase[i]) * amp[i];
      live[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * speed[i] * 0.8 + phase[i]) * amp[i];
      live[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * speed[i] * 0.6 + phase[i] * 1.7) * amp[i];
    }
    pointsGeo.attributes.position.needsUpdate = true;

    const linePos = linesGeo.attributes.position.array as Float32Array;
    for (let k = 0; k < pairs.length; k++) {
      const [a, b] = pairs[k];
      linePos[k * 6] = live[a * 3];
      linePos[k * 6 + 1] = live[a * 3 + 1];
      linePos[k * 6 + 2] = live[a * 3 + 2];
      linePos[k * 6 + 3] = live[b * 3];
      linePos[k * 6 + 4] = live[b * 3 + 1];
      linePos[k * 6 + 5] = live[b * 3 + 2];
    }
    linesGeo.attributes.position.needsUpdate = true;

    const group = groupRef.current;
    if (group) {
      // Slow drift + cursor parallax + subtle scroll depth.
      const scroll = typeof window !== "undefined" ? Math.min(window.scrollY / 900, 1) : 0;
      group.rotation.y += delta * 0.06;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, state.pointer.y * 0.14 + scroll * 0.25, 0.05);
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, state.pointer.x * 0.08, 0.05);
      group.position.y = THREE.MathUtils.lerp(group.position.y, scroll * 0.9, 0.08);
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.4) * 0.12;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color="#335cff" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points geometry={pointsGeo}>
        <pointsMaterial size={0.085} vertexColors transparent opacity={0.95} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      {/* Accent core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.34, 1]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function EcosystemScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Network />
    </Canvas>
  );
}
