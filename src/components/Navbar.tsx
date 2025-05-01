'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
            <Link href="/" className="flex items-center space-x-1">
                <Image
                    src="https://raw.githubusercontent.com/MITPAcademy/.github/refs/heads/main/assets/logo.png"
                    alt="MITPA Logo"
                    width={150}
                    height={150}
                />
            </Link>

            <div className="flex items-center space-x-5 text-sm text-gray-700 ">
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
        </nav>
    );
}

