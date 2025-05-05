import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Mail, Link as LinkIcon, Users } from 'lucide-react';
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
        // If no event, don't render any event-related section (no "not available" message).
        return (
            <motion.main
                className="min-h-screen text-white z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Render the rest of the page (community, contributors, etc.) */}
                <CommunitySections />
            </motion.main>
        );
    }

    return (
        <motion.main
            className="min-h-screen text-white z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <section className="flex items-center justify-center p-6 z-20 parallax">
                <div className="max-w-5xl w-full flex rounded-lg overflow-hidden border border-red-900">
                    {/* Texto */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-white text-2xl font-bold mb-2">{event.name}</h1>
                            {formattedDate && (
                                <p className="text-gray-300">{formattedDate}</p>
                            )}
                            <p className="text-gray-400 mt-2">{event.description}</p>
                        </div>
                        <div className="mt-8">
                            <Link href={event.link} target="_blank">
                                <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
                                    Join Now
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:block w-1/2 relative h-[350px]">
                        <Image
                            src={event.image}
                            alt={event.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <CommunitySections />
        </motion.main>
    );
}

// Extracted the community/contributors/hall of fame sections for DRY
function CommunitySections() {
    return (
        <motion.section
            className="flex flex-col p-6 space-y-8 z-20 parallax"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
        >
            <div>
                <h1 className="text-5xl font-extrabold">Our Community</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
                <div className="flex flex-col items-start text-left">
                    <h2 className="text-5xl font-bold mb-6">Founder</h2>
                    <div className="flex items-start gap-6">
                        <Image
                            src="https://avatars.githubusercontent.com/u/180109164"
                            alt="TheusHen"
                            width={128}
                            height={128}
                            className="rounded-xl"
                        />
                        <div className="flex flex-col justify-center">
                            <h3 className="text-4xl font-extrabold">TheusHen</h3>
                            <div className="mt-2 text-lg text-gray-300 space-y-1">
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
                            <div className="flex items-center space-x-4 mt-4 text-2xl">
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
                </div>

                <div className="rounded-xl p-6 shadow-md w-full md:w-[38rem] bg-zinc-900 md:ml-auto md:mr-0 mt-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Users size={28} className="text-blue-400" />
                        <h4 className="text-2xl font-semibold">Our Contributors</h4>
                    </div>
                    <p className="text-gray-300 mb-4">
                        Meet the amazing people who help build and improve this project.
                    </p>
                    <a
                        href="https://github.com/MITPAcademy/.github/blob/main/contributors.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-center w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                    >
                        View Contributors
                    </a>
                </div>
            </div>

            <div className="py-20">
                <h2 className="text-5xl font-bold mb-6">Hall of Fame</h2>
                <p className="text-xl text-black italic text-center mt-32">Coming soon...</p>
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