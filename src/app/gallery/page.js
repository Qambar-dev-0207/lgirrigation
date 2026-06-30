"use client";

import { useState, useEffect } from "react";

export default function Gallery() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const galleryItems = [
    {
      src: "/assets/factory_exterior.png",
      alt: "L G Irrigation Factory Exterior & Garden Yard",
      title: "Factory Exterior",
      desc: "Manufacturing facility and garden yard located inside Mahindra World City (SEZ), Jaipur.",
    },
    {
      src: "/assets/office_reception.png",
      alt: "L G Irrigation Office Lobby Reception Area",
      title: "Corporate Reception",
      desc: "Minimalist, professional administration and customer relations lobby.",
    },
    {
      src: "/assets/quality_lab.png",
      alt: "L G Irrigation Quality Control Lab",
      title: "Quality Assurance Lab",
      desc: "Ultra-modern in-house laboratory housing tensile testing and melt index machinery.",
    },
    {
      src: "/assets/hero_factory.png",
      alt: "Finished HDPE Coils and Pipes Pipeline Site",
      title: "Infrastructure Project Yard",
      desc: "Large-diameter pipe storage and construction site preparation.",
    },
  ];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  const openLightbox = (item) => {
    setLightboxImage(item);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <main style={{ marginTop: "100px" }}>
      
      {/* Gallery Header */}
      <section>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "var(--space-6)" }}>
            <span className="eyebrow">Facility Gallery</span>
            <h1>Inside LGI. Our Infrastructure.</h1>
            <p className="lead">Step inside L G Irrigation. Here is a view of our manufacturing sheds, finished goods warehouse yards, corporate lobbies, and specialized testing facilities. Click any image to open the fullscreen lightbox viewer.</p>
          </div>

          {/* Masonry-style staggered grid */}
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="gallery-item gallery-card"
                onClick={() => openLightbox(item)}
                style={{
                  "--staggered-height": index % 3 === 0 ? "420px" : index % 3 === 1 ? "300px" : "360px",
                  animationDelay: `${index * 0.1}s`,
                  cursor: "pointer",
                }}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="gallery-caption">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Overlay */}
      {lightboxImage && (
        <div 
          className="lightbox open" 
          role="dialog" 
          aria-modal="true" 
          onClick={(e) => {
            if (e.target.classList.contains("lightbox") || e.target.classList.contains("lightbox-content")) {
              closeLightbox();
            }
          }}
        >
          <button 
            className="lightbox-close" 
            aria-label="Close image viewer"
            onClick={closeLightbox}
          >
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
            </svg>
          </button>
          <div className="lightbox-content">
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.alt} 
              style={{ maxHeight: "80vh", maxWidth: "100%", borderRadius: "20px" }}
            />
          </div>
        </div>
      )}

    </main>
  );
}
