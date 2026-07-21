"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motionState } from "@/lib/motion";
import SceneFallback from "./SceneFallback";

const BG = 0x05080b;
const BLUE = 0x8fd9fb;
const DIM_BLUE = 0x2f566b;
const HORIZON_BLUE = 0xbde8ff;

const SP = 70;
const Z_NEAR = 700;

/* panels arrive roughly as each content section enters view */
const PANELS = [
  { at: 820, w: 300, h: 190, x: -140 },
  { at: 1750, w: 340, h: 210, x: 0 },
  { at: 2680, w: 300, h: 190, x: 150 },
];

function lineGeometry(points: number[]) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  return g;
}

/* mobile gets a reduced extent: fewer vertices, same look up close */
function gridPoints(y: number, halfX: number, zFar: number) {
  const v: number[] = [];
  for (let z = zFar; z <= Z_NEAR; z += SP) v.push(-halfX, y, z, halfX, y, z);
  for (let x = -halfX; x <= halfX; x += SP) v.push(x, y, zFar, x, y, Z_NEAR);
  return v;
}

/* a low wireframe mountain silhouette. a quiet nod to ascend, not a centrepiece */
function ridgePoints() {
  const h = (x: number) =>
    140 +
    Math.sin(x * 0.0021) * 80 +
    Math.sin(x * 0.0058 + 1.4) * 42 +
    Math.sin(x * 0.0132 + 3.1) * 18;
  const v: number[] = [];
  const step = 48;
  for (let x = -2600; x < 2600; x += step) {
    v.push(x, h(x), -3600, x + step, h(x + step), -3600);
    if (Math.round(x / step) % 4 === 0) v.push(x, h(x), -3600, x, 0, -3600);
  }
  return v;
}

function columnPoints() {
  const v: number[] = [];
  for (let i = 0; i < 64; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const x = side * (720 + Math.random() * 740);
    const z = -Math.random() * 4200 + 400;
    const hgt = 40 + Math.random() * 280;
    const w = 24;
    v.push(x, 0, z, x, hgt, z);
    v.push(x - w, hgt, z, x + w, hgt, z);
    v.push(x - w, hgt * 0.5, z, x + w, hgt * 0.5, z);
  }
  return v;
}

function panelPoints(w: number, h: number) {
  return [
    -w, -h, 0, w, -h, 0,
    w, -h, 0, w, h, 0,
    w, h, 0, -w, h, 0,
    -w, h, 0, -w, -h, 0,
    -w * 0.86, h * 0.62, 0, w * 0.86, h * 0.62, 0,
    -w * 0.86, -h * 0.62, 0, w * 0.86, -h * 0.62, 0,
  ];
}

function Corridor({ mobile }: { mobile: boolean }) {
  const grids = useRef<THREE.Group>(null);
  const cols = useRef<THREE.Group>(null);
  const panelRefs = useRef<(THREE.LineSegments | null)[]>([]);

  const halfX = mobile ? 1260 : 2100;
  const zFar = mobile ? -3080 : -4200;

  const floorGeo = useMemo(
    () => lineGeometry(gridPoints(0, halfX, zFar)),
    [halfX, zFar],
  );
  const ceilingGeo = useMemo(
    () => (mobile ? null : lineGeometry(gridPoints(340, halfX, zFar))),
    [mobile, halfX, zFar],
  );
  const ridgeGeo = useMemo(() => lineGeometry(ridgePoints()), []);
  const horizonGeo = useMemo(
    () => lineGeometry([-3000, 2, -3560, 3000, 2, -3560]),
    [],
  );
  const columnsGeo = useMemo(
    () => (mobile ? null : lineGeometry(columnPoints())),
    [mobile],
  );
  const panelGeos = useMemo(
    () => PANELS.map((p) => lineGeometry(panelPoints(p.w, p.h))),
    [],
  );

  useFrame(({ camera, clock }) => {
    const et = clock.elapsedTime;
    const { travel, reduced } = motionState;

    if (grids.current) grids.current.position.z = travel % SP;
    if (cols.current) cols.current.position.z = (travel * 0.55) % 4200;

    panelRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const z = -(PANELS[i].at - travel) - 200;
      mesh.position.z = z;
      const vis = z < 60 && z > -3000;
      (mesh.material as THREE.LineBasicMaterial).opacity = vis
        ? 0.45 * Math.min(1, (60 - z) / 700)
        : 0;
    });

    camera.position.y = 46 + (reduced ? 0 : Math.sin(et * 0.55) * 1.8);
    camera.position.x = reduced ? 0 : Math.sin(et * 0.21) * 18;
    camera.lookAt(camera.position.x * 0.35, 118, -1400);
  });

  return (
    <>
      <color attach="background" args={[BG]} />
      <fogExp2 attach="fog" args={[BG, 0.00088]} />

      <group ref={grids}>
        <lineSegments geometry={floorGeo}>
          <lineBasicMaterial
            color={BLUE}
            transparent
            opacity={0.26}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
        {ceilingGeo && (
          <lineSegments geometry={ceilingGeo}>
            <lineBasicMaterial
              color={DIM_BLUE}
              transparent
              opacity={0.1}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        )}
      </group>

      <lineSegments geometry={ridgeGeo}>
        <lineBasicMaterial
          color={BLUE}
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* the horizon line does a lot of work. keep it. */}
      <lineSegments geometry={horizonGeo}>
        <lineBasicMaterial
          color={HORIZON_BLUE}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {columnsGeo && (
        <group ref={cols}>
          <lineSegments geometry={columnsGeo}>
            <lineBasicMaterial
              color={BLUE}
              transparent
              opacity={0.16}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      )}

      {PANELS.map((p, i) => (
        <lineSegments
          key={p.at}
          geometry={panelGeos[i]}
          position={[p.x, 175, 0]}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
        >
          <lineBasicMaterial
            color={BLUE}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}
    </>
  );
}

export default function Scene() {
  /* read once on mount. this component is only ever rendered client-side */
  const [env] = useState(() => ({
    mobile: window.innerWidth < 760,
  }));

  /* pause the render loop when the tab is hidden */
  const [frameloop, setFrameloop] = useState<"always" | "never">(() =>
    document.visibilityState === "hidden" ? "never" : "always",
  );
  useEffect(() => {
    const onVisibility = () =>
      setFrameloop(document.visibilityState === "hidden" ? "never" : "always");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="canvas-layer" aria-hidden="true">
      <Canvas
        flat
        frameloop={frameloop}
        fallback={<SceneFallback />}
        camera={{ fov: 62, near: 1, far: 6000, position: [0, 46, 0] }}
        dpr={[1, env.mobile ? 1.3 : 1.8]}
        gl={{ antialias: !env.mobile, powerPreference: "high-performance" }}
      >
        <Corridor mobile={env.mobile} />
      </Canvas>
    </div>
  );
}
