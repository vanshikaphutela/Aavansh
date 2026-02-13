import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservation' },
    { name: 'Order Online', path: '/order-online' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-black/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-black font-serif tracking-tight text-white flex items-center gap-1">
          <span className="text-orange-500">A</span>avansh
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold uppercase tracking-wider hover:text-orange-500 transition-colors ${isHome && !scrolled ? 'text-white/90' : 'text-gray-300'
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 ml-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-orange-400">Welcome, {user.name}</span>
                <button onClick={logout} className="text-xs font-bold text-gray-400 hover:text-white transition-colors">
                  LOGOUT
                </button>
                <Link to={`/${user.role}`} className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-orange-600 rounded-full hover:bg-orange-700 shadow-lg shadow-orange-900/20 transition-all transform hover:-translate-y-0.5">
                  Dashboard
                </Link>
              </div>
            ) : (
              <Link to="/login" className={`flex items-center gap-2 text-sm font-semibold hover:text-orange-500 transition-colors ${isHome && !scrolled ? 'text-white' : 'text-gray-300'
                }`}>
                <User size={18} /> Login
              </Link>
            )}

            <Link to="/cart" className={`relative transition-colors ${isHome && !scrolled ? 'text-white hover:text-orange-500' : 'text-gray-300 hover:text-orange-500'
              }`}>
              <ShoppingBag size={22} />
              <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-white">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800 absolute w-full left-0 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={toggleMenu} className="text-lg font-bold text-gray-300 hover:text-orange-500 uppercase tracking-widest">
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col gap-4 text-center w-full pt-4 border-t border-gray-800">
                  <span className="text-gray-500 text-sm">Signed in as {user.name}</span>
                  <Link to={`/${user.role}`} onClick={toggleMenu} className="w-full py-3 bg-orange-600 text-white font-bold rounded-none uppercase tracking-widest hover:bg-orange-700">Dashboard</Link>
                  <button onClick={() => { logout(); toggleMenu(); }} className="text-gray-400 text-sm uppercase font-bold hover:text-white">Logout</button>
                </div>
              ) : (
                <Link to="/login" onClick={toggleMenu} className="mt-4 px-8 py-3 border border-gray-700 text-white rounded-none uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full text-center font-bold">Staff Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
