"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Quality() {
  const [activeTest, setActiveTest] = useState(0);

  const tests = [
    {
      label: "Mechanical Verify",
      title: "Visual & Dimension Test",
      desc: "Every batch of pipes is examined for wall thickness, outer diameter tolerances, and surface finish consistency to ensure strict dimensional alignment.",
    },
    {
      label: "Strength Verify",
      title: "Tensile Strength Test",
      desc: "Measures the maximum mechanical load and elongation the pipe can withstand, verifying its structural capacity in high-stress, loaded underground installations.",
    },
    {
      label: "Polymer Flow",
      title: "Melt Flow Index (MFI)",
      desc: "Measures the flow rate of melted raw materials, validating the molecular structure consistency and extrusion suitability of the polymer batch.",
    },
    {
      label: "Material Density",
      title: "Density Test",
      desc: "Verifies the material density classification of HDPE granules to confirm compliance with PE-80 or PE-100 compounding specifications.",
    },
    {
      label: "Stress Assessment",
      title: "Reversion Test",
      desc: "Measures longitudinal shrinkage after exposure to hot air, assessing the level of internal residual stress induced during the manufacturing process.",
    },
    {
      label: "Pressure Hold",
      title: "Hydraulic Pressure Test",
      desc: "Subjects the pipe sample to continuous internal hydrostatic pressure under regulated temperatures, certifying long-term pressure hold capacity without leakage.",
    },
    {
      label: "UV Protection",
      title: "(CBC) Carbon Black Content",
      desc: "Determines the precise percentage of carbon black compound added (typically 2-3%), which acts as a primary shield against solar ultraviolet degradation.",
    },
    {
      label: "Compound Uniformity",
      title: "(CBD) Carbon Black Dispersion",
      desc: "Evaluates the dispersion uniformity of the carbon black under a microscope, ensuring there are no pigment aggregates that could form stress cracks.",
    },
  ];

  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Quality Intro Section — Stadium Hero */}
      <section style={{ padding: "0 0 var(--space-12)" }}>
        {/* Stadium hero image frame */}
        <div className="hero-stadium-frame" style={{ height: "clamp(280px, 45vh, 480px)", marginBottom: "var(--space-8)" }}>
          <img src="/assets/quality_lab.png" alt="LGI Quality Testing Laboratory" className="hero-stadium-img" style={{ opacity: 0.7 }} />
          <div className="hero-stadium-overlay" />
          <div className="hero-content-overlay" style={{ justifyContent: "flex-end" }}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Quality Assurance &nbsp;·&nbsp; Jaipur SEZ
            </div>
            <h1 className="hero-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Stringent quality.<br /><span className="hero-headline-outline">At every diameter.</span>
            </h1>
          </div>
        </div>

        <div className="container">
          <AnimateOnScroll className="reveal" style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p className="lead">L G Irrigation is equipped with an ultra-modern, in-house testing facility. We enforce rigorous quality control at all levels — from raw material inspection to final product verification.</p>
            <p>Our approach ensures that every pipe leaving our Jaipur SEZ plant matches or exceeds required chemical, mechanical, and pressure tolerance profiles, protecting India's precious water resources.</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Licenses & Standards Section */}
      <section id="certifications" className="bg-raised">
        <div className="ghost-watermark watermark-left" style={{ top: "25%" }}>BIS CERTIFIED</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-6)" }}>
            <span className="eyebrow">STANDARDS & LICENSES</span>
            <h2>Bureau of Indian Standards Approval</h2>
            <p>We hold multiple licenses from the Bureau of Indian Standards (BIS) and certifications for infrastructure implementation.</p>
          </div>

          <div className="grid-4" style={{ marginTop: "var(--space-6)" }}>
            <div className="value-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 14151 (Part 1)</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>Sprinkler Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Part 1 (Conduits)</span>
            </div>

            <div className="value-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 14151 (Part 2)</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>Sprinkler Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Part 2 (Quick-Coupled)</span>
            </div>

            <div className="value-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 4984 : 1995</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>HDPE Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Potable Water Lines</span>
            </div>

            <div className="value-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 14333 : 1996</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>Sewerage Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Wastewater Lines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Testing Procedures Section (Interactive) */}
      <section id="tests">
        <div className="container">
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-6)", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow">LABORATORY PROCEDURES</span>
            <h2>Major Tests Performed</h2>
            <p>We execute 8 primary tests inside our Quality Assurance Laboratory to certify that our pipe batches meet zero-defect conditions. <em>Click a card to highlight the test details.</em></p>
          </div>

          <div className="tests-grid">
            {tests.map((test, index) => {
              const isActive = activeTest === index;
              return (
                <div 
                  key={index} 
                  className={`test-card ${isActive ? "active" : ""}`}
                  onClick={() => setActiveTest(index)}
                >
                  <span className="test-label">{test.label}</span>
                  <h3>{test.title}</h3>
                  <p>{test.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Quality Philosophy Section */}
      <section className="bg-soft" id="lab">
        <div className="container">
          <div className="grid-2">
            <div>
              <span className="eyebrow">QUALITY PRINCIPLE</span>
              <h2>Our Uncompromising Quality Philosophy</h2>
              <p>In LGI, we put our sincere and consistent efforts into offering the best solutions. Our approach to quality is aimed at:</p>
              <ul style={{ listStyle: "none", marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Improving quality of service to customers.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Increasing customer satisfaction ratings.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Improving manufacturing process precision.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Increasing employee satisfaction and technical safety.</li>
              </ul>
              <p>Backed by a skilled team of quality controllers, engineers, and plant managers, we deliver outstanding water piping solutions across India.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderLeft: "1px solid var(--dust-taupe)", paddingLeft: "var(--space-6)" }}>
              <div style={{ fontSize: "4rem", fontWeight: 700, color: "var(--light-signal-orange)", lineHeight: 1, marginBottom: "var(--space-2)" }}>Zero</div>
              <h3 style={{ textTransform: "uppercase", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--slate-gray)" }}>Defect Quality Goal</h3>
              <p style={{ textAlign: "center", maxWidth: "300px", fontSize: "0.875rem", marginTop: "var(--space-2)" }}>Every batch is checked and certified in our labs before delivery clearance is authorized.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
