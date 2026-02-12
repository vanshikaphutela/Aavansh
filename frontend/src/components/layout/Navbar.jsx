import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservation' },
    { name: 'Order Online', path: '/order-online' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-8 py-4 bg-white/70 backdrop-blur-lg border-b border-white/30 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-serif text-orange-600">
          Aavansh
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="font-medium relative group hover:text-orange-600 transition-colors">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">Hi, {user.name}</span>
              <button onClick={logout} className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors">
                Logout
              </button>
              <Link to={`/${user.role}`} className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-full hover:bg-orange-700 shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5">
                Dashboard
              </Link>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
              <User size={16} /> Staff Login
            </Link>
          )}

          <Link to="/cart" className="relative text-gray-700 hover:text-orange-600 transition-colors">
            <ShoppingBag size={24} />
            <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
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
            className="overflow-hidden bg-white border-t mt-4"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={toggleMenu} className="text-lg font-medium hover:text-orange-600">
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col gap-4 text-center w-full">
                  <span className="text-gray-600">Signed in as {user.name}</span>
                  <Link to={`/${user.role}`} onClick={toggleMenu} className="w-full py-2 bg-orange-600 text-white rounded-full">Go to Dashboard</Link>
                  <button onClick={() => { logout(); toggleMenu(); }} className="w-full py-2 border border-red-200 text-red-600 rounded-full">Logout</button>
                </div>
              ) : (
                <Link to="/login" onClick={toggleMenu} className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50">Staff Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
