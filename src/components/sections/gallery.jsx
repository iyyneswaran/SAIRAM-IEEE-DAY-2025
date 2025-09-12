import React, { useEffect, useRef, useState } from "react";
import { SparklesText } from "../modern-ui/sparkles-text";
import "../../styles/gallery.css";
import Navbar from "../layout/Navbar";

const IMAGES = [
  { src: "https://source.unsplash.com/800x600?tech&sig=1", title: "Header header", desc: "Design & explore." },
  { src: "https://source.unsplash.com/800x600?robotics&sig=2", title: "Header header", desc: "Tune sensors & control systems." },
  { src: "https://source.unsplash.com/800x600?coding&sig=3", title: "Header header", desc: "Rapid coding showdown." },
  { src: "https://source.unsplash.com/800x600?ai&sig=4", title: "Header header", desc: "Engineer prompts & test." },
  { src: "https://source.unsplash.com/800x600?electronics&sig=5", title: "Header header", desc: "Simulate circuits in real-time." },
  { src: "https://source.unsplash.com/800x600?design&sig=6", title: "Header header", desc: "Creative UX & UI challenges." },
  { src: "https://source.unsplash.com/800x600?vr&sig=7", title: "Header header", desc: "Immersive prototypes." },
  { src: "https://source.unsplash.com/800x600?security&sig=8", title: "Header header", desc: "Find & fix vulnerabilities." }
];

export default function Gallery() {
  const lensRefs = useRef([]);
  const wrapperRefs = useRef([]);
  const imgRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const items = document.querySelectorAll(".gallery-item");
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

  useEffect(() => {
    const handler = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") gotoNext();
      if (e.key === "ArrowLeft") gotoPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, currentIndex]);

  const showLens = (index) => {
    if (!lensRefs.current[index]) return;
    lensRefs.current[index].classList.add("visible");
  };
  const hideLens = (index) => {
    if (!lensRefs.current[index]) return;
    lensRefs.current[index].classList.remove("visible");
  };

  function handleMouseMove(index, e) {
    if (window.innerWidth < 780) return;

    const lens = lensRefs.current[index];
    const img = imgRefs.current[index];
    const wrapper = wrapperRefs.current[index];
    if (!lens || !img || !wrapper) return;

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const zoom = 2.2;
    const lensSize = 150;
    const bgW = rect.width * zoom;
    const bgH = rect.height * zoom;

    const bgPosX = - (x * zoom - lensSize / 2);
    const bgPosY = - (y * zoom - lensSize / 2);

    const maxBgX = 0;
    const minBgX = -(bgW - lensSize);
    const maxBgY = 0;
    const minBgY = -(bgH - lensSize);

    const bgPosXClamped = Math.max(Math.min(bgPosX, maxBgX), minBgX);
    const bgPosYClamped = Math.max(Math.min(bgPosY, maxBgY), minBgY);

    const localX = x - lensSize / 2;
    const localY = y - lensSize / 2;
    const posXClamped = Math.max(Math.min(localX, rect.width - lensSize), 0);
    const posYClamped = Math.max(Math.min(localY, rect.height - lensSize), 0);

    lens.style.left = `${posXClamped}px`;
    lens.style.top = `${posYClamped}px`;
    lens.style.backgroundImage = `url("${img.src}")`;
    lens.style.backgroundSize = `${bgW}px ${bgH}px`;
    lens.style.backgroundPosition = `${bgPosXClamped}px ${bgPosYClamped}px`;
  }

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
    setCurrentIndex((i) => {
      const next = (i + 1) % IMAGES.length;
      return next;
    });
  };
  const gotoPrev = () => {
    setCurrentIndex((i) => {
      const prev = (i - 1 + IMAGES.length) % IMAGES.length;
      return prev;
    });
  };

  useEffect(() => {
    if (activeIndex !== null && currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  }, [currentIndex]);

  return (
    <>
      <Navbar />
      <section className="gallery-container">
        <div className="gallery-header">
          <SparklesText
            text="IEEE DAY 2025"
            sparkleCount={25}
            sparkleSize={18}
            speed={0.5}
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
              onMouseEnter={() => showLens(i)}
              onMouseLeave={() => hideLens(i)}
              onMouseMove={(e) => handleMouseMove(i, e)}
              onClick={() => openModal(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") openModal(i); }}
            >
              <div className="thumb-wrap">
                <img
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={img.src}
                  alt={img.title}
                  className="thumb-img"
                  loading="lazy"
                  draggable="false"
                />
                <div className="lens" ref={(el) => (lensRefs.current[i] = el)} aria-hidden="true" />
              </div>

              <div className="meta">
                <h3>{img.title}</h3>
                <p>{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Preview */}
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
                  <img src={IMAGES[currentIndex].src} alt={IMAGES[currentIndex].title} />
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
    </>
  );
}
