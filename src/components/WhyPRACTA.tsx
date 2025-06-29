"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function WhyPRACTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    // --- GSAP EFFECTS ---
    useEffect(() => {
        // Heading effect
        if (headingRef.current) {
            const split = new SplitType(headingRef.current, { types: "chars" });
            gsap.fromTo(
                split.chars,
                { y: 40, opacity: 0, rotateX: 90 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    delay: 0.2,
                }
            );
        }

        // Cards effect
        const cards = gsap.utils.toArray<HTMLDivElement>(
            cardsRef.current?.querySelectorAll(".card") || []
        );
        cards.forEach((card, i) => {
            // Flicker
            const flicker = gsap.timeline({ paused: true });
            flicker.to(card, {
                filter: "brightness(2) drop-shadow(0 0 12px #00ff90)",
                duration: 0.06,
                yoyo: true,
                repeat: 3,
            });

            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    y: 120,
                    scale: 0.9,
                    rotateY: i % 2 === 0 ? -15 : 15,
                    boxShadow: "0 0 0px 0px #000",
                    filter: "blur(12px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    boxShadow: "0 8px 32px 0px #00ff9055",
                    filter: "blur(0px)",
                    duration: 1.4,
                    delay: 0.3 + i * 0.12,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 0.4,
                        onEnter: () => flicker.play(0),
                    },
                }
            );
        });

        // Mouse move 3D tilt
        cards.forEach((card) => {
            const onMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(card, {
                    rotateX: (-y / rect.height) * 10,
                    rotateY: (x / rect.width) * 10,
                    duration: 0.4,
                    ease: "power2.out",
                });
            };
            const onLeave = () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
            };
            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            cards.forEach((card) => {
                card.removeEventListener("mousemove", () => {});
                card.removeEventListener("mouseleave", () => {});
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative text-white py-32 flex flex-col items-center gap-20"
            style={{
                background: "transparent",
                overflow: "hidden",
            }}
        >
            <h2
                ref={headingRef}
                className="text-4xl font-bold mb-10 tracking-tight whymitpa-heading"
                style={{
                    letterSpacing: "0.01em",
                    textShadow: "0 8px 32px #00ff90a0",
                    perspective: "200px",
                    color: "#00ff90",
                    zIndex: 2,
                }}
            >
                Why PRACTA?
            </h2>

            <div
                ref={cardsRef}
                className="flex flex-col gap-32 max-w-4xl w-full z-10 relative"
                style={{ zIndex: 2 }}
            >
                {[
                    {
                        title: "Global Community",
                        text: "Join a diverse network of passionate students aiming for top-tier universities."
                    },
                    {
                        title: "Top-tier Preparation",
                        text: "Access cutting-edge resources to prepare for SAT, TOEFL, and MIT admissions."
                    },
                    {
                        title: "Mentorship & Support",
                        text: "Connect with mentors, alumni and experts guiding you at every step."
                    },
                    {
                        title: "Open Source Spirit",
                        text: "Everything is transparent and community-driven. Grow while contributing."
                    }
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="card bg-white/5 border border-white/20 p-8 rounded-xl shadow-xl backdrop-blur-sm cursor-pointer transition-all duration-300"
                        style={{
                            boxShadow: "0 2px 24px 0 #00ff9060",
                            border: "1.5px solid #00ff90bb",
                            background:
                                "linear-gradient(105deg, #0a2d1690 70%, #00ff9010 100%)",
                        }}
                    >
                        <h3 className="text-2xl font-semibold mb-4" style={{ color: "#00ff90" }}>
                            {card.title}
                        </h3>
                        <p className="text-lg text-white/80">{card.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}