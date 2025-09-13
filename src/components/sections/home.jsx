import { useEffect, useRef, useState } from "react";
import { SparklesText } from "../modern-ui/sparkles-text";
import "../../styles/Hero.css";
import Button1 from "../common/Button1";
import Button2 from "../common/Button2";
// import { AuroraText } from "@/components/magicui/aurora-text";
import Ieeelogo from '../../assets/logo/ieeelogo.png'
import sairamIEEE from '../../assets/logo/ieee_sairam.png'

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

  // ---------------- Meteor + Stars Canvas ----------------
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // colorful glowing stars
    const starColors = ["#FFD700", "#FF69B4", "#7b2dd1", "#00ffff", "#ff4500"];
    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 1.2,
      alpha: Math.random(),
      dAlpha: Math.random() * 0.02 + 0.01,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // meteors
    const meteors = [];
    function addMeteor() {
      meteors.push({
        x: Math.random() * w,
        y: -20,
        len: Math.random() * 100 + 140,
        speed: Math.random() * 5 + 7,
        angle: Math.PI / 4, // 45°
        opacity: 1,
        color: "#fff",
      });
    }
    setInterval(() => {
      if (meteors.length < 6) addMeteor();
    }, 2000);

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // draw stars with glow
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 15;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        s.alpha += s.dAlpha;
        if (s.alpha <= 0 || s.alpha >= 1) s.dAlpha *= -1;
      });

      // draw meteors with smooth glowing trail
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - m.len * Math.cos(m.angle),
          m.y - m.len * Math.sin(m.angle)
        );
        grad.addColorStop(0, `rgba(255,255,255,${m.opacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - m.len * Math.cos(m.angle),
          m.y - m.len * Math.sin(m.angle)
        );
        ctx.stroke();

        m.x += m.speed * Math.cos(m.angle);
        m.y += m.speed * Math.sin(m.angle);
        m.opacity -= 0.008;

        if (m.opacity <= 0) meteors.splice(i, 1);
      }

      requestAnimationFrame(draw);
    }

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ---------------- Hero Content ----------------
  return (
    <section className="heroSection" aria-label="IEEE Day hero">
      {/* background canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* floating dots layer */}
      <div className="floating-dots"></div>

      {/*  <div className="tags animate" style={{ animationDelay: "0.08s" }}>
        <div className="tag-container">
          <div></div>
          <span>Explore ⚡</span>
        </div>
        <div className="tag-container">
          <div></div>
          <span>Enlighten 🌟</span>
        </div>
        <div className="tag-container">
          <div></div>
          <span>Expand 🌐</span>
        </div>
      </div> */}

      <div className="logo-container">
        <img src={Ieeelogo} alt="IEEE Day Logo" />
        <img src={sairamIEEE} alt="IEEE Sairam Logo" className="sairam-logo" />
      </div>


      <div className="hero-context animate" style={{ animationDelay: "0.6s" }}>
        <p className="hero-text">
          Ignite ideas, build connections, and shape tomorrow with innovation.
        </p>

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
          {/* <Button2 /> */}
        </div>
      </div>
    </section>
  );
};