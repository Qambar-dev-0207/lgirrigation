"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";
import TiltWrapper from "@/components/TiltWrapper";

const TESTS = [
  {
    id: "dimensions",
    title: "Dimensions & Visual",
    desc: "Checks wall thickness, outer diameter, ovality, and surface finish against precise IS tolerances.",
    icon: "📐",
  },
  {
    id: "tensile",
    title: "Tensile Strength Test",
    desc: "Pulls pipe sections under extreme force to measure yield stress and ultimate elongation percentage.",
    icon: "💪",
  },
  {
    id: "mfi",
    title: "Melt Flow Index (MFI)",
    desc: "Measures polymer flow rate to certify high molecular weight raw material stability.",
    icon: "🌡️",
  },
  {
    id: "density",
    title: "Specific Gravity & Density",
    desc: "Uses fluid buoyancy displacement to verify material density standards are met.",
    icon: "⚖️",
  },
  {
    id: "pressure",
    title: "Hydrostatic Pressure Test",
    desc: "Subjects pipe samples to prolonged high internal pressures (up to 100 hours) at elevated temperatures.",
    icon: "🚰",
  },
  {
    id: "reversion",
    title: "Reversion Testing",
    desc: "Heats samples in a hot air oven (110°C) to measure thermal shrinkage and material orientation stability.",
    icon: "🔥",
  },
  {
    id: "cbc",
    title: "Carbon Black Content (CBC)",
    desc: "Verifies carbon black concentration (typically 2-3%) for solar UV protection.",
    icon: "☀️",
  },
  {
    id: "cbd",
    title: "Carbon Black Dispersion (CBD)",
    desc: "Scans compound uniformity under microscope magnification to check for stress-crack prevention.",
    icon: "🔬",
  },
];

export default function Quality() {
  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Quality Intro Section — 2 Column Clean Redesign */}
      <section style={{ padding: "var(--space-8) 0 var(--space-12)" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <AnimateOnScroll className="reveal reveal-left">
              <div className="hero-eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                <span className="hero-eyebrow-dot" />
                Quality Assurance &nbsp;·&nbsp; Jaipur SEZ
              </div>
              <h1 className="hero-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "var(--space-4)" }}>
                Stringent quality.<br /><span className="hero-headline-outline">At every diameter.</span>
              </h1>
              <p className="lead" style={{ marginBottom: "var(--space-3)" }}>
                L G Irrigation is equipped with an ultra-modern, in-house testing facility. We enforce rigorous quality control at all levels — from raw material inspection to final product verification.
              </p>
              <p style={{ color: "var(--charcoal)" }}>
                Our approach ensures that every pipe leaving our Jaipur SEZ plant matches or exceeds required chemical, mechanical, and pressure tolerance profiles, protecting India&apos;s precious water resources.
              </p>
            </AnimateOnScroll>
            
            <AnimateOnScroll className="reveal reveal-right" style={{ display: "flex", justifyContent: "center" }}>
              <TiltWrapper className="portrait-circle-wrapper" style={{ width: "320px", height: "320px", marginBottom: 0 }}>
                <div className="portrait-circle">
                  <img src="/assets/quality_lab.png" alt="LGI Quality Testing Laboratory" style={{ filter: "brightness(0.95)" }} />
                </div>
              </TiltWrapper>
            </AnimateOnScroll>
          </div>
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
            <div className="value-card" style={{ textAlign: "center", border: "1.5px solid var(--ink-black)", boxShadow: "3px 3px 0px var(--ink-black)" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 14151 (Part 1)</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>Sprinkler Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Part 1 (Conduits)</span>
            </div>

            <div className="value-card" style={{ textAlign: "center", border: "1.5px solid var(--ink-black)", boxShadow: "3px 3px 0px var(--ink-black)" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 14151 (Part 2)</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>Sprinkler Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Part 2 (Quick-Coupled)</span>
            </div>

            <div className="value-card" style={{ textAlign: "center", border: "1.5px solid var(--ink-black)", boxShadow: "3px 3px 0px var(--ink-black)" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 4984 : 1995</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>HDPE Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Potable Water Lines</span>
            </div>

            <div className="value-card" style={{ textAlign: "center", border: "1.5px solid var(--ink-black)", boxShadow: "3px 3px 0px var(--ink-black)" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--light-signal-orange)", marginBottom: "8px" }}>IS 14333 : 1996</div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "4px" }}>Sewerage Pipes</h3>
              <span style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", fontWeight: "700", textTransform: "uppercase" }}>Wastewater Lines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Testing Procedures Section (Editorial Cards Grid) */}
      <section id="tests">
        <div className="container">
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-6)", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow">LABORATORY PROCEDURES</span>
            <h2>Major Tests Performed</h2>
            <p>We execute 8 primary tests inside our Quality Assurance Laboratory to certify that our pipe batches meet zero-defect conditions.</p>
          </div>

          <div className="grid-3" style={{ gap: "var(--space-4)" }}>
            {TESTS.map((test) => (
              <TiltWrapper key={test.id} className="value-card" style={{ border: "1.5px solid var(--ink-black)", boxShadow: "4px 4px 0px var(--ink-black)", display: "flex", flexDirection: "column", gap: "12px", background: "var(--white)" }}>
                <div style={{ fontSize: "2rem", lineHeight: 1 }}>{test.icon}</div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0 }}>{test.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.4 }}>{test.desc}</p>
              </TiltWrapper>
            ))}
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
              <p>At LGI, we put our sincere and consistent efforts into offering the best solutions. Our approach to quality is aimed at:</p>
              <ul style={{ listStyle: "none", marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Improving quality of service to customers.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Increasing customer satisfaction ratings.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Improving manufacturing process precision.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: "500" }}><span style={{ color: "var(--light-signal-orange)" }}>•</span> Increasing employee satisfaction and technical safety.</li>
              </ul>
              <p>Backed by a skilled team of quality controllers, engineers, and plant managers, we deliver outstanding water piping solutions across India.</p>
            </div>
            <div className="quality-highlight-panel">
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
