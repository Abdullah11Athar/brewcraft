'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Menu', href: '#menu' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 border-b border-[#3D2820]/60 backdrop-blur-xl pointer-events-none"
        style={{ backgroundColor: `rgba(10,3,0,${scrolled ? 0.92 : 0})`, opacity: bgOpacity }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" onClick={closeMenu} className="flex items-center gap-2 group">
          <div className="w-9 h-9 flex items-center justify-center">
            <img src="/logo.png" alt="BrewCraft Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <span className="text-[#F5E6D3] font-bold text-lg tracking-wide"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Brew<span className="text-[#4F9C8F]">Craft</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={closeMenu}
              className="text-[#C9B8A0] hover:text-[#F5E6D3] text-sm tracking-wide transition-colors duration-200 relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#4F9C8F] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#menu" onClick={closeMenu}
            className="px-5 py-2 bg-gradient-to-r from-[#4F9C8F] to-[#2d7a6e] text-white text-sm rounded-full font-medium hover:shadow-lg hover:shadow-[#4F9C8F]/30 transition-all duration-300">
            Order Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 md:hidden flex flex-col gap-[5px] p-2">
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-5 h-[2px] bg-[#F5E6D3] rounded-full"
              animate={{
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.3 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 md:hidden overflow-hidden bg-[#0a0300]/95 backdrop-blur-xl border-b border-[#3D2820]/50"
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={closeMenu}
              className="block w-full text-left text-[#C9B8A0] hover:text-[#F5E6D3] py-3 text-sm tracking-wide border-b border-[#3D2820]/30 transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#menu" onClick={closeMenu}
            className="mt-2 inline-block text-center px-5 py-3 bg-gradient-to-r from-[#4F9C8F] to-[#2d7a6e] text-white text-sm rounded-full font-medium">
            Order Now
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
