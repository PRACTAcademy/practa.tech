'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

function getTimeLeft(target: Date) {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, completed: false };
}

const FlipCard = ({
                      value,
                      label,
                  }: { value: number | string; label: string }) => (
    <div className="flex flex-col items-center mx-1 sm:mx-2">
        <motion.div
            className="flex items-center justify-center
                       text-3xl xs:text-4xl sm:text-5xl md:text-6xl
                       font-mono font-bold bg-white bg-opacity-40 rounded-lg
                       shadow-lg border border-gray-300 text-black
                       w-14 xs:w-16 sm:w-20 md:w-24
                       h-14 xs:h-16 sm:h-20 md:h-24"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={value}
        >
            {String(value).padStart(2, '0')}
        </motion.div>
        <span className="text-[10px] xs:text-xs sm:text-sm mt-1 uppercase tracking-widest text-gray-600">{label}</span>
    </div>
);

export default function CountdownCalendar() {
    const [mounted, setMounted] = useState(false);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const targetDate = new Date('2025-08-15T00:00:00Z');
        const interval = setInterval(() => {
            const next = getTimeLeft(targetDate);
            setCountdown(next);
            if (next.completed) {
                setCompleted(true);
                clearInterval(interval);
            }
        }, 1000);
        // Update immediately on mount
        setCountdown(getTimeLeft(targetDate));
        return () => clearInterval(interval);
    }, []);

    // Only render after mount to avoid hydration mismatch
    if (!mounted) return null;

    return (
        <motion.section
            className="flex flex-col items-center justify-center min-h-screen px-2 xs:px-4 sm:px-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <AnimatePresence>
                {!completed ? (
                    <motion.div
                        key="coming-soon"
                        className="flex flex-col items-center justify-center w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, type: "spring" }}
                    >
                        <motion.h2
                            className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8 sm:mb-10 text-center"
                            initial={{ y: -60, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            Coming Soon
                        </motion.h2>
                        <motion.div
                            className="flex flex-row items-end justify-center space-x-1 xs:space-x-2"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
                        >
                            <FlipCard value={countdown.days} label="days" />
                            <span className="text-xl xs:text-2xl sm:text-3xl font-bold text-black">:</span>
                            <FlipCard value={countdown.hours} label="hours" />
                            <span className="text-xl xs:text-2xl sm:text-3xl font-bold text-black">:</span>
                            <FlipCard value={countdown.minutes} label="min" />
                            <span className="text-xl xs:text-2xl sm:text-3xl font-bold text-black">:</span>
                            <FlipCard value={countdown.seconds} label="sec" />
                        </motion.div>
                        <motion.p
                            className="mt-6 sm:mt-8 text-sm xs:text-base sm:text-lg md:text-xl text-gray-400 font-thin text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            Mark your calendar: <span className="font-bold">August 15</span>
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="finished"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4 sm:mb-6 text-center">It&#39;s here!</h2>
                        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-black text-center">PRACTA Launched!</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}