import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ShieldCheck, Palette, FileText, CheckCircle, Activity, Flag } from 'lucide-react';

const steps = [
  {
    phase: 'Step 01',
    title: 'Let\'s Talk',
    description: 'Contact us and tell us about your project, your goals, and what you want to achieve.',
    icon: MessageSquare,
  },
  {
    phase: 'Step 02',
    title: 'Free Pre-contract',
    description: 'We sign a simple agreement to protect your ideas, ensuring your project remains yours before any work starts.',
    icon: ShieldCheck,
  },
  {
    phase: 'Step 03',
    title: 'Free Design Mock-up',
    description: 'We create a visual mock-up for free, allowing you to see what your website could look like.',
    icon: Palette,
  },
  {
    phase: 'Step 04',
    title: 'Clear Quote (Devis)',
    description: 'Upon validation, we provide a clear document listing all features and the total cost. No hidden fees.',
    icon: FileText,
  },
  {
    phase: 'Step 05',
    title: 'Contract & Deposit',
    description: 'Once you are happy with the quote, we draft a final contract and you pay a 50% max deposit to begin the build.',
    icon: CheckCircle,
  },
  {
    phase: 'Step 06',
    title: 'Track Progress',
    description: 'Follow your project easily from our client portal and send us the content needed to meet our deadlines.',
    icon: Activity,
  },
  {
    phase: 'Step 07',
    title: 'Final Delivery',
    description: 'Once the website is completed and perfectly polished, you pay the remaining balance and we deliver your project.',
    icon: Flag,
  },
];

export default function Methodology() {
  return (
    <section id="methodology" className="py-24 md:py-32 relative z-40 bg-[#121214] rounded-[2rem] md:rounded-[3rem] my-16 mx-4 md:mx-8 lg:mx-12 border border-white/10 overflow-hidden shadow-2xl">
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="absolute top-[-50px] w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center w-full"
        >
          <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4 drop-shadow-md">
            How It Works
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white mb-6">
            A simple <span className="text-indigo-400">process.</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto px-4">
            We have removed all the confusing steps to make launching your digital product as smooth and clear as possible.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/50 to-transparent md:-translate-x-1/2 rounded-full hidden sm:block"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-12 md:mb-16 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-zinc-950 border-2 border-cyan-400 md:-translate-x-1/2 z-10 hidden sm:block shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden sm:block w-[45%]"></div>

                {/* Content Card */}
                <div className="sm:w-[45%] pl-16 sm:pl-0 w-full relative">
                  <div className="absolute left-0 top-0 sm:hidden w-14 bottom-0 flex justify-center items-start pt-6">
                    <div className="w-px h-full bg-gradient-to-b from-indigo-500/50 to-transparent absolute z-0 left-7"></div>
                    <div className="w-4 h-4 rounded-full bg-zinc-950 border-2 border-cyan-400 z-10 shadow-[0_0_15px_rgba(34,211,238,0.5)] relative"></div>
                  </div>

                  <div className="glass-card p-6 md:p-8 rounded-3xl hover:bg-white/5 transition-colors border border-white/5 hover:border-white/20 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 transition-colors duration-500"></div>
                    
                    <div className="flex items-center space-x-4 mb-4 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-white/30 transition-all">
                        <Icon className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-500">{step.phase}</span>
                        <h3 className="text-lg md:text-xl font-display font-semibold text-white tracking-tight">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
