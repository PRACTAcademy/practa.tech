import React, { useEffect, useState } from 'react';
import { Github, Twitter, MessageSquare, Facebook } from 'lucide-react';
import TunnelAnimation from '../components/TunnelAnimation';

const Footer = () => {
    const [showRedGlow, setShowRedGlow] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

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
        setShowAnimation(true); // Ativa a animação ao clicar no botão.
    };

    return (
        <>
            <footer className="bg-black text-white pt-12 pb-16 relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">MITPA</h3>
                            <p className="text-gray-400 text-sm">
                                Building an open-source educational community that connects students and developers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#about" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                                <li><a href="#projects" className="text-gray-400 hover:text-white text-sm">Projects</a></li>
                                <li><a href="#community" className="text-gray-400 hover:text-white text-sm">Community</a></li>
                                <li><a href="#exams" className="text-gray-400 hover:text-white text-sm">Practice Exams</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Get Involved</h4>
                            <ul className="space-y-2">
                                <li><a href="#contribute" className="text-gray-400 hover:text-white text-sm">Contribute</a></li>
                                <li><a href="#discord" className="text-gray-400 hover:text-white text-sm">Join Discord</a></li>
                                <li><a href="#github" className="text-gray-400 hover:text-white text-sm">GitHub</a></li>
                                <li><a href="#donate" className="text-gray-400 hover:text-white text-sm">Support Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4 mb-4">
                                <a href="#github" className="text-gray-400 hover:text-white">
                                    <Github size={20} />
                                </a>
                                <a href="#twitter" className="text-gray-400 hover:text-white">
                                    <Twitter size={20} />
                                </a>
                                <a href="#discord" className="text-gray-400 hover:text-white">
                                    <MessageSquare size={20} />
                                </a>
                                <a href="#facebook" className="text-gray-400 hover:text-white">
                                    <Facebook size={20} />
                                </a>
                            </div>
                            <a href="#newsletter" className="mitra-button inline-block">Subscribe</a>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-gray-500 mb-4 md:mb-0">
                            © 2025 MITPA. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <a href="#terms" className="text-sm text-gray-500 hover:text-gray-400">Terms of Service</a>
                            <a href="#privacy" className="text-sm text-gray-500 hover:text-gray-400">Privacy Policy</a>
                            <a href="#cookies" className="text-sm text-gray-500 hover:text-gray-400">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Luz vermelha"
                    onClick={handleRedButtonClick}
                    className={`pointer-events-auto transition-all duration-700 fixed left-1/2 z-30 outline-none border-none focus:ring-2 focus:ring-red-600 ${showRedGlow ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        transform: 'translateX(-50%)',
                        bottom: 12,
                        width: '120px',
                        height: '36px',
                        borderRadius: '9999px',
                        background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.5) 0%, rgba(255,0,0,0.13) 60%, rgba(0,0,0,0) 100%)',
                        boxShadow: showRedGlow
                            ? '0 0 24px 8px rgba(255, 0, 0, 0.35), 0 0 0 0 rgba(0,0,0,0)'
                            : 'none',
                        border: 'none',
                        cursor: showRedGlow ? 'pointer' : 'default',
                        outline: 'none',
                        transition: 'opacity 0.7s, box-shadow 0.7s'
                    }}
                    tabIndex={showRedGlow ? 0 : -1}
                />
            </footer>

            {/* Componente TunnelAnimation com estado ativo */}
            <TunnelAnimation
                active={showAnimation}
                destination="/trailer"
            />
        </>
    );
};

export default Footer;