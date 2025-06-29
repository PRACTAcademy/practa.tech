'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import VimeoPlayer from '../../components/TrailerPlayer';

export default function Trailer() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        router.replace('/404');
        setShouldRender(false);

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [router]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1e0505 100%)',
            }}
        >
            <div
                className="pointer-events-none absolute bg-red-200 opacity-20 blur-[120px] rounded-full w-64 h-64 z-0 transition-all duration-300 ease-out"
                style={{
                    left: `${mousePosition.x - 128}px`,
                    top: `${mousePosition.y - 128}px`,
                }}
            />

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30 mix-blend-overlay"></div>

            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-red-800/8"
                        style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.2,
                        }}
                    />
                ))}
            </div>

            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
                >
                    <ArrowLeft
                        size={24}
                        className="group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">Back</span>
                </Link>
            </div>

            <div className="z-10 flex items-center justify-center h-full w-full px-2 sm:px-4 animate-fade-in">
                <div className="w-full sm:w-[90%] md:w-[70%]">
                    <VimeoPlayer />
                </div>
            </div>

            <motion.div
                className="flex flex-col items-center justify-center mt-16 sm:mt-24 mb-16 sm:mb-24 z-20 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.p
                    className="text-3xl sm:text-5xl font-extrabold text-white mb-6 sm:mb-8 tracking-wide drop-shadow-xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                >
                    Credits
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 bg-white/10 rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-sm"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                    <motion.div
                        className="flex flex-col items-center"
                        whileHover={{ scale: 1.07, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-base sm:text-xl font-semibold text-white mb-2 sm:mb-3">Soundtrack from</span>
                        <Link href="https://pixabay.com/music/ambient-midnight-forest-184304/" target="_blank" rel="noopener noreferrer">
                            <Image
                                src={"https://cdn-icons-png.flaticon.com/512/3291/3291666.png"}
                                alt={"Pixabay"}
                                width={60}
                                height={60}
                                className="sm:w-[80px] sm:h-[80px] rounded-lg shadow"
                            />
                        </Link>
                    </motion.div>
                    <div className="hidden sm:block w-px bg-white/30 h-24 mx-6" />
                    <motion.div
                        className="flex flex-col items-center"
                        whileHover={{ scale: 1.07, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-base sm:text-xl font-semibold text-white mb-2 sm:mb-3">Videos from</span>
                        <Link href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer">
                            <Image
                                src={"https://cdn-1.webcatalog.io/catalog/pexels/pexels-icon-filled-256.png?v=1737601148637"}
                                alt={"Pexels"}
                                width={60}
                                height={60}
                                className="sm:w-[80px] sm:h-[80px] rounded-lg shadow"
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}