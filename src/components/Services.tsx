import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Search, Lightbulb, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Website Design',
    description: 'Fast, beautiful websites that look great on any device and help your business stand out.',
    icon: Globe,
    color: 'from-indigo-500',
    shadow: 'shadow-[0_0_40px_rgba(99,102,241,0.2)]'
  },
  {
    title: 'Mobile Apps',
    description: 'Engaging, easy-to-use mobile applications for both iOS and Android platforms.',
    icon: Smartphone,
    color: 'from-blue-500',
    shadow: 'shadow-[0_0_40px_rgba(59,130,246,0.2)]'
  },
  {
    title: 'SEO & Visibility',
    description: 'Simple strategies to help new customers find your business easily on search engines like Google.',
    icon: Search,
    color: 'from-purple-500',
    shadow: 'shadow-[0_0_40px_rgba(168,85,247,0.2)]'
  },
  {
    title: 'Custom Solutions',
    description: 'Specialized digital tools and software tailored specifically to solve your daily business needs.',
    icon: Lightbulb,
    color: 'from-cyan-500',
    shadow: 'shadow-[0_0_40px_rgba(6,182,212,0.2)]'
  },
  {
    title: 'Task Automation',
    description: 'We simplify your workflows, saving you valuable time and reducing boring manual work.',
    icon: Zap,
    color: 'from-amber-500',
    shadow: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]'
  },
  {
    title: 'Secure Systems',
    description: 'Reliable tools to check identities, manage user logins, and keep your data safe from harm.',
    icon: ShieldCheck,
    color: 'from-emerald-500',
    shadow: 'shadow-[0_0_40px_rgba(16,185,129,0.2)]'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative z-30 bg-zinc-950 rounded-[2rem] md:rounded-[3rem] my-16 mx-4 md:mx-8 lg:mx-12 border border-white/10 overflow-hidden shadow-2xl">
      {/* Decorative Glow Divider */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="absolute top-[-50px] w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24 w-full flex flex-col items-center"
        >
          <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-4 drop-shadow-md">
            Our Services
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white mb-6">
            What we <span className="text-cyan-400">do.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            We provide everything you need to succeed online. No confusing jargon, just high-quality results that make your life easier.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8 }}
                viewport={{ margin: "-50px 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-card p-8 md:p-10 rounded-[2rem] group relative overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Scroll-triggered Glow Effect through whileInView and Hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.4 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute -inset-px transition-opacity duration-700 pointer-events-none rounded-[2rem] bg-gradient-to-br ${service.color} to-transparent mix-blend-overlay ${service.shadow}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-700 pointer-events-none"></div>
                
                <div className="mb-8 md:mb-10 inline-flex p-4 rounded-2xl bg-zinc-800/60 border border-white/5 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] relative z-10">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-zinc-300 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-3 md:mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all z-10">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed group-hover:text-zinc-300 transition-colors z-10 mb-8 md:mb-10 flex-grow">
                  {service.description}
                </p>
                
                {/* Explore Button */}
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6 relative z-10 group-hover:border-white/20 transition-colors">
                  <span className="text-sm font-semibold tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors">Explore</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:-rotate-45 transition-all duration-300" strokeWidth={2} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
