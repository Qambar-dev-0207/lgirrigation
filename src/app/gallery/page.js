"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGalleryItems(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading gallery:", err);
        setIsLoading(false);
      });
  }, []);

  /* ─── Keyboard: close lightbox, cycle arrows ─── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null || galleryItems.length === 0) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % galleryItems.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryItems]);

  /* ─── Lock body scroll when lightbox open ─── */
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  /* ─── Snap scroll: update active dot indicator ─── */
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth ?? 400;
    const gap = 24;
    const idx = Math.round(track.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, galleryItems.length - 1));
  }, [galleryItems]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ─── Arrow navigation ─── */
  const scrollTo = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.nextSibling?.offsetWidth ?? 400;
    const gap = 24;
    track.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  };

  /* ─── Mouse drag scroll ─── */
  const onMouseDown = (e) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const onMouseUp = () => {
    if (trackRef.current) {
      isDragging.current = false;
      trackRef.current.style.cursor = "grab";
    }
  };

  return (
    <main style={{ marginTop: "100px" }}>

      {/* ── Page Header ── */}
      <section style={{ paddingBottom: "var(--space-6)" }}>
        <div className="container">
          <div style={{ maxWidth: "760px" }}>
            <span className="eyebrow">Facility Gallery</span>
            <h1>Inside LGI. Our Infrastructure.</h1>
            <p className="lead">
              Step inside L G Irrigation — a view of our manufacturing sheds, finished goods warehouse yards, corporate lobbies, and specialized testing facilities. Drag, scroll, or use the arrows to explore.
            </p>
          </div>
        </div>
      </section>

      {/* ── Horizontal Scroll Gallery ── */}
      <section style={{ padding: 0, paddingBottom: "var(--space-12)", overflow: "hidden", paddingLeft: 50 }}>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "var(--space-12) 0", color: "var(--slate-gray)", fontWeight: 500 }}>
            <div style={{ display: "inline-block", width: "40px", height: "40px", border: "3px solid rgba(20,20,19,0.1)", borderTopColor: "var(--signal-orange)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <p style={{ marginTop: "16px" }}>Loading Gallery Images...</p>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}} />
          </div>
        ) : galleryItems.length === 0 ? (
          <p style={{ textAlign: "center", padding: "var(--space-12) 0", color: "var(--slate-gray)" }}>No gallery images available.</p>
        ) : (
          <>
            {/* Track */}
            <div
              ref={trackRef}
              className="gallery-h-track"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {/* Leading spacer to align first card with page container left edge */}
              <div className="gallery-h-spacer" aria-hidden="true" />

              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="gallery-h-card"
                  onClick={() => setLightboxIndex(index)}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
              <div className="gallery-h-img-wrap">
                <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
                <div className="gallery-h-overlay">
                  <span className="gallery-h-expand-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="gallery-h-caption">
                <span className="gallery-h-tag">{item.tag}</span>
                <h3 className="gallery-h-title">{item.title}</h3>
                <p className="gallery-h-desc">{item.desc}</p>
              </div>
            </div>
          ))}

          {/* Trailing spacer */}
          <div className="gallery-h-spacer" aria-hidden="true" />
        </div>

        {/* Controls row */}
        <div className="gallery-h-controls container">
          {/* Dot indicators */}
          <div className="gallery-h-dots">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                className={`gallery-h-dot ${i === activeIndex ? "active" : ""}`}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => {
                  const track = trackRef.current;
                  if (!track) return;
                  const cardWidth = track.firstChild?.nextSibling?.offsetWidth ?? 440;
                  const gap = 24;
                  track.scrollTo({ left: i * (cardWidth + gap), behavior: "smooth" });
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="gallery-h-arrows">
            <button
              className="gallery-arrow-btn"
              onClick={() => scrollTo(-1)}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              className="gallery-arrow-btn"
              onClick={() => scrollTo(1)}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
          </>
        )}
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="lightbox open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          {/* Close */}
          <button className="lightbox-close" aria-label="Close" onClick={() => setLightboxIndex(null)}>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Previous"
            onClick={() => setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div className="lightbox-content">
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].alt}
              style={{ maxHeight: "80vh", maxWidth: "100%", borderRadius: "20px", display: "block" }}
            />
            <div className="lightbox-caption">
              <span className="gallery-h-tag">{galleryItems[lightboxIndex].tag}</span>
              <p style={{ marginBottom: 0, marginTop: "8px", color: "rgba(255,255,255,0.85)", fontSize: "1rem" }}>
                {galleryItems[lightboxIndex].title} — {galleryItems[lightboxIndex].desc}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Next"
            onClick={() => setLightboxIndex((i) => (i + 1) % galleryItems.length)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}
