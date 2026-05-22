import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // 2.8s loading delay
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white to-blue-50/50"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <img 
          src="https://i.ibb.co/383LZ6G/IMG-0609.png" 
          alt="Prime Digital Solutions" 
          className="h-32 md:h-48 w-auto object-contain drop-shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-10"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-64 h-1 bg-blue-100 relative overflow-hidden rounded-full shadow-inner">
            <motion.div 
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-blue-900/40 uppercase font-bold">Initializing Experience</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
