import React, { useState, useEffect } from 'react';
import { ProjectData, getProjects, saveProjects } from '../lib/store';
import { Settings, Plus, Trash2, Edit2, Briefcase, ChevronLeft, LayoutDashboard, Clock, Activity, Calendar, DollarSign, UserCog, Link as LinkIcon, AlertCircle, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminPanel() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dash' | 'form'>('dash');

  const [formData, setFormData] = useState<Partial<ProjectData>>({
    id: '',
    clientName: '',
    projectName: '',
    deadline: '',
    stage: '',
    progress: 0,
    screenshots: [],
    updates: [],
    budget: '',
    priority: 'Medium',
    projectManager: '',
  });

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleSave = () => {
    if (!formData.id || !formData.clientName) return;

    let updatedProjects = [...projects];
    if (editingId) {
      updatedProjects = updatedProjects.map(p => p.id === editingId ? { ...p, ...formData } as ProjectData : p);
    } else {
      updatedProjects.push({
        ...formData,
        screenshots: formData.screenshots || [],
        updates: formData.updates || [],
        budget: formData.budget || 'TBD',
        priority: formData.priority || 'Medium',
        projectManager: formData.projectManager || 'Unassigned'
      } as ProjectData);
    }

    saveProjects(updatedProjects);
    setProjects(updatedProjects);
    setEditingId(null);
    setFormData({ id: '', clientName: '', projectName: '', deadline: '', stage: '', progress: 0, screenshots: [], updates: [], budget: '', priority: 'Medium', projectManager: '' });
    setViewMode('dash');
  };

  const handleEdit = (p: ProjectData) => {
    setEditingId(p.id);
    setFormData(p);
    setViewMode('form');
  };

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
      setProjects(updated);
    }
  };

  const openNewForm = () => {
    setEditingId(null);
    setFormData({ id: '', clientName: '', projectName: '', deadline: '', stage: '', progress: 0, screenshots: [], updates: [], budget: '', priority: 'Medium', projectManager: '' });
    setViewMode('form');
  };

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-50 font-sans flex text-sm selection:bg-indigo-500/30">
      <aside className="w-64 border-r border-white/10 bg-zinc-950/50 hidden md:flex flex-col z-10">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-xl tracking-tighter text-white group-hover:text-indigo-400 transition-colors">PRIME<span className="text-zinc-500">DIGITAL</span></span>
          </Link>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-6 ml-3 flex items-center space-x-2"><span>Admin Hub</span></h3>
          <button 
            onClick={() => setViewMode('dash')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-xl transition-colors ${viewMode === 'dash' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          <button 
            onClick={openNewForm}
            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-xl transition-colors ${viewMode === 'form' && !editingId ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        </nav>
        <div className="p-6 border-t border-white/10 flex flex-col gap-3 bg-black/20">
          <Link 
             to="/" 
             className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black hover:bg-zinc-200 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest"
          >
             Return to Web
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none mix-blend-overlay -z-10"></div>

        <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <Link to="/" className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
               <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display font-bold text-xl text-white">
              {viewMode === 'dash' ? 'Agency Dashboard' : editingId ? 'Edit Project' : 'Create Project'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
               System Online
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 flex-1 w-full max-w-7xl mx-auto z-10 relative">
          <AnimatePresence mode="wait">
            {viewMode === 'dash' ? (
              <motion.div 
                key="dash"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 shadow-xl">
                    <div className="flex items-center gap-3 text-zinc-400 mb-6">
                      <Briefcase className="w-6 h-6 text-indigo-400" />
                      <span className="text-xs uppercase tracking-[0.2em] font-bold">Total Projects</span>
                    </div>
                    <p className="text-5xl font-display font-black text-white">{projects.length}</p>
                  </div>
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 shadow-xl">
                    <div className="flex items-center gap-3 text-cyan-400 mb-6">
                      <Activity className="w-6 h-6 text-cyan-400" />
                      <span className="text-xs uppercase tracking-[0.2em] font-bold">Avg. Progress</span>
                    </div>
                    <p className="text-5xl font-display font-black text-white">
                       {projects.length ? Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length) : 0}<span className="text-3xl text-zinc-500">%</span>
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-600/20 to-cyan-500/10 border border-indigo-500/30 rounded-[2rem] p-8 flex flex-col justify-center items-start shadow-[0_0_30px_rgba(99,102,241,0.05)]">
                     <h3 className="text-2xl font-display font-bold text-white mb-2">Initialize Workflow</h3>
                     <p className="text-indigo-200/60 mb-6 font-medium text-sm">Spin up a new client portal.</p>
                     <button 
                       onClick={openNewForm}
                       className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                     >
                       + New Project
                     </button>
                  </div>
                </div>

                {/* Projects Grid */}
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                    Active Projects
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-zinc-400 font-sans">{projects.length} Total</span>
                  </h2>
                  {projects.length === 0 ? (
                    <div className="border border-white/10 rounded-[2rem] p-16 text-center text-zinc-500 bg-white/5 border-dashed">
                      <Briefcase className="w-12 h-12 mx-auto mb-6 opacity-20" />
                      <p className="text-lg font-medium text-zinc-400">No projects configured.</p>
                      <button onClick={openNewForm} className="mt-4 text-indigo-400 font-bold hover:text-indigo-300">Create the first project</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map((p) => (
                        <div key={p.id} onClick={() => handleEdit(p)} className="group bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden hover:border-indigo-500/50 transition-colors duration-500 relative flex flex-col cursor-pointer">
                           {/* Decorative glow on hover */}
                           <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                           
                           <div className="p-8 border-b border-white/5 relative z-10 flex-1">
                              <div className="flex justify-between items-start mb-6">
                                <span className="px-3 py-1 bg-black/50 border border-white/5 rounded-lg text-[10px] font-mono font-bold tracking-widest text-zinc-300">ID: {p.id}</span>
                                <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                   <button onClick={(e) => { e.stopPropagation(); handleEdit(p); }} className="p-2 bg-indigo-500/20 text-indigo-300 hover:text-white hover:bg-indigo-500 flex items-center justify-center rounded-xl transition-all shadow-[0_0_10px_rgba(99,102,241,0.2)]"><Edit2 className="w-4 h-4" /></button>
                                   <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </div>
                              <h3 className="font-display font-bold text-2xl text-white leading-tight mb-2 truncate">{p.projectName}</h3>
                              <p className="text-zinc-400 text-sm font-medium flex items-center gap-2 truncate">
                                <UserCog className="w-4 h-4" /> {p.clientName}
                              </p>
                              
                              <div className="mt-6 flex flex-wrap gap-2">
                                <span className={`px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${p.priority === 'High' ? 'text-red-400 bg-red-400/10 border-red-400/20' : p.priority === 'Medium' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' : 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'}`}>
                                  {p.priority || 'Medium'} Priority
                                </span>
                                {p.budget && <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-1"><DollarSign className="w-3 h-3" /> {p.budget}</span>}
                              </div>
                           </div>
                           
                           <div className="p-8 space-y-6 bg-black/30 relative z-10">
                             <div className="flex flex-col gap-3 justify-between text-xs font-semibold text-zinc-400">
                               <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-400" /> Deadline: <span className="text-zinc-200">{p.deadline}</span></span>
                               <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-400" /> Stage: <span className="text-zinc-200 truncate">{p.stage}</span></span>
                             </div>
                             
                             <div className="space-y-3">
                               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                 <span className="text-zinc-500">Progress</span>
                                 <span className="text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">{p.progress}%</span>
                               </div>
                               <div className="w-full bg-black rounded-full h-2 overflow-hidden shadow-inner border border-white/5">
                                 <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 relative" style={{ width: `${p.progress}%` }}>
                                   <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30 truncate pointer-events-none mix-blend-overlay"></div>
                                 </div>
                               </div>
                             </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto"
              >
                <div className="flex items-center gap-4 mb-10">
                  <button onClick={() => setViewMode('dash')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white">{editingId ? 'Edit Project' : 'Create New Project'}</h2>
                    <p className="text-zinc-400 font-medium mt-1">{editingId ? 'Update project parameters, timeline, and deliverables.' : 'Initialize a new client portal instance with core data.'}</p>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 md:p-12 space-y-12 shadow-2xl relative overflow-hidden">
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none"></div>

                  {/* General Info */}
                  <div className="relative">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-white font-bold mb-8 flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-indigo-400" /> General Parameters
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Access Code (ID)</label>
                        <input 
                          type="text" 
                          value={formData.id}
                          disabled={!!editingId}
                          onChange={e => setFormData({...formData, id: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-indigo-500 focus:bg-white/5 disabled:opacity-50 transition-all shadow-inner" 
                          placeholder="e.g., PDS-001"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Client Full Name</label>
                        <input 
                          type="text" 
                          value={formData.clientName}
                          onChange={e => setFormData({...formData, clientName: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-indigo-500 focus:bg-white/5 transition-all shadow-inner" 
                          placeholder="e.g., John Doe"
                        />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Project Objective/Name</label>
                        <input 
                          type="text" 
                          value={formData.projectName}
                          onChange={e => setFormData({...formData, projectName: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-display font-medium text-lg focus:outline-none focus:border-indigo-500 focus:bg-white/5 transition-all shadow-inner" 
                          placeholder="e.g., Nexus AI Architecture Revision"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/5"></div>

                  {/* Metadata & Status */}
                  <div className="relative">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-white font-bold mb-8 flex items-center gap-3">
                      <Activity className="w-5 h-5 text-cyan-400" /> Operational Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Deadline</label>
                        <input 
                          type="text" 
                          value={formData.deadline}
                          onChange={e => setFormData({...formData, deadline: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-cyan-500 focus:bg-white/5 transition-all" 
                          placeholder="Aug 15, 2026"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Current Stage</label>
                        <input 
                          type="text" 
                          value={formData.stage}
                          onChange={e => setFormData({...formData, stage: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-cyan-500 focus:bg-white/5 transition-all" 
                          placeholder="UI Design Phase"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Budget Setup</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input 
                            type="text" 
                            value={formData.budget || ''}
                            onChange={e => setFormData({...formData, budget: e.target.value})}
                            className="w-full bg-black/50 border border-white/10 rounded-2xl pl-10 pr-5 py-4 text-white font-medium focus:outline-none focus:border-cyan-500 focus:bg-white/5 transition-all" 
                            placeholder="65,000"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Priority Level</label>
                        <select 
                           value={formData.priority || 'Medium'}
                           onChange={e => setFormData({...formData, priority: e.target.value as any})}
                           className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4.5 text-white font-bold focus:outline-none focus:border-cyan-500 focus:bg-white/5 transition-all appearance-none cursor-pointer"
                        >
                           <option value="Low">Low</option>
                           <option value="Medium">Medium</option>
                           <option value="High">High</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-8 space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Progress Allocation (%)</label>
                        <span className="text-cyan-400 font-bold text-lg">{formData.progress}%</span>
                      </div>
                      <input 
                        type="range" 
                        value={formData.progress}
                        onChange={e => setFormData({...formData, progress: Number(e.target.value)})}
                        className="w-full accent-cyan-500 h-2 bg-black/50 rounded-full appearance-none cursor-pointer" 
                        min="0" max="100"
                      />
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/5"></div>
                  
                  {/* Media */}
                  <div className="relative">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-white font-bold mb-6 flex items-center gap-3">
                      <LinkIcon className="w-5 h-5 text-indigo-400" /> Assets & Media
                    </h3>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1 flex items-center gap-2 mb-2">Screenshot URLs (Comma Separated)</label>
                      <textarea 
                        value={formData.screenshots?.join(', ')}
                        onChange={e => setFormData({...formData, screenshots: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-5 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/5 transition-all h-32 leading-relaxed" 
                        placeholder="https://images.unsplash.com/photo-123, https://images.unsplash.com/photo-456"
                      />
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/5"></div>

                  {/* Updates Sequence */}
                  <div className="relative">
                    <div className="flex justify-between flex-col md:flex-row md:items-center gap-4 mb-8">
                      <h3 className="text-sm uppercase tracking-[0.2em] text-white font-bold flex items-center gap-3">
                        <MessageSquareText className="w-5 h-5 text-emerald-400" /> Developer Logs
                      </h3>
                      <button 
                        onClick={() => {
                          setFormData({
                            ...formData, 
                            updates: [{ id: Date.now().toString(), date: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}), text: '' }, ...(formData.updates || [])]
                          })
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors hover:bg-emerald-500 hover:text-white group"
                      >
                        <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Append Log
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.updates?.length === 0 && (
                        <div className="text-zinc-500 text-sm font-medium text-center py-12 border border-white/5 bg-black/20 rounded-[2rem] border-dashed">
                           <AlertCircle className="w-8 h-8 mx-auto mb-4 opacity-50" />
                           No communication logs added yet.
                        </div>
                      )}
                      {formData.updates?.map((u, i) => (
                        <div key={u.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-black/40 p-5 rounded-2xl border border-white/5 focus-within:border-emerald-500/50 transition-colors">
                           <input 
                             type="text" 
                             value={u.date}
                             onChange={(e) => {
                               const newUpdates = [...(formData.updates || [])];
                               newUpdates[i].date = e.target.value;
                               setFormData({...formData, updates: newUpdates});
                             }}
                             className="w-full sm:w-40 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white uppercase tracking-widest font-bold focus:outline-none focus:border-emerald-500 transition-colors"
                             placeholder="DATE"
                           />
                           <input 
                             type="text" 
                             value={u.text}
                             onChange={(e) => {
                               const newUpdates = [...(formData.updates || [])];
                               newUpdates[i].text = e.target.value;
                               setFormData({...formData, updates: newUpdates});
                             }}
                             className="flex-1 w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                             placeholder="Describe the update (e.g., Completed initial robust API endpoints...)"
                           />
                           <button 
                             onClick={() => {
                                const newUpdates = [...(formData.updates || [])];
                                newUpdates.splice(i, 1);
                                setFormData({...formData, updates: newUpdates});
                             }}
                             className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-colors shrink-0 w-full sm:w-auto flex justify-center"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-10 mt-10 border-t border-white/10 text-xs font-black uppercase tracking-[0.2em]">
                    <button 
                      onClick={() => setViewMode('dash')}
                      className="px-8 py-5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
                    >
                      Cancel Edit
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-10 py-5 rounded-xl bg-white text-black hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
