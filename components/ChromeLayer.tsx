"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* the chrome (and the gsap/lenis it pulls in) is instrumentation, not
   content. like the 3D chunk, it waits for window load so it never
   competes with the copy for bandwidth. */
const Chrome = dynamic(() => import("./Chrome"), { ssr: false });

export default function ChromeLayer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return ready ? <Chrome /> : null;
}
