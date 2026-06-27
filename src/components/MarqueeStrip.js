const ITEMS = [
  "ISO 9001:2015 Certified",
  "ISI Mark Holder",
  "Govt. Approved Vendor",
  "Maharashtra Jeevan Pradhikaran",
  "JJM Rajasthan",
  "UPJN Approved",
  "Fast Fusion Technology",
  "BIS Licensed Manufacturer",
  "32mm – 1000mm Range",
  "IS 4984 · IS 14333 · IS 14151",
];

// Duplicate for seamless infinite loop
const ALL = [...ITEMS, ...ITEMS];

export default function MarqueeStrip() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {ALL.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-item-dot">•</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
