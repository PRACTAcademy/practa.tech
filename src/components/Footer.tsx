import { Github, Twitter, MessageSquare, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">MITPA</h3>
                        <p className="text-gray-400 text-sm">
                            Building an open-source educational community that connects students, teachers and developers.
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
                        © 2025 MITRA. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#terms" className="text-sm text-gray-500 hover:text-gray-400">Terms of Service</a>
                        <a href="#privacy" className="text-sm text-gray-500 hover:text-gray-400">Privacy Policy</a>
                        <a href="#cookies" className="text-sm text-gray-500 hover:text-gray-400">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;