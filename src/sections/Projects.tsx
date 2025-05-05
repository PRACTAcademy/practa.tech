'use client';

import { useEffect, useState } from 'react';
import { getProjects } from '@/Sanity/sanity';
import { motion } from "framer-motion";
import { gsap } from "gsap";

type Project = {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    technologies: string[];
    link: string;
};

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch(console.error);

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

    return (
        <motion.section
            className="text-white p-6 mt-15 text-lg z-20 parallax"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6 z-20">
                <h1 className="text-5xl font-bold mb-4">Open-Source Projects</h1>
                <a href="#" className="text-sm text-gray-300 hover:underline flex items-center">
                    See More <span className="ml-1">→</span>
                </a>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 z-20"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-[#111] border border-red-500 rounded-xl p-4 shadow-lg"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold">{project.title}</h2>
                            <div className="w-4 h-4 bg-blue-600 rounded-sm" />
                        </div>

                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-md mb-3"
                        />

                        <p className="text-sm mb-2">{project.description}</p>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 underline text-sm"
                        >
                            View Project
                        </a>

                        {project.technologies && (
                            <div className="flex flex-wrap mt-2 gap-1 text-xs text-red-400">
                                {project.technologies.map((tech, idx) => (
                                    <span key={idx}>#{tech}</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </motion.div>
        </motion.section>
    );
}
