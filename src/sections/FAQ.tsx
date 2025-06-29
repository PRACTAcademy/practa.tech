"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
    const rootRef = useRef<HTMLDivElement>(null);

    const faqs = [
        {
            question: "How do I join the PRACTA community?",
            answer: "You can join our community by signing up on our website, joining our Discord server, or contributing to one of our open-source projects on GitHub."
        },
        {
            question: "Are all the resources really free?",
            answer: "Yes, all educational resources, practice exams, and community features on PRACTA are completely free. We believe in democratizing education for everyone."
        },
        {
            question: "How can I contribute to the project?",
            answer: "You can contribute by creating test questions, reviewing content, translating materials, reporting bugs, suggesting features, or sharing PRACTA with others."
        },
        {
            question: "What types of exams are available?",
            answer: "We offer practice exams for various technical certifications, academic subjects, language proficiency tests, and professional qualifications."
        },
        {
            question: "Do I need to create an account to use PRACTA?",
            answer: "While some features are available without an account, creating a free account gives you access to track your progress, save exam results, and participate in the community."
        },
        {
            question: "How accurate are the practice exams?",
            answer: "Our exams are created and reviewed by subject matter experts and experienced educators to ensure they closely match the format and difficulty of actual exams."
        }
    ];

    useEffect(() => {
        if (!rootRef.current) return;

        const isMobile = window.innerWidth <= 768;

        // Fade-in for FAQ section heading
        gsap.from(rootRef.current.querySelector(".faq-heading"), {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: rootRef.current.querySelector(".faq-heading"),
                start: isMobile ? "top 90%" : "top 80%",
                end: isMobile ? "top 50%" : "top 30%",
                toggleActions: "play none none none",
            },
        });

        // Fade-in/slide for each FAQ item
        gsap.utils.toArray<Element>(".faq-item").forEach((el, i) => {
            gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                delay: i * 0.10,
                scrollTrigger: {
                    trigger: el,
                    start: isMobile ? "top 95%" : "top 85%",
                    toggleActions: "play none none none",
                },
            });
        });

        // Parallax for FAQ section
        gsap.utils.toArray<Element>(".faq-parallax").forEach((el) => {
            gsap.to(el, {
                yPercent: isMobile ? -5 : -10,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    scrub: true,
                },
            });
        });

        // Clean up on unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            id="faq"
            ref={rootRef}
            className="mitpa-section relative z-10"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="mitpa-heading font-bold text-4xl faq-heading faq-parallax">
                    FAQ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.slice(0, 3).map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-b border-white/10 faq-item"
                            >
                                <AccordionTrigger className="text-left hover:text-mitpa-red">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="w-full">
                        {faqs.slice(3, 6).map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index + 3}`}
                                className="border-b border-white/10 faq-item"
                            >
                                <AccordionTrigger className="text-left hover:text-mitpa-red">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            <div className="h-[100px]" />
        </section>
    );
};

export default FAQ;
