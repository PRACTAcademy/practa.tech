'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import Image from 'next/image';
import VimeoPlayer from '../../components/TrailerPlayer';

export default function Trailer() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1e0505 100%)',
            }}
        >
            {/* Cursor light effect */}
            <div
                className="pointer-events-none absolute bg-red-200 opacity-20 blur-[120px] rounded-full w-64 h-64 z-0 transition-all duration-300 ease-out"
                style={{
                    left: `${mousePosition.x - 128}px`,
                    top: `${mousePosition.y - 128}px`,
                }}
            />

            {/* Background animations */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>

            {/* Floating particles */}
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

            {/* Back button */}
            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
                >
                    <ArrowLeft
                        size={24}
                        className="group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">Voltar</span>
                </Link>
            </div>

            {/* Main content */}
            <div className="z-10 flex items-center justify-center h-full w-full animate-fade-in">
                <VimeoPlayer />
            </div>
            <motion.div
                className="flex flex-col items-center justify-center mt-24 mb-24 z-20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.p
                    className="text-5xl font-extrabold text-white mb-8 tracking-wide drop-shadow-xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                >
                    Credits
                </motion.p>
                <motion.div
                    className="flex flex-row items-center justify-center gap-16 bg-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-sm"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                    <motion.div
                        className="flex flex-col items-center"
                        whileHover={{ scale: 1.07, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-xl font-semibold text-white mb-3">Soundtrack from</span>
                        <Link href="https://pixabay.com/pt/music/ambiente-midnight-forest-184304/" target="_blank" rel="noopener noreferrer">
                            <Image
                                src={"https://cdn-icons-png.flaticon.com/512/3291/3291666.png"}
                                alt={"Pixabay"}
                                width={80}
                                height={80}
                                className="rounded-lg shadow"
                            />
                        </Link>
                    </motion.div>
                    <div className="w-px bg-white/30 h-24 mx-6" />
                    <motion.div
                        className="flex flex-col items-center"
                        whileHover={{ scale: 1.07, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-xl font-semibold text-white mb-3">Videos from</span>
                        <Link href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer">
                            <Image
                                src={"https://cdn-1.webcatalog.io/catalog/pexels/pexels-icon-filled-256.png?v=1737601148637"}
                                alt={"Pexels"}
                                width={80}
                                height={80}
                                className="rounded-lg shadow"
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
