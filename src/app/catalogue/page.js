import Link from "next/link";

export const metadata = {
  title: "Official Product Catalogue & Technical Guide | L G Irrigation",
  description: "Download or view the official 13-page L G Irrigation technical catalogue. Sizing specifications, IS 4984 HDPE pipes, IS 14333 sewerage pipes, IS 14151 sprinkler systems, fusion jointing, and quality testing.",
};

const SECTIONS = [
  {
    num: "01",
    title: "Company Profile & Mission",
    desc: "Established in 2011 with ISO 9001:2015 certified quality management. Supplying BIS-compliant piping solutions across India.",
    tags: ["ISO 9001:2015", "Since 2011", "BIS Certified"],
  },
  {
    num: "02",
    title: "Manufacturing Infrastructure",
    desc: "State-of-the-art facility located at Mahindra World City (SEZ), Jaipur. Modern extrusion lines manufacturing sizes 63 mm to 1000 mm.",
    tags: ["MWC Jaipur SEZ", "63–1000 mm", "Auto Extrusion"],
  },
  {
    num: "03",
    title: "Features of HDPE Pipes",
    desc: "Ten engineering advantages: 50+ year service life, flexible terrain absorption, leak-proof fusion welds, rodent and abrasion resistance.",
    tags: ["50+ Years Life", "Corrosion Resistant", "Leak-Proof"],
  },
  {
    num: "04",
    title: "Application Spectrum",
    desc: "Versatile deployments across drinking water schemes, lift irrigation, sewerage, industrial chemicals, cable ducting, and mining duty.",
    tags: ["Drinking Water", "Irrigation", "Sewerage", "Industrial"],
  },
  {
    num: "05",
    title: "HDPE vs PVC Comparison",
    desc: "Technical head-to-head on service life, weathering, temperature tolerances, joint integrity, and lifecycle economy.",
    tags: ["50+ Yrs vs 10 Yrs", "Fused vs Solvent", "Zero Leaks"],
  },
  {
    num: "06",
    title: "HDPE Pipes (IS 4984 : 2016)",
    desc: "Detailed pressure ratings PN 2 to PN 20, polymer grades PE-63, PE-80, PE-100, and mirror-smooth bore roughness coefficient (0.007).",
    tags: ["IS 4984 : 2016", "PN 2 – PN 20", "PE-63/80/100"],
  },
  {
    num: "07",
    title: "3-Stage Quality Control",
    desc: "Strict protocol: 01 Raw material verification & MFI → 02 Online extrusion parameter tracking → 03 Final hydraulic & tensile tests.",
    tags: ["100% In-House QA", "Zero Defect", "Batch Traceable"],
  },
  {
    num: "08",
    title: "Sprinkler Systems (IS 14151)",
    desc: "Complete agricultural systems from 63 mm to 110 mm, PN 2.5 & PN 3.2 classes, quick couplings, end caps, and impact nozzles.",
    tags: ["IS 14151 Pt-2", "63–110 mm", "Impact Nozzles"],
  },
  {
    num: "09",
    title: "Jointing & Fast Fusion",
    desc: "Step-by-step procedures for butt-fusion and electro-fusion jointing. Monolithic pipeline strength with advanced cooling technology.",
    tags: ["Butt Fusion", "Electro-Fusion", "Fast Cooling"],
  },
  {
    num: "10",
    title: "In-House NABL Test Facilities",
    desc: "Fully equipped on-site test laboratory: hydrostatic pressure baths (80 °C / 165 hr), tensile & elongation, crush deflection, and burst tests.",
    tags: ["NABL Support", "Hydrostatic 165 hr", "Tensile UTM"],
  },
  {
    num: "11",
    title: "Government & Contractor Approvals",
    desc: "Approved vendor for MJP Maharashtra, JJM Rajasthan, UPJN, Delhi Jal Board, PHED, L&T Construction, and regional power discoms.",
    tags: ["MJP", "JJM", "UPJN", "DJB", "PHED", "L&T"],
  },
  {
    num: "12",
    title: "Corporate Contact & Works",
    desc: "Factory address at Paldi Parsa, Mahindra World City (SEZ), Jaipur, Rajasthan. Direct technical contacts and WhatsApp support.",
    tags: ["Jaipur, Rajasthan", "+91 98281 67722", "Direct Dispatch"],
  },
];

export default function CataloguePage() {
  return (
    <main style={{ marginTop: "110px", paddingBottom: "var(--space-12)" }}>
      {/* Hero Header */}
      <section style={{ paddingBottom: "var(--space-6)" }}>
        <div className="container">
          <div style={{ maxWidth: "850px" }}>
            <span className="eyebrow">OFFICIAL TECHNICAL DOCUMENTATION</span>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "var(--space-3)" }}>
              L G Irrigation Product Catalogue &amp; Technical Guide
            </h1>
            <p className="lead" style={{ fontSize: "1.125rem", color: "var(--granite)" }}>
              Explore our complete 13-page technical publication. Includes product specifications, dimension tables, BIS compliance standards, butt-fusion welding guidelines, and quality testing protocols for high-density polyethylene piping systems.
            </p>

            {/* Metadata Pills */}
            <div className="catalogue-badge-strip">
              <span className="catalogue-chip">📄 13 Pages Full Edition</span>
              <span className="catalogue-chip">💾 2.2 MB PDF Format</span>
              <span className="catalogue-chip">🏅 IS 4984 / IS 14333 / IS 14151</span>
              <span className="catalogue-chip">🏭 63 mm to 1000 mm Sizes</span>
              <span className="catalogue-chip">✅ ISO 9001:2015 Certified</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "var(--space-4)" }}>
              <a
                href="/LG_Irrigation_Catalogue.pdf"
                download="LG_Irrigation_Catalogue.pdf"
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 28px" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF Catalogue (2.2 MB)
              </a>

              <a
                href="/LG_Irrigation_Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open in Fullscreen Tab
              </a>

              <Link
                href="/contact"
                className="btn btn-orange"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px" }}
              >
                Request a Bulk Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive PDF Reader */}
      <section style={{ padding: "var(--space-4) 0" }}>
        <div className="container">
          <div className="catalogue-embed-container">
            <div className="catalogue-embed-header">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--light-signal-orange)" }} />
                <span style={{ fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "0.02em" }}>
                  Interactive Catalogue Reader — 13 Pages
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href="/LG_Irrigation_Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: "6px 14px", fontSize: "0.8125rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  Full Screen ↗
                </a>
                <a
                  href="/LG_Irrigation_Catalogue.pdf"
                  download="LG_Irrigation_Catalogue.pdf"
                  className="btn btn-primary"
                  style={{ padding: "6px 14px", fontSize: "0.8125rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  Save PDF ↓
                </a>
              </div>
            </div>

            <iframe
              src="/LG_Irrigation_Catalogue.pdf#toolbar=1&navpanes=1"
              className="catalogue-iframe"
              title="L G Irrigation Catalogue Viewer"
            />

            <div style={{ padding: "12px 20px", background: "var(--soft-bone)", borderTop: "1px solid rgba(20,20,19,0.08)", fontSize: "0.8125rem", color: "var(--slate-gray)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <span>Viewing: LG_Irrigation_Catalogue.pdf (2.2 MB, 13 Pages)</span>
              <span>Can&apos;t view the embedded document? <a href="/LG_Irrigation_Catalogue.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "var(--signal-orange)", textDecoration: "underline", fontWeight: 600 }}>Click here to open directly</a>.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Contents Index */}
      <section style={{ padding: "var(--space-8) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "700px", marginBottom: "var(--space-4)" }}>
            <span className="eyebrow">DOCUMENT INDEX</span>
            <h2>What&apos;s Inside the Technical Catalogue</h2>
            <p>A quick breakdown of the 13 chapters and technical sections contained in the official L G Irrigation catalogue.</p>
          </div>

          <div className="catalogue-index-grid">
            {SECTIONS.map((sec) => (
              <div key={sec.num} className="catalogue-index-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--signal-orange)" }}>
                    {sec.num}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {sec.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} style={{ fontSize: "0.6875rem", background: "var(--soft-bone)", padding: "2px 6px", borderRadius: "4px", color: "var(--charcoal)", fontWeight: 500 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "6px" }}>{sec.title}</h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", lineHeight: 1.5, marginBottom: 0 }}>
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ padding: "var(--space-6) 0" }}>
        <div className="container">
          <div className="catalogue-banner-card" style={{ background: "var(--ink-black)", color: "var(--white)", borderColor: "var(--ink-black)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
              <div style={{ maxWidth: "680px" }}>
                <span className="eyebrow" style={{ color: "var(--light-signal-orange)" }}>PROJECT TENDERS &amp; BULK INQUIRIES</span>
                <h3 style={{ color: "#FFF", fontSize: "1.75rem", marginBottom: "8px" }}>Need customized pipe dimensions or project dispatch?</h3>
                <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 0, fontSize: "0.9375rem" }}>
                  Our technical engineers and SEZ production managers assist contractors, Jal Nigam boards, and infrastructure planners with custom wall thicknesses, pressure sizing, and fast logistics.
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="/LG_Irrigation_Catalogue.pdf"
                  download="LG_Irrigation_Catalogue.pdf"
                  className="btn btn-orange"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                >
                  Download Catalogue (PDF)
                </a>
                <Link
                  href="/contact"
                  className="btn btn-secondary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#FFF", borderColor: "rgba(255,255,255,0.3)" }}
                >
                  Contact Our Engineers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
