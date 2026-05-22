import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 border-b border-white/5">
      {/* Immersive Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay transform scale-105"
        ></div>
        {/* Gradients to blend image into dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/30 to-zinc-950/80"></div>
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-[20%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/20 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 70, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[5%] right-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-600/20 rounded-full blur-[160px]"
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 py-2 px-5 rounded-full border border-white/10 glass mb-8 md:mb-10 shadow-2xl backdrop-blur-lg">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-zinc-200 uppercase">
              Prime Digital Solutions
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-display font-medium tracking-tight text-white leading-tight mb-6 md:mb-8 mt-2 drop-shadow-2xl">
            A different level of <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 font-bold italic pr-2">digital experience.</span>
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl text-zinc-400 font-light max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed px-4">
            We go beyond standard web design. We create beautiful, easy-to-use websites and digital tools that help your business grow and run smoothly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-4">
            <a
              href="#contact"
              className="group relative flex items-center justify-center px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm font-bold tracking-[0.1em] md:tracking-wider uppercase text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center">
                Start your project
                <ArrowRight className="ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <a
              href="#services"
              className="flex items-center justify-center px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm font-bold tracking-[0.1em] md:tracking-wider uppercase text-white border border-white/20 rounded-full glass hover:bg-white/10 hover:border-white/40 transition-all w-full sm:w-auto backdrop-blur-md"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
