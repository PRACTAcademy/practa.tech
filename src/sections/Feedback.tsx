'use client';

import { useForm, ValidationError } from '@formspree/react';
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect } from "react";

export default function Feedback() {
    const [state, handleSubmit] = useForm("yourFormID");

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

        // Additional animations using gsap
        gsap.from(".fade-in-left", {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".fade-in-left",
                start: "top 80%",
                end: "top 50%",
                scrub: true,
            },
        });

        gsap.from(".fade-in-right", {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".fade-in-right",
                start: "top 80%",
                end: "top 50%",
                scrub: true,
            },
        });
    }, []);

    if (state.succeeded) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center min-h-screen p-6 parallax"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-8xl font-bold mt-25 mb-10 ml-35 text-center">
                    thank you <br /> for <br /> your feedback
                </h1>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen p-6 parallax"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="flex flex-row items-start space-x-80">
                <h1 className="text-8xl font-bold text-left mt-20">
                    give us <br /> your <br /> feedback
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="w-[500px] bg-white p-8 rounded-lg shadow-md space-y-8"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Surname</label>
                        <input
                            id="surname"
                            type="text"
                            name="surname"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </div>

                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
