"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SceneFallback from "./SceneFallback";

/* the canvas is decoration. content renders first; the scene lazy-loads behind it. */
const Scene = dynamic(() => import("./Scene"), { ssr: false });

function canRun3d(): boolean {
  if ((navigator.hardwareConcurrency ?? 0) < 4) return false;
  try {
    const probe = document.createElement("canvas");
    const gl =
      probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function SceneLayer() {
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");

  /* wait for window load before even fetching the 3D chunk: the corridor
     must never compete with content for bandwidth on a slow connection */
  useEffect(() => {
    const start = () => setMode(canRun3d() ? "3d" : "fallback");
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  if (mode === "pending") return null;
  return mode === "3d" ? <Scene /> : <SceneFallback />;
}
