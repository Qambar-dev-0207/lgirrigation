export default function Products() {
  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Top Product Headline Section */}
      <section>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <span className="eyebrow">THE PRODUCT RANGE</span>
            <h1>Manufactured to endure. Approved to perform.</h1>
            <p className="lead">L G Irrigation products are extruded using premium grade polymers under controlled conditions to comply with Indian Standards. Discover technical details, applications, and size dimensions for each category below.</p>
          </div>
        </div>
      </section>

      {/* Sewerage Pipes Section */}
      <section id="sewerage" className="bg-raised">
        <div className="ghost-watermark watermark-left" style={{ top: "20%" }}>IS 14333 : 1996</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2">
            <div>
              <span className="eyebrow">SEWERAGE PROJECTS</span>
              <h2>Sewerage Pipes</h2>
              <p>Designed specifically for municipal and industrial wastewater transportation, drainage, and slurry handling. Fused with leak-proof jointing mechanisms to protect water resources in arid regions.</p>
              
              <h4 style={{ marginBottom: "var(--space-2)", fontWeight: 700 }}>Applications & Features:</h4>
              <ul style={{ listStyle: "none", marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> Suitable for municipal sewers, highway, bridge, and tunnel drainage.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> High resistance to corrosive chemicals, industrial effluents, and undulating terrains.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> Absolutely watertight joints completed via click-ring fittings or butt-welding.</li>
              </ul>

              <h4 style={{ marginBottom: "var(--space-1)", fontWeight: 700 }}>Product Range:</h4>
              <p>Available in diameters from <strong>63mm to 710mm</strong>, under pressure classes <strong>PN 2.5 to PN 10</strong>. Standard supply length is <strong>6 meters</strong>, with custom lengths for heavy industrial sewage projects.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="portrait-circle-wrapper" style={{ width: "280px", height: "280px", marginBottom: "var(--space-4)" }}>
                <div className="portrait-circle">
                  <img src="/assets/sewerage_pipes.png" alt="LGI Sewerage Pipes Stack" />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specification Table for Sewerage */}
          <div style={{ marginTop: "var(--space-6)" }}>
            <h3 style={{ fontSize: "1.25rem" }}>Sewerage Pipes Pressure Ratings</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Standard License</th>
                    <th>Diameter Range</th>
                    <th>Pressure Ratings (PN)</th>
                    <th>Standard Length</th>
                    <th>Jointing Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>IS 14333 : 1996</td>
                    <td>63 mm to 710 mm</td>
                    <td>PN 2.5, PN 4.0, PN 6.0, PN 8.0, PN 10.0</td>
                    <td>6 Meters (straight) or custom lengths</td>
                    <td>Butt Welding / Click-ring Fittings</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* HDPE Pipes & Coils Section */}
      <section id="hdpe">
        <div className="ghost-watermark watermark-right" style={{ bottom: "20%" }}>IS 4984 : 1995</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", order: 2 }}>
              <div className="portrait-circle-wrapper" style={{ width: "280px", height: "280px", marginBottom: "var(--space-4)" }}>
                <div className="portrait-circle">
                  <img src="/assets/hdpe_pipes.png" alt="LGI HDPE Pipes and Coils" />
                </div>
              </div>
            </div>
            <div style={{ order: 1 }}>
              <span className="eyebrow">POTABLE WATER & INDUSTRIAL</span>
              <h2>HDPE Pipes & Coils</h2>
              <p>Our premium high-density polyethylene line provides highly reliable, leak-free performance for municipal water supply lines, submersibles in bore wells, and slurry transport systems.</p>
              
              <h4 style={{ marginBottom: "var(--space-2)", fontWeight: 700 }}>Applications & Features:</h4>
              <ul style={{ listStyle: "none", marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> <strong>Water Supply System:</strong> Distribution networks, pump lines, and submersible casings.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> <strong>Industrial Operations:</strong> Transports corrosive effluents, chemicals, acidic/alkaline fluids, edible oils, pulps, and acts as HVAC ducting.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> <strong>Hydro Transport Systems:</strong> Favorable for fly ash and iron ore slurry transport dredging diffusers.</li>
              </ul>

              <h4 style={{ marginBottom: "var(--space-1)", fontWeight: 700 }}>Product Range:</h4>
              <p>Available in diameters from <strong>32mm to 710mm</strong>, under pressure ratings <strong>PN 2.5 to PN 10.0</strong>. Supplied in coil form (32mm to 110mm) or straight bar lengths for agricultural, municipal, and industrial applications.</p>
            </div>
          </div>

          {/* Technical Specification Table for HDPE */}
          <div style={{ marginTop: "var(--space-6)" }}>
            <h3 style={{ fontSize: "1.25rem" }}>HDPE Pipes Pressure Ratings</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Standard License</th>
                    <th>Diameter Range</th>
                    <th>Pressure Class (PN)</th>
                    <th>Supply Form</th>
                    <th>Main Uses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>IS 4984 : 1995</td>
                    <td>32 mm to 710 mm</td>
                    <td>PN 2.5, PN 4.0, PN 6.0, PN 8.0, PN 10.0</td>
                    <td>Coils (32mm to 110mm) / Straight Bars (up to 710mm)</td>
                    <td>Potable water supply, slurry transport, industrial chemicals, agricultural bore wells</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Sprinkler Irrigation Section */}
      <section id="sprinkler" className="bg-raised">
        <div className="ghost-watermark watermark-left" style={{ top: "15%" }}>IS 14151 (PT-2)</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2">
            <div>
              <span className="eyebrow">AGRICULTURE SOLUTIONS</span>
              <h2>Sprinkler Systems</h2>
              <p>Our complete Quick-Coupled PE sprinkler systems deliver optimized water distribution for cotton, wheat, gram, pulses, and green fields. Reduces soil erosion while saving energy and water.</p>
              
              <h4 style={{ marginBottom: "var(--space-2)", fontWeight: 700 }}>Salient Features:</h4>
              <ul style={{ listStyle: "none", marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> Lightweight, highly flexible, and simple manual installation.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> Leak-proof fittings designed for undulating farming plots.</li>
                <li style={{ display: "flex", gap: "12px", fontWeight: 450, color: "var(--charcoal)" }}><span style={{ color: "var(--light-signal-orange)" }}>✓</span> Inert to crop chemicals, fertilizers, and environmental stresses.</li>
              </ul>

              <h4 style={{ marginBottom: "var(--space-1)", fontWeight: 700 }}>Product Range:</h4>
              <p>Diameter sizes: <strong>63mm to 110mm</strong>, conforming to Class 1 & Class 2 ratings.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="portrait-circle-wrapper" style={{ width: "280px", height: "280px", marginBottom: "var(--space-4)" }}>
                <div className="portrait-circle">
                  <img src="/assets/sprinkler_system.png" alt="LGI Sprinkler Irrigation nozzle spraying water" />
                </div>
              </div>
            </div>
          </div>

          {/* Sprinkler Fittings & Accessories Grid */}
          <div style={{ marginTop: "var(--space-6)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "var(--space-3)" }}>Fittings & Accessories</h3>
            <p>We supply a full list of quick-connect sprinkler fittings to design custom layouts:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginTop: "var(--space-3)" }}>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• PCN (Pump Connecting Nipple)</div>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• Foot Button / Riser Base</div>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• Coupled Bend (90° / 45°)</div>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• Coupled Tee</div>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• End Cap (Q.C.)</div>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• Brass Sprinkler Nozzle</div>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• Riser Pipe (GI / HDPE)</div>
              <div style={{ backgroundColor: "var(--white)", padding: "12px 20px", borderRadius: "12px", boxShadow: "var(--shadow-level-1)", fontWeight: 500 }}>• Adaptor & Clamps</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
