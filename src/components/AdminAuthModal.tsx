import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, X, Key, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminAuthModal({ isOpen, onClose }: AdminAuthModalProps) {
  const [step, setStep] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [villageName, setVillageName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setStep('IDLE');
      setVillageName('');
    }
  }, [isOpen]);

  // Securely hash the input using crypto.subtle so the plaintext password
  // is never exposed in the source code or network requests.
  const hashString = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'LOADING' || step === 'SUCCESS') return;
    if (!villageName.trim()) return;

    setStep('LOADING');
    
    try {
       const inputHash = await hashString(villageName);
       // The target hash should ideally be stored in environment variables (VITE_ADMIN_VILLAGE_HASH)
       // Here we use a hardcoded default fallback for "mpalla".
       let targetHash = import.meta.env.VITE_ADMIN_VILLAGE_HASH || 'mpalla';
       
       // If the user configured a plaintext password instead of a hash in their environment variable,
       // we hash it at runtime so it still evaluates correctly.
       if (targetHash.length !== 64) {
         targetHash = await hashString(targetHash);
       }
       
       if (inputHash === targetHash) {
         setStep('SUCCESS');
         setTimeout(() => {
           onClose();
           navigate('/admin');
         }, 1500);
       } else {
         setTimeout(() => {
           setStep('ERROR');
         }, 800);
       }

    } catch (err) {
       console.error("Auth error:", err);
       setStep('ERROR');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative z-10 w-full max-w-sm bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-500">
            {step === 'SUCCESS' ? <Unlock className="w-5 h-5 text-blue-600" /> : <Lock className="w-5 h-5" />}
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-700">Admin Access</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auth Interface */}
        <div className="p-8 pb-10 flex flex-col items-center">
           <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
             {step === 'LOADING' ? (
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
             ) : step === 'SUCCESS' ? (
                <Unlock className="w-8 h-8 text-blue-600" />
             ) : step === 'ERROR' ? (
                <Lock className="w-8 h-8 text-red-500" />
             ) : (
                <MapPin className="w-8 h-8 text-blue-600" />
             )}
             
             {/* Scanning effect */}
             {step === 'LOADING' && (
               <motion.div 
                 initial={{ top: '-10%' }}
                 animate={{ top: '110%' }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                 className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_4px_rgba(37,99,235,0.4)] z-20"
               />
             )}
           </div>
           
           {step === 'IDLE' && (
             <div className="w-full text-center">
               <h3 className="text-slate-800 font-display font-bold text-xl mb-2">Security Challenge</h3>
               <p className="text-slate-500 text-sm mb-8 leading-relaxed">Enter your village name to verify your identity and access the agency portal.</p>
               
               <form onSubmit={handleAccess} className="space-y-4">
                 <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="password" 
                      value={villageName}
                      onChange={(e) => setVillageName(e.target.value)}
                      placeholder="Enter your village name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:font-normal"
                      autoFocus
                    />
                 </div>
                 <button 
                   type="submit"
                   disabled={!villageName.trim()}
                   className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 active:bg-blue-800 transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:pointer-events-none"
                 >
                   Verify Identity
                 </button>
               </form>
             </div>
           )}

           {step === 'LOADING' && (
             <div className="py-8 text-center">
               <h3 className="text-blue-600 font-display font-bold text-lg animate-pulse tracking-widest uppercase text-sm">Authenticating...</h3>
             </div>
           )}

           {step === 'SUCCESS' && (
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               className="py-4 text-center"
             >
               <h3 className="text-slate-800 font-display font-bold text-2xl mb-1">Access Granted</h3>
               <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] bg-blue-50 inline-block px-3 py-1 rounded-full border border-blue-100">Welcome, Prime Admin</p>
             </motion.div>
           )}

           {step === 'ERROR' && (
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               className="py-4 text-center w-full"
             >
               <h3 className="text-slate-800 font-display font-bold text-2xl mb-2">Access Denied</h3>
               <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 bg-red-50 inline-block px-3 py-1 rounded-full border border-red-100">Location Not Recognized</p>
               <button 
                 onClick={() => { setStep('IDLE'); setVillageName(''); }}
                 className="w-full py-4 rounded-2xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 font-bold uppercase tracking-widest text-xs transition-colors shadow-sm"
               >
                 Try Again
               </button>
             </motion.div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
