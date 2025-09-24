import React, { useEffect, useRef } from "react";
import "../../styles/CustomCursor.css";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const target = useRef({ x: pos.current.x, y: pos.current.y });
    const particles = useRef([]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let dpr = window.devicePixelRatio || 1;
        function resize() {
            dpr = window.devicePixelRatio || 1;
            canvas.width = Math.floor(window.innerWidth * dpr);
            canvas.height = Math.floor(window.innerHeight * dpr);
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener("resize", resize);

        function lerp(a, b, t) {
            return a + (b - a) * t;
        }

        function spawnParticle(x, y, count = 2) {
            const style = getComputedStyle(document.documentElement);
            const palette = [
                style.getPropertyValue("--accent").trim() || "#7b2dd1",
                style.getPropertyValue("--accent-2").trim() || "#ff69b4",
                style.getPropertyValue("--accent-3").trim() || "#ffd700",
            ];
            for (let i = 0; i < count; i++) {
                particles.current.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 1.4,
                    vy: Math.random() * 0.6 + 0.6, // initial downward speed
                    size: Math.random() * 2.4 + 0.8,
                    color: palette[Math.floor(Math.random() * palette.length)],
                    life: 0.9 + Math.random() * 0.9,
                    maxLife: 0.9 + Math.random() * 0.9,
                });
            }
            // limit particles for perf
            if (particles.current.length > 320)
                particles.current.splice(0, particles.current.length - 320);
        }

        function onPointerMove(e) {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            // occasional small spawn for continuous trail
            spawnParticle(e.clientX, e.clientY, Math.random() > 0.6 ? 3 : 1);
        }

        function onPointerDown() {
            const c = cursorRef.current;
            if (c) c.classList.add("cursor--active");
            spawnParticle(target.current.x, target.current.y, 8);
        }
        function onPointerUp() {
            const c = cursorRef.current;
            if (c) c.classList.remove("cursor--active");
        }

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointerup", onPointerUp);

        let last = performance.now();
        function animate(t) {
            const dt = Math.min(0.033, (t - last) / 1000);
            last = t;

            // smooth cursor follow
            pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
            pos.current.y = lerp(pos.current.y, target.current.y, 0.18);
            const c = cursorRef.current;
            if (c) {
                c.style.left = `${pos.current.x}px`;
                c.style.top = `${pos.current.y}px`;
            }

            // draw particles
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.vy += 0.04 + Math.random() * 0.02; // gravity-ish
                p.x += p.vx;
                p.y += p.vy;
                p.life -= dt;
                const alpha = Math.max(0, p.life / p.maxLife);
                if (p.life <= 0 || p.y > window.innerHeight + 40) {
                    particles.current.splice(i, 1);
                    continue;
                }
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.fillStyle = p.color || "#fff";
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            rafRef.current = requestAnimationFrame(animate);
        }
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, []);

    return (
        <>
            {/* canvas for particles */}
            <canvas ref={canvasRef} className="custom-cursor-canvas" />
            {/* visible cursor dot + glow */}
            <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
        </>
    );
}
