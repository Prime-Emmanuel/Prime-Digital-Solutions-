import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  const points = [
    "We listen to your ideas and understand your goals.",
    "We build websites that are fast, clean, and easy to use.",
    "We make the digital process simple and friendly.",
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative z-20 bg-[#121214] rounded-t-[3rem] md:rounded-t-[6rem] -mt-12 border-t border-white/10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      {/* Decorative Glow */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="absolute top-[-50px] w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center w-full"
        >
          <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-4 drop-shadow-md">
            Who We Are
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white mb-6">
            Your friendly <br className="hidden sm:block"/> web <span className="text-cyan-400">experts.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-6">
              At Prime Digital Solutions, we believe getting a great website or mobile app shouldn't be complicated. We are a team of digital creators passionate about translating your ideas into clean, professional, and easy-to-use platforms.
            </p>
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8">
              Whether you are starting from scratch or looking to improve what you already have, we walk you through the process step-by-step so you always feel confident, informed, and at ease.
            </p>
            
            <ul className="space-y-5 mb-10">
              {points.map((point, index) => (
                <li key={index} className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-6 h-6 text-indigo-400 mr-4 shrink-0" />
                  <span className="font-light text-lg">{point}</span>
                </li>
              ))}
            </ul>

            <a href="#services" className="inline-flex items-center space-x-3 text-white font-medium hover:text-cyan-400 transition-colors group text-lg">
              <span>View our services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 glass-card">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-zinc-800/30 flex flex-col items-center justify-center text-zinc-400 p-8 text-center hover:bg-zinc-800/50 transition-colors">
                <p className="text-sm uppercase tracking-[0.2em] mb-4 font-semibold text-white">Image Placeholder</p>
                <p className="font-light text-sm max-w-sm">We will add your professional picture or office image here.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
