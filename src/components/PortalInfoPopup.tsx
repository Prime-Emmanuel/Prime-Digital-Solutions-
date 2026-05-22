import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PortalInfoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show once per session or after a delay
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenPortalPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenPortalPopup', 'true');
      }
    }, 3500); // 3.5 seconds delay after initial load

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl"
        >
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
            <Briefcase className="w-6 h-6 text-indigo-400" />
          </div>

          <h2 className="text-2xl font-display font-bold mb-3 tracking-tight">Active Client?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Prime Digital Solutions offers a dedicated <strong className="text-white">Client Portal</strong>. If you have an active project with us, you can track its status, view timeline progress, and read recent development logs securely.
          </p>

          <div className="space-y-3">
            <Link 
              to="/client-portal"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between px-6 py-3.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-zinc-200 transition-colors group"
            >
              <span>Access Client Portal</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full px-6 py-3.5 border border-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/5 transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
