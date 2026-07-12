"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace("form-", "");
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Contact & Form Section */}
      <section>
        <div className="container">
          <AnimateOnScroll className="reveal" style={{ maxWidth: "800px", marginBottom: "var(--space-8)" }}>
            <span className="eyebrow">Communication Hub</span>
            <h1>Get in touch. Plan your project.</h1>
            <p className="lead">Reach our corporate headquarters and manufacturing plant in Jaipur SEZ. Submit a direct inquiry, and our engineering team will provide detailed sizing recommendations and pressure estimates.</p>
          </AnimateOnScroll>

          <div className="contact-grid">
            
            {/* Contact Details (Left Column) */}
            <div className="contact-info-block">
              
              {/* Address */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", fill: "var(--ink-black)" }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div className="info-text">
                  <h4>Manufacturing Facility</h4>
                  <p style={{ marginBottom: 0 }}>Khasra No. 103, Paldi Parsa Village,<br />Mahindra World City (SEZ), Jaipur,<br />Rajasthan - 302042</p>
                </div>
              </div>

              {/* Phone */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", fill: "var(--ink-black)" }}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <div className="info-text">
                  <h4>Phone Coordinates</h4>
                  <p style={{ marginBottom: 0 }}><a href="tel:+919828167722">+91-9828167722</a><br /><a href="tel:+917737168967">+91-7737168967</a></p>
                </div>
              </div>

              {/* Email & Web */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", fill: "var(--ink-black)" }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div className="info-text">
                  <h4>Digital Inbox & Web</h4>
                  <p style={{ marginBottom: 0 }}><a href="mailto:lgirrigation99@gmail.com">lgirrigation99@gmail.com</a><br /><a href="http://www.lgirrigation.in" target="_blank" rel="noopener">www.lgirrigation.in</a></p>
                </div>
              </div>

              {/* Google Map Integration */}
              <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--dust-taupe)", borderRadius: "20px", padding: "var(--space-4)", marginTop: "var(--space-2)", textAlign: "center", boxShadow: "var(--shadow-level-1)" }}>
                <h4 style={{ fontWeight: 500, marginBottom: "var(--space-1)", fontSize: "1rem" }}>Jaipur SEZ Location</h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", marginBottom: "var(--space-3)" }}>Find our manufacturing facility on Google Maps.</p>
                <div style={{ height: "200px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--dust-taupe)", marginBottom: "var(--space-3)" }}>
                  <iframe 
                    title="L G Irrigation Manufacturing Facility Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.8802293410766!2d75.5935841!3d26.7993084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c37a1121ed79b%3A0xd84bfae843094425!2sL%20G%20Irrigation!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <a 
                  href="https://share.google/T9j5JDJyKPqofWTPb" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary" 
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "0.875rem", width: "100%", justifyContent: "center" }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "currentColor" }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  Open in Google Maps
                </a>
              </div>

            </div>

            {/* Contact Form (Right Column) */}
            <div>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 24px", backgroundColor: "var(--lifted-cream)", borderRadius: "20px", boxShadow: "var(--shadow-level-1)", border: "1px solid var(--dust-taupe)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--light-signal-orange)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
                    <svg style={{ width: "32px", height: "32px", fill: "white" }} viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <h3 style={{ marginBottom: "12px", fontWeight: 500 }}>Inquiry Submitted</h3>
                  <p style={{ marginBottom: "24px" }}>Thank you, {formData.name}. Our technical team will reach out to you at {formData.email} within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Submit Another Inquiry</button>
                </div>
              ) : (
                <div style={{ backgroundColor: "var(--white)", borderRadius: "20px", padding: "var(--space-4)", border: "1px solid var(--dust-taupe)", boxShadow: "var(--shadow-level-1)" }}>
                  <h3 style={{ marginBottom: "var(--space-3)", fontWeight: 500 }}>Submit Project Inquiry</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="form-name">Full Name</label>
                      <input 
                        type="text" 
                        id="form-name" 
                        className="form-control" 
                        placeholder="e.g. Rahul Sharma" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-email">Business Email</label>
                      <input 
                        type="email" 
                        id="form-email" 
                        className="form-control" 
                        placeholder="e.g. rahul@company.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="form-phone" 
                        className="form-control" 
                        placeholder="e.g. +91 9876543210" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-message">Inquiry Details</label>
                      <textarea 
                        id="form-message" 
                        className="form-control" 
                        placeholder="Detail your diameter requirements (mm), wall thickness, standard requirements, and destination location..." 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "var(--space-2)" }}>Submit Project Inquiry</button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Fast Fusion Technology Section */}
      <section id="fast-fusion" className="bg-raised">
        <div className="ghost-watermark watermark-right" style={{ bottom: "10%" }}>FAST FUSION</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="portrait-circle-wrapper" style={{ width: "320px", height: "320px", marginBottom: 0 }}>
                <div className="portrait-circle">
                  <img src="/assets/fast_fusion.jpg" alt="Fast Fusion poly pipe welding trac machine" />
                </div>
              </div>
            </div>
            <div>
              <span className="eyebrow">TECHNOLOGY CORE</span>
              <h2>Fast Fusion. Speeding Infrastructure Deployment.</h2>
              <p>Fusing large-diameter polyethylene pipelines requires precision temperature controls and specialized cool-down sequences. L G Irrigation utilizes the state-of-the-art <strong>Fast Fusion Trac</strong> machine, a massive advancement in pipe jointing technology.</p>
              <p>This specialized machinery incorporates an <strong>Enhanced cooling system</strong> that stabilizes the welded seam quickly. This reduces the cooling time and increases the production speed, delivering more secure, pressure-stable fusion welds per hour compared to conventional field butt welding equipment.</p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
