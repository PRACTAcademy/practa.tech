'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    useEffect(() => {
        gsap.from(".fade-in", {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: ".fade-in",
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none none",
            }
        });
    }, []);

    return (
        <div className="mt-15 ml-20 text-lg md:mt-10 md:ml-10 lg:mt-5 lg:ml-5">
            <h1 className={"font-bold text-3xl mt-5 fade-in"}>Who We Are</h1>
            <p className="fade-in">MITPA is an open-source educational community that connects students from all around the world by democratizing knowledge <br/> through technology and collaboration.</p>
            <h1 className={"font-bold text-3xl mt-5 fade-in"}>Our Mission</h1>
            <p className="fade-in">Our aim is to help students reach their full potential by providing free tools, interactive practice tests, and a collaborative <br/> environment designed to inspire academic growth.</p>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-10">
                <div>
                    <h1 className={"font-bold text-3xl mt-5 fade-in"}>How to Contribute</h1>
                    <p className="fade-in">You can contribute by:</p>
                    <ul className="list-disc pl-5 fade-in">
                        <li>Developing new features or fixing bugs</li>
                        <li>Creating educational content and resources</li>
                        <li>Translating content to make it accessible globally</li>
                        <li>Sharing feedback and ideas to improve the platform</li>
                        <li>Helping other students in the community</li>
                    </ul>
                    <p className="fade-in"><a href={"https://github.com/MITPA"} className={"text-blue-500 underline hover:text-blue-700"} target={"_blank"}>Join us on GitHub</a> to explore open issues, contribute to our repositories, or start something new.</p>
                </div>

                <div>
                    <h1 className={"font-bold text-3xl mt-5 fade-in"}>What We Offer:</h1>
                    <ul className="list-disc pl-5 fade-in">
                        <li>Practice exams with graphic results</li>
                        <li>Educational community blog content</li>
                        <li>Complete Discord bot</li>
                        <li>Interactive tools</li>
                        <li>Open community for everyone</li>
                        <li>100% Free & 100% Open Source</li>
                    </ul>
                    <p className="fade-in">And more! <a href={""} className={"text-blue-500 underline hover:text-blue-700"} target={"_blank"}>Join Here!</a></p>
                </div>
            </div>
        </div>
    );
}
