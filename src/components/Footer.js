import Link from "next/link";
import MarqueeStrip from "@/components/MarqueeStrip";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);

export default function Footer() {
  return (
    <>
      {/* Marquee strip just above footer */}
      <MarqueeStrip />

      <footer className="footer">
        <div className="container">

          {/* Top: headline + logo */}
          <div className="footer-top">
            <h2 className="footer-headline">
              We&apos;re always here<br />when you need water flowing.
            </h2>
            <div className="footer-logo-group">
              <div className="logo-circle-container">
                <div className="logo-circle logo-circle-red" style={{ width: "32px", height: "32px" }} />
                <div className="logo-circle logo-circle-yellow" style={{ width: "32px", height: "32px", marginLeft: "-14px" }} />
              </div>
              <span className="footer-logo-text">L G IRRIGATION</span>
            </div>
          </div>

          {/* Link grid */}
          <div className="footer-grid">
            <div className="footer-col">
              <h5>Products</h5>
              <ul className="footer-links">
                <li><Link href="/products#sewerage">Sewerage Pipes (IS:14333)</Link></li>
                <li><Link href="/products#hdpe">HDPE Pipes &amp; Coils (IS:4984)</Link></li>
                <li><Link href="/products#sprinkler">Sprinkler Systems (IS:14151)</Link></li>
                <li><Link href="/contact#fast-fusion">Fast Fusion Machinery</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Company</h5>
              <ul className="footer-links">
                <li><Link href="/about">Company Profile</Link></li>
                <li><Link href="/about#values">Our Values</Link></li>
                <li><Link href="/about#team">Management Team</Link></li>
                <li><Link href="/gallery">Media Gallery</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Quality Lab</h5>
              <ul className="footer-links">
                <li><Link href="/quality#certifications">Certifications &amp; Licenses</Link></li>
                <li><Link href="/quality#tests">Major Tests</Link></li>
                <li><Link href="/quality#lab">QA Facilities</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Need Help?</h5>
              <ul className="footer-links">
                <li><Link href="/contact">Contact Us</Link></li>
                <li>
                  <a href="mailto:lgirrigation99@gmail.com">
                    Email Technical Team <span className="external-icon">↗</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919828167722">
                    Call Office Support <span className="external-icon">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919828167722" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us <span className="external-icon">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-divider" />

          {/* Bottom row */}
          <div className="footer-bottom">
            <p style={{ color: "var(--slate-gray)", marginBottom: 0, fontSize: "0.8125rem" }}>
              &copy; 2026 L G Irrigation. All rights reserved. Manufactured in India.
            </p>

            <div className="footer-bottom-links">
              <a href="#" style={{ marginRight: "16px" }}>Privacy Policy</a>
              <a href="#" style={{ marginRight: "16px" }}>Terms &amp; Conditions</a>
              <Link href="/admin">Admin Portal</Link>
            </div>

            <select className="footer-lang-selector" aria-label="Select Language" defaultValue="English (IN)">
              <option>English (IN)</option>
              <option>Hindi (IN)</option>
            </select>

            {/* Social Icons */}
            <div className="footer-socials">
              <a href="#" className="footer-social-icon" aria-label="LinkedIn Profile">
                <LinkedInIcon />
              </a>
              <a href="https://wa.me/919828167722" className="footer-social-icon" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
              </a>
              <a href="#" className="footer-social-icon" aria-label="YouTube Channel">
                <YouTubeIcon />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
