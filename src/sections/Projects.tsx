'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    technologies: string[];
    link: string;
    baseDevelopment?: boolean;
};

const STATIC_PROJECTS: Project[] = [
    {
        _id: '1',
        title: 'PRAX - PDF Rendering and Assembly for Exams',
        description: 'A cross-platform Python tool to generate professional exams from YAML files. Outputs LaTeX or ready-to-print PDFs with a modern layout, GUI or CLI support, SHA-256 integrity check, and customizable design.',
        thumbnail: 'https://cdn.practa.tech/Prax.logo.png',
        technologies: ['Python', 'Tkinter', 'LaTeX', 'PyYAML', 'Pytest', 'GitHub Actions'],
        link: 'https://github.com/PRACTAcademy/PRAX',
        baseDevelopment: false
    },
    {
        _id: '2',
        title: 'ForgeAI - AI Automatic SE Generator',
        description: 'A smart backend tool that automatically generates structured exams using AI. Stores and manages questions in YAML, exports PDFs, and grows its dataset with every generation. Built with Python and Go for reliability and speed.',
        thumbnail: 'https://cdn.practa.tech/ForgeAI.logo.png',
        technologies: ['Python', 'Go', 'YAML', 'AI', 'S3 Storage'],
        link: 'https://github.com/PRACTAcademy/ForgeAI',
        baseDevelopment: true
    },
];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setProjects(STATIC_PROJECTS);

        if (sectionRef.current) {
            gsap.to(sectionRef.current, {
                y: -50,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }

        cardRefs.current.forEach((card, i) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        delay: 0.2 + i * 0.15,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    }
                );
            }
        });
    }, []);

    // Handler for "See Project" click
    const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, project: Project) => {
        if (project.baseDevelopment) {
            e.preventDefault();
            window.alert('Este projeto ainda está em desenvolvimento!\nO repositório ainda não existe ou está privado.');
        }
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative p-8 md:p-12 mt-20 text-lg z-20 rounded-3xl shadow-2xl border border-[#242424]/60 max-w-7xl mx-auto"
        >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-[#333] pb-6 mb-10 z-20 gap-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                    Open-Source Projects
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 z-20">
                {projects.map((project, i) => (
                    <div
                        key={project._id}
                        ref={el => { cardRefs.current[i] = el; }}
                        className="relative group border border-[#2c2b39] rounded-2xl p-5 shadow-lg overflow-hidden backdrop-blur-lg transition-transform duration-300 hover:scale-[1.03]"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-100 transition duration-300"
                             style={{ boxShadow: "0 4px 32px 0 #ff3977e0, 0 2px 8px 0 #1e90ffe0" }}
                        />
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold text-white">{project.title}</h2>
                        </div>
                        <div className="w-full aspect-[4/3] rounded-md overflow-hidden shadow-md mb-4 border-2 border-[#242424] flex items-center justify-center bg-transparent">
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                style={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                        <a
                            href={project.baseDevelopment ? "#" : project.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-block mt-2 text-sm font-semibold 
                                ${project.baseDevelopment
                                ? "text-gray-400 bg-gray-500/10 border border-gray-500/30 cursor-not-allowed"
                                : "text-red-400 bg-red-400/10 border border-red-400/30 hover:bg-red-500/20 hover:text-white transition-colors duration-200"
                            } rounded-md px-4 py-1 shadow`}
                            onClick={(e) => handleProjectClick(e, project)}
                            tabIndex={0}
                        >
                            {project.baseDevelopment ? "Em desenvolvimento" : "Ver Projeto"}
                        </a>
                        {project.technologies && (
                            <div className="flex flex-wrap mt-3 gap-2 text-xs">
                                {project.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-0.5 rounded-full bg-[#22223a] text-red-300 border border-red-400/20"
                                    >
                                        #{tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}