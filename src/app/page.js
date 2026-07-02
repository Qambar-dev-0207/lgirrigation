"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatCounter from "@/components/StatCounter";
import ApprovalsGrid from "@/components/ApprovalsGrid";


const CERTS = [
  { label: "IS 4984 : 1995", std: "HDPE Pipes" },
  { label: "IS 14333 : 1996", std: "Sewerage" },
  { label: "IS 14151 PT-2", std: "Sprinkler" },
  { label: "ISO 9001:2015", std: "Quality" },
];

function TypewriterTitle() {
  const fullText = "Pipes Engineered For Water Infrastructure.";
  const [text, setText] = useState("");
  const [complete, setComplete] = useState(false);
  const [started, setStarted] = useState(() => {
    if (typeof window !== "undefined" && window.loaderFinished) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (started) return;

    const handleFinished = () => {
      setStarted(true);
    };

    window.addEventListener("loaderFinished", handleFinished);
    
    const fallbackTimer = setTimeout(() => {
      setStarted(true);
    }, 3500);

    return () => {
      window.removeEventListener("loaderFinished", handleFinished);
      clearTimeout(fallbackTimer);
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setComplete(true);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [started]);

  const renderTypedTitle = (txt) => {
    const breakIndex = 17; // End of "Pipes Engineered "
    const highlight = "Water";

    if (txt.length <= breakIndex) {
      return <span>{txt}</span>;
    }

    const firstLine = txt.substring(0, breakIndex);
    const secondLinePart = txt.substring(breakIndex);
    const line2HighlightStart = 4; 
    const line2HighlightEnd = 9;

    if (secondLinePart.length <= line2HighlightStart) {
      return (
        <span>
          {firstLine}
          <br />
          {secondLinePart}
        </span>
      );
    } else if (secondLinePart.length <= line2HighlightEnd) {
      const typedHighlight = secondLinePart.substring(line2HighlightStart);
      return (
        <span>
          {firstLine}
          <br />
          {secondLinePart.substring(0, line2HighlightStart)}
          <span className="hero-headline-outline">{typedHighlight}</span>
        </span>
      );
    } else {
      const typedRest = secondLinePart.substring(line2HighlightEnd);
      return (
        <span>
          {firstLine}
          <br />
          {secondLinePart.substring(0, line2HighlightStart)}
          <span className="hero-headline-outline">{highlight}</span>
          {typedRest}
        </span>
      );
    }
  };

  return (
    <h1 className="hero-minimalist-headline" style={{ display: "inline-block" }}>
      {renderTypedTitle(text)}
      <span className={`typewriter-caret ${complete ? "finished" : ""}`} />
    </h1>
  );
}

export default function Home() {
  return (
    <main>

      {/* ============================================================
          CINEMATIC HERO
          ============================================================ */}
      <section className="hero-cinematic">

        {/* Stadium Media Frame */}
        <div className="hero-stadium-frame">
          {/* Background image */}
          <img
            src="/assets/hero_factory.png"
            alt="L G Irrigation manufacturing facility"
            className="hero-stadium-img"
          />

          {/* Dark gradient overlay */}
          <div className="hero-stadium-overlay" />

          {/* Decorative orbital arc SVG */}
          <svg className="hero-arc-svg" viewBox="0 0 600 400" preserveAspectRatio="none">
            <path
              className="hero-arc-path"
              d="M 600,0 C 500,80 300,180 100,200 C 0,210 -50,250 0,300"
            />
            <path
              className="hero-arc-path"
              style={{ animationDelay: "1.1s", opacity: 0.5 }}
              d="M 600,60 C 480,120 320,220 160,240"
            />
          </svg>

          {/* Floating info cards — top right */}
          <div className="hero-float-cards">
            <div className="hero-info-card">
              <div className="hero-info-card-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <div className="hero-info-card-text">ISO 9001:2015 Certified</div>
                <div className="hero-info-card-sub">Quality Management System</div>
              </div>
            </div>

            <div className="hero-info-card">
              <div className="hero-info-card-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div className="hero-info-card-text">Govt. Approved Vendor</div>
                <div className="hero-info-card-sub">MJP · JJM · UPJN</div>
              </div>
            </div>

            <div className="hero-info-card">
              <div className="hero-info-card-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <div>
                <div className="hero-info-card-text">4 BIS Licenses</div>
                <div className="hero-info-card-sub">IS 4984 · IS 14333 · IS 14151</div>
              </div>
            </div>
          </div>

          {/* Main text content — bottom left */}
          <div className="hero-content-overlay">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Since 2010 &nbsp;·&nbsp; Rajasthan, India
            </div>

            <h1 className="hero-headline">
              Engineering<br />
              <span className="hero-headline-outline">Water</span> Flow.
            </h1>

            <p className="hero-subtext">
              India's trusted manufacturer of high-density polyethylene pipelines, sewerage systems, and precision sprinkler networks — ISO 9001:2015 certified, BIS licensed, and government approved.
            </p>

            <div className="hero-cta-row">
              <Link href="/products" className="btn-hero-primary">
                Explore Products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link href="/contact" className="btn-hero-secondary">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* BIS Cert Chip Strip */}
        <div className="hero-cert-strip">
          {CERTS.map((c, i) => (
            <span key={i} className="cert-chip">
              <span className="cert-chip-dot" />
              {c.label} <span style={{ color: "var(--slate-gray)", fontWeight: 400, marginLeft: 4 }}>— {c.std}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================
          MARQUEE STRIP
          ============================================================ */}
      <MarqueeStrip />

      {/* ============================================================
          COMPANY PROFILE
          ============================================================ */}
      <section className="bg-raised">
        <div className="ghost-watermark watermark-left">THE LEADER</div>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>

            <AnimateOnScroll className="reveal reveal-left">
              <span className="eyebrow">Company Profile</span>
              <h2>Serving farmers &amp; municipalities since 2010.</h2>
              <p>L G Irrigation is an ISO 9001:2015 and ISI certified company. LGI has the vision to provide better quality products to farmers, helping them utilize natural water resources to the fullest.</p>
              <p>We are completely devoted to customer satisfaction. LGI is an approved vendor in major Govt. departments including Maharashtra Jeevan Pradhikaran (MJP), JJM Rajasthan, UPJN, and various discoms of power corporation.</p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--space-4)" }}>
                <Link href="/about" className="btn btn-primary">Company Profile</Link>
                <Link href="/quality" className="btn btn-secondary">Quality &amp; Certifications</Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll className="reveal reveal-right" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div className="portrait-circle-wrapper" style={{ width: "340px", height: "340px", marginBottom: 0 }}>
                <div className="portrait-circle">
                  <img src="/assets/factory_exterior.png" alt="L G Irrigation Factory" loading="lazy" />
                </div>
                <Link href="/about" className="satellite-cta" aria-label="Learn about LGI" />
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* ============================================================
          GOVERNMENT & CORPORATE CREDENTIALS (logo grid)
          ============================================================ */}
      <section className="bg-raised">
        <div className="ghost-watermark watermark-left" style={{ top: "35%", fontSize: "clamp(3rem, 10vw, 8rem)" }}>CREDENTIALS</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-6)" }}>
            <span className="eyebrow">APPROVED INFRASTRUCTURE SUPPLIER</span>
            <h2>Authorized Credential Profiles</h2>
            <p>L G Irrigation holds formal licenses and approvals with central utility bodies, state-wide drinking water missions, and national infrastructure contractors.</p>
          </div>

          <ApprovalsGrid />
        </div>
      </section>

      {/* ============================================================
          PRODUCTS ORBIT SECTION
          ============================================================ */}
      <section style={{ overflow: "hidden" }}>
        <div className="ghost-watermark watermark-right">ORBITAL RANGE</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>

          <AnimateOnScroll className="reveal" style={{ maxWidth: "600px", marginBottom: "var(--space-8)" }}>
            <span className="eyebrow">Product Portals</span>
            <h2>Our primary product lines. Traced by design.</h2>
            <p>Core offerings built to withstand chemical and environmental stress. Staggered in alignment, connected by precision.</p>
          </AnimateOnScroll>

          {/* Staggered portrait cards with animated orbital arc */}
          <div style={{ position: "relative", padding: "var(--space-8) 0" }}>

            {/* Animated orbital arc drawn on scroll */}
            <div className="orbital-arc-container">
              <svg className="orbital-arc-svg" viewBox="0 0 1200 400" preserveAspectRatio="none">
                <path d="M 150 150 Q 600 450 1050 150" className="orbital-path orbital-path-animated" id="orbit-main" />
              </svg>
            </div>

            <div className="staggered-wrapper">
              
              <AnimateOnScroll className="reveal staggered-col">
                <div className="portrait-card">
                  <div className="portrait-circle-wrapper">
                    <div className="portrait-circle">
                      <img src="/assets/sewerage_pipes.png" alt="LGI Sewerage Pipes" loading="lazy" />
                    </div>
                    <Link href="/products#sewerage" className="satellite-cta" aria-label="Sewerage Pipes" />
                  </div>
                  <div className="portrait-info">
                    <span className="eyebrow">IS 14333 : 1996</span>
                    <h3>Sewerage Pipes</h3>
                    <p style={{ fontSize: "0.9375rem" }}>Systems designed for industrial waste, drainage, and undulated terrains. Watertight butt welding joints.</p>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll className="reveal reveal-delay-2 staggered-col">
                <div className="portrait-card">
                  <div className="portrait-circle-wrapper">
                    <div className="portrait-circle">
                      <img src="/assets/hdpe_pipes.png" alt="LGI HDPE Pipes and Coils" loading="lazy" />
                    </div>
                    <Link href="/products#hdpe" className="satellite-cta" aria-label="HDPE Pipes" />
                  </div>
                  <div className="portrait-info">
                    <span className="eyebrow">IS 4984 : 1995</span>
                    <h3>HDPE Pipes &amp; Coils</h3>
                    <p style={{ fontSize: "0.9375rem" }}>Potable water pipes for municipal and industrial supply. High resistance to acids, alkalis, and corrosive effluents.</p>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll className="reveal reveal-delay-3 staggered-col">
                <div className="portrait-card">
                  <div className="portrait-circle-wrapper">
                    <div className="portrait-circle">
                      <img src="/assets/sprinkler_system.png" alt="LGI Sprinkler System" loading="lazy" />
                    </div>
                    <Link href="/products#sprinkler" className="satellite-cta" aria-label="Sprinkler Systems" />
                  </div>
                  <div className="portrait-info">
                    <span className="eyebrow">IS 14151 (PT-2) 2008</span>
                    <h3>Sprinkler Systems</h3>
                    <p style={{ fontSize: "0.9375rem" }}>Flexible PE sprinkler systems with full accessories. Protects crops, reduces soil erosion, saves water.</p>
                  </div>
                </div>
              </AnimateOnScroll>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAST FUSION TECHNOLOGY & SIMULATOR
          ============================================================ */}
      <section>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "var(--space-8)", marginBottom: "var(--space-8)" }}>
            <AnimateOnScroll className="reveal reveal-left">
              <div className="parallax-img-wrapper" style={{ height: "380px" }}>
                <img
                  src="/assets/fast_fusion.png"
                  alt="Fast Fusion pipe welding machine"
                  className="parallax-img"
                  style={{ height: "100%" }}
                  loading="lazy"
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll className="reveal reveal-right">
              <span className="eyebrow">Technology Preview</span>
              <h2>Fast Fusion. Pipelines welded at record speed.</h2>
              <p>A major advancement in polyethylene pipe assembly. L G Irrigation leverages Fast Fusion technology with an enhanced cooling system, dramatically increasing weld production capacity per hour over industry standards.</p>
              <p style={{ color: "var(--slate-gray)" }}>Faster turnaround on large municipal projects without compromising joint integrity or pressure ratings.</p>
            </AnimateOnScroll>
          </div>


        </div>
      </section>

      {/* ============================================================
          ANIMATED STATS SECTION
          ============================================================ */}
      <section className="stats-section">
        <div className="ghost-watermark watermark-right" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>SCALE</div>
        <div className="container">
          <AnimateOnScroll className="reveal">
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: "var(--space-6)" }}>

              <div className="stat-item">
                <StatCounter target={1000} suffix="mm" prefix="32–" />
                <div className="stat-label">Available Size Range</div>
              </div>

              <div className="stat-divider" />

              <div className="stat-item">
                <StatCounter target={4} suffix="+" />
                <div className="stat-label">Major BIS Licenses</div>
              </div>

              <div className="stat-divider" />

              <div className="stat-item">
                <StatCounter target={100} suffix="%" />
                <div className="stat-label">In-House QA Testing</div>
              </div>

              <div className="stat-divider" />

              <div className="stat-item">
                <span className="stat-number">Govt</span>
                <div className="stat-label">Approved Vendor</div>
              </div>

            </div>
          </AnimateOnScroll>
        </div>
      </section>

    </main>
  );
}
