"use client";

import { useEffect, useRef } from "react";

/**
 * AnimateOnScroll — wraps children and adds `.visible` when they enter the viewport.
 * Accepts `className` to pass additional reveal classes (e.g. "reveal reveal-delay-2").
 */
export default function AnimateOnScroll({ children, className = "reveal", threshold = 0.12, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
