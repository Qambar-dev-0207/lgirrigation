"use client";

import { useState } from "react";

import FastFusionSimulator from "@/components/FastFusionSimulator";

const PRODUCTS_DATA = [
  {
    id: "sewerage",
    title: "Sewerage Pipes",
    standard: "IS 14333 : 1996",
    eyebrow: "SEWERAGE PROJECTS",
    shortDescription: "Designed specifically for municipal and industrial wastewater transportation, drainage, and slurry handling.",
    longDescription: "Designed specifically for municipal and industrial wastewater transportation, drainage, and slurry handling. Fused with leak-proof jointing mechanisms to protect water resources in arid regions.",
    image: "/assets/sewerage_pipes.png",
    rangeSummary: "63mm – 710mm",
    pressureSummary: "PN 2.5 – PN 10",
    tags: ["MUNICIPAL SEWER", "CORROSIVE RESISTANT", "BUTT-WELDED"],
    featuresTitle: "Applications & Features:",
    features: [
      "Suitable for municipal sewers, highway, bridge, and tunnel drainage.",
      "High resistance to corrosive chemicals, industrial effluents, and undulating terrains.",
      "Absolutely watertight joints completed via click-ring fittings or butt-welding."
    ],
    rangeDetails: "Available in diameters from 63mm to 710mm, under pressure classes PN 2.5 to PN 10. Standard supply length is 6 meters, with custom lengths for heavy industrial sewage projects.",
    specTable: {
      headers: ["Standard License", "Diameter Range", "Pressure Ratings (PN)", "Standard Length", "Jointing Method"],
      rows: [
        ["IS 14333 : 1996", "63 mm to 710 mm", "PN 2.5, PN 4.0, PN 6.0, PN 8.0, PN 10.0", "6 Meters (straight) or custom lengths", "Butt Welding / Click-ring Fittings"]
      ]
    }
  },
  {
    id: "hdpe",
    title: "HDPE Pipes & Coils",
    standard: "IS 4984 : 1995",
    eyebrow: "POTABLE WATER & INDUSTRIAL",
    shortDescription: "Premium high-density polyethylene pipelines for reliable, leak-free municipal water supply casing.",
    longDescription: "Our premium high-density polyethylene line provides highly reliable, leak-free performance for municipal water supply lines, submersibles in bore wells, and slurry transport systems.",
    image: "/assets/hdpe_pipes.png",
    rangeSummary: "32mm – 710mm",
    pressureSummary: "PN 2.5 – PN 10.0",
    tags: ["POTABLE WATER", "TRENCHLESS LAYING", "ACID RESISTANT"],
    featuresTitle: "Applications & Features:",
    features: [
      "Water Supply System: Distribution networks, pump lines, and submersible casings.",
      "Industrial Operations: Transports effluents, chemicals, acids, alkalis, edible oils, pulps, and acts as HVAC ducting.",
      "Hydro Transport: Favorable for fly ash and iron ore slurry transport dredging diffusers."
    ],
    rangeDetails: "Available in diameters from 32mm to 710mm, under pressure ratings PN 2.5 to PN 10.0. Supplied in coil form (32mm to 110mm) or straight bar lengths for agricultural, municipal, and industrial applications.",
    specTable: {
      headers: ["Standard License", "Diameter Range", "Pressure Class (PN)", "Supply Form", "Main Uses"],
      rows: [
        ["IS 4984 : 1995", "32 mm to 710 mm", "PN 2.5, PN 4.0, PN 6.0, PN 8.0, PN 10.0", "Coils (32mm to 110mm) / Straight Bars (up to 710mm)", "Potable water supply, slurry transport, industrial chemicals, agricultural bore wells"]
      ]
    }
  },
  {
    id: "sprinkler",
    title: "Sprinkler Systems",
    standard: "IS 14151 (PT-2) 2008",
    eyebrow: "AGRICULTURE SOLUTIONS",
    shortDescription: "Quick-Coupled PE sprinkler systems delivering optimized water distribution for farming plots.",
    longDescription: "Our complete Quick-Coupled PE sprinkler systems deliver optimized water distribution for cotton, wheat, gram, pulses, and green fields. Reduces soil erosion while saving energy and water.",
    image: "/assets/sprinkler_system.png",
    rangeSummary: "63mm – 110mm",
    pressureSummary: "Class 1 & Class 2",
    tags: ["QUICK COUPLING", "FLEXIBLE POLYMER", "CROP IRRIGATION"],
    featuresTitle: "Salient Features:",
    features: [
      "Lightweight, highly flexible, and simple manual installation.",
      "Leak-proof fittings designed for undulating farming plots.",
      "Inert to crop chemicals, fertilizers, and environmental stresses."
    ],
    rangeDetails: "Diameter sizes: 63mm to 110mm, conforming to Class 1 & Class 2 ratings.",
    accessories: [
      "PCN (Pump Connecting Nipple)",
      "Foot Button / Riser Base",
      "Coupled Bend (90° / 45°)",
      "Coupled Tee",
      "End Cap (Q.C.)",
      "Brass Sprinkler Nozzle",
      "Riser Pipe (GI / HDPE)",
      "Adaptor & Clamps"
    ]
  }
];

export default function Products() {
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const activeProduct = PRODUCTS_DATA.find((p) => p.id === activeProductId);

  const handleOpenProduct = (id) => {
    setActiveProductId(id);
    setActiveTab("overview");
  };

  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Top Product Headline Section */}
      <section style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <span className="eyebrow">THE PRODUCT RANGE</span>
            <h1>Manufactured to endure. Approved to perform.</h1>
            <p className="lead">L G Irrigation products are extruded using premium grade polymers under controlled conditions to comply with Indian Standards. Discover technical details, applications, and size dimensions for each category below.</p>
          </div>
        </div>
      </section>

      {/* Product Cards Grid Section with blueprint styling container */}
      <section className="products-grid-section">
        <div className="container">
          <div className="products-grid">
            {PRODUCTS_DATA.map((product) => (
              <div 
                key={product.id} 
                className="product-card-wrapper"
                onClick={() => handleOpenProduct(product.id)}
              >
                <div className="product-card">
                  <div className="product-card-img-container">
                    <img src={product.image} alt={product.title} />
                    <div className="product-card-badge-overlay">
                      <span className="badge-standard">{product.standard}</span>
                    </div>
                  </div>
                  <div className="product-card-body">
                    <div className="product-tags-container">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="product-tag-chip">{tag}</span>
                      ))}
                    </div>

                    <h3 className="product-card-title">{product.title}</h3>
                    <p className="product-card-description">{product.shortDescription}</p>
                    
                    <div className="product-card-specs">
                      <div className="spec-item">
                        <span className="spec-label">Range:</span>
                        <span className="spec-val">{product.rangeSummary}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Pressure:</span>
                        <span className="spec-val">{product.pressureSummary}</span>
                      </div>
                    </div>

                    <div className="product-card-cta">
                      <span>View Specifications</span>
                      <svg className="cta-arrow" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Expanded Product Bottom Sheet / Modal */}
      {activeProduct && (
        <div className="product-modal-backdrop" onClick={() => setActiveProductId(null)}>
          <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Grabber indicator for mobile viewports */}
            <div className="modal-grabber" />

            {/* Sticky Header block */}
            <div className="modal-sticky-header">
              <div className="modal-header-content">
                <div className="modal-eyebrow-row">
                  <span className="modal-standard-badge">{activeProduct.standard}</span>
                  <span className="eyebrow" style={{ marginBottom: 0 }}>{activeProduct.eyebrow}</span>
                </div>
                <h2 className="modal-title">{activeProduct.title}</h2>
              </div>
              
              <button className="modal-close-btn" onClick={() => setActiveProductId(null)} aria-label="Close details">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              {/* Navigation Tabs */}
              <div className="modal-tabs-header">
                <button 
                  className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview &amp; Features
                </button>
                <button 
                  className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
                  onClick={() => setActiveTab("specs")}
                >
                  {activeProduct.id === "sprinkler" ? "Fittings Catalogue" : "Dimensions & Specifications"}
                </button>
              </div>
            </div>

            <div className="modal-body">
              {/* Tab 1: Overview & Features */}
              {activeTab === "overview" && (
                <div className="modal-tab-pane animate-fade-in">
                  <div className="modal-content-grid">
                    {/* Left: Image & Parameters Summary */}
                    <div>
                      <div className="portrait-circle-wrapper" style={{ width: "100%", maxWidth: "260px", aspectRatio: "1/1", margin: "0 auto var(--space-4) auto" }}>
                        <div className="portrait-circle">
                          <img src={activeProduct.image} alt={activeProduct.title} />
                        </div>
                      </div>
                      
                      <div className="modal-parameters-box">
                        <h4 className="parameters-title">Product Parameters:</h4>
                        <div className="parameters-list">
                          <div className="parameter-row">
                            <span className="param-label">Diameter Range:</span>
                            <span className="param-val">{activeProduct.rangeSummary}</span>
                          </div>
                          <div className="parameter-row">
                            <span className="param-label">Pressure Rating:</span>
                            <span className="param-val">{activeProduct.pressureSummary}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Text details & feature checklist */}
                    <div>
                      <p className="lead" style={{ fontSize: "1.0625rem", marginBottom: "var(--space-4)", lineHeight: 1.5 }}>{activeProduct.longDescription}</p>
                      
                      <h4 style={{ marginBottom: "var(--space-2)", fontWeight: 700 }}>{activeProduct.featuresTitle}</h4>
                      <ul className="modal-features-list">
                        {activeProduct.features.map((feat, idx) => (
                          <li key={idx}>
                            <span className="checkmark">✓</span> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Technical Specifications / Fittings */}
              {activeTab === "specs" && (
                <div className="modal-tab-pane animate-fade-in">
                  
                  <div style={{ marginBottom: "var(--space-4)" }}>
                    <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>Supply Details:</h4>
                    <p style={{ color: "var(--slate-gray)", fontSize: "0.9375rem" }}>{activeProduct.rangeDetails}</p>
                  </div>

                  {activeProduct.specTable && (
                    <div style={{ marginTop: "var(--space-4)" }}>
                      <div className="table-scroll-indicator">
                        <span>Swipe horizontally to view full table specifications</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M17 8l4 4-4 4M7 16l-4-4 4-4M3 12h18" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="table-container" style={{ margin: 0 }}>
                        <table>
                          <thead>
                            <tr>
                              {activeProduct.specTable.headers.map((h, i) => <th key={i}>{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {activeProduct.specTable.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => <td key={cIdx}>{cell}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeProduct.accessories && (
                    <div style={{ marginTop: "var(--space-4)" }}>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Quick-Connect Fittings</h3>
                      <div className="modal-accessories-grid">
                        {activeProduct.accessories.map((acc, idx) => (
                          <div key={idx} className="accessory-chip">
                            <span className="chip-bullet">•</span> {acc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
