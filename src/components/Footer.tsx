import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'How It Works', href: '#methodology' },
  ];

  return (
    <footer className="bg-zinc-950 pt-24 md:pt-32 relative z-10 border-t border-white/10 overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/20 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section: CTA & Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:w-1/3 flex flex-col items-start gap-8">
            <a href="#" className="relative flex items-center justify-center h-12 group transition-transform hover:scale-105">
              <img 
                src="https://i.ibb.co/383LZ6G/IMG-0609.png" 
                alt="Prime Digital Solutions Logo" 
                className="h-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              />
            </a>
            <p className="text-zinc-400 font-light leading-relaxed text-lg max-w-sm">
              We design and build beautiful, high-performing websites and digital tools that help your business stand out and grow.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:w-2/3 flex flex-wrap sm:flex-nowrap gap-12 sm:gap-24 lg:justify-end">
            
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-semibold uppercase tracking-[0.2em] text-xs">Explore</h4>
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300 font-light"
                  >
                    <span className="w-1 h-px bg-cyan-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Massive Typography Section */}
      <div className="w-full flex justify-center items-end px-4 md:px-8 pb-8 select-none pointer-events-none border-b border-white/5 relative z-0">
        <h2 className="text-[22vw] leading-[0.75] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent tracking-tighter whitespace-nowrap">
          PRIME
        </h2>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-widest uppercase text-zinc-600 relative z-10">
        <p>&copy; {currentYear} Prime Digital Solutions.</p>
        <p className="flex items-center gap-2">
          Designed with <span className="text-cyan-500">♥</span>
        </p>
      </div>
    </footer>
  );
}
