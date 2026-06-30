"use client";

import { useState, useEffect } from "react";

const TESTS = [
  {
    id: "dimension",
    label: "Mechanical Verify",
    title: "Visual & Dimension Test",
    desc: "Every batch of pipes is examined for wall thickness, outer diameter tolerances, and surface finish consistency to ensure strict dimensional alignment.",
    icon: "📐",
  },
  {
    id: "tensile",
    label: "Strength Verify",
    title: "Tensile Strength Test",
    desc: "Measures the maximum mechanical load and elongation the pipe can withstand, verifying its structural capacity in high-stress, loaded underground installations.",
    icon: "🏋️",
  },
  {
    id: "mfi",
    label: "Polymer Flow",
    title: "Melt Flow Index (MFI)",
    desc: "Measures the flow rate of melted raw materials, validating the molecular structure consistency and extrusion suitability of the polymer batch.",
    icon: "🔥",
  },
  {
    id: "density",
    label: "Material Density",
    title: "Density Test",
    desc: "Verifies the material density classification of HDPE granules to confirm compliance with PE-80 or PE-100 compounding specifications.",
    icon: "⚖️",
  },
  {
    id: "reversion",
    label: "Stress Assessment",
    title: "Reversion Test",
    desc: "Measures longitudinal shrinkage after exposure to hot air, assessing the level of internal residual stress induced during the manufacturing process.",
    icon: "🌡️",
  },
  {
    id: "pressure",
    label: "Pressure Hold",
    title: "Hydraulic Pressure Test",
    desc: "Subjects the pipe sample to continuous internal hydrostatic pressure under regulated temperatures, certifying long-term pressure hold capacity without leakage.",
    icon: "💧",
  },
  {
    id: "cbc",
    label: "UV Protection",
    title: "(CBC) Carbon Black Content",
    desc: "Determines the precise percentage of carbon black compound added (typically 2-3%), which acts as a primary shield against solar ultraviolet degradation.",
    icon: "☀️",
  },
  {
    id: "cbd",
    label: "Compound Uniformity",
    title: "(CBD) Carbon Black Dispersion",
    desc: "Evaluates the dispersion uniformity of the carbon black under a microscope, ensuring there are no pigment aggregates that could form stress cracks.",
    icon: "🔬",
  },
];

export default function QualityTestDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [animStep, setAnimStep] = useState(0);

  const activeTest = TESTS[activeTab];

  const handleTabChange = (index) => {
    setActiveTab(index);
    setAnimStep(0);
  };

  // Trigger animation loop for active tab
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep((step) => (step + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [activeTab]);

  const renderVisualizer = () => {
    const progress = animStep / 100;
    
    switch (activeTest.id) {
      case "dimension":
        // Calliper measuring pipe diameter
        const caliperOffset = 30 + Math.sin(progress * Math.PI * 2) * 12;
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Pipe Cross Section */}
              <circle cx="150" cy="100" r="50" fill="none" stroke="var(--ink-black)" strokeWidth="15" />
              <circle cx="150" cy="100" r="42.5" fill="none" stroke="var(--dust-taupe)" strokeWidth="1" strokeDasharray="2 2" />
              {/* Caliper arms */}
              <g transform={`translate(${caliperOffset}, 0)`}>
                <path d="M 60 40 L 60 160 L 70 160 L 70 50 L 130 50 L 130 40 Z" fill="var(--charcoal)" opacity="0.8" />
                <path d="M 60 100 L 95 100" stroke="var(--light-signal-orange)" strokeWidth="1.5" />
              </g>
              <g transform={`translate(${-caliperOffset}, 0)`}>
                <path d="M 240 40 L 240 160 L 230 160 L 230 50 L 170 50 L 170 40 Z" fill="var(--charcoal)" opacity="0.8" />
                <path d="M 240 100 L 205 100" stroke="var(--light-signal-orange)" strokeWidth="1.5" />
              </g>
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Wall Thickness Target</span>
              <span className="readout-value">{(12.4 + Math.sin(progress * Math.PI * 2) * 0.1).toFixed(2)} mm</span>
              <span className="readout-status pass">✓ Within IS 4984 Limits</span>
            </div>
          </div>
        );

      case "tensile":
        // Pipe stretching under clamps
        const stretchAmount = Math.sin(progress * Math.PI) * 15;
        const widthModifier = 30 - stretchAmount * 0.4;
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Left Clamp */}
              <rect x="20" y="70" width="30" height="60" rx="4" fill="var(--ink-black)" />
              {/* Right Clamp */}
              <rect x={250 + stretchAmount} y="70" width="30" height="60" rx="4" fill="var(--ink-black)" />
              {/* Pipe segment being stretched */}
              <path
                d={`M 50 85 L 120 85 Q 150 ${100 - widthModifier / 2} 180 85 L ${250 + stretchAmount} 85 L ${250 + stretchAmount} 115 L 180 115 Q 150 ${100 + widthModifier / 2} 120 115 L 50 115 Z`}
                fill="var(--charcoal)"
              />
              {/* Pulling Force arrows */}
              <path d="M 12 L 100 L 18 L 95 M 12 100 L 18 105" stroke="var(--light-signal-orange)" strokeWidth="2" fill="none" />
              <path d={`M ${288 + stretchAmount} 100 L ${270 + stretchAmount} 100 M ${288 + stretchAmount} 100 L ${282 + stretchAmount} 95 M ${288 + stretchAmount} 100 L ${282 + stretchAmount} 105`} stroke="var(--light-signal-orange)" strokeWidth="2" fill="none" />
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Tensile Stress Load</span>
              <span className="readout-value">{(15.2 + progress * 9.8).toFixed(1)} MPa</span>
              <span className="readout-status">Elongation: {Math.round(progress * 420)}%</span>
            </div>
          </div>
        );

      case "mfi":
        // Polymer extrusion piston moving
        const pistonY = 40 + progress * 60;
        const dropOpacity = progress > 0.6 ? 1 : 0;
        const dropY = 120 + ((progress * 3) % 1) * 50;
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Cylinder wall */}
              <path d="M 130 30 L 130 130 L 145 130 L 145 150 L 155 150 L 155 130 L 170 130 L 170 30" fill="none" stroke="var(--ink-black)" strokeWidth="2" />
              {/* Melted polymer inside */}
              <rect x="132" y="70" width="36" height="60" fill="rgba(243, 115, 56, 0.3)" />
              {/* Piston shaft */}
              <rect x="144" y={pistonY - 30} width="12" height="40" fill="var(--charcoal)" />
              <rect x="132" y={pistonY + 10} width="36" height="10" fill="var(--charcoal)" />
              {/* Molten drop extruding */}
              <circle cx="150" cy={dropY} r="3" fill="var(--light-signal-orange)" opacity={dropOpacity} />
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Melt Flow Rate (190°C / 5.0kg)</span>
              <span className="readout-value">0.42 g / 10 min</span>
              <span className="readout-status pass">✓ Grade PE-100 Compliant</span>
            </div>
          </div>
        );

      case "density":
        // Grams density scale fluid immersion
        const sampleY = 50 + Math.min(progress * 1.5, 1) * 70;
        const beakerWater = sampleY > 100 ? "M 100 100 Q 150 98 200 100 L 200 170 H 100 Z" : "M 100 105 Q 150 103 200 105 L 200 170 H 100 Z";
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Water container */}
              <rect x="98" y="80" width="104" height="92" rx="2" fill="none" stroke="var(--ink-black)" strokeWidth="2" />
              <path d={beakerWater} fill="rgba(56, 96, 190, 0.15)" />
              {/* Drop sample */}
              <rect x="140" y={sampleY} width="20" height="20" rx="3" fill="var(--light-signal-orange)" />
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Displacement Density</span>
              <span className="readout-value">0.958 g/cm³</span>
              <span className="readout-status pass">✓ Material Grade: High Density</span>
            </div>
          </div>
        );

      case "reversion":
        // Heat waves in oven chamber
        const waveOffset = progress * 40;
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Oven Outline */}
              <rect x="50" y="30" width="200" height="140" rx="8" fill="none" stroke="var(--ink-black)" strokeWidth="2" />
              <line x1="50" y1="130" x2="250" y2="130" stroke="var(--ink-black)" strokeWidth="1" />
              {/* Pipe segment on racks */}
              <rect x="90" y="100" width="120" height="20" rx="2" fill="var(--charcoal)" />
              {/* Heat waves */}
              <path d={`M 100 80 Q 110 70 120 80 T 140 80`} fill="none" stroke="var(--light-signal-orange)" strokeWidth="1.5" transform={`translate(0, ${-waveOffset % 30})`} opacity={(30 - (waveOffset % 30)) / 30} />
              <path d={`M 160 80 Q 170 70 180 80 T 200 80`} fill="none" stroke="var(--light-signal-orange)" strokeWidth="1.5" transform={`translate(0, ${-(waveOffset + 10) % 30})`} opacity={(30 - ((waveOffset + 10) % 30)) / 30} />
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Longitudinal Reversion (110°C)</span>
              <span className="readout-value">1.18 % Shrinkage</span>
              <span className="readout-status pass">✓ Pass Limit (&lt; 3.0%)</span>
            </div>
          </div>
        );

      case "pressure":
        // Hydrostatic hold dial gauge
        const needleAngle = -120 + Math.min(progress * 1.5, 1) * 220;
        const pressureRead = Math.min(progress * 1.5, 1) * 10.0;
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Gauge face */}
              <circle cx="150" cy="90" r="55" fill="var(--white)" stroke="var(--ink-black)" strokeWidth="2" />
              {/* Sub-divisions */}
              <path d="M 111 129 A 55 55 0 1 1 189 129" fill="none" stroke="var(--charcoal)" strokeWidth="3" strokeDasharray="3 6" />
              {/* Gauge needle */}
              <g transform={`translate(150, 90) rotate(${needleAngle})`}>
                <line x1="0" y1="0" x2="0" y2="-45" stroke="var(--light-signal-orange)" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="5" fill="var(--ink-black)" />
              </g>
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Internal Water Pressure</span>
              <span className="readout-value">{pressureRead.toFixed(1)} Bar</span>
              <span className="readout-status pass">Hold Status: STABLE · NO LEAKAGE</span>
            </div>
          </div>
        );

      case "cbc":
        // Solar rays hitting tube
        const ashColor = `rgb(${80 + progress * 100}, ${80 + progress * 100}, ${80 + progress * 100})`;
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Solar Sun */}
              <circle cx="240" cy="50" r="16" fill="var(--light-signal-orange)" opacity="0.8" />
              <line x1="240" y1="25" x2="240" y2="15" stroke="var(--light-signal-orange)" strokeWidth="1.5" />
              <line x1="240" y1="75" x2="240" y2="85" stroke="var(--light-signal-orange)" strokeWidth="1.5" />
              <line x1="215" y1="50" x2="205" y2="50" stroke="var(--light-signal-orange)" strokeWidth="1.5" />
              {/* Combustion crucible boat */}
              <rect x="70" y="110" width="130" height="24" rx="2" fill="none" stroke="var(--ink-black)" strokeWidth="2" />
              <rect x="75" y="115" width="120" height="14" rx="1" fill={ashColor} />
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Carbon Black Content</span>
              <span className="readout-value">2.42 %</span>
              <span className="readout-status pass">✓ Within UV Protection Specs (2.0% - 3.0%)</span>
            </div>
          </div>
        );

      case "cbd":
        // Microscope scanning dots dispersion
        const scannerY = 30 + progress * 130;
        return (
          <div className="lab-visualizer-box">
            <svg viewBox="0 0 300 200" className="lab-svg">
              {/* Circular viewport */}
              <circle cx="150" cy="100" r="65" fill="none" stroke="var(--ink-black)" strokeWidth="2" />
              <clipPath id="microscope-clip">
                <circle cx="150" cy="100" r="64" />
              </clipPath>
              {/* Scattered carbon particles */}
              <g clipPath="url(#microscope-clip)">
                <circle cx="110" cy="70" r="3.5" fill="var(--ink-black)" />
                <circle cx="170" cy="80" r="4.2" fill="var(--ink-black)" />
                <circle cx="140" cy="120" r="3.8" fill="var(--ink-black)" />
                <circle cx="125" cy="140" r="3.1" fill="var(--ink-black)" />
                <circle cx="185" cy="115" r="4.0" fill="var(--ink-black)" />
                <circle cx="155" cy="62" r="3.6" fill="var(--ink-black)" />
                <circle cx="95" cy="110" r="4.5" fill="var(--ink-black)" />
                <circle cx="200" cy="85" r="3.9" fill="var(--ink-black)" />
                {/* Scanner bar */}
                <line x1="80" y1={scannerY} x2="220" y2={scannerY} stroke="var(--light-signal-orange)" strokeWidth="1.5" opacity="0.6" />
              </g>
            </svg>
            <div className="lab-readout">
              <span className="readout-label">Dispersion Uniformity</span>
              <span className="readout-value">Grade A dispersion</span>
              <span className="readout-status pass">✓ Zero agglomerates &gt; 50 microns</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="lab-dashboard bg-raised">
      <div className="dashboard-grid">
        {/* Left Side Navigation Menu */}
        <div className="dashboard-menu">
          {TESTS.map((test, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={test.id}
                onClick={() => handleTabChange(index)}
                className={`dashboard-menu-item ${isActive ? "active" : ""}`}
              >
                <span className="item-icon">{test.icon}</span>
                <div className="item-text-group">
                  <span className="item-label">{test.label}</span>
                  <h4 className="item-title">{test.title}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side Visualizer & Detail Screen */}
        <div className="dashboard-display">
          <div className="display-header">
            <h3>{activeTest.title}</h3>
            <p>{activeTest.desc}</p>
          </div>
          {renderVisualizer()}
        </div>
      </div>
    </div>
  );
}
