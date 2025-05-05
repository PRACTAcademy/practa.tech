"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import {
    motion,
    useSpring,
    useTransform,
    useScroll,
    AnimatePresence,
} from "framer-motion";
import Link from "next/link";

type VantaGlobeEffect = {
    setOptions: (options: Record<string, unknown>) => void;
    destroy: () => void;
};

export default function WelcomePage() {
    const vantaRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<VantaGlobeEffect | null>(null);

    const [showDonate, setShowDonate] = useState(true);

    // Responsivity: update Vanta on resize
    useEffect(() => {
        function handleResize() {
            if (vantaEffect.current && vantaRef.current) {
                vantaEffect.current.setOptions({
                    minHeight: Math.max(200, window.innerHeight * 0.6),
                    minWidth: Math.max(200, window.innerWidth * 0.6),
                });
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!vantaEffect.current && vantaRef.current) {
            vantaEffect.current = GLOBE({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: Math.max(200, window.innerHeight * 0.6),
                minWidth: Math.max(200, window.innerWidth * 0.6),
                scale: 1.0,
                scaleMobile: 1.0,
                color: 0xffffff,
                color2: 0xff0000,
                size: 1.0,
                backgroundColor: 0x000000,
            }) as VantaGlobeEffect;
        }
        return () => {
            if (vantaEffect.current) vantaEffect.current.destroy();
        };
    }, []);

    // DYNAMIC SCROLL RANGE
    const [scrollMax, setScrollMax] = useState(1000);

    useEffect(() => {
        function calcScrollMax() {
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            setScrollMax(Math.max(1, docHeight - winHeight));
        }
        calcScrollMax();
        window.addEventListener("resize", calcScrollMax);
        window.addEventListener("scroll", calcScrollMax);
        return () => {
            window.removeEventListener("resize", calcScrollMax);
            window.removeEventListener("scroll", calcScrollMax);
        };
    }, []);

    const isMobile =
        typeof window !== "undefined" && window.innerWidth <= 768;
    const { scrollY } = useScroll();

    // -- Deixe o efeito MAIS RÁPIDO multiplicando os valores finais! --
    const speedFactor = isMobile ? 2 : 2;

    const backgroundHeight = useTransform(
        scrollY,
        [0, scrollMax],
        [0, (typeof window !== "undefined" ? window.innerHeight : 800) * speedFactor]
    );
    const smoothHeight = useSpring(backgroundHeight, {
        stiffness: 120,
        damping: 16,
    });

    // ----------- Lógica para esconder o botão Donate -----------
    useEffect(() => {
        function onScroll() {
            if (!parallaxRef.current) return;
            const parallaxTop = parallaxRef.current.getBoundingClientRect().top;
            setShowDonate(parallaxTop > 0);
        }

        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ----------- ANIMAÇÃO SUAVE AO SCROLL -----------
    // Parâmetros para o efeito de crescimento, suavidade e vida
    const sectionStart = isMobile ? 0.3 : 0.4; // porcentagem do scroll até a seção
    const sectionEnd = isMobile ? 0.85 : 0.95;

    const yRaw = useTransform(
        scrollY,
        [scrollMax * sectionStart, scrollMax * sectionEnd],
        [120, 0]
    );
    const scaleRaw = useTransform(
        scrollY,
        [scrollMax * sectionStart, scrollMax * sectionEnd],
        [0.85, 1.1]
    );

    const y = useSpring(yRaw, { stiffness: 90, damping: 18, mass: 0.8 });
    const scale = useSpring(scaleRaw, { stiffness: 80, damping: 15 });

    // ----------- FIM DA ANIMAÇÃO SUAVE -----------

    return (
        <>
            {/* Hero Section */}
            <div className="relative h-screen w-screen overflow-hidden text-white font-sans">
                <div
                    ref={vantaRef}
                    className="absolute top-0 left-0 w-full h-full -z-10"
                />
                <div className="flex h-full items-center justify-center px-5">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="max-w-xl text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                            Welcome to <span className="text-red-700">MIT</span>
                            <span className="text-white italic">PA</span>
                        </h1>
                        <p className="text-base md:text-lg font-medium leading-relaxed mt-4">
                            Welcome to the MITPA educational community, where students prepare for the SAT and admission to MIT. Explore a world of knowledge!
                        </p>
                    </motion.div>
                </div>
                {/* Donate Button -- agora animado! */}
                <AnimatePresence>
                    {showDonate && (

                        <Link href="https://patreon.com/MITPA" passHref>
                        <motion.button
                            key="donate"
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.9 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="fixed bottom-6 left-6 z-50 border border-white text-white px-10 py-2 bg-transparent hover:bg-white/10 transition-colors duration-200 font-semibold"
                            style={{ pointerEvents: "auto" }}
                        >
                            Donate
                        </motion.button>
                        </Link>
                    )}
                </AnimatePresence>
            </div>
            {/* Parallax Scroll Section */}
            <div
                ref={parallaxRef}
                className="relative bg-black text-black min-h-[200vh] -z-10"
            >
                <motion.div
                    className="fixed top-0 left-0 w-full z-0 bg-gradient-to-b from-red-700 via-red-500 to-gray-200"
                    style={{
                        height: smoothHeight,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                />
                <motion.div
                    className="z-10 relative max-w-2xl text-center px-6 mx-auto pt-[110vh] drop-shadow-lg"
                    initial={{ opacity: 0, y: 120, scale: 0.85, rotate: 0 }}
                    animate={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 16,
                        bounce: 0.25,
                    }}
                    viewport={{ once: true, margin: "-20%" }}
                    style={{ y, scale, rotate: 0 }} // <--- Título reto, sem rotate
                >
                    {/* Título reto com underline animado */}
                    <motion.h2
                        className="text-3xl md:text-5xl font-extrabold text-white relative inline-block"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true, margin: "-10%" }}
                    >
                        Your Journey Begins
                        <motion.span
                            className="absolute left-0 bottom-[-10px] h-[4px] w-full rounded bg-gradient-to-r from-red-600 via-red-400 to-transparent"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{
                                duration: 1.1,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                            style={{ originX: 0 }}
                        />
                    </motion.h2>
                    {/* Frase com animação horizontal e "Embrace" destacado e animado */}
                    <motion.p
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="mt-6 text-lg md:text-xl font-medium text-white/90 leading-relaxed"
                    >
                        As you scroll, the future unfolds — full of opportunities, challenges, and breakthroughs.{" "}
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                            className="inline-block font-semibold text-red-900 animate-pulse"
                            style={{
                                textShadow: "0 0 8px rgba(255,100,100,0.4), 0 0 16px rgba(255, 0, 0, 0.15)",
                                filter: "drop-shadow(0 0 12px rgba(255,0,0,0.18))",
                            }}
                        >
                            Embrace the adventure ahead!
                        </motion.span>
                    </motion.p>
                </motion.div>
            </div>
        </>
    );
}
