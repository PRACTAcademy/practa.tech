'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Home from '@/sections/Home';
import About from '@/sections/About';
import CountdownCalendar from '@/sections/CountdownCalendar';
import Projects from '@/sections/Projects';
import Community from '@/sections/Community';
import Feedback from '@/sections/Feedback';
import MakeTestExam from '@/sections/TestSe';
import FAQ from '@/sections/FAQ';
import SEs from '@/sections/SEs';
import Footer from '@/components/Footer';
import WhyPRACTA from '@/components/WhyPRACTA';
import { getMainEvent } from '@/Sanity/sanity';
import Particles from '@/components/Particles';
import './globals.css'

export default function App() {
    const [mainEvent, setMainEvent] = useState(null);

    useEffect(() => {
        getMainEvent().then(data => setMainEvent(data));
    }, []);

    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.width = '100vw';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.width = '100vw';
        document.documentElement.style.minHeight = '100vh';
        document.documentElement.style.overflowX = 'hidden';
        return () => {
            document.body.style.overflowX = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.body.style.width = '';
            document.body.style.minHeight = '';
            document.documentElement.style.width = '';
            document.documentElement.style.minHeight = '';
            document.documentElement.style.overflowX = '';
        };
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        }}>
            <Navbar />
            <main style={{
                flex: 1,
                width: '100%',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                position: 'relative',
            }}>
                <section id="Home">
                    <Home />
                </section>
                <div style={{ position: 'relative', width: '100%', minHeight: 0 }}>
                    <Particles
                        particleCount={90}
                        style={{
                            zIndex: 0,
                            pointerEvents: 'none',
                            minHeight: '2000px',
                            maxHeight: 'none',
                        }}
                    />
                    <section id="WhyPRACTA">
                        <WhyPRACTA />
                    </section>
                    <section id="About">
                        <About />
                    </section>
                    <section id="CountdownCalendar">
                        <CountdownCalendar />
                    </section>
                    <section id="Projects">
                        <Projects />
                    </section>
                    <section id="Community">
                        <Community event={mainEvent} />
                    </section>
                    <section id="SEs">
                        <SEs />
                    </section>
                    <section id="FAQ">
                        <FAQ />
                    </section>
                    <section id="MakeTestExam">
                        <MakeTestExam />
                    </section>
                    <section id="Feedback">
                        <Feedback />
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}