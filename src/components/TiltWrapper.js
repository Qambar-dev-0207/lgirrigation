"use client";

import { useRef, useState } from "react";

/**
 * TiltWrapper applies a smooth 3D parallax tilt effect on mousemove.
 * Ideal for image frames and cards to make them feel highly premium.
 */
export default function TiltWrapper({ children, className = "", maxTilt = 10, scale = 1.02 }) {
  const wrapperRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e) => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Percentage of cursor position (-0.5 to 0.5)
    const px = (x / width) - 0.5;
    const py = (y / height) - 0.5;

    // Tilt degrees (rotateY is affected by X movement, rotateX by Y movement)
    const tiltX = -py * maxTilt;
    const tiltY = px * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: transform,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
