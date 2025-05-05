"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Hide nav options on mobile, show menu icon. On desktop show nav links.
    return (
        <nav className="sticky top-0 z-50 bg-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
            <Link href="/">
                <Image
                    src="/Logo.png"
                    alt="MITPA Logo"
                    width={1198}
                    height={429}
                    className="object-contain h-10 w-auto"
                    priority
                />
            </Link>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-5 text-sm text-gray-700">
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
                <Link href="/faq" className="hover:underline">FAQ</Link>
                <Link href="/test-exam" className="hover:underline">Test Exam</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
                <Link href="/docs" className="hover:underline">Docs</Link>
                <Link href="/donate">
                    <button className="border border-black rounded-md px-3 py-1 hover:bg-black hover:text-white transition">Donate</button>
                </Link>
                <Link href="/dashboard">
                    <button className="bg-black text-white rounded-md px-3 py-1 hover:bg-gray-800 transition">Dashboard</button>
                </Link>
            </div>
            {/* Mobile Nav */}
            <div className="md:hidden flex items-center">
                <button
                    aria-label="Open Menu"
                    className="focus:outline-none"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <Menu size={32} />
                </button>
                {/* Overlay menu */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-50"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div
                            className="absolute top-0 right-0 bg-black w-4/5 max-w-xs h-full shadow-lg flex flex-col space-y-4 py-8 px-6 text-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="self-end mb-4 text-2xl"
                                aria-label="Close menu"
                                onClick={() => setMenuOpen(false)}
                            >&times;</button>
                            <Link href="/about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
                            <Link href="/blog" className="hover:underline" onClick={() => setMenuOpen(false)}>Blog</Link>
                            <Link href="/faq" className="hover:underline" onClick={() => setMenuOpen(false)}>FAQ</Link>
                            <Link href="/test-exam" className="hover:underline" onClick={() => setMenuOpen(false)}>Test Exam</Link>
                            <Link href="/contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</Link>
                            <Link href="/docs" className="hover:underline" onClick={() => setMenuOpen(false)}>Docs</Link>
                            <Link href="/donate" onClick={() => setMenuOpen(false)}>
                                <button className="border border-white rounded-md px-3 py-1 hover:bg-black hover:text-white w-full text-left mt-2">Donate</button>
                            </Link>
                            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                                <button className="bg-white text-black rounded-md px-3 py-1 hover:bg-gray-800 w-full text-left mt-2">Dashboard</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}