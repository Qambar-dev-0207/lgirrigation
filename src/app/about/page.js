"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TiltWrapper from "@/components/TiltWrapper";

export default function About() {
  const [expandedNode, setExpandedNode] = useState(null);

  const toggleNode = (nodeId) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  const orgNodes = [
    {
      id: "production",
      badge: "Production",
      title: "Production Manager",
      items: [
        { label: "Supervisor", desc: "Oversees shifts and manufacturing runs." },
        { label: "Machine Operators", desc: "High-tolerance extrusion machinery settings." },
        { label: "Labour", desc: "Assembly, pipe handling, loading, and coils storage." },
      ],
    },
    {
      id: "accounts",
      badge: "Accounts",
      title: "Chartered Accountant",
      items: [
        { label: "Accountant", desc: "General ledgers, billing, taxation audit, and SEZ regulatory clearances." },
      ],
    },
    {
      id: "marketing",
      badge: "Marketing",
      title: "Marketing Manager",
      items: [
        { label: "Marketing Officials", desc: "Tenders submission, customer relation support, and distributor relations." },
      ],
    },
    {
      id: "quality",
      badge: "Quality Control",
      title: "QCI Manager",
      items: [
        { label: "QCI Assistants", desc: "Raw material testers, visual examiners, and laboratory operators." },
      ],
    },
  ];

  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Profile & Mission/Vision Section */}
      <section>
        <div className="container">
          <div className="grid-2">
            <AnimateOnScroll className="reveal reveal-left">
              <span className="eyebrow">Corporate Profile</span>
              <h1>Dedicated to customer satisfaction. Devoted to quality.</h1>
              <p className="lead">L G Irrigation has the vision to provide high-quality piping systems to farmers and municipal bodies, helping them utilize natural resources to the fullest.</p>
              <p>Our approach integrates ISO 9001:2015 certified manufacturing facilities with advanced in-house testing labs. This guarantees that every meter of HDPE pipe, coil, and sprinkler system delivered complies with strict Indian Standard (IS) certifications.</p>
              
              <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-4)", flexDirection: "column" }}>
                <div style={{ borderLeft: "3px solid var(--light-signal-orange)", paddingLeft: "var(--space-3)" }}>
                  <h4 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.875rem", color: "var(--slate-gray)", marginBottom: "4px" }}>Our Mission</h4>
                  <p style={{ marginBottom: 0 }}>To use extensive experience for delivering tangible business results and enabling our clients to achieve sustainable margins. We strive to build long-term relationships based on mutual trust and respect.</p>
                </div>
                <div style={{ borderLeft: "3px solid var(--light-signal-orange)", paddingLeft: "var(--space-3)" }}>
                  <h4 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.875rem", color: "var(--slate-gray)", marginBottom: "4px" }}>Our Vision</h4>
                  <p style={{ marginBottom: 0 }}>To bring new concepts in the field of manufacturing and service industry to enhance the quality of agricultural and municipal water infrastructure projects in India.</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="reveal reveal-right" style={{ display: "flex", justifyContent: "center" }}>
              <TiltWrapper className="portrait-circle-wrapper" style={{ width: "320px", height: "320px", marginBottom: 0 }}>
                <div className="portrait-circle">
                  <img src="/assets/office_reception.png" alt="LGI Corporate Reception Glass Door" />
                </div>
              </TiltWrapper>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="values" className="bg-raised">
        <div className="ghost-watermark watermark-right">OUR PRINCIPLES</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-6)" }}>
            <span className="eyebrow">OUR VALUES</span>
            <h2>Guided by management principles.</h2>
            <p>Our management team implements five fundamental values to ensure product integrity, fair labor conditions, and strict adherence to industrial standards.</p>
          </div>

          <div className="grid-3" style={{ marginTop: "var(--space-6)", gap: "var(--space-4)" }}>
            {/* Value 1 */}
            <div className="value-card">
              <div className="value-num">01</div>
              <h3>Client Satisfaction</h3>
              <p style={{ fontSize: "0.9375rem", marginBottom: 0 }}>Committing to client satisfaction as our primary, most important business objective in all projects.</p>
            </div>

            {/* Value 2 */}
            <div className="value-card">
              <div className="value-num">02</div>
              <h3>Human Capital</h3>
              <p style={{ fontSize: "0.9375rem", marginBottom: 0 }}>Recognizing achievements as the work of the team. We encourage initiative and respect individual contributions.</p>
            </div>

            {/* Value 3 */}
            <div className="value-card">
              <div className="value-num">03</div>
              <h3>Competence</h3>
              <p style={{ fontSize: "0.9375rem", marginBottom: 0 }}>Maintaining the highest levels of professionalism, engineering rigor, and technical competence.</p>
            </div>

            {/* Value 4 */}
            <div className="value-card">
              <div className="value-num">04</div>
              <h3>Ethical Conduct</h3>
              <p style={{ fontSize: "0.9375rem", marginBottom: 0 }}>Maintaining the highest standards of ethics, business conduct, and operating strictly within state and central laws.</p>
            </div>

            {/* Value 5 */}
            <div className="value-card value-card-wide">
              <div className="value-num">05</div>
              <h3>Agility & Growth</h3>
              <p style={{ fontSize: "0.9375rem", marginBottom: 0 }}>Identifying and responding aggressively to new infrastructural opportunities, committing our full engineering focus to succeed in each undertaking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Org Chart Section */}
      <section id="team">
        <div className="container">
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-6)", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow">ORGANIZATION MAP</span>
            <h2>Our Operational Structure</h2>
            <p>L G Irrigation relies on a streamlined management flow designed to monitor raw materials, production output, financial auditability, and regulatory compliance.</p>
          </div>

          <div className="org-chart-wrapper">
            
            {/* Top Level Node */}
            <div style={{ textAlign: "center", marginBottom: "var(--space-4)" }}>
              <div style={{ display: "inline-block", backgroundColor: "var(--ink-black)", color: "var(--canvas-cream)", padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-btn)", boxShadow: "var(--shadow-level-2)", cursor: "pointer" }}>
                <h3 style={{ color: "var(--canvas-cream)", marginBottom: 0, fontSize: "1.125rem" }}>MANAGING PARTNER</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Executive Leadership</span>
              </div>
            </div>

            {orgNodes.map((node) => {
              const isExpanded = expandedNode === node.id;
              return (
                <div key={node.id} className={`org-node ${isExpanded ? "expanded" : ""}`}>
                  <div className="org-node-header" onClick={() => toggleNode(node.id)}>
                    <div className="org-node-title">
                      <span className="org-role-badge">{node.badge}</span>
                      <h3 style={{ marginBottom: 0, fontSize: "1.125rem" }}>{node.title}</h3>
                    </div>
                    <svg className="org-node-chevron" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div 
                    className="org-node-content"
                    style={{
                      maxHeight: isExpanded ? "500px" : "0",
                      transition: "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    <ul className="org-sub-list">
                      {node.items.map((sub, index) => (
                        <li key={index} className="org-sub-item">
                          <strong>{sub.label}</strong> — {sub.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* Key Customers Section */}
      <section className="bg-soft" id="customers">
        <div className="container">
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-6)" }}>
            <span className="eyebrow">PARTNERS & CLIENTS</span>
            <h2>Key Customer List</h2>
            <p>We are approved suppliers to major infrastructure groups, government utility contractors, and state departments across India.</p>
          </div>

          <div className="customer-grid">
            <div className="customer-card">
              <span className="customer-name">L & T Constructions</span>
              <span className="customer-loc">National Infrastructure Projects</span>
            </div>
            <div className="customer-card">
              <span className="customer-name">JJM, Rajasthan</span>
              <span className="customer-loc">Jal Jeevan Mission</span>
            </div>
            <div className="customer-card">
              <span className="customer-name">UPJN Contractors</span>
              <span className="customer-loc">Uttar Pradesh Jal Nigam</span>
            </div>
            <div className="customer-card">
              <span className="customer-name">Delhi Jal Board</span>
              <span className="customer-loc">Municipal Water Utility</span>
            </div>
            <div className="customer-card">
              <span className="customer-name">Contractors of PuVVNL</span>
              <span className="customer-loc">Purvanchal Vidyut Vitran Nigam</span>
            </div>
            <div className="customer-card">
              <span className="customer-name">DVVNL Contractors</span>
              <span className="customer-loc">Dakshinanchal Vidyut Vitran Nigam</span>
            </div>
            <div className="customer-card">
              <span className="customer-name">PHED Departments</span>
              <span className="customer-loc">Public Health Engineering Dept</span>
            </div>
            <div className="customer-card">
              <span className="customer-name">Power Corporation Discoms</span>
              <span className="customer-loc">Various State Power Boards</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
