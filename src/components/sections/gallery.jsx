import React, { useEffect, useRef, useState } from "react";
import { SparklesText } from "../modern-ui/sparkles-text";
import "../../styles/gallery.css";
import galleryimg1 from '../../assets/gallery/0I4A2278.JPG';
import galleryimg2 from '../../assets/gallery/0I4A2346.JPG';
import galleryimg3 from '../../assets/gallery/0I4A2476.JPG';
import galleryimg4 from '../../assets/gallery/0I4A2532.JPG';
import galleryimg5 from '../../assets/gallery/0I4A2640.JPG';
import galleryimg6 from '../../assets/gallery/0I4A2668.JPG';
import galleryimg7 from '../../assets/gallery/0I4A2673.JPG';
import galleryimg8 from '../../assets/gallery/0I4A2676.JPG';
import galleryimg9 from '../../assets/gallery/IMG_8601.JPG';

const IMAGES = [
  { src: galleryimg1, title: "", desc: "" },
  { src: galleryimg2, title: "", desc: "" },
  { src: galleryimg3, title: "", desc: "" },
  { src: galleryimg4, title: "", desc: "" },
  { src: galleryimg5, title: "", desc: "" },
  { src: galleryimg6, title: "", desc: "" },
  { src: galleryimg7, title: "", desc: "" },
  { src: galleryimg8, title: "", desc: "" },
  { src: galleryimg9, title: "", desc: "" },
];

export default function Gallery() {
  // refs for DOM nodes
  const wrapperRefs = useRef([]);
  const imgRefs = useRef([]);
  const lensRefs = useRef([]);

  // cached geometry & raf handles & latest pointer pos
  const rectsRef = useRef([]);         // bounding rects per index
  const posRef = useRef([]);           // last pointer pos per index {x,y}
  const rafRef = useRef([]);           // RAF id per index
  const zoomRef = useRef(2.2);         // zoom factor (change if you want)

  const [activeIndex, setActiveIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Intersection observer for entrance animation (uses wrapperRefs for better perf)
  useEffect(() => {
    const items = wrapperRefs.current.filter(Boolean);
    if (!("IntersectionObserver" in window)) {
      items.forEach((it) => it.classList.add("in-view"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((it) => obs.observe(it));
    return () => obs.disconnect();
  }, []);

  // keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") gotoNext();
      if (e.key === "ArrowLeft") gotoPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, currentIndex]);

  // cleanup on unmount: cancel RAFs
  useEffect(() => {
    return () => {
      for (let i = 0; i < rafRef.current.length; i++) {
        if (rafRef.current[i]) cancelAnimationFrame(rafRef.current[i]);
      }
    };
  }, []);

  // on resize, clear cached rects so they are recomputed on next enter
  useEffect(() => {
    const handleResize = () => {
      rectsRef.current = [];
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload neighbors when modal index changes (faster navigation)
  useEffect(() => {
    if (activeIndex === null) return;
    const next = (currentIndex + 1) % IMAGES.length;
    const prev = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
    [IMAGES[next].src, IMAGES[prev].src].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [activeIndex, currentIndex]);

  // --- LENS LOGIC (high-performance) ---
  const LENS_SIZE = 150;

  const processMove = (index) => {
    rafRef.current[index] = null; // allow next RAF scheduling

    const lens = lensRefs.current[index];
    const img = imgRefs.current[index];
    const rect = rectsRef.current[index];
    const pos = posRef.current[index];
    if (!lens || !img || !rect || !pos) return;

    const zoom = zoomRef.current;
    const lensSize = LENS_SIZE;
    const bgW = rect.width * zoom;
    const bgH = rect.height * zoom;

    // background position (where the zoomed image should be positioned inside lens)
    const bgPosX = -(pos.x * zoom - lensSize / 2);
    const bgPosY = -(pos.y * zoom - lensSize / 2);
    const maxBgX = 0;
    const minBgX = -(bgW - lensSize);
    const maxBgY = 0;
    const minBgY = -(bgH - lensSize);
    const bgPosXClamped = Math.max(Math.min(bgPosX, maxBgX), minBgX);
    const bgPosYClamped = Math.max(Math.min(bgPosY, maxBgY), minBgY);

    // lens position relative to image
    const localX = pos.x - lensSize / 2;
    const localY = pos.y - lensSize / 2;
    const posXClamped = Math.max(Math.min(localX, rect.width - lensSize), 0);
    const posYClamped = Math.max(Math.min(localY, rect.height - lensSize), 0);

    // apply transform (GPU-accelerated) and only update background-position (no layout)
    lens.style.transform = `translate3d(${posXClamped}px, ${posYClamped}px, 0)`;
    lens.style.backgroundPosition = `${bgPosXClamped}px ${bgPosYClamped}px`;
  };

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 780) return; // skip on small screens
    const img = imgRefs.current[index];
    const lens = lensRefs.current[index];
    if (!img || !lens) return;

    // cache rect once (avoid getBoundingClientRect on every mousemove)
    const rect = img.getBoundingClientRect();
    rectsRef.current[index] = rect;

    // setup lens one-time per enter
    const zoom = zoomRef.current;
    const bgW = rect.width * zoom;
    const bgH = rect.height * zoom;
    lens.style.width = `${LENS_SIZE}px`;
    lens.style.height = `${LENS_SIZE}px`;
    lens.style.backgroundImage = `url("${img.src}")`;
    lens.style.backgroundSize = `${bgW}px ${bgH}px`; // only set once
    lens.style.backgroundRepeat = "no-repeat";
    lens.style.display = "block";
    lens.classList.add("visible");
    // make sure pointer doesn't get blocked by the lens
    lens.style.pointerEvents = "none";
  };

  const handleMouseMove = (index, e) => {
    if (window.innerWidth < 780) return;
    const rect = rectsRef.current[index] ?? imgRefs.current[index]?.getBoundingClientRect();
    if (!rect) return;
    // store latest pointer position (relative to image)
    posRef.current[index] = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    // throttle with RAF per index
    if (rafRef.current[index]) return;
    rafRef.current[index] = requestAnimationFrame(() => processMove(index));
  };

  const handleMouseLeave = (index) => {
    const lens = lensRefs.current[index];
    if (lens) {
      lens.classList.remove("visible");
      lens.style.display = "none";
    }
    // cancel any pending RAF
    if (rafRef.current[index]) {
      cancelAnimationFrame(rafRef.current[index]);
      rafRef.current[index] = null;
    }
    rectsRef.current[index] = null;
    posRef.current[index] = null;
  };

  // --- Modal / navigation ---
  const openModal = (index) => {
    setCurrentIndex(index);
    setActiveIndex(index);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setActiveIndex(null);
    document.body.style.overflow = "";
  };
  const gotoNext = () => {
    setCurrentIndex((i) => (i + 1) % IMAGES.length);
  };
  const gotoPrev = () => {
    setCurrentIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  };

  // keep activeIndex in sync with currentIndex (keyboard navigation)
  useEffect(() => {
    if (activeIndex !== null && currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  }, [currentIndex]);

  return (
    <section className="gallery-container">
      <div className="gallery-header">
        <SparklesText
          text="IEEE DAY 2025"
          sparkleCount={8}          // reduced sparkle count to ease CPU
          sparkleSize={7}
          speed={0.1}
          sparkleColors={["#FFD700", "#FF69B4", "#7b2dd1"]}
          className="Gallery-title"
        />
        <p className="subtitle">Moments from previous events and highlights — click any image to preview.</p>
      </div>

      <div className="gallery-grid">
        {IMAGES.map((img, i) => (
          <div
            className="gallery-item"
            key={i}
            ref={(el) => (wrapperRefs.current[i] = el)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            onMouseMove={(e) => handleMouseMove(i, e)}
            onClick={() => openModal(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openModal(i); }}
          >
            <div className="thumb-wrap" style={{ position: "relative" }}>
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={img.src}
                alt={img.title}
                className="thumb-img"
                loading="lazy"
                decoding="async"
                draggable="false"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
              <div
                className="lens"
                ref={(el) => (lensRefs.current[i] = el)}
                aria-hidden="true"
                // initial inline style to avoid layout jumps; CSS will cover the rest
                style={{ display: "none", position: "absolute", top: 0, left: 0 }}
              />
            </div>

            <div className="meta">
              <h3>{img.title}</h3>
              <p>{img.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${IMAGES[currentIndex].title}`}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close preview">
              ✕
            </button>

            <div className="modal-body">
              <div className="modal-image">
                <img
                  src={IMAGES[currentIndex].src}
                  alt={IMAGES[currentIndex].title}
                  decoding="async"
                  loading="eager" // load quickly when modal opens
                  style={{ maxWidth: "100%", height: "auto", display: "block" }}
                />
              </div>

              <div className="modal-info">
                <h3>{IMAGES[currentIndex].title}</h3>
                <p className="modal-desc">{IMAGES[currentIndex].desc}</p>

                <div className="modal-controls">
                  <button onClick={gotoPrev} className="ctrl-btn" aria-label="Previous image">◀</button>
                  <span className="counter">{currentIndex + 1} / {IMAGES.length}</span>
                  <button onClick={gotoNext} className="ctrl-btn" aria-label="Next image">▶</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
