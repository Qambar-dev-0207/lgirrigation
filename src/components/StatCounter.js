"use client";

import { useEffect, useRef, useState } from "react";

/**
 * StatCounter — animates from 0 to `target` when scrolled into view.
 * @param {number} target - The end number
 * @param {string} suffix - e.g. "mm", "+", "%"
 * @param {string} prefix - e.g. "32"
 * @param {number} duration - animation duration in ms
 */
export default function StatCounter({ target, suffix = "", prefix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const numericTarget = typeof target === "number" ? target : parseFloat(target) || 0;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numericTarget * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref} className="stat-number">
      {prefix}{count}{suffix}
    </span>
  );
}
