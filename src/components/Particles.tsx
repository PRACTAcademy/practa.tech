"use client";

import { useEffect, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
};

export default function Particles({
                                      particleCount = 80,
                                      style,
                                      className,
                                  }: {
    particleCount?: number;
    style?: React.CSSProperties;
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;
        if (!canvas || !wrapper) return;
        let ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = wrapper.offsetWidth;
        let height = wrapper.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];

        function resetParticle(p: Particle) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.vx = (Math.random() - 0.5) * 0.6;
            p.vy = (Math.random() - 0.5) * 0.6;
            p.size = 1.5 + Math.random() * 2.5;
            p.alpha = 0.4 + Math.random() * 0.6;
        }

        for (let i = 0; i < particleCount; i++) {
            const p = {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: 1.5 + Math.random() * 2.5,
                alpha: 0.4 + Math.random() * 0.6,
            };
            particles.push(p);
        }

        let running = true;

        function draw() {
            const currCanvas = canvasRef.current;
            const currWrapper = wrapperRef.current;
            if (!currCanvas || !currWrapper) return;
            ctx = currCanvas.getContext("2d") ?? null;
            if (!ctx) return;

            const width = currWrapper.offsetWidth;
            const height = currWrapper.offsetHeight;
            ctx.clearRect(0, 0, width, height);

            // Draw particles and lines
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
                ctx.shadowColor = "#00ff90";
                ctx.shadowBlur = 16;
                ctx.fillStyle = `rgba(0,255,128,${p.alpha})`;
                ctx.fill();
                ctx.restore();

                // Lines between close particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 75) {
                        ctx.save();
                        ctx.globalAlpha = (1 - dist / 75) * 0.25;
                        ctx.strokeStyle = "#5aff86";
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce/Respawn
                if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
                    resetParticle(p);
                }
            }

            if (running) requestAnimationFrame(draw);
        }

        draw();

        // Handle resize
        function onResize() {
            const currWrapper = wrapperRef.current;
            const currCanvas = canvasRef.current;
            if (!currWrapper || !currCanvas) return;
            width = currWrapper.offsetWidth;
            height = currWrapper.offsetHeight;
            currCanvas.width = width;
            currCanvas.height = height;
        }
        window.addEventListener("resize", onResize);

        return () => {
            running = false;
            window.removeEventListener("resize", onResize);
        };
    }, [particleCount]);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
                ...style,
            }}
            className={className}
            aria-hidden
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
                tabIndex={-1}
            />
        </div>
    );
}
