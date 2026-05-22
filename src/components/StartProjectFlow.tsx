import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, FileDown, Rocket, Sparkles, User, Mail, DollarSign, Calendar, Edit3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import { logoBase64 } from '../logoBase64';

type FlowState = 'INTRO' | 'SURVEY' | 'DETAILS' | 'CONTRACT' | 'SUCCESS';

export default function StartProjectFlow() {
  const [step, setStep] = useState<FlowState>('INTRO');
  
  const [survey, setSurvey] = useState({
    type: '',
    objective: '',
    frustration: '',
    targetAudience: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    timeline: '',
    details: '',
    signature: ''
  });

  const projectTypes = [
    { id: 'web', title: 'Web Design & Development', icon: '💻' },
    { id: 'app', title: 'Mobile App Development', icon: '📱' },
    { id: 'brand', title: 'Branding & Identity', icon: '🎨' },
    { id: 'custom', title: 'Custom Software', icon: '⚙️' }
  ];

  const objectives = [
    { id: 'sales', title: 'Increase Sales & Leads' },
    { id: 'awareness', title: 'Build Brand Awareness' },
    { id: 'automate', title: 'Automate Internal Processes' },
    { id: 'revamp', title: 'Revamp Current Experience' },
    { id: 'launch', title: 'Launch a New Product/Service' },
    { id: 'retention', title: 'Improve Customer Retention' }
  ];

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    
    // Aesthetic Header
    doc.setFillColor(3, 3, 5); // Dark background
    doc.rect(0, 0, 210, 45, 'F');
    
    // Add Company Logo
    try {
        doc.addImage(logoBase64, 'PNG', 160, 10, 30, 25);
    } catch(e) {}
    
    // Company Logo / Name Area
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("PRIME DIGITAL", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Project Brief & Pre-Contract", 20, 28);
    
    // Body Text
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10);
    doc.text(`Date created: ${new Date().toLocaleDateString()}`, 20, 55);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("1. Client Details", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 20, 80);
    doc.text(`Email: ${formData.email}`, 20, 90);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("2. Project Scope & Strategy", 20, 110);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Type: ${projectTypes.find(p => p.id === survey.type)?.title || survey.type}`, 20, 120);
    doc.text(`Primary Objective: ${objectives.find(o => o.id === survey.objective)?.title || survey.objective}`, 20, 130);
    doc.text(`Budget Expectation: ${formData.budget}`, 20, 140);
    doc.text(`Timeline Expectation: ${formData.timeline}`, 20, 150);

    // Additional Strategy Info (split to next line if long)
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const strategyDetails = doc.splitTextToSize(`Frustration: ${survey.frustration || 'N/A'} | Audience: ${survey.targetAudience || 'N/A'}`, 170);
    doc.text(strategyDetails, 20, 160);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("3. Details", 20, 175);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitDetails = doc.splitTextToSize(formData.details || 'No additional details provided.', 170);
    doc.text(splitDetails, 20, 185);

    // Pre-contract section
    const startY = 195 + (splitDetails.length * 6);
    doc.setFillColor(245, 245, 245);
    doc.rect(15, startY, 180, 85, 'F');
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Non-Disclosure & Mock-up Policy", 20, startY + 10);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    const contractText = `This document binds Prime Digital Solutions to strict confidentiality regarding your project. Furthermore, the bespoke visual mock-up provided free of charge remains our exclusive property. If you decide not to validate the devis or proceed with the project, you are strictly prohibited from using, copying, or sharing the mock-up with any third party or developer.`;
    const splitContract = doc.splitTextToSize(contractText, 170);
    doc.text(splitContract, 20, startY + 20);

    // Signature Area
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Electronically Signed: ${formData.signature}`, 20, startY + 55);
    doc.text(`Counter-Signed: Prime Digital Solutions`, 20, startY + 65);

    // Digital Stamp for Prime Digital
    doc.setDrawColor(220, 38, 38); 
    doc.setTextColor(220, 38, 38);
    doc.setLineWidth(1.5);
    doc.roundedRect(135, startY + 45, 52, 23, 3, 3);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("OFFICIALLY", 148, startY + 54);
    doc.text("CERTIFIED", 150, startY + 60);
    doc.setFontSize(6);
    doc.text("PRIME DIGITAL SOLUTIONS", 143, startY + 65);

    doc.save(`PrimeDigital_Brief_${formData.name.replace(/\s+/g, '_')}.pdf`);
    setStep('SUCCESS');
  };

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden relative flex flex-col justify-between">
      
      {/* Absolute Header Navigation */}
      <div className="absolute top-0 inset-x-0 p-6 md:p-12 flex justify-between items-center z-50 pointer-events-none">
        <Link to="/" className="pointer-events-auto flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-white/10 group-hover:scale-105 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold">Exit Flow</span>
        </Link>
        <div className="hidden md:block pointer-events-auto">
          <img src="https://i.ibb.co/383LZ6G/IMG-0609.png" alt="Logo" className="h-8 object-contain opacity-50" />
        </div>
      </div>

      {/* Dynamic Backgrounds based on step */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{
             opacity: step === 'INTRO' ? 1 : 0.5,
             scale: step === 'INTRO' ? 1 : 1.1
          }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#030305] to-[#030305]"
        />
        <div className="absolute top-[-10%] sm:top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="flex-grow flex items-center justify-center p-6 mt-20 relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP: INTRO */}
          {step === 'INTRO' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-8">
                <Sparkles className="w-4 h-4" /> Client Onboarding
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 text-white leading-tight">
                Make yourself <br className="hidden md:block"/>
                <span className="text-zinc-500">comfortable.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-12">
                Grab a coffee, relax, and let's structure your vision together. We'll ask a few quick questions to align our understanding, followed by a formal pre-contract ensuring your ideas remain yours.
              </p>
              <button 
                onClick={() => setStep('SURVEY')}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-sm font-bold tracking-[0.2em] text-black bg-white rounded-full hover:scale-105 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 flex items-center">
                  BEGIN THE JOURNEY
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          )}

          {/* STEP: SURVEY */}
          {step === 'SURVEY' && (
            <motion.div
              key="survey"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="text-center mb-12">
                <span className="text-xs tracking-widest text-indigo-400 font-semibold uppercase">Step 1 of 3</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mt-4 mb-4">The Big Picture</h2>
                <p className="text-zinc-400 font-light">What are we building today?</p>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-sm tracking-widest text-zinc-500 uppercase font-semibold">1. Project Category</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectTypes.map(pt => (
                      <button 
                        key={pt.id}
                        onClick={() => setSurvey({ ...survey, type: pt.id })}
                        className={`flex items-center p-6 rounded-2xl border transition-all duration-300 text-left ${survey.type === pt.id ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                        <span className="text-3xl mr-4">{pt.icon}</span>
                        <span className="font-medium">{pt.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm tracking-widest text-zinc-500 uppercase font-semibold">2. Primary Objective</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {objectives.map(obj => (
                      <button 
                        key={obj.id}
                        onClick={() => setSurvey({ ...survey, objective: obj.id })}
                        className={`flex justify-between items-center p-5 rounded-2xl border transition-all duration-300 text-left ${survey.objective === obj.id ? 'bg-indigo-500/10 border-indigo-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                        <span className="font-light">{obj.title}</span>
                        {survey.objective === obj.id && <Check className="w-5 h-5 text-indigo-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm tracking-widest text-zinc-500 uppercase font-semibold">3. Strategy & Impact</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">What is the ONE thing your current digital presence is failing to do for you?</label>
                       <input 
                         type="text" 
                         value={survey.frustration}
                         onChange={(e) => setSurvey({...survey, frustration: e.target.value})}
                         className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all placeholder:text-zinc-700" 
                         placeholder="E.g., It looks outdated, it doesn't convert visitors to buyers..."
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Who is the exact type of client you want, but aren't getting enough of?</label>
                       <input 
                         type="text" 
                         value={survey.targetAudience}
                         onChange={(e) => setSurvey({...survey, targetAudience: e.target.value})}
                         className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all placeholder:text-zinc-700" 
                         placeholder="E.g., High-ticket B2B clients, international investors..."
                       />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-white/10">
                  <button 
                    disabled={!survey.type || !survey.objective || !survey.frustration || !survey.targetAudience}
                    onClick={() => setStep('DETAILS')}
                    className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full text-sm font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    Next Step
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP: DETAILS */}
          {step === 'DETAILS' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl glass p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
            >
              <div className="mb-10 text-center">
                <span className="text-xs tracking-widest text-indigo-400 font-semibold uppercase">Step 2 of 3</span>
                <h2 className="text-3xl font-display font-bold tracking-tight mt-4">The Nitty Gritty</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all placeholder:text-zinc-700" 
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all placeholder:text-zinc-700" 
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2"><DollarSign className="w-4 h-4" /> Budget Expectation</label>
                    <select 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all appearance-none"
                    >
                      <option value="" disabled>Select a range</option>
                      <option value="200k - 500k FCFA">200,000 - 500,000 FCFA</option>
                      <option value="500k - 1M FCFA">500,000 - 1,000,000 FCFA</option>
                      <option value="1M - 3M FCFA">1,000,000 - 3,000,000 FCFA</option>
                      <option value="3M+ FCFA">3,000,000+ FCFA</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" /> Ideal Timeline</label>
                    <select 
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all appearance-none"
                    >
                      <option value="" disabled>Select timeline</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3+ months">3+ months</option>
                      <option value="Flexible">I'm flexible</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Everything Else</label>
                  <textarea 
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all placeholder:text-zinc-700 resize-none" 
                    placeholder="Drop any extra features, links, or ideas here..."
                  ></textarea>
                </div>

                <div className="flex justify-between items-center pt-6 mt-4">
                  <button onClick={() => setStep('SURVEY')} className="text-zinc-400 hover:text-white uppercase tracking-widest text-xs font-semibold pb-1 border-b border-transparent hover:border-white transition-all">Back</button>
                  <button 
                    disabled={!formData.name || !formData.email || !formData.budget || !formData.timeline}
                    onClick={() => setStep('CONTRACT')}
                    className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full text-sm font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    Review Final
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP: CONTRACT */}
          {step === 'CONTRACT' && (
            <motion.div
              key="contract"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            >
               <div className="bg-zinc-800/50 p-6 border-b border-white/5 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/10">
                    <FileDown className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Pre-Contract & Disclosure</h3>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">Ready for Signature</p>
                  </div>
               </div>
               
               <div className="p-8 prose prose-invert prose-sm max-w-none text-zinc-300">
                  <p>
                    By signing below, you agree to submit the enclosed project brief to <strong>Prime Digital Solutions</strong> for review.
                  </p>
                  <p className="text-zinc-400 bg-black/30 p-5 rounded-xl border border-white/10 mt-4 leading-relaxed text-xs">
                    <strong className="text-white block mb-1">NDA clause & Mock-up Policy:</strong> 
                    Prime Digital Solutions agrees to keep all information, ideas, and details provided by <em>{formData.name}</em> strictly confidential. 
                    <br/><br/>
                    Conversely, the free bespoke visual mock-up provided remains the exclusive property of Prime Digital Solutions. If you decide not to validate the quote (devis) or proceed with the project, you are expressly prohibited from using, copying, or sharing the mock-up with any other person, agency, or developer.
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <label className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3 block flex items-center gap-2"><Edit3 className="w-4 h-4" /> Signature Authorization</label>
                    <div className="relative">
                       <input 
                         type="text" 
                         value={formData.signature}
                         onChange={(e) => setFormData({...formData, signature: e.target.value})}
                         className="w-full bg-black/50 border-b-2 border-dashed border-zinc-600 px-4 py-4 pr-32 text-white focus:outline-none focus:border-cyan-400 transition-all placeholder:text-zinc-700 text-xl font-medium font-serif italic" 
                         placeholder="Click 'Auto-Sign' or manually type"
                       />
                       <button 
                         onClick={() => setFormData({...formData, signature: formData.name})}
                         className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 hover:text-white rounded-md text-xs font-bold uppercase tracking-widest transition-all"
                       >
                         Auto-Sign
                       </button>
                    </div>
                  </div>
               </div>

               <div className="bg-zinc-950 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button onClick={() => setStep('DETAILS')} className="text-zinc-500 hover:text-white uppercase tracking-widest text-xs font-semibold">Go Back</button>
                  <button 
                    disabled={!formData.signature}
                    onClick={handleGeneratePDF}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-full text-sm font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    Sign & Generate Document
                    <Check className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
               </div>
            </motion.div>
          )}

          {/* STEP: SUCCESS */}
          {step === 'SUCCESS' && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center bg-white/5 border border-white/10 backdrop-blur-md p-12 rounded-[3rem] max-w-lg"
            >
              <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Official Document Ready.</h2>
              <p className="text-zinc-400 font-light mb-8 max-w-sm mx-auto">
                Your pre-contract and project brief PDF has been generated and downloaded to your device. <br/><br/>
                <span className="text-white font-medium">Please send the downloaded document to our team via WhatsApp or Email to proceed.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 mt-6 relative z-10 w-full sm:w-auto">
                <a 
                  href="https://wa.me/?text=Hello%20Prime%20Digital%20Solutions,%20I'm%20sending%20my%20signed%20project%20brief%20and%20pre-contract." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold uppercase tracking-widest text-xs hover:bg-[#25D366]/20 transition-all w-full justify-center group"
                >
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Send via WhatsApp
                </a>
                <a 
                  href="mailto:contact@primedigital.agency" 
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-semibold uppercase tracking-widest text-xs hover:bg-indigo-500/20 transition-all w-full justify-center group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Send via Email
                </a>
              </div>
              
              <div className="pt-6 border-t border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-white uppercase tracking-widest text-[10px] font-semibold py-2">
                  <ArrowLeft className="w-3 h-3 mr-2" />
                  Return to Homepage
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
