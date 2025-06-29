import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Github, Twitter, MessageSquare } from 'lucide-react';
import gsap from 'gsap';

const Footer = () => {
    const [showRedGlow, setShowRedGlow] = useState(false);
    const [showBetaMsg, setShowBetaMsg] = useState(false);

    const redBtnRef = useRef(null);
    const msgRef = useRef(null);
    const [msgKey, setMsgKey] = useState(0);

    // Glow and mysterious shimmer animation for the red button
    useEffect(() => {
        if (showRedGlow && redBtnRef.current) {
            gsap.fromTo(
                redBtnRef.current,
                { boxShadow: '0 0 0 0 rgba(255,0,0,0)' },
                {
                    boxShadow:
                        '0 0 32px 14px rgba(255, 0, 0, 0.5), 0 0 0 0 rgba(0,0,0,0)',
                    duration: 1.2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                }
            );
            // Mysterious shimmer
            gsap.to(redBtnRef.current, {
                backgroundPosition: '200% 0',
                duration: 2,
                repeat: -1,
                ease: 'linear',
            });
        } else {
            gsap.killTweensOf(redBtnRef.current);
            if (redBtnRef.current) {
                gsap.set(redBtnRef.current, { boxShadow: 'none' });
            }
        }
    }, [showRedGlow]);

    // Message animation: mysterious fade in, scale, and flicker
    useEffect(() => {
        if (showBetaMsg && msgRef.current) {
            // Flicker effect timeline
            const tl = gsap.timeline();
            tl.fromTo(
                msgRef.current,
                { opacity: 0, scale: 0.85, y: 40, filter: 'blur(6px)' },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.7,
                    ease: 'expo.out',
                }
            );
            tl.to(msgRef.current, { opacity: 0.72, duration: 0.12, yoyo: true, repeat: 2 }, '-=0.2');
            tl.to(msgRef.current, { opacity: 1, duration: 0.1 }, '-=0.05');
            // Flicker while visible
            gsap.to(msgRef.current, {
                opacity: 0.9 + Math.random() * 0.1,
                repeat: -1,
                yoyo: true,
                duration: 0.12,
                ease: 'power1.inOut',
            });
            return () => {
                gsap.killTweensOf(msgRef.current);
            };
        }
    }, [showBetaMsg, msgKey]);

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            setShowRedGlow(scrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleRedButtonClick = () => {
        setMsgKey((k) => k + 1); // update key to reset animation
        setShowBetaMsg(true);
        setTimeout(() => setShowBetaMsg(false), 3000);
    };

    return (
        <>
            <footer className="bg-black text-white pt-12 pb-16 relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">PRACTA</h3>
                            <p className="text-gray-400 text-sm">
                                Building an open-source educational community that connects students and developers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/#About" className="text-gray-400 hover:text-white text-sm">About</Link>
                                </li>
                                <li>
                                    <Link href="/#CountdownCalendar" className="text-gray-400 hover:text-white text-sm">Countdown</Link>
                                </li>
                                <li>
                                    <Link href="/#FAQ" className="text-gray-400 hover:text-white text-sm">FAQ</Link>
                                </li>
                                <li>
                                    <Link href="/#MakeTestExam" className="text-gray-400 hover:text-white text-sm">Test Exam</Link>
                                </li>
                                <li>
                                    <Link href="/#Feedback" className="text-gray-400 hover:text-white text-sm">Contact</Link>
                                </li>
                                <li>
                                    <Link href="https://docs.practa.tech" className="text-gray-400 hover:text-white text-sm" target="_blank" rel="noopener noreferrer">Docs</Link>
                                </li>
                                <li>
                                    <Link href="https://patreon.com/practa" className="text-gray-400 hover:text-white text-sm" target="_blank" rel="noopener noreferrer">Donate</Link>
                                </li>
                                <li>
                                    <Link href="https://dashboard.practa.tech" className="text-gray-400 hover:text-white text-sm" target="_blank" rel="noopener noreferrer">Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Get Involved</h4>
                            <ul className="space-y-2">
                                <li><Link href="https://github.com/orgs/PRACTAcademy/repositories" className="text-gray-400 hover:text-white text-sm">Contribute</Link></li>
                                <li><Link href="https://practa.tech/discord" className="text-gray-400 hover:text-white text-sm">Join Discord</Link></li>
                                <li><Link href="https://github.com/PRACTAcademy" className="text-gray-400 hover:text-white text-sm">GitHub</Link></li>
                                <li><Link href="https://patreon.com/PRACTA" className="text-gray-400 hover:text-white text-sm">Support Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Connect</h3>
                            <div className="flex space-x-4 mb-4">
                                <Link href="https://github.com/PRACTAcademy" className="text-gray-400 hover:text-white">
                                    <Github size={20} />
                                </Link>
                                <Link href="https://x.com/PRACTATech" className="text-gray-400 hover:text-white">
                                    <Twitter size={20} />
                                </Link>
                                <Link href="https://practa.tech/discord" className="text-gray-400 hover:text-white">
                                    <MessageSquare size={20} />
                                </Link>
                            </div>
                            <Link href="https://practasupport.slack.com" className="mitra-button inline-block">Support Slack</Link>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-gray-500 mb-4 md:mb-0">
                            © 2025 PRACTA. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link href="https://docs.practa.tech/docs" className="text-sm text-gray-500 hover:text-gray-400">Terms of Service</Link>
                            <Link href="https://docs.practa.tech/docs" className="text-sm text-gray-500 hover:text-gray-400">Privacy Policy</Link>
                            <Link href="https://docs.practa.tech/docs" className="text-sm text-gray-500 hover:text-gray-400">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
                {/* Mysterious Red Button */}
                <button
                    ref={redBtnRef}
                    type="button"
                    aria-label="Red Button"
                    onClick={handleRedButtonClick}
                    className={`pointer-events-auto transition-all duration-700 fixed left-1/2 z-30 outline-none border-none focus:ring-2 focus:ring-red-600 ${showRedGlow ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        transform: 'translateX(-50%)',
                        bottom: 12,
                        width: '120px',
                        height: '36px',
                        borderRadius: '9999px',
                        background:
                            'radial-gradient(ellipse at center, rgba(255,0,0,0.58) 0%, rgba(255,0,0,0.12) 60%, rgba(0,0,0,0) 100%), repeating-linear-gradient(120deg, rgba(255, 0, 60, 0.13), rgba(255,0,60,0.09) 10px, transparent 12px, transparent 18px)',
                        backgroundSize: '200% 100%',
                        boxShadow: showRedGlow
                            ? '0 0 32px 14px rgba(255, 0, 0, 0.5), 0 0 0 0 rgba(0,0,0,0)'
                            : 'none',
                        border: 'none',
                        cursor: showRedGlow ? 'pointer' : 'default',
                        outline: 'none',
                        transition: 'opacity 0.7s, box-shadow 0.7s',
                        color: '#fff',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        textShadow: '0 0 10px rgba(255,0,0,0.31)',
                        overflow: 'hidden',
                        position: 'fixed',
                        zIndex: 30,
                    }}
                    tabIndex={showRedGlow ? 0 : -1}
                >
                    <span
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            textTransform: 'uppercase',
                            fontFamily: 'monospace',
                            letterSpacing: '0.13em',
                            filter: 'drop-shadow(0 0 2px #ff0000)',
                            animation: showRedGlow
                                ? 'mystery-pulse 1.7s infinite alternate'
                                : 'none',
                        }}
                    >
                        ?
                    </span>
                    {/* Animated "mystery fog" overlay */}
                    <span
                        aria-hidden
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            pointerEvents: 'none',
                            background:
                                'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.09) 0%, transparent 90%)',
                            mixBlendMode: 'screen',
                            opacity: 0.7,
                            animation: showRedGlow ? 'mystery-fog 2.8s infinite alternate' : 'none',
                        }}
                    />
                </button>
                {/* Mysterious Beta Message */}
                {showBetaMsg && (
                    <div
                        ref={msgRef}
                        key={msgKey}
                        style={{
                            position: 'fixed',
                            left: '50%',
                            bottom: '60px',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(90deg, #2a010a 0%, #12000c 100%)',
                            color: '#fff',
                            padding: '14px 32px',
                            borderRadius: '16px',
                            zIndex: 40,
                            fontSize: '1.07rem',
                            fontWeight: 500,
                            boxShadow: '0 2px 18px 2px rgba(255,0,60,0.13), 0 2px 12px rgba(0,0,0,0.22)',
                            letterSpacing: '0.06em',
                            textAlign: 'center',
                            border: '1.7px solid rgba(255,0,60,0.14)',
                            filter: 'drop-shadow(0 0 8px #ff0044bb)',
                            overflow: 'hidden',
                            userSelect: 'none',
                            pointerEvents: 'none',
                        }}
                    >
                        <span
                            style={{
                                position: 'relative',
                                zIndex: 3,
                                background: 'linear-gradient(90deg, #fff 10%, #ff3255 70%, #fff 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 12px #ff003333',
                                fontFamily: 'monospace',
                                letterSpacing: '0.13em',
                                filter: 'drop-shadow(0 0 2px #ff0000)',
                            }}
                        >
                            Wait for the Beta to be released to find out what&#39;s waiting for you here
                        </span>
                        {/* Fading red light effect */}
                        <span
                            aria-hidden
                            style={{
                                position: 'absolute',
                                left: '-10%',
                                top: 0,
                                width: '120%',
                                height: '100%',
                                background:
                                    'radial-gradient(ellipse at 50% 100%, rgba(255,0,60,0.12) 0%, transparent 70%)',
                                animation: 'beta-fog 3.2s infinite alternate',
                                zIndex: 2,
                                pointerEvents: 'none',
                                mixBlendMode: 'screen',
                            }}
                        />
                    </div>
                )}
            </footer>
            <style>
                {`
                @keyframes mystery-pulse {
                    0% { filter: drop-shadow(0 0 2px #ff0000); }
                    100% { filter: drop-shadow(0 0 8px #ff0044) brightness(1.2); }
                }
                @keyframes mystery-fog {
                    0% { opacity: 0.7; }
                    100% { opacity: 0.4; }
                }
                @keyframes beta-fog {
                    0% { opacity: 0.13; }
                    100% { opacity: 0.32; }
                }
                `}
            </style>
        </>
    );
};

export default Footer;
