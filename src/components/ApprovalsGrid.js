"use client";

import { useState } from "react";

const APPROVALS = [
  {
    id: "mjp",
    name: "Maharashtra Jeevan Pradhikaran",
    shortName: "MJP",
    code: "MJP/STP-HDPE/2021",
    desc: "Approved vendor for municipal water supply and sewerage pipes across Maharashtra.",
    icon: (
      <svg viewBox="0 0 100 100" className="approval-svg">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50 20 C60 35 60 65 50 80 C40 65 40 35 50 20 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M20 50 Q50 35 80 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M20 50 Q50 65 80 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="50" r="4" fill="var(--light-signal-orange)" />
      </svg>
    ),
  },
  {
    id: "jjm",
    name: "Jal Jeevan Mission, Rajasthan",
    shortName: "JJM",
    code: "JJM/RAJ/REG-4984",
    desc: "Registered supplier of drinking water pipelines to rural households under PHED Rajasthan.",
    icon: (
      <svg viewBox="0 0 100 100" className="approval-svg">
        <rect x="15" y="15" width="70" height="70" rx="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50 30 C50 30 65 50 65 60 C65 68 58 75 50 75 C42 75 35 68 35 60 C35 50 50 30 50 30 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 45 L50 65 M40 58 L60 58" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "lt",
    name: "Larsen & Toubro Construction",
    shortName: "L&T",
    code: "L&T/INFRA-QA/2023",
    desc: "Certified supply partner for major commercial sewage grids and smart city water schemes.",
    icon: (
      <svg viewBox="0 0 100 100" className="approval-svg">
        <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="50" y="58" textAnchor="middle" fontSize="20" fontWeight="bold" fontFamily="monospace" fill="currentColor">L&T</text>
        <line x1="30" y1="68" x2="70" y2="68" stroke="var(--light-signal-orange)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "upjn",
    name: "Uttar Pradesh Jal Nigam",
    shortName: "UPJN",
    code: "UPJN/VENDOR-LIST-III",
    desc: "Enlisted manufacturer for central water distribution networks and urban sewer installations.",
    icon: (
      <svg viewBox="0 0 100 100" className="approval-svg">
        <path d="M20 20 H80 V45 C80 65 50 85 50 85 C50 85 20 65 20 45 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M35 35 H65 M35 48 H65" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="62" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50 56 V68" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "djb",
    name: "Delhi Jal Board",
    shortName: "DJB",
    code: "DJB/W-1000/QA",
    desc: "Approved contractor supply for large-diameter HDPE infrastructure pipelines (up to 1000mm).",
    icon: (
      <svg viewBox="0 0 100 100" className="approval-svg">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <path d="M25 45 Q50 35 75 45 M25 55 Q50 45 75 55 M25 65 Q50 55 75 65" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50 18 L50 32" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "phed",
    name: "Public Health Engineering Dept.",
    shortName: "PHED",
    code: "PHED/RAJ/WSS/HDPE",
    desc: "State Government vendor for irrigation, potable drinking water networks, and sprinkler lines.",
    icon: (
      <svg viewBox="0 0 100 100" className="approval-svg">
        <circle cx="50" cy="42" r="25" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M15 75 Q50 95 85 75" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="50" y1="67" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="42" r="4" fill="var(--light-signal-orange)" />
      </svg>
    ),
  },
];

export default function ApprovalsGrid() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="approvals-section-container">
      <div className="approvals-grid">
        {APPROVALS.map((app) => {
          const isHovered = hoveredId === app.id;
          return (
            <div
              key={app.id}
              className={`approval-card ${isHovered ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredId(app.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="approval-icon-wrapper">
                {app.icon}
              </div>
              <h3 className="approval-card-title">{app.shortName}</h3>
              <p className="approval-card-subtitle">{app.name}</p>
              
              <div className="approval-hover-content">
                <span className="approval-badge-dot">•</span>
                <span className="approval-code-text">{app.code}</span>
                <p className="approval-desc-text">{app.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-6)" }}>
        <a href="/contact#credentials" className="btn btn-secondary">
          Request Credentials File
        </a>
      </div>
    </div>
  );
}
