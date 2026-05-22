import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative z-50 bg-zinc-950 rounded-t-[3rem] md:rounded-t-[6rem] -mt-12 border-t border-white/10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      {/* Background Glow */}
      <div className="absolute top-[0%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center mb-16 md:mb-24 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full flex flex-col items-center"
        >
          <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-4 drop-shadow-md">
            Initiate Contact
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white mb-6">
            Let's talk about <span className="text-zinc-500">your project.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you have a clear plan or just a rough idea, we are here to help. Reach out to us and let's build something great together.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center relative z-10 w-full mb-10 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/start-project" className="group relative w-full sm:w-auto flex items-center justify-center px-10 py-5 text-sm font-bold tracking-[0.2em] text-black bg-white rounded-full hover:scale-105 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            <span className="relative z-10 flex items-center pt-px">
              START YOUR PROJECT
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <a href="mailto:contact@primedigital.agency" className="inline-flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group px-6 py-4">
            <span className="font-medium tracking-widest text-xs uppercase">Email Us Directly</span>
            <Mail className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
