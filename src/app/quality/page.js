"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";
import TiltWrapper from "@/components/TiltWrapper";


const TESTS = [
  {
    id: "visual_appearance",
    title: "Visual & Squareness",
    desc: "Verifies surface finish, lack of defects, and out of squareness alignment at pipe ends (Clause 7.1).",
    icon: "👁️",
  },
  {
    id: "color_stripes",
    title: "Color & Stripe Dimensions",
    desc: "Verifies correct pipe color, presence of co-extruded strips, stripe depth (≥0.20 mm), and stripe width (≥3.00 mm) (Clause 6.2 / 6.2.1).",
    icon: "🎨",
  },
  {
    id: "dimensions",
    title: "Dimension of Pipes",
    desc: "Measures outside diameter, ovality tolerance (≤2.2mm), and wall thickness (4.30 - 4.90 mm) (Clause 7.4).",
    icon: "📐",
  },
  {
    id: "hydraulic",
    title: "Hydraulic Characteristics",
    desc: "Acceptance pressure test conducted at 5.7 MPa induced stress for 48 hours at 80°C without failure (Clause 8.1).",
    icon: "🚰",
  },
  {
    id: "reversion",
    title: "Reversion Test",
    desc: "Heats sample segments in a hot air oven at 110°C to verify longitudinal heat reversion and thermal stability (Clause 8.2).",
    icon: "🔥",
  },
  {
    id: "tensile",
    title: "Elongation & Yield Strength",
    desc: "Measures percentage elongation at break (≥350%) and tensile strength at yield (≥15 MPa) (Clause 8.9).",
    icon: "💪",
  },
  {
    id: "density",
    title: "Density at 27°C",
    desc: "Verifies base polymer and compound density (940 - 960 kg/m³) to ensure structural uniformity (Clause 8.7).",
    icon: "⚖️",
  },
  {
    id: "oit",
    title: "Oxidation Induction Time",
    desc: "Assesses thermal stability and antioxidant levels to guarantee longevity under oxygen flow (Clause 8.5).",
    icon: "⏱️",
  },
  {
    id: "mfi",
    title: "Melt Flow Rate",
    desc: "Measures Melt Flow Index (MFR) in g/10 min to verify processing stability and consistency (Clause 8.4).",
    icon: "🌡️",
  },
  {
    id: "carbon_black",
    title: "Carbon Black Content & Dispersion",
    desc: "Determines carbon black content percentage (2.5±0.5%) and uniformity of dispersion under magnification (Clause 8.3).",
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
                  <img src="/assets/quality_lab.jpg" alt="LGI Quality Testing Laboratory" style={{ filter: "brightness(0.95)" }} />
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

      {/* Lab Testing Procedures — Bento Grid */}
      <section id="tests" style={{ background: "var(--ink-black)", padding: "var(--space-12) 0" }}>
        <div className="container">

          {/* Section header */}
          <div className="lab-bento-header">
            <div>
              <span className="eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>LABORATORY PROCEDURES</span>
              <h2 style={{ color: "var(--white)", marginBottom: 0 }}>Major Tests Performed</h2>
            </div>
            <div className="lab-bento-count">
              <span className="lab-bento-count-num">{String(TESTS.length).padStart(2, "0")}</span>
              <span className="lab-bento-count-label">Quality<br/>Checks</span>
            </div>
          </div>

          {/* Bento grid */}
          <div className="lab-bento-grid">
            {TESTS.map((test, i) => (
              <div
                key={test.id}
                className={`lab-bento-card ${
                  i === 0 ? "lab-bento-card--featured" : i >= 8 ? "lab-bento-card--wide" : ""
                } ${i % 3 === 1 ? "lab-bento-card--dark" : ""}`}
              >
                <span className="lab-bento-ghost">{String(i + 1).padStart(2, "0")}</span>
                <div className="lab-bento-inner">
                  <span className="lab-bento-icon">{test.icon}</span>
                  <h3 className="lab-bento-title">{test.title}</h3>
                  <p className="lab-bento-desc">{test.desc}</p>
                </div>
              </div>
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
