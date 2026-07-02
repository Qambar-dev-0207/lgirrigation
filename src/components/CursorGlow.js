"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const spotlightRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    let rafId;
    let mouseX = -100;
    let mouseY = -100;
    
    let spotX = -100;
    let spotY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      // Lerp spotlight
      spotX = lerp(spotX, mouseX, 0.06);
      spotY = lerp(spotY, mouseY, 0.06);
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${spotX}px`;
        spotlightRef.current.style.top  = `${spotY}px`;
      }

      // Lerp outer ring
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top  = `${ringY}px`;
      }

      // Lerp physical dot
      dotX = lerp(dotX, mouseX, 0.35);
      dotY = lerp(dotY, mouseY, 0.35);
      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top  = `${dotY}px`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if cursor is hovering over an interactive element
      const target = e.target;
      if (target) {
        const isInteractive = 
          target.closest("a") || 
          target.closest("button") || 
          target.closest(".btn") || 
          target.closest(".satellite-cta") || 
          target.closest(".portrait-circle-wrapper") ||
          target.closest(".gallery-item") ||
          target.closest(".test-card") ||
          target.closest(".org-node-header") ||
          target.closest(".customer-card");

        if (isInteractive) {
          spotlightRef.current?.classList.add("hovering-interactive");
          ringRef.current?.classList.add("hovering-interactive");
          dotRef.current?.classList.add("hovering-interactive");
        } else {
          spotlightRef.current?.classList.remove("hovering-interactive");
          ringRef.current?.classList.remove("hovering-interactive");
          dotRef.current?.classList.remove("hovering-interactive");
        }

        // White cursor when inside footer
        const inFooter = !!target.closest("footer");
        const action = inFooter ? "add" : "remove";
        spotlightRef.current?.classList[action]("in-footer");
        ringRef.current?.classList[action]("in-footer");
        dotRef.current?.classList[action]("in-footer");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={spotlightRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
