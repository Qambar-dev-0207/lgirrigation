"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState("visible"); // visible → hiding → hidden

  useEffect(() => {
    // Start hiding after 2.5s to let the full animation sequence play
    const hideTimer = setTimeout(() => setPhase("hiding"), 2500);
    // Remove from DOM after curtain animation completes
    const removeTimer = setTimeout(() => {
      setPhase("hidden");
      if (typeof window !== "undefined") {
        window.loaderFinished = true;
        window.dispatchEvent(new Event("loaderFinished"));
      }
    }, 3600);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`loader-wrapper${phase === "hiding" ? " hiding" : ""}`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" className="loader-svg">
        <defs>
          {/* Glass Pane Background Gradient */}
          <linearGradient id="glass-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.28)" />
            <stop offset="100%" stopColor="rgba(240, 248, 245, 0.08)" />
          </linearGradient>
          
          {/* Green Glass Border Gradient */}
          <linearGradient id="glass-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 94, 58, 0.45)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="100%" stopColor="rgba(30, 94, 58, 0.5)" />
          </linearGradient>

          {/* Letter Green Gradient (3D Monogram Base) */}
          <linearGradient id="letter-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D7249" />
            <stop offset="50%" stopColor="#1E5E3A" />
            <stop offset="100%" stopColor="#114024" />
          </linearGradient>

          {/* Metallic Silver Gradient for Coupling Rims */}
          <linearGradient id="metal-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A8AEAC" />
            <stop offset="25%" stopColor="#EBF0EE" />
            <stop offset="50%" stopColor="#7E8482" />
            <stop offset="75%" stopColor="#EBF0EE" />
            <stop offset="100%" stopColor="#696D6C" />
          </linearGradient>

          {/* Leaf Translucent Green Glass Gradient */}
          <linearGradient id="leaf-glass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(76, 175, 80, 0.75)" />
            <stop offset="50%" stopColor="rgba(46, 125, 50, 0.55)" />
            <stop offset="100%" stopColor="rgba(27, 94, 32, 0.35)" />
          </linearGradient>

          {/* Stem Polished Black Gradient */}
          <linearGradient id="stem-black" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B2D2C" />
            <stop offset="50%" stopColor="#141514" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>

          {/* Bevel Filter for 3D Lighting Sheen */}
          <filter id="bevel-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.3" specularExponent="16" lightingColor="#ffffff" result="specular">
              <fePointLight x="-150" y="-250" z="300" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularOut" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="specularOut" />
            </feMerge>
          </filter>

          {/* Drop Shadows */}
          <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#141413" floodOpacity="0.14" />
          </filter>
          <filter id="glass-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* ==========================================
           BACKGROUND GLASS PANES & BLUEPRINTS
           ========================================== */}

        {/* Left Glass Pane */}
        <g className="glass-pane-left" filter="url(#glass-shadow)">
          <rect x="80" y="80" width="280" height="300" rx="8" fill="url(#glass-body)" stroke="url(#glass-edge)" strokeWidth="1.5" />
          {/* Mechanical blueprint drawing on left pane */}
          <path d="M 120,150 L 120,280 C 120,300 140,320 160,320 L 300,320" fill="none" stroke="rgba(30, 94, 58, 0.14)" strokeWidth="2.5" strokeDasharray="5 5" />
          <path d="M 140,150 L 140,270 C 140,285 155,300 170,300 L 300,300" fill="none" stroke="rgba(30, 94, 58, 0.22)" strokeWidth="1.5" className="blueprint-line draw-line-1" />
          <path d="M 100,150 L 100,290 C 100,315 125,340 150,340 L 300,340" fill="none" stroke="rgba(30, 94, 58, 0.22)" strokeWidth="1.5" className="blueprint-line draw-line-2" />
          <rect x="85" y="200" width="30" height="8" rx="1" fill="none" stroke="rgba(30, 94, 58, 0.2)" strokeWidth="1.5" className="blueprint-line draw-line-3" />
          <rect x="230" y="292" width="8" height="16" rx="1" fill="none" stroke="rgba(30, 94, 58, 0.2)" strokeWidth="1.5" className="blueprint-line draw-line-3" />
        </g>

        {/* Right Glass Pane */}
        <g className="glass-pane-right" filter="url(#glass-shadow)">
          <rect x="640" y="80" width="280" height="300" rx="8" fill="url(#glass-body)" stroke="url(#glass-edge)" strokeWidth="1.5" />
          {/* Mechanical blueprint drawing on right pane */}
          <path d="M 660,180 L 900,180" fill="none" stroke="rgba(30, 94, 58, 0.14)" strokeWidth="2.5" strokeDasharray="5 5" />
          <path d="M 660,165 L 755,165 C 765,165 770,170 770,180 L 770,320" fill="none" stroke="rgba(30, 94, 58, 0.22)" strokeWidth="1.5" className="blueprint-line draw-line-1" />
          <path d="M 660,195 L 785,195 C 795,195 800,200 800,210 L 800,320" fill="none" stroke="rgba(30, 94, 58, 0.22)" strokeWidth="1.5" className="blueprint-line draw-line-2" />
          <line x1="830" y1="120" x2="830" y2="240" stroke="rgba(30, 94, 58, 0.15)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="820" y1="150" x2="840" y2="150" stroke="rgba(30, 94, 58, 0.2)" strokeWidth="1" className="blueprint-line draw-line-3" />
        </g>

        {/* Center Glass Pane */}
        <g className="glass-pane-center" filter="url(#glass-shadow)">
          <rect x="180" y="40" width="640" height="380" rx="12" fill="url(#glass-body)" stroke="url(#glass-edge)" strokeWidth="2" />
          {/* Alignment / Grid guidelines for technical schematic look */}
          <line x1="200" y1="230" x2="800" y2="230" stroke="rgba(30, 94, 58, 0.12)" strokeWidth="1" strokeDasharray="8 8" />
          <line x1="500" y1="50" x2="500" y2="410" stroke="rgba(30, 94, 58, 0.12)" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="500" cy="230" r="160" fill="none" stroke="rgba(30, 94, 58, 0.06)" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="500" cy="230" r="90" fill="none" stroke="rgba(30, 94, 58, 0.04)" strokeWidth="1" />
        </g>

        {/* ==========================================
           MONOGRAM (L, G, i, Leaf)
           ========================================== */}

        <g className="logo-group">
          {/* 3D Beveled "L" */}
          <g filter="url(#drop-shadow)" className="element-l">
            <path
              d="M 230,110 L 230,320 A 15,15 0 0 0 245,335 L 505,335 A 15,15 0 0 0 520,320 L 520,265 L 480,265 L 480,295 L 270,295 L 270,110 Z"
              fill="url(#letter-green)"
              filter="url(#bevel-filter)"
            />
            {/* Gloss Overlay */}
            <path
              d="M 232,112 L 232,318 A 13,13 0 0 0 245,331 L 503,331 A 13,13 0 0 0 516,318 L 516,267 L 510,267 L 510,318 A 7,7 0 0 1 503,325 L 245,325 A 7,7 0 0 1 238,318 L 238,112 Z"
              fill="rgba(255, 255, 255, 0.18)"
              opacity="0.65"
            />
          </g>

          {/* 3D Beveled "G" */}
          <g filter="url(#drop-shadow)" className="element-g">
            <path
              d="M 315,125 L 455,125 A 15,15 0 0 1 470,140 L 470,180 L 415,180 L 415,200 L 470,200 L 470,265 A 15,15 0 0 1 455,280 L 315,280 A 15,15 0 0 1 300,265 L 300,140 A 15,15 0 0 1 315,125 Z M 430,160 L 335,160 L 335,245 L 430,245 L 395,220 L 395,180 L 430,180 Z"
              fill="url(#letter-green)"
              fillRule="evenodd"
              filter="url(#bevel-filter)"
            />
            {/* Gloss Overlay */}
            <path
              d="M 317,127 L 453,127 A 13,13 0 0 1 466,140 L 466,182 L 417,182 L 417,198 L 466,198 L 466,263 A 13,13 0 0 1 453,276 L 317,276 A 13,13 0 0 1 304,263 L 304,140 A 13,13 0 0 1 317,127 Z"
              fill="rgba(255, 255, 255, 0.18)"
              fillRule="evenodd"
              opacity="0.65"
            />
          </g>

          {/* "i" Stem - Polished Black Block */}
          <rect
            x="560"
            y="220"
            width="40"
            height="115"
            rx="3"
            fill="url(#stem-black)"
            filter="url(#drop-shadow)"
            className="element-i-stem"
          />
          {/* Subtle sheen highlight on the i-stem */}
          <line
            x1="563"
            y1="223"
            x2="563"
            y2="332"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.5"
            className="element-i-stem-highlight"
          />

          {/* "i" Coupling (Glass Connector) */}
          <g filter="url(#drop-shadow)" className="element-i-coupling">
            {/* Bottom Metal Collar */}
            <rect x="555" y="208" width="50" height="12" rx="2" fill="url(#metal-rim)" />
            
            {/* Top Metal Collar */}
            <rect x="555" y="135" width="50" height="12" rx="2" fill="url(#metal-rim)" />

            {/* Glass Tube Body */}
            <rect x="560" y="147" width="40" height="61" fill="url(#glass-body)" stroke="rgba(30, 94, 58, 0.2)" strokeWidth="1" />
            
            {/* Glass Reflections & Internal Fluid Tube */}
            <line x1="570" y1="147" x2="570" y2="208" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
            <line x1="580" y1="147" x2="580" y2="208" stroke="rgba(30, 94, 58, 0.2)" strokeWidth="1.5" />
            <line x1="590" y1="147" x2="590" y2="208" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="2" strokeDasharray="15 30" />
          </g>

          {/* Green Glass Leaf */}
          <g filter="url(#drop-shadow)" className="element-leaf">
            {/* Main Leaf Body */}
            <path
              d="M 595,150 C 620,90 730,55 830,55 C 750,145 675,170 595,150 Z"
              fill="url(#leaf-glass)"
              stroke="rgba(76, 175, 80, 0.65)"
              strokeWidth="2.5"
              filter="url(#bevel-filter)"
            />
            {/* Leaf Vein */}
            <path
              d="M 620,140 C 685,115 755,90 830,55"
              fill="none"
              stroke="#A5D6A7"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M 620,140 C 685,115 755,90 830,55"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Glass Leaf Specular Highlight */}
            <path
              d="M 605,145 C 630,95 720,70 810,65"
              fill="none"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="3"
              strokeLinecap="round"
              className="leaf-specular"
            />
          </g>
        </g>

        {/* Brand Name Text */}
        <text
          x="500"
          y="410"
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="36"
          fontWeight="800"
          letterSpacing="8"
          fill="#1E5E3A"
          filter="url(#drop-shadow)"
          className="text-lg-irrigation"
        >
          LG IRRIGATION
        </text>
      </svg>
    </div>
  );
}
