'use client';

import Image from 'next/image';

export default function SEs() {

    return (
        <div className="flex items-start mt-15 ml-20 text-lg gap-8">
            <div className="w-1/2">
                <h1 className="font-bold text-3xl mt-25 fade-in">Simulated Exams</h1>
                <p>
                    SEs (Simulated Exams) are high-quality practice tests designed<br />
                    to help students prepare for competitive and international exams<br />
                    such as the SAT, ACT, PSAT, Cambridge English Test, and others.<br />
                    Each SE is carefully built using curated and adapted questions<br />
                    from multiple sources, then formatted using the unique MITPA<br />
                    Style — a clean, structured layout that mirrors the feel of official
                </p>
            </div>

            <div className="w-1/2 -mt-20">
                <Image
                    src="https://cdn-mitpa-tech.vercel.app/SE_mockup.logo.png"
                    alt="SE Mockup"
                    width={780}
                    height={631}
                />
            </div>
        </div>
    );
}
