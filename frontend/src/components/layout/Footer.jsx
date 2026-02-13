import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-12 pb-8 font-sans relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-3xl font-black font-serif tracking-tight text-white flex items-center gap-1">
                            <span className="text-orange-500">A</span>avansh
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Experience the symphony of flavors where tradition meets modern culinary art. Aavansh isn't just a restaurant; it's a memory in the making.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all transform hover:-translate-y-1">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold font-sans mb-4 text-orange-400 tracking-widest uppercase">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {['Menu', 'About Us', 'Reservations', 'Order Online', 'Gift Cards', 'Careers'].map(item => (
                                <li key={item}>
                                    <Link to="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold font-sans mb-4 text-orange-400 tracking-widest uppercase">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-4 text-gray-400 group">
                                <div className="p-1.5 bg-gray-900 rounded-lg group-hover:text-orange-500 transition-colors"><MapPin size={16} /></div>
                                <span>123 Culinary Avenue,<br />Gourmet District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400 group">
                                <div className="p-1.5 bg-gray-900 rounded-lg group-hover:text-orange-500 transition-colors"><Phone size={16} /></div>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400 group">
                                <div className="p-1.5 bg-gray-900 rounded-lg group-hover:text-orange-500 transition-colors"><Mail size={16} /></div>
                                <span>hello@aavansh.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold font-sans mb-4 text-orange-400 tracking-widest uppercase">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and updates.</p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-600 transition-colors placeholder-gray-600 font-medium"
                            />
                            <button className="w-full py-3 bg-white text-black text-sm font-bold rounded-xl uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
                    <p>&copy; 2024 Aavansh Restaurant. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
