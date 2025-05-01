'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Footer from '@/components/Footer';
import Feedback from '@/pages/Feedback';
import SEs from '@/pages/SEs';
import Projects from '@/pages/Projects';
import BlogFeed from '@/pages/BlogPage';
import Community from '@/pages/Community';
import MakeTestExam from '@/pages/TestSe';
import { getMainEvent } from '@/Sanity/sanity';

export default function App() {
    const [mainEvent, setMainEvent] = useState(null);

    useEffect(() => {
        getMainEvent().then(data => setMainEvent(data));
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <Home />
                <About />
                <BlogFeed />
                <Projects />
                <Community event={mainEvent} />
                <SEs />
                <FAQ />
                <MakeTestExam />
                <Feedback />
                <Footer />
            </div>
        </>
    );
}
