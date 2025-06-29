import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Mail, Link as LinkIcon, Sparkles } from 'lucide-react';
import { getMainEvent } from '@/Sanity/sanity';
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect } from "react";

type MainEvent = {
    name: string;
    date: string;
    description: string;
    image: string;
    link: string;
};

type Props = {
    event: MainEvent | null;
};

export default function Community({ event }: Props) {
    useEffect(() => {
        gsap.to(".parallax", {
            y: -50,
            scrollTrigger: {
                trigger: ".parallax",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    // Only format the date if available; do NOT show any "not available" text.
    const formattedDate = (event?.date && event.date !== "Date not available")
        ? new Date(event.date).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
        : null;

    if (!event) {
        return (
            <motion.main
                id="community"
                className="min-h-screen z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <CommunitySections />
            </motion.main>
        );
    }

    return (
        <motion.main
            id="community"
            className="min-h-screen z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <section className="flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 z-20 parallax mt-20 mb-20">
                <div className="w-full max-w-screen-xl flex flex-col md:flex-row rounded-lg overflow-hidden border border-red-900 bg-gradient-to-br from-gray-900 via-gray-950 to-black shadow-2xl relative">
                    <AnimatedSparkles />

                    <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10 text-white">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 flex items-center gap-2">
                                <Sparkles className="text-red-400" size={32} />
                                {event.name}
                            </h1>
                            {formattedDate && (
                                <p className="text-gray-300">{formattedDate}</p>
                            )}
                            <p className="text-gray-400 mt-2 text-lg">{event.description}</p>
                        </div>
                        <div className="mt-8">
                            <Link href={event.link} target="_blank">
                                <button className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform hover:shadow-xl duration-200 font-semibold text-xl">
                                    Join Now
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:block md:w-1/2 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full w-full"
                        >
                            <Image
                                src={event.image}
                                alt={event.name}
                                fill
                                className="object-cover rounded-tr-3xl shadow-2xl"
                                priority
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-bl-3xl rounded-tr-3xl pointer-events-none" />
                    </div>
                </div>
            </section>

            <CommunitySections />
        </motion.main>
    );
}

function AnimatedSparkles() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-6 left-8 w-12 h-12 bg-pink-400 rounded-full blur-2xl opacity-30"
            />
            <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1.2, 1.0, 1.2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 right-20 w-20 h-20 bg-red-600 rounded-full blur-2xl opacity-25"
            />
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1.1, 1.2, 1.1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-2 left-36 w-10 h-10 bg-yellow-400 rounded-full blur-2xl opacity-20"
            />
        </div>
    )
}

function CommunitySections() {
    return (
        <motion.section
            className="flex flex-col p-4 md:p-8 space-y-10 md:space-y-16 z-20 parallax"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Community */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 flex items-center gap-3">
                    Our Community
                </h1>
            </motion.div>
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8 md:gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-start text-left w-full md:w-1/2"
                >
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 p-2 md:p-6">Founder</h2>
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 p-2 md:p-6">
                        <Image
                            src="https://avatars.githubusercontent.com/u/180109164"
                            alt="TheusHen"
                            width={96}
                            height={96}
                            className="rounded-xl border-2 border-red-700 shadow-md w-20 h-20 md:w-32 md:h-32"
                        />
                        <div className="flex flex-col justify-center mt-2 sm:mt-0">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-white">TheusHen</h3>
                            <div className="mt-2 text-base md:text-lg text-gray-300 space-y-1">
                                <a
                                    href="https://www.theushen.me"
                                    className="flex items-center gap-2 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <LinkIcon size={18} /> www.theushen.me
                                </a>
                                <a
                                    href="mailto:codelong@proton.me"
                                    className="flex items-center gap-2 hover:underline"
                                >
                                    <Mail size={18} /> codelong@proton.me
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 md:space-x-4 mt-3 md:mt-4 text-xl md:text-2xl">
                                <a
                                    href="https://github.com/theushen"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-75"
                                >
                                    <Github size={24} />
                                </a>
                                <a
                                    href="mailto:codelong@proton.me"
                                    className="hover:opacity-75"
                                >
                                    <Mail size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="rounded-xl p-6 shadow-md w-full md:w-[34rem] md:ml-auto md-0 mt-8 mr-12 bg-gradient-to-br from-black via-neutral-900 to-gray-900 border border-gray-800"
                >
                    <iframe
                        src="https://discord.com/widget?id=1346664147600932949&theme=dark"
                        width="150"
                        height="350"
                        frameBorder="0"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                        className="w-full rounded-lg"
                    ></iframe>
                </motion.div>
            </div>
        </motion.section>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const mainEvent = await getMainEvent();

        return {
            props: {
                event: mainEvent || null,
            },
        };
    } catch (error) {
        console.error("Error fetching event data:", error);
        return {
            props: {
                event: null,
            },
        };
    }
};