"use client";

import { useRef, useState } from "react";

/**
 * MagneticButton wraps a button or CTA and pulls it slightly toward the cursor
 * when the mouse moves over it.
 * Uses vanilla React state and CSS transitions for zero-dependency performance.
 */
export default function MagneticButton({ children, className = "", style = {}, strength = 0.25 }) {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // Center point of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center to cursor
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Shift target position by strength factor
    const targetX = distanceX * strength;
    const targetY = distanceY * strength;

    setTransform(`translate3d(${targetX}px, ${targetY}px, 0px) scale(1.02)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("translate3d(0px, 0px, 0px)");
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-button-container ${className}`}
      style={{
        display: "inline-block",
        position: "relative",
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isHovered ? "none" : "none", // reset parent transform
        ...style,
      }}
    >
      <div
        style={{
          transition: isHovered ? "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: transform,
          display: "inline-block",
        }}
      >
        {children}
      </div>
    </div>
  );
}
