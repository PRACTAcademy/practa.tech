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
    }, []);

    if (state.succeeded) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center min-h-screen p-6 parallax"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mt-10 mb-10 text-center">
                    thank you <br /> for <br /> your feedback
                </h1>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen p-4 md:p-6 parallax"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-20 lg:space-x-40 w-full max-w-5xl mx-auto">
                <h1 className="text-7xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center md:text-left mt-10 md:mt-20 mb-6 md:mb-0">
                    give us <br /> your <br /> feedback
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-[400px] sm:max-w-[500px] bg-white p-4 sm:p-8 rounded-lg shadow-md space-y-4 sm:space-y-8"
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