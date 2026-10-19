"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);

  const activeProduct = products.find((p) => p.id === activeProductId);

  const handleOpenProduct = (id) => {
    setActiveProductId(id);
    setActiveTab("overview");
  };

  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Top Product Headline Section */}
      <section style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ maxWidth: "720px" }}>
              <span className="eyebrow">THE PRODUCT RANGE</span>
              <h1>Manufactured to endure. Approved to perform.</h1>
              <p className="lead">L G Irrigation products are extruded using premium grade polymers under controlled conditions to comply with Indian Standards. Discover technical details, applications, and size dimensions for each category below.</p>
            </div>
            <div style={{ paddingBottom: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="/LG_Irrigation_Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="LG_Irrigation_Catalogue.pdf"
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Full Catalogue (PDF)
              </a>
              <Link
                href="/catalogue"
                className="btn btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                View Online →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards Grid Section with blueprint styling container */}
      <section className="products-grid-section">
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "var(--space-8) 0", color: "var(--slate-gray)", fontWeight: 500 }}>
              <div style={{ display: "inline-block", width: "40px", height: "40px", border: "3px solid rgba(20,20,19,0.1)", borderTopColor: "var(--signal-orange)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              <p style={{ marginTop: "16px" }}>Loading Product Catalog...</p>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}} />
            </div>
          ) : products.length === 0 ? (
            <p style={{ textAlign: "center", padding: "var(--space-8) 0", color: "var(--slate-gray)" }}>No products currently in catalog.</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
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
          )}
        </div>
      </section>

      {/* Product Catalogue Download Banner */}
      <section style={{ paddingTop: 0, paddingBottom: "var(--space-12)" }}>
        <div className="container">
          <div className="catalogue-banner-card" style={{ padding: "var(--space-6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ maxWidth: "680px" }}>
                <span className="eyebrow">COMPLETE TECHNICAL DOCUMENTATION</span>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>Looking for detailed dimension charts &amp; pressure tables?</h3>
                <p style={{ color: "var(--slate-gray)", marginBottom: 0, fontSize: "0.9375rem" }}>
                  Download the full 13-page L G Irrigation catalogue with wall thickness specs, standard dimension ratios (SDR), fusion jointing guides, and test laboratory credentials.
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="/LG_Irrigation_Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="LG_Irrigation_Catalogue.pdf"
                  className="btn btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF Catalogue (2.2 MB)
                </a>
                <Link href="/catalogue" className="btn btn-secondary">
                  View Online Catalogue
                </Link>
              </div>
            </div>
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
