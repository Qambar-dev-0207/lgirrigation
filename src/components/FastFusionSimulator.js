"use client";

import { useState, useEffect } from "react";

const DIAMETERS = [
  { val: 110, timeStd: 25, timeFF: 6, label: "110 mm (Medium)" },
  { val: 315, timeStd: 45, timeFF: 10, label: "315 mm (Large)" },
  { val: 630, timeStd: 90, timeFF: 20, label: "630 mm (Extra Large)" },
  { val: 1000, timeStd: 160, timeFF: 35, label: "1000 mm (Industrial Maximum)" },
];

export default function FastFusionSimulator() {
  const [diameter, setDiameter] = useState(315);
  const [lengthKm, setLengthKm] = useState(5);
  const [simulating, setSimulating] = useState(false);
  const [progressStd, setProgressStd] = useState(0);
  const [progressFF, setProgressFF] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const selectedDiaObj = DIAMETERS.find((d) => d.val === diameter) || DIAMETERS[1];

  // Calculations
  const jointsPerKm = 166; // 6-meter pipes
  const totalJoints = Math.round(jointsPerKm * lengthKm);
  
  // Welding times in minutes converted to total days (assuming 8-hour workday, multiple crews)
  const daysStd = Math.round((totalJoints * selectedDiaObj.timeStd) / 60 / 8);
  const daysFF = Math.round((totalJoints * selectedDiaObj.timeFF) / 60 / 8);
  const daysSaved = daysStd - daysFF;
  const costSavings = Math.round(daysSaved * 12500); // 12,500 INR saved per day in crew labor

  useEffect(() => {
    if (!simulating) return;

    // Animate Fast Fusion (faster)
    const durationFF = 1200; // 1.2s animation
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      
      // Fast Fusion progress
      const progressFFValue = Math.min(elapsed / durationFF, 1);
      setProgressFF(progressFFValue * 100);

      // Standard progress (slower, takes 3x longer)
      const progressStdValue = Math.min(elapsed / (durationFF * 3.5), 1);
      setProgressStd(progressStdValue * 100);

      if (progressFFValue < 1) {
        requestAnimationFrame(tick);
      } else {
        // Complete the slower one after a brief delay for visual impact
        setTimeout(() => {
          setProgressStd(100);
          setSimulating(false);
          setShowResults(true);
        }, 800);
      }
    };

    requestAnimationFrame(tick);
  }, [simulating]);

  const handleSimulate = () => {
    setProgressStd(0);
    setProgressFF(0);
    setShowResults(false);
    setSimulating(true);
  };

  return (
    <div className="simulator-card bg-raised">
      <div className="simulator-header">
        <span className="eyebrow">Interactive Simulator</span>
        <h2>Fast Fusion Efficiency Calculator</h2>
        <p>Input your project parameters below to see the impact of Fast Fusion thermal joint cooling compared to standard butt-welding methods.</p>
      </div>

      <div className="simulator-grid">
        {/* Left Inputs Panel */}
        <div className="simulator-inputs">
          <div className="input-group">
            <label className="input-label">Pipe Diameter</label>
            <select
              value={diameter}
              onChange={(e) => {
                setDiameter(Number(e.target.value));
                setShowResults(false);
              }}
              disabled={simulating}
              className="simulator-select"
            >
              {DIAMETERS.map((d) => (
                <option key={d.val} value={d.val}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Pipeline Length: <strong>{lengthKm} km</strong></label>
            <input
              type="range"
              min="1"
              max="50"
              value={lengthKm}
              onChange={(e) => {
                setLengthKm(Number(e.target.value));
                setShowResults(false);
              }}
              disabled={simulating}
              className="simulator-slider"
            />
            <div className="slider-labels">
              <span>1 km</span>
              <span>25 km</span>
              <span>50 km</span>
            </div>
          </div>

          <div className="project-stats-preview">
            <div className="stat-preview-item">
              <span className="stat-preview-val">{totalJoints.toLocaleString()}</span>
              <span className="stat-preview-label">Estimated Joints</span>
            </div>
            <div className="stat-preview-item">
              <span className="stat-preview-val">{selectedDiaObj.timeStd} mins</span>
              <span className="stat-preview-label">Traditional Weld Time</span>
            </div>
            <div className="stat-preview-item">
              <span className="stat-preview-val" style={{ color: "var(--light-signal-orange)" }}>
                {selectedDiaObj.timeFF} mins
              </span>
              <span className="stat-preview-label">Fast Fusion Time</span>
            </div>
          </div>

          <div style={{ marginTop: "var(--space-4)" }}>
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px 24px" }}
            >
              {simulating ? "Simulating Thermal Weld..." : "Calculate Savings"}
            </button>
          </div>
        </div>

        {/* Right Animation & Results Panel */}
        <div className="simulator-visuals">
          {/* Fusion Animation Area */}
          <div className="welding-animation-box">
            {/* Standard Pipe Joint (Slower progress) */}
            <div className="pipe-joint-lane">
              <div className="lane-header">
                <span>Traditional Butt-Welding</span>
                <span className="percentage-text">{Math.round(progressStd)}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill std" style={{ width: `${progressStd}%` }} />
              </div>
            </div>

            {/* Fast Fusion Joint (Faster progress) */}
            <div className="pipe-joint-lane">
              <div className="lane-header">
                <span style={{ fontWeight: 700 }}>LGI Fast Fusion</span>
                <span className="percentage-text" style={{ color: "var(--light-signal-orange)", fontWeight: 700 }}>
                  {Math.round(progressFF)}%
                </span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill ff" style={{ width: `${progressFF}%` }} />
              </div>
            </div>

            {/* Visual SVG Pipe Joint with Weld Sparks */}
            <div className="welding-svg-container">
              <svg viewBox="0 0 400 120" className="welding-svg">
                {/* Left Pipe Section */}
                <path d="M 20 20 L 192 20 L 192 100 L 20 100 Z" fill="var(--ink-black)" opacity="0.9" />
                <path d="M 20 20 C 10 20 10 100 20 100" fill="var(--charcoal)" opacity="0.3" />
                {/* Right Pipe Section */}
                <path d="M 208 20 L 380 20 L 380 100 L 208 100 Z" fill="var(--ink-black)" opacity="0.9" />
                
                {/* Center Fusion Zone */}
                <rect x="192" y="16" width="16" height="88" rx="4" fill="var(--soft-bone)" stroke="var(--ink-black)" strokeWidth="1" />
                
                {/* Weld Bead overlay while welding */}
                {simulating && (
                  <rect
                    x="195"
                    y="18"
                    width="10"
                    height="84"
                    rx="3"
                    fill="var(--light-signal-orange)"
                    className="spark-glow"
                  />
                )}

                {/* Simulated Sparks particles (SVG) */}
                {simulating && progressFF < 100 && (
                  <g className="spark-particles">
                    <circle cx="200" cy="30" r="1.5" fill="#FFA500" className="spark-particle s1" />
                    <circle cx="200" cy="50" r="1" fill="#FF4500" className="spark-particle s2" />
                    <circle cx="200" cy="70" r="2" fill="#FFA500" className="spark-particle s3" />
                    <circle cx="200" cy="90" r="1.2" fill="#FFFF00" className="spark-particle s4" />
                    <circle cx="200" cy="45" r="1.5" fill="#FFFFE0" className="spark-particle s5" />
                    <circle cx="200" cy="75" r="1.8" fill="#FF8C00" className="spark-particle s6" />
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Results Summary Overlay */}
          <div className={`simulator-results ${showResults ? "show" : ""}`}>
            <div className="results-grid">
              <div className="result-metric">
                <span className="result-value" style={{ color: "var(--light-signal-orange)" }}>{daysSaved} Days</span>
                <span className="result-label">Project Schedule Reduction</span>
              </div>
              <div className="result-metric">
                <span className="result-value">₹ {(costSavings).toLocaleString("en-IN")}</span>
                <span className="result-label">Labor Crew Cost Savings</span>
              </div>
              <div className="result-metric">
                <span className="result-value">99.8%</span>
                <span className="result-label">Double-Bead Joint Quality</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <a href="/contact#fast-fusion" className="btn btn-secondary" style={{ padding: "8px 24px" }}>
                Enquire About Fast Fusion For Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
