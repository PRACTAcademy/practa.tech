'use client';

import { useRef } from 'react';

export default function SEs() {
    const rootRef = useRef<HTMLDivElement>(null);

    return (
        <div
            id="ses"
            ref={rootRef}
            className={`
                flex flex-col md:flex-row items-center md:items-start justify-center
                w-full text-lg gap-8 px-2 py-10
                relative
            `}
            style={{ minHeight: '80vh' }}
        >
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start">
                <h1
                    className="
                        font-bold ses-heading
                        text-4xl md:text-5xl mb-5
                        drop-shadow-lg
                        text-center md:text-left
                    "
                >
                    Simulated Exams
                </h1>
                <div
                    className="
                        ses-paragraph
                        rounded-lg p-5 md:p-6
                        bg-transparent
                        shadow-lg
                        text-base md:text-lg
                        leading-relaxed md:leading-loose
                        text-center md:text-left
                        max-w-2xl
                    "
                >
                    <span className="block mb-2 font-semibold text-lg md:text-xl">
                        Prepare for success!
                    </span>
                    <span>
                        The <b>SEs (Simulated Exams)</b> are high-quality simulations designed for students who want to excel in competitive and international exams.
                    </span>
                    <ul className="my-4 list-none md:list-disc md:ml-8 text-sm md:text-base grid gap-2 md:block">
                        <li> SAT, ACT, PSAT, Cambridge English Test, and others</li>
                        <li> Carefully selected and adapted questions from various sources</li>
                        <li> PRACTA Style Formatting: clean and structured</li>
                    </ul>
                    <span>
                        Test your knowledge, practice with confidence, and achieve your academic goals!
                    </span>
                </div>
            </div>

            <div className="hidden md:flex w-full md:w-1/3 mt-10 md:mt-0 justify-center items-center ses-image">
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <iframe
                        src="/EXAM-BETA-001.pdf"
                        title="Simulated Exam PDF"
                        className="w-full h-full"
                        style={{
                            border: 'none',
                            borderRadius: '0',
                            background: 'white',
                            width: '100vw',
                            height: '80vh',
                        }}
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}