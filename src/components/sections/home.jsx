import { useEffect, useRef, useState } from "react";
import "../../styles/Hero.css";
import Button1 from "../common/Button1";
import Ieeelogo from "../../assets/logo/ieeelogo.png";
import sairamIEEE from "../../assets/logo/ieee_sairam.png";

export default function Home() {
  // ---------------- Countdown ----------------
  const EVENT_DATE = new Date(2025, 9, 7, 0, 0, 0);

  const calcRemaining = () => {
    const now = new Date();
    const diffMs = Math.max(0, EVENT_DATE.getTime() - now.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return { days, hours, minutes, seconds, totalMs: diffMs };
  };

  const [time, setTime] = useState(calcRemaining());
  useEffect(() => {
    const id = setInterval(() => setTime(calcRemaining()), 1000);
    return () => clearInterval(id);
  }, []);
  const isLive = time.totalMs <= 0;
  const pad = (n) => String(n).padStart(2, "0");

  // ---------------- Canvas optimized effect ----------------
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const meteorSpawnerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    // runtime device heuristics — safe fallbacks when undefined
    const deviceMemory = navigator.deviceMemory || 8; // GB
    const hwConcurrency = navigator.hardwareConcurrency || 4;
    const isMobileUA = /Mobi|Android/i.test(navigator.userAgent || "");
    const isLowEnd = deviceMemory <= 4 || hwConcurrency <= 2 || isMobileUA;

    // settings that adapt to device capabilities
    const SETTINGS = {
      stars: isLowEnd ? 30 : 60,
      maxMeteors: isLowEnd ? 1 : 3,
      meteorSpawnMs: isLowEnd ? 4000 : 2500,
      targetFPS: isLowEnd ? 30 : 45,
      maxCanvasLogicalWidth: isLowEnd ? 900 : 1600, // cap pixel buffer width
      maxCanvasLogicalHeight: isLowEnd ? 900 : 1200,
      starSpriteBaseSize: 32, // base sprite size in css pixels (will scale with DPR)
    };

    // star color palette
    const STAR_COLORS = ["#FFD700", "#FF69B4", "#7b2dd1", "#00ffff", "#ff4500"];

    // local variables reused each frame
    let w = 0,
      h = 0,
      DPR = 1;
    let lastRenderTime = performance.now();
    let stars = [];
    let meteors = [];
    let starSprites = []; // offscreen sprite canvases, one per color

    // helper: convert hex to rgb
    const hexToRgb = (hex) => {
      let h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const n = parseInt(h, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };

    // create pre-rendered star sprite per color (cheaper than shadowBlur each draw)
    function makeStarSprites() {
      starSprites = STAR_COLORS.map((color) => {
        const base = SETTINGS.starSpriteBaseSize;
        const size = Math.max(16, Math.round(base * DPR)); // pixels
        const sCanvas = document.createElement("canvas");
        sCanvas.width = size;
        sCanvas.height = size;
        const sCtx = sCanvas.getContext("2d");
        const { r, g, b } = hexToRgb(color);
        const cx = size / 2;
        const cy = size / 2;
        const grad = sCtx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
        grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(0.35, `rgba(${r},${g},${b},0.65)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, size, size);
        return sCanvas;
      });
    }

    // initialize stars array
    function initStars() {
      stars = Array.from({ length: SETTINGS.stars }).map(() => {
        const r = Math.random() * 1.6 + 0.6; // logical px radius
        const colorIdx = Math.floor(Math.random() * STAR_COLORS.length);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          alpha: Math.random() * 0.9,
          dAlpha: Math.random() * 0.012 + 0.004,
          colorIdx,
        };
      });
    }

    // configure canvas size (logical pixels) and DPR scaling, but cap size to reduce memory
    function configureCanvas() {
      const logicalWidth = Math.min(window.innerWidth || 800, SETTINGS.maxCanvasLogicalWidth);
      const logicalHeight = Math.min(window.innerHeight || 600, SETTINGS.maxCanvasLogicalHeight);

      // choose DPR: use devicePixelRatio but cap to 1 or 1.5 on low-end to save memory and work
      const rawDPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      DPR = isLowEnd ? Math.min(rawDPR, 1.25) : Math.min(rawDPR, 2);

      w = logicalWidth;
      h = logicalHeight;

      canvas.style.width = logicalWidth + "px";
      canvas.style.height = logicalHeight + "px";
      canvas.width = Math.round(logicalWidth * DPR);
      canvas.height = Math.round(logicalHeight * DPR);

      // scale drawing so we can use logical pixel coordinates
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // recreate sprites (size uses DPR)
      makeStarSprites();

      // init stars using the new w/h
      initStars();
    }

    configureCanvas();

    // meteor add helper
    function addMeteor() {
      meteors.push({
        x: Math.random() * w,
        y: -20,
        len: Math.random() * (isLowEnd ? 60 : 120) + (isLowEnd ? 80 : 120),
        speed: Math.random() * (isLowEnd ? 3 : 5) + (isLowEnd ? 4 : 6),
        angle: Math.PI / 4,
        opacity: 1,
      });
      // cap
      if (meteors.length > SETTINGS.maxMeteors) meteors.splice(0, meteors.length - SETTINGS.maxMeteors);
    }

    // spawn meteors via interval (kept in ref so we can clear on cleanup)
    function startMeteorSpawner() {
      if (meteorSpawnerRef.current) clearInterval(meteorSpawnerRef.current);
      meteorSpawnerRef.current = setInterval(() => {
        if (meteors.length < SETTINGS.maxMeteors) addMeteor();
      }, SETTINGS.meteorSpawnMs);
    }
    startMeteorSpawner();

    // draw loop with capped FPS
    function drawLoop(now) {
      rafRef.current = requestAnimationFrame(drawLoop);

      // pause drawing when page not visible
      if (typeof document !== "undefined" && document.hidden) return;

      const delta = now - lastRenderTime;
      const minFrameMs = 1000 / SETTINGS.targetFPS;
      if (delta < minFrameMs) return; // skip frame to cap fps
      lastRenderTime = now;

      // clear background (transparent)
      ctx.clearRect(0, 0, w, h);

      // draw stars using pre-rendered sprites (fast drawImage)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // draw sprite sized to star radius * 2 (logical pixels)
        const size = Math.max(6, s.r * 2);
        ctx.globalAlpha = s.alpha;
        const sprite = starSprites[s.colorIdx];
        // sprite has DPR pixels but context scaled, drawImage will scale to size properly
        ctx.drawImage(sprite, s.x - size / 2, s.y - size / 2, size, size);
        ctx.globalAlpha = 1;

        // twinkle
        s.alpha += s.dAlpha;
        if (s.alpha <= 0.05 || s.alpha >= 1) s.dAlpha *= -1;
      }

      // draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];

        // simple linear fade trail - lightweight (no heavy shadow)
        const x2 = m.x - m.len * Math.cos(m.angle);
        const y2 = m.y - m.len * Math.sin(m.angle);

        // gradient for trail (cheap)
        const grad = ctx.createLinearGradient(m.x, m.y, x2, y2);
        grad.addColorStop(0, `rgba(255,255,255,${Math.min(1, m.opacity)})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1, (isLowEnd ? 1.2 : 1.8));
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // advance meteor
        m.x += m.speed * Math.cos(m.angle) * (isLowEnd ? 0.9 : 1);
        m.y += m.speed * Math.sin(m.angle) * (isLowEnd ? 0.9 : 1);
        m.opacity -= isLowEnd ? 0.008 : 0.01;

        if (m.opacity <= 0 || m.x > w + 50 || m.y > h + 50) {
          meteors.splice(i, 1);
        }
      }
    }

    // start RAF
    rafRef.current = requestAnimationFrame((t) => {
      lastRenderTime = t;
      drawLoop(t);
    });

    // on window resize — debounce and reconfigure
    const onResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        configureCanvas();
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // pause when tab hidden to save CPU
    const handleVisibility = () => {
      if (document.hidden) {
        // nothing to do — loop early-exits when hidden
      } else {
        // restart timing baseline to avoid large delta
        lastRenderTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility, false);

    // cleanup on unmount
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (meteorSpawnerRef.current) clearInterval(meteorSpawnerRef.current);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener("resize", onResize, { passive: true });
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // ---------------- Hero content ----------------
  return (
    <section className="heroSection" aria-label="IEEE Day hero">
      {/* background canvas */}
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none", // let touches pass through
        }}
        aria-hidden="true"
      />

      {/* floating dots layer */}
      <div className="floating-dots" />

      <div className="logo-container">
        <img src={Ieeelogo} alt="IEEE Day Logo" />
        <img src={sairamIEEE} alt="IEEE Sairam Logo" className="sairam-logo" />
      </div>

      <div className="hero-context animate" style={{ animationDelay: "0.6s" }}>
        <p className="hero-text">Ignite ideas, build connections, and shape tomorrow with innovation.</p>

        <div className="countdown-wrap" aria-live="polite">
          {isLive ? (
            <div className="live-badge">Event is live — enjoy! 🎉</div>
          ) : (
            <div className="countdown">
              <div className="time-segment">
                <div className="num">{pad(time.days)}</div>
                <div className="label">Days</div>
              </div>
              <div className="time-sep">:</div>
              <div className="time-segment">
                <div className="num">{pad(time.hours)}</div>
                <div className="label">Hours</div>
              </div>
              <div className="time-sep">:</div>
              <div className="time-segment">
                <div className="num">{pad(time.minutes)}</div>
                <div className="label">Mins</div>
              </div>
              <div className="time-sep">:</div>
              <div className="time-segment">
                <div className="num">{pad(time.seconds)}</div>
                <div className="label">Secs</div>
              </div>
            </div>
          )}
        </div>

        <div className="button-container" style={{ animationDelay: "0.85s" }}>
          <Button1 />
        </div>
      </div>
    </section>
  );
}