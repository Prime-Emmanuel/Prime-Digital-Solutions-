import React, { useState, useEffect } from 'react';
import { ProjectData, getProjects } from '../lib/store';
import { Key, LayoutDashboard, Settings, Bell, Clock, Calendar, MessageSquareText, Image as ImageIcon, ChevronLeft, LogOut, TrendingUp, CheckCircle2, MoreVertical, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

export default function ClientPortal() {
  const [accessCode, setAccessCode] = useState('');
  const [project, setProject] = useState<ProjectData | null>(null);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem('activeClientProject');
    if (saved) {
      const p = getProjects().find(proj => proj.id === saved);
      if (p) setProject(p);
    }
  }, []);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;
    
    setIsLoggingIn(true);
    setTimeout(() => {
      const projects = getProjects();
      const match = projects.find(p => p.id === accessCode.trim());
      
      if (match) {
        setProject(match);
        sessionStorage.setItem('activeClientProject', match.id);
        setError('');
      } else {
        setError('Invalid access code. Please check and try again.');
      }
      setIsLoggingIn(false);
    }, 800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('activeClientProject');
    setProject(null);
    setAccessCode('');
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex items-center justify-center relative overflow-hidden">
        {/* Light theme premium background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/60 via-slate-50 to-white opacity-80 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-white/80 backdrop-blur-2xl border border-blue-100/50 rounded-[2rem] shadow-2xl shadow-blue-900/5"
        >
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="inline-block p-2 -ml-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
               <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="font-display font-bold text-xl tracking-tighter text-slate-800">
              PRIME<span className="text-blue-600">DIGITAL</span>
            </span>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100/50">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-800 mb-2">Client Access</h1>
            <p className="text-slate-500 text-sm leading-relaxed">Enter the secure access code provided by your account manager to view your project dashboard.</p>
          </div>

          <form onSubmit={handleAccess} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">Access Code</label>
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  value={accessCode}
                  onChange={(e) => {setAccessCode(e.target.value); setError('');}}
                  placeholder="e.g., PDS-001"
                  className="w-full bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl pl-12 pr-4 py-4.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:font-normal placeholder:text-slate-300 shadow-sm"
                />
              </div>
              {error && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-2 ml-1 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full inline-block" /> {error}
                </motion.p>
              )}
            </div>
            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 px-8 py-4.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs tracking-widest uppercase rounded-2xl transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.5)] disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoggingIn ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            <Link to="/" className="hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-blue-300">Return to Prime Digital Solutions</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  const unreadNotifications = project.updates?.length || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex text-sm selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sidebar */}
      <aside className="w-[280px] border-r border-slate-200 bg-white hidden lg:flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tighter text-slate-800 group-hover:text-blue-600 transition-colors">
              PRIME<span className="text-blue-600">DIGITAL</span>
            </span>
          </Link>
        </div>
        <nav className="p-6 space-y-2 flex-grow">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-6 ml-4 flex items-center space-x-2">
            <span>Client Workspace</span>
          </h3>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-blue-50 text-blue-700 rounded-2xl transition-colors font-medium">
            <LayoutDashboard className="w-5 h-5" /> Project Overview
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-2xl transition-colors font-medium">
            <Calendar className="w-5 h-5" /> Timeline & Events
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-2xl transition-colors font-medium">
            <MessageSquareText className="w-5 h-5" /> Communication Logs
          </button>
        </nav>
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
          <Link 
            to="/" 
            className="w-full flex justify-center items-center gap-2 px-4 py-3 text-slate-500 hover:bg-slate-200/50 hover:text-slate-900 rounded-2xl transition-colors font-semibold border border-slate-200 bg-white"
          >
            Go to Website
          </Link>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-2xl transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none -z-10"></div>
        
        {/* Header */}
        <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
               <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display font-bold text-xl text-slate-800 hidden sm:block lg:text-2xl">{project.projectName}</h1>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`relative w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${notificationsOpen ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <h4 className="font-bold text-slate-800">Notifications</h4>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">{unreadNotifications} New</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-2">
                       {project.updates && project.updates.length > 0 ? (
                         [...project.updates].reverse().map((u, i) => (
                           <div key={i} className="p-3 hover:bg-slate-50 rounded-xl transition-colors mb-1 text-sm outline-none cursor-pointer">
                              <p className="text-[10px] text-blue-600 font-bold mb-1 uppercase tracking-wider">{u.date}</p>
                              <p className="text-slate-600 line-clamp-2">{u.text}</p>
                           </div>
                         ))
                       ) : (
                         <div className="p-6 text-center text-slate-400">
                            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>You're all caught up!</p>
                         </div>
                       )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none mb-1">{project.clientName}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold leading-none">Client Portal</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_10px_rgba(37,99,235,0.3)] border-2 border-white ring-2 ring-slate-100 uppercase">
                 {project.clientName.substring(0, 2)}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 md:p-8 lg:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">Good day, {project.clientName.split(' ')[0]}.</h2>
              <p className="text-slate-500 mt-2 text-base">Here is the latest progress on <strong className="text-slate-700 font-medium">{project.projectName}</strong>.</p>
            </div>

            {/* Premium Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Progress Card span 2 */}
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 lg:col-span-2 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-24 h-24 text-blue-600" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-slate-500 mb-6 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    <span className="text-xs uppercase tracking-[0.15em] font-bold">Overall Progress</span>
                  </div>
                  <div className="flex items-end gap-4 mb-6">
                     <span className="text-6xl font-display font-black text-slate-800 tracking-tighter">{project.progress}<span className="text-4xl text-slate-400">%</span></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 relative overflow-hidden shadow-inner">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${project.progress}%` }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                     />
                  </div>
                </div>
              </div>

              {/* Stage Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-slate-800 rounded-[2rem] p-8 shadow-[0_12px_32px_rgba(15,23,42,0.15)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 mb-4 font-medium">
                     <Clock className="w-5 h-5" />
                     <span className="text-xs uppercase tracking-[0.15em] font-bold">Current Phase</span>
                  </div>
                  <p className="text-2xl font-display font-bold leading-tight">{project.stage}</p>
                </div>
                <div className="mt-8">
                  <div className="inline-flex px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-blue-300 items-center gap-2 border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Active
                  </div>
                </div>
              </div>

              {/* Deadline Card */}
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-slate-500 mb-4 font-medium">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    <span className="text-xs uppercase tracking-[0.15em] font-bold">Est. Delivery</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-slate-800 leading-tight">{project.deadline}</p>
                </div>
                <div className="mt-8">
                  <div className="w-full h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-100/50 hover:bg-indigo-100 transition-colors cursor-default">
                     On Schedule
                  </div>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-6">
               
               {/* Activity Log */}
               <div className="lg:col-span-2 space-y-6">
                 <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-display font-bold text-slate-800 flex items-center gap-3">
                     <MessageSquareText className="w-6 h-6 text-blue-500" />
                     Development Logs
                   </h3>
                   <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View All</button>
                 </div>
                 <div className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                   {project.updates && project.updates.length > 0 ? (
                     <div className="ml-4 border-l-2 border-slate-100">
                       {project.updates.map((update, idx) => (
                         <motion.div 
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           key={update.id || idx} 
                           className="relative pl-8 pb-10 last:pb-0"
                         >
                           {/* Point on timeline */}
                           <div className="absolute w-4 h-4 bg-white border-[3px] border-blue-500 rounded-full -left-[9px] top-0 shadow-[0_0_0_4px_rgba(255,255,255,1)]"></div>
                           
                           <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 -mt-4 group hover:bg-blue-50/50 hover:border-blue-100 transition-colors">
                             <div className="flex justify-between items-center mb-3">
                               <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider bg-blue-100/50 px-3 py-1 rounded-full">{update.date}</p>
                               <MoreVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                             </div>
                             <p className="text-slate-600 leading-relaxed font-medium">{update.text}</p>
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-12">
                       <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                         <MessageSquareText className="w-6 h-6 text-slate-300" />
                       </div>
                       <p className="text-slate-500 font-medium">No recent development logs published yet.</p>
                     </div>
                   )}
                 </div>
               </div>

               {/* Attachments / Screenshots */}
               <div className="space-y-6">
                 <h3 className="text-2xl font-display font-bold text-slate-800 flex items-center gap-3">
                   <ImageIcon className="w-6 h-6 text-indigo-500" />
                   Media & Assets
                 </h3>
                 <div className="space-y-4">
                   {project.screenshots && project.screenshots.length > 0 ? (
                     project.screenshots.map((url, idx) => (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: idx * 0.1 }}
                         key={idx} 
                         className="group relative rounded-[1.5rem] overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center shadow-sm cursor-pointer"
                       >
                         <img src={url} alt={`Deliverable ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-bold flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> Preview Asset</span>
                         </div>
                       </motion.div>
                     ))
                   ) : (
                     <div className="bg-white border border-slate-200 rounded-[2rem] p-10 text-center border-dashed">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ImageIcon className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-slate-500 text-sm font-medium">No design assets uploaded yet.</p>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
