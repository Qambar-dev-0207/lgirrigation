"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState("visible"); // visible → hiding → hidden

  useEffect(() => {
    // Start hiding after 2.2s to let the intro animation play out
    const hideTimer = setTimeout(() => setPhase("hiding"), 2200);
    // Remove from DOM after curtain animation completes
    const removeTimer = setTimeout(() => {
      setPhase("hidden");
      if (typeof window !== "undefined") {
        window.loaderFinished = true;
        window.dispatchEvent(new Event("loaderFinished"));
      }
    }, 3200);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`loader-wrapper${phase === "hiding" ? " hiding" : ""}`} aria-hidden="true">
      <div className="loader-logo-container">
        <img
          src="/assets/lglogo.png"
          alt="L G Irrigation"
          className="loader-logo-img"
        />
        <div className="loader-logo-shimmer" />
      </div>
    </div>
  );
}


