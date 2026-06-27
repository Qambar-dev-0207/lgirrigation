"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState("visible"); // visible → hiding → hidden

  useEffect(() => {
    // Start hiding after 2s
    const hideTimer = setTimeout(() => setPhase("hiding"), 2000);
    // Remove from DOM after curtain animation completes
    const removeTimer = setTimeout(() => setPhase("hidden"), 3100);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`loader-wrapper${phase === "hiding" ? " hiding" : ""}`} aria-hidden="true">
      {/* Overlapping circles — brand mark */}
      <div className="loader-circles">
        <div className="loader-circle-red" />
        <div className="loader-circle-yellow" />
      </div>

      {/* Company name */}
      <p className="loader-text">L G Irrigation</p>
    </div>
  );
}
