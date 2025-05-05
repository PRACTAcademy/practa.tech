'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Home from '@/sections/Home';
import About from '@/sections/About';
import FAQ from '@/sections/FAQ';
import SEs from '@/sections/SEs';
import Footer from '@/components/Footer';
import { getMainEvent } from '@/Sanity/sanity';
import './globals.css'

export default function App() {
    const [, setMainEvent] = useState(null);

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
        }}>
            <Navbar />
            <main style={{
                flex: 1,
                width: '100%',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
            }}>
                <Home />
                <About />
                <FAQ />
                <SEs />
            </main>
            <Footer />
        </div>
    );
}