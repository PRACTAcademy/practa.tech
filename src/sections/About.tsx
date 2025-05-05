"use client";

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;

        // Fade-in animation
        gsap.utils.toArray<Element>('.fade-in').forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: isMobile ? 'top 90%' : 'top 80%',
                    end: isMobile ? 'top 50%' : 'top 30%',
                    toggleActions: 'play none none none',
                },
            });
        });

        // Parallax effect for titles
        gsap.utils.toArray<Element>('.parallax-title').forEach((el) => {
            gsap.to(el, {
                yPercent: isMobile ? -10 : -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    scrub: true,
                },
            });
        });

        // Parallax effect for paragraphs
        gsap.utils.toArray<Element>('.parallax-content').forEach((el) => {
            gsap.to(el, {
                yPercent: isMobile ? -5 : -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    scrub: true,
                },
            });
        });
    }, []);

    return (
        <div className="mt-10 ml-4 md:ml-20 text-base md:text-lg max-w-4xl mx-auto px-2 md:px-0">
            <h1 className="font-bold text-2xl md:text-3xl mt-5 fade-in parallax-title">Who We Are</h1>
            <p className="fade-in parallax-content mt-2">
                MITPA is an open-source educational community that connects students from all around the world by democratizing knowledge <br className="hidden md:inline" /> through technology and collaboration.
            </p>

            <h1 className="font-bold text-2xl md:text-3xl mt-8 fade-in parallax-title">Our Mission</h1>
            <p className="fade-in parallax-content mt-2">
                Our aim is to help students reach their full potential by providing free tools, interactive practice tests, and a collaborative <br className="hidden md:inline" /> environment designed to inspire academic growth.
            </p>

            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10 mt-8">
                <div className="flex-1">
                    <h1 className="font-bold text-2xl md:text-3xl mt-5 fade-in parallax-title">How to Contribute</h1>
                    <p className="fade-in parallax-content mt-2">You can contribute by:</p>
                    <ul className="list-disc pl-5 fade-in parallax-content">
                        <li>Developing new features or fixing bugs</li>
                        <li>Creating educational content and resources</li>
                        <li>Translating content to make it accessible globally</li>
                        <li>Sharing feedback and ideas to improve the platform</li>
                        <li>Helping other students in the community</li>
                    </ul>
                    <p className="fade-in parallax-content mt-2">
                        <a href="https://github.com/MITPA" className="text-blue-500 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                            Join us on GitHub
                        </a> to explore open issues, contribute to our repositories, or start something new.
                    </p>
                </div>

                <div className="flex-1">
                    <h1 className="font-bold text-2xl md:text-3xl mt-5 fade-in parallax-title">What We Offer:</h1>
                    <ul className="list-disc pl-5 fade-in parallax-content">
                        <li>Practice exams with graphic results</li>
                        <li>Educational community blog content</li>
                        <li>Complete Discord bot</li>
                        <li>Interactive tools</li>
                        <li>Open community for everyone</li>
                        <li>100% Free &amp; 100% Open Source</li>
                    </ul>
                    <p className="fade-in parallax-content mt-2">
                        And more! <a href="#" className="text-blue-500 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">Join Here!</a>
                    </p>
                </div>
            </div>
            <div className="h-[100px]" />
        </div>
    );
}