"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Quality", href: "/quality" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen((v) => !v);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "";
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <header className="header-wrapper">
      <nav
        className="nav-pill"
        style={scrolled ? {
          padding: "8px 24px",
          margin: "10px auto 0",
          boxShadow: "rgba(0,0,0,0.10) 0px 8px 32px 0px",
          border: "1px solid rgba(0,0,0,0.06)",
        } : {}}
      >
        {/* Logo */}
        <Link href="/" className="nav-logo-group" onClick={closeMobileMenu}>
          <img
            src="/assets/lglogo.jpeg"
            alt="L G Irrigation Logo"
            style={{
              height: "40px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {isActive && (
                  <span style={{
                    position: "absolute",
                    top: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "var(--light-signal-orange)",
                  }} />
                )}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ padding: "7px 18px", fontSize: "0.875rem" }}
            onClick={closeMobileMenu}
          >
            Get in Touch
          </Link>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span style={mobileMenuOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
            <span style={mobileMenuOpen ? { opacity: 0 } : {}} />
            <span style={mobileMenuOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile Panel */}
      <div className={`mobile-nav-panel ${mobileMenuOpen ? "open" : ""}`}>
        <button className="mobile-nav-close" aria-label="Close menu" onClick={closeMobileMenu}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
          </svg>
        </button>
        <div className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                color: pathname === link.href ? "var(--signal-orange)" : undefined,
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
