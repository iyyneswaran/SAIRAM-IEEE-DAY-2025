import { useEffect, useRef, useState } from "react";
import "../../styles/Hero.css";
import Button1 from "../common/Button1";
import Ieeelogo from "../../assets/logo/ieeelogo.png";
import sairamIEEE from "../../assets/logo/ieee_sairam.png";

/**
 * Highly-optimized hero with canvas star + meteor visuals.
 * - disables automatically for very low memory / prefers-reduced-motion
 * - pre-renders star sprites to offscreen canvases
 * - uses a fixed-size meteor pool to avoid array churn
 * - caps canvas logical size & DPR to limit pixel buffer
 * - caps FPS and pauses on hidden tab
 */
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

  // ---------------- Canvas refs & control ----------------
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const meteorSpawnerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user motion preference
    const prefersReducedMotion = (typeof window !== "undefined" && window.matchMedia)
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
    // Device heuristics
    const deviceMemory = navigator.deviceMemory || 8; // GB (undefined => assume 8)
    const hwConcurrency = navigator.hardwareConcurrency || 4;
    const isMobileUA = /Mobi|Android/i.test(navigator.userAgent || "");
    // thresholds (tune these if you want)
    const VERY_LOW_MEM_GB = 1.5; // fully disable on very low devices
    const LOW_MEM_GB = 4;        // degrade on <= 4GB (fewer stars/meteors / lower DPR)

    // If user prefers reduced motion or device very constrained, disable canvas and show static fallback
    const disableCanvasCompletely = prefersReducedMotion || deviceMemory <= VERY_LOW_MEM_GB;

    // If we shouldn't completely disable, we'll choose "low" vs "normal" settings
    const lowQualityMode = !disableCanvasCompletely && (deviceMemory <= LOW_MEM_GB || hwConcurrency <= 2 || isMobileUA);

    // If we must disable canvas entirely, bail early (fallback handled in JSX)
    if (disableCanvasCompletely) {
      // ensure any existing canvas drawing is stopped (not needed here, but safe)
      return;
    }

    // SETTINGS adapted to device capability
    const SETTINGS = {
      stars: lowQualityMode ? 28 : 60,
      maxMeteors: lowQualityMode ? 1 : 3,
      meteorSpawnMs: lowQualityMode ? 4200 : 2500,
      targetFPS: lowQualityMode ? 30 : 45, // capped fps
      maxLogicalWidth: lowQualityMode ? 900 : 1600,
      maxLogicalHeight: lowQualityMode ? 900 : 1200,
      starSpriteBaseSize: lowQualityMode ? 24 : 32,
      meteorPoolSize: 6, // pool size larger than maxMeteors to avoid contention
    };

    // star color palette
    const STAR_COLORS = ["#FFD700", "#FF69B4", "#7b2dd1", "#00ffff", "#ff4500"];

    const ctx = canvas.getContext("2d", { alpha: true });

    // Drawing state (kept in closure to avoid recreating on each frame)
    let DPR = 1;
    let logicalW = 0;
    let logicalH = 0;
    let lastRenderTime = performance.now();
    let stars = [];
    let starSprites = [];
    // Use a meteor pool (objects reused, avoid push/splice)
    const meteorPool = new Array(SETTINGS.meteorPoolSize).fill(null).map(() => ({
      active: false, x: 0, y: 0, len: 0, speed: 0, angle: Math.PI / 4, opacity: 0
    }));

    // tiny helper
    const hexToRgb = (hex) => {
      let h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const n = parseInt(h, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };

    // Pre-render small radial sprites for each star color.
    function createStarSprites() {
      starSprites = STAR_COLORS.map((color) => {
        const base = SETTINGS.starSpriteBaseSize;
        const size = Math.max(12, Math.round(base * DPR));
        const off = document.createElement("canvas");
        off.width = size;
        off.height = size;
        const octx = off.getContext("2d");
        const { r, g, b } = hexToRgb(color);
        const cx = size / 2;
        const cy = size / 2;
        const grad = octx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
        grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},0.65)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        octx.fillStyle = grad;
        octx.fillRect(0, 0, size, size);
        return off;
      });
    }

    // Set up stars array
    function initStars() {
      stars = new Array(SETTINGS.stars);
      for (let i = 0; i < SETTINGS.stars; i++) {
        const r = Math.random() * 1.6 + 0.6;
        stars[i] = {
          x: Math.random() * logicalW,
          y: Math.random() * logicalH,
          r,
          alpha: Math.random() * 0.9,
          dAlpha: Math.random() * 0.012 + 0.004,
          colorIdx: Math.floor(Math.random() * STAR_COLORS.length),
        };
      }
    }

    // Configure canvas size and DPR (capped)
    function configureCanvas() {
      const availW = Math.max(320, Math.min(window.innerWidth || 800, SETTINGS.maxLogicalWidth));
      const availH = Math.max(320, Math.min(window.innerHeight || 600, SETTINGS.maxLogicalHeight));

      // choose DPR but cap aggressively on low-quality devices to save RAM
      const rawDPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      DPR = lowQualityMode ? Math.min(rawDPR, 1.25) : Math.min(rawDPR, 2);

      logicalW = availW;
      logicalH = availH;

      canvas.style.width = logicalW + "px";
      canvas.style.height = logicalH + "px";
      canvas.width = Math.round(logicalW * DPR);
      canvas.height = Math.round(logicalH * DPR);

      // unify drawing coordinates to logical pixels
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // regenerate sprites and star positions
      createStarSprites();
      initStars();
    }

    configureCanvas();

    // Meteor pool helper: activate an inactive meteor
    function spawnMeteor() {
      for (let i = 0; i < meteorPool.length; i++) {
        const m = meteorPool[i];
        if (!m.active) {
          m.active = true;
          m.x = Math.random() * logicalW;
          m.y = -20;
          m.len = Math.random() * (lowQualityMode ? 60 : 120) + (lowQualityMode ? 80 : 120);
          m.speed = Math.random() * (lowQualityMode ? 3 : 5) + (lowQualityMode ? 4 : 6);
          m.angle = Math.PI / 4;
          m.opacity = 1;
          return;
        }
      }
      // none free - do nothing (pool cap prevents over-alloc)
    }

    // spawn interval (kept in ref)
    function startSpawner() {
      if (meteorSpawnerRef.current) clearInterval(meteorSpawnerRef.current);
      meteorSpawnerRef.current = setInterval(() => {
        // count active
        let activeCount = 0;
        for (let i = 0; i < meteorPool.length; i++) if (meteorPool[i].active) activeCount++;
        if (activeCount < SETTINGS.maxMeteors) spawnMeteor();
      }, SETTINGS.meteorSpawnMs);
    }
    startSpawner();

    // Lightweight render loop with fps cap
    function draw(now) {
      rafRef.current = requestAnimationFrame(draw);

      if (typeof document !== "undefined" && document.hidden) return;

      const delta = now - lastRenderTime;
      const minFrameMs = 1000 / SETTINGS.targetFPS;
      if (delta < minFrameMs) return;
      lastRenderTime = now;

      // clear
      ctx.clearRect(0, 0, logicalW, logicalH);

      // draw stars using pre-rendered sprites (fast drawImage)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const size = Math.max(6, s.r * 2);
        ctx.globalAlpha = s.alpha;
        const sprite = starSprites[s.colorIdx];
        ctx.drawImage(sprite, s.x - size / 2, s.y - size / 2, size, size);
        ctx.globalAlpha = 1;
        s.alpha += s.dAlpha;
        if (s.alpha <= 0.05 || s.alpha >= 1) s.dAlpha *= -1;
      }

      // draw meteors (iterate pool)
      for (let i = 0; i < meteorPool.length; i++) {
        const m = meteorPool[i];
        if (!m.active) continue;

        const x2 = m.x - m.len * Math.cos(m.angle);
        const y2 = m.y - m.len * Math.sin(m.angle);

        // simple gradient trail (cheap)
        const grad = ctx.createLinearGradient(m.x, m.y, x2, y2);
        grad.addColorStop(0, `rgba(255,255,255,${Math.min(1, m.opacity)})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = lowQualityMode ? 1.2 : 1.8;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // small bright head
        ctx.beginPath();
        ctx.globalAlpha = Math.min(1, m.opacity);
        ctx.fillStyle = "rgba(255,255,255,1)";
        const headRadius = lowQualityMode ? 1.2 : 1.8;
        ctx.arc(m.x, m.y, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // advance
        m.x += m.speed * Math.cos(m.angle) * (lowQualityMode ? 0.95 : 1);
        m.y += m.speed * Math.sin(m.angle) * (lowQualityMode ? 0.95 : 1);
        m.opacity -= lowQualityMode ? 0.008 : 0.01;

        // recycle if offscreen or faded
        if (m.opacity <= 0 || m.x > logicalW + 50 || m.y > logicalH + 50) {
          m.active = false;
        }
      }
    }

    rafRef.current = requestAnimationFrame((t) => {
      lastRenderTime = t;
      draw(t);
    });

    // Debounced resize
    const onResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        configureCanvas();
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Pause/resume timing when tab becomes hidden/visible
    const onVisibility = () => {
      if (!document.hidden) lastRenderTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility, false);

    // Cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (meteorSpawnerRef.current) clearInterval(meteorSpawnerRef.current);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener("resize", onResize, { passive: true });
      document.removeEventListener("visibilitychange", onVisibility);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Determine whether we disabled canvas (same heuristic as effect's early exit)
  const prefersReducedMotion = (typeof window !== "undefined" && window.matchMedia)
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
  const deviceMemory = navigator.deviceMemory || 8;
  const VERY_LOW_MEM_GB = 1.5;
  const disableCanvasCompletely = prefersReducedMotion || deviceMemory <= VERY_LOW_MEM_GB;

  // ---------------- Render JSX ----------------
  return (
    <section className="heroSection" aria-label="IEEE Day hero">
      {disableCanvasCompletely ? (
        // Static fallback for ultra-low devices or reduced-motion users
        <div className="hero-static-fallback" aria-hidden="true" />
      ) : (
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none", // let touches go through
          }}
          aria-hidden="true"
        />
      )}

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

        <center>
          <div className="button-container" style={{ animationDelay: "0.85s" }}>
            <Button1 />
          </div>
        </center>
      </div>
    </section>
  );
}
