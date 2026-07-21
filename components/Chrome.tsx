"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { DAMP, IDLE_DRIFT, motionState, TOTAL_TRAVEL } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function Chrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [bootLines, setBootLines] = useState<readonly string[]>([]);
  const [bootDim, setBootDim] = useState(false);

  /* section reveals. the hero is deliberately not animated: it must be
     readable the instant the page paints. */
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    CustomEase.create("reveal", "0.2,0.7,0.3,1");
    const triggers: ScrollTrigger[] = [];
    const revealed: Element[] = [];

    document.querySelectorAll("main section:not(#hero)").forEach((section) => {
      const els = Array.from(section.querySelectorAll("[data-reveal]"));
      if (!els.length) return;
      revealed.push(...els);
      gsap.set(els, { autoAlpha: 0, y: 22 });
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 78%",
          once: true,
          onEnter: () =>
            gsap.to(els, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "reveal",
              stagger: 0.08,
              overwrite: true,
            }),
        }),
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(revealed);
      gsap.set(revealed, { clearProps: "all" });
    };
  }, []);

  /* one raf loop: gsap's ticker drives lenis, the damped travel value,
     and the fixed chrome. the 3D scene reads motionState, it never writes. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    motionState.reduced = reduced;

    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.08 });
      lenis.on("scroll", ScrollTrigger.update);
    }

    const tick = (time: number) => {
      lenis?.raf(time * 1000);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      motionState.target = target;
      motionState.p += (target - motionState.p) * (reduced ? 1 : DAMP);
      motionState.travel =
        motionState.p * TOTAL_TRAVEL + (reduced ? 0 : time * IDLE_DRIFT);

      if (barRef.current)
        barRef.current.style.width = `${(target * 100).toFixed(2)}%`;
      if (hudRef.current)
        hudRef.current.textContent = String(
          Math.max(0, Math.round(motionState.travel)),
        ).padStart(4, "0");
      if (hintRef.current)
        hintRef.current.style.opacity = target > 0.02 ? "0" : "";
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  /* boot sequence. types once, then recedes to instrumentation. */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setBootLines([]);
    setBootDim(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBootLines(site.chrome.bootLines);
      setBootDim(true);
      return;
    }

    let i = 0;
    const next = () => {
      if (i >= site.chrome.bootLines.length) {
        timers.push(setTimeout(() => setBootDim(true), 1100));
        return;
      }
      const line = site.chrome.bootLines[i];
      i += 1;
      setBootLines((lines) => [...lines, line]);
      timers.push(setTimeout(next, 210));
    };
    next();

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <div ref={barRef} className="progress" aria-hidden="true" />
      <div className={bootDim ? "boot boot-dim" : "boot"} aria-hidden="true">
        {bootLines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <div className="hud" aria-hidden="true">
        {site.chrome.hudLabel} / <span ref={hudRef}>0000</span>
      </div>
      <div ref={hintRef} className="hint" aria-hidden="true">
        {site.chrome.scrollHint}
      </div>
    </>
  );
}
