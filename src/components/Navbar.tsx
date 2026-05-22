import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Layers, Layout, MessageSquare, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import AdminAuthModal from './AdminAuthModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about', icon: Info },
    { name: 'Services', href: '/#services', icon: Layers },
    { name: 'How It Works', href: '/#methodology', icon: Layout },
    { name: 'Contact', href: '/#contact', icon: MessageSquare },
    { name: 'Client Portal', href: '/client-portal', icon: Briefcase },
  ];

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 rounded-full flex items-center justify-between ${
          isScrolled 
            ? 'top-4 w-[95%] max-w-6xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-3 px-6' 
            : 'top-6 w-[95%] max-w-6xl bg-white/90 backdrop-blur-lg border border-slate-200 py-4 px-8 shadow-lg'
        }`}
      >
        {/* Logo */}
        <button 
          onClick={() => setAdminModalOpen(true)}
          className="relative flex items-center justify-center h-10 group transition-transform hover:scale-105 outline-none"
        >
          <img 
            src="https://i.ibb.co/383LZ6G/IMG-0609.png" 
            alt="Prime Digital Solutions Logo" 
            className="h-full w-auto object-contain brightness-0 contrast-100 opacity-90 drop-shadow-sm transition-all"
          />
        </button>

        {/* Desktop Links (Visible on large screens) */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
              <link.icon className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Desktop & Mobile Menu Trigger (Visible on small screens, or when menu is preferred) */}
        <button
          className="md:hidden flex items-center space-x-3 text-slate-800 focus:outline-none group"
          onClick={() => setMobileMenuOpen(true)}
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
            <Menu size={18} className="text-slate-800" />
          </div>
        </button>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href="#contact" className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold tracking-wide text-sm hover:scale-105 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all inline-block">
            Let's Talk
          </a>
        </div>
      </header>

      {/* Premium Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[85vw] sm:max-w-sm h-full bg-white border-l border-slate-200 shadow-[0_0_50px_rgba(0,0,0,0.2)] flex flex-col overflow-y-auto"
            >
              <div className="absolute inset-0 bg-blue-50/30 pointer-events-none"></div>

              <div className="h-24 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 relative z-10 bg-white/50 backdrop-blur-md">
                <span className="font-display font-black text-xl text-slate-800 tracking-tighter">PRIME<span className="text-blue-600">DIGITAL</span></span>
                <button
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <nav className="flex flex-col flex-1 px-6 py-10 relative z-10 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-black ml-4 mb-6 relative">
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-blue-400 rounded-full"></span>
                  Navigation Menu
                </span>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: "easeOut" }}
                    className="flex items-center gap-5 px-5 py-4 rounded-2xl text-lg font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 transition-all group border border-transparent hover:border-blue-100"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow-[0_4px_12px_rgba(37,99,235,0.1)] transition-all">
                      <link.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="p-8 shrink-0 border-t border-slate-100 bg-white relative z-10">
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="w-full py-5 rounded-2xl bg-blue-600 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all group"
                >
                  <span className="group-hover:-translate-y-0.5 transition-transform duration-300">Start Project</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AdminAuthModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </>
  );
}
