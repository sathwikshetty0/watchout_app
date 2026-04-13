'use client';

import { useState } from "react";
import { CheckCircle, XCircle, Play, ShieldAlert, X, FileCheck, Ban, Clock, BrainCircuit, Activity, Zap, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Initial Mock data with AI metadata
const initialPending = [
  { id: 'C-001', plate: 'KA 03 MH 9982', type: 'Red Light Jump', time: '14:20', confidence: 0.998, model: 'Temporal-Flow-V4' },
  { id: 'C-002', plate: 'KA 01 EK 4432', type: 'No Helmet', time: '15:45', confidence: 0.9992, model: 'Neural-Head-Pose' },
  { id: 'C-003', plate: 'KA 05 AJ 1120', type: 'Wrong-Way', time: '11:10', confidence: 0.985, model: 'Optical-Sync' },
  { id: 'C-004', plate: 'KA 09 PL 1120', type: 'Speeding', time: '16:30', confidence: 0.9995, model: 'Lidar-Sim' },
  { id: 'C-005', plate: 'KA 04 XY 9012', type: 'No Seatbelt', time: '09:15', confidence: 0.992, model: 'Interior-Core' },
];

const initialAccepted = [
  { id: 'C-101', plate: 'MH 02 AB 1234', type: 'No Helmet', time: 'Yesterday', paid: true },
  { id: 'C-102', plate: 'DL 01 CD 5678', type: 'Red Light Jump', time: 'Yesterday', paid: false },
];

const initialRejected = [
  { id: 'C-201', plate: 'TS 09 EF 9012', type: 'Wrong-Way', time: '2 Days Ago', reason: 'License plate unclear' },
];

type TabType = 'pending' | 'accepted' | 'rejected';

export default function PoliceDashboard() {
  const [pendingCases, setPendingCases] = useState<any[]>(initialPending);
  const [acceptedCases, setAcceptedCases] = useState<any[]>(initialAccepted);
  const [rejectedCases, setRejectedCases] = useState<any[]>(initialRejected);
  
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  const paymentsDoneCount = acceptedCases.filter(c => c.paid).length;

  const handleAction = (action: 'accept' | 'reject') => {
    if (action === 'accept') {
      setPendingCases(prev => prev.filter(c => c.id !== selectedCase.id));
      setAcceptedCases(prev => [{ ...selectedCase, paid: false }, ...prev]);
      setSelectedCase(null);
      setIsRejecting(false);
    } else {
      if (!rejectReason) return alert("Please provide a reason to reject.");
      setPendingCases(prev => prev.filter(c => c.id !== selectedCase.id));
      setRejectedCases(prev => [{ ...selectedCase, reason: rejectReason }, ...prev]);
      setSelectedCase(null);
      setRejectReason("");
      setIsRejecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans p-10 pt-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
           <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Traffic <span className="text-blue-600">Command</span></h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Law Enforcement Interface • Alpha v2.4</p>
           </div>
           
           <div className="flex bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
              <TabButton 
                 active={activeTab === 'pending'} 
                 onClick={() => setActiveTab('pending')}
                 icon={Clock} 
                 label="Pending" 
                 count={pendingCases.length} 
              />
              <TabButton 
                 active={activeTab === 'accepted'} 
                 onClick={() => setActiveTab('accepted')}
                 icon={FileCheck} 
                 label="Accepted" 
                 count={acceptedCases.length} 
              />
              <TabButton 
                 active={activeTab === 'rejected'} 
                 onClick={() => setActiveTab('rejected')}
                 icon={Ban} 
                 label="Rejected" 
                 count={rejectedCases.length} 
              />
           </div>
        </div>

        {/* Tab Content & Dashboards */}
        <AnimatePresence mode="wait">
           {activeTab === 'pending' && (
              <motion.div key="pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard label="Direct Pipeline" value={pendingCases.length} icon={Activity} color="text-blue-600" />
                    <StatCard label="AI High Conf" value={pendingCases.filter(c => c.confidence > 0.99).length} icon={BrainCircuit} color="text-emerald-500" />
                    <StatCard label="Avg. Precision" value="99.4%" icon={Zap} color="text-yellow-500" />
                    <StatCard label="Auth Nodes" value="Stable" icon={Lock} color="text-purple-500" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pendingCases.map((c) => (
                      <div 
                        key={c.id}
                        onClick={() => { setSelectedCase(c); setIsRejecting(false); setRejectReason(""); }}
                        className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 cursor-pointer transition-all hover:border-blue-200 group relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100/50 transition-colors" />
                         
                         <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                               <ShieldAlert className="w-6 h-6" />
                            </div>
                            <div className="text-right">
                               <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{c.time}</p>
                               <p className="text-[9px] font-black text-emerald-500 tracking-widest uppercase">{(c.confidence * 100).toFixed(1)}% Match</p>
                            </div>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-1 relative z-10">{c.plate}</h3>
                         <div className="flex items-center gap-2 relative z-10">
                            <p className="text-xs font-black text-blue-500 uppercase tracking-widest">{c.type}</p>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <p className="text-[9px] font-bold text-slate-400 uppercase">{c.model}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
           )}

           {activeTab === 'accepted' && (
              <motion.div key="accepted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <div className="flex items-center justify-between bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 mb-8">
                    <div className="flex gap-16">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Accepted Cases</p>
                          <p className="text-5xl font-black text-blue-600">{acceptedCases.length}</p>
                       </div>
                       <div className="w-px bg-slate-100" />
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Challans Paid</p>
                          <p className="text-5xl font-black text-emerald-500">{paymentsDoneCount}</p>
                       </div>
                    </div>
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center">
                       <FileCheck className="w-8 h-8" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {acceptedCases.map((c) => (
                      <div key={c.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-colors">
                         <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                               <CheckCircle className="w-6 h-6" />
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                               c.paid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-600'
                            }`}>
                               {c.paid ? 'Paid' : 'Payment Pending'}
                            </div>
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-1">{c.plate}</h3>
                         <p className="text-xs font-black text-slate-500 tracking-widest">{c.type}</p>
                      </div>
                    ))}
                 </div>
              </motion.div>
           )}

           {activeTab === 'rejected' && (
              <motion.div key="rejected" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <div className="flex items-center justify-between bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 mb-8">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Rejected Cases</p>
                       <p className="text-5xl font-black text-red-500">{rejectedCases.length}</p>
                    </div>
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center">
                       <Ban className="w-8 h-8" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-4">
                    {rejectedCases.map((c) => (
                      <div key={c.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                               <XCircle className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase mb-1">{c.plate}</h3>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.type}</p>
                            </div>
                         </div>
                         <div className="bg-slate-50 px-6 py-4 rounded-2xl max-w-sm text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rejection Reason</p>
                            <p className="text-xs font-bold text-slate-600 truncate">{c.reason}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
           )}
        </AnimatePresence>
      </div>

      {/* Adjudication Modal for Pending Cases */}
      <AnimatePresence>
         {selectedCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
                 onClick={() => setSelectedCase(null)}
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 40 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 40 }}
                 className="relative bg-white w-full max-w-6xl rounded-[60px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
               >
                  {/* Video Section with AI Overlay */}
                  <div className="md:w-2/3 bg-slate-900 relative flex items-center justify-center min-h-[500px] overflow-hidden">
                     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
                     
                     <Play className="w-24 h-24 text-white/20 hover:text-white/40 transition-all hover:scale-110 duration-500 cursor-pointer z-10" />
                     
                     {/* Simulated AI ROI Bounding Box */}
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute w-[40%] h-[50%] border-2 border-red-500/60 rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.3)] flex flex-col items-start"
                     >
                        <div className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest translate-y-[-100%] rounded-t-md">
                           Violation Candidate • {(selectedCase.confidence * 100).toFixed(2)}% Conf
                        </div>
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-400 -ml-[2px] -mt-[2px]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-400 -mr-[2px] -mb-[2px]" />
                        
                        <motion.div 
                           animate={{ top: ['0%', '100%', '0%'] }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className="absolute left-0 right-0 h-0.5 bg-red-400/40 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                        />
                     </motion.div>

                     <div className="absolute top-8 left-8 flex flex-col gap-2">
                        <div className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-red-600/20">
                           <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> AI Provenance Verified
                        </div>
                        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-white/70 font-mono border border-white/10 uppercase tracking-widest">
                           HASH: {Math.random().toString(16).substr(2, 16)}
                        </div>
                     </div>
                  </div>

                  {/* Actions Section */}
                  <div className="md:w-1/3 p-14 flex flex-col bg-white overflow-y-auto">
                     <div className="flex justify-between items-center mb-12">
                        <div>
                           <h3 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">{selectedCase.plate}</h3>
                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2">Verified Artifact ID: {selectedCase.id}</p>
                        </div>
                        <button onClick={() => setSelectedCase(null)} className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-2xl hover:bg-slate-100 transition-all border border-slate-100">
                           <X className="w-6 h-6 text-slate-400" />
                        </button>
                     </div>

                     <div className="space-y-8 mb-12">
                        <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Detection Logic</p>
                           <p className="text-xl font-black text-slate-800 tracking-tight">{selectedCase.type}</p>
                           <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">Processed by {selectedCase.model}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Incident Time</p>
                              <p className="text-lg font-black text-slate-800">{selectedCase.time} IST</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confidence</p>
                              <p className="text-lg font-black text-emerald-500">{(selectedCase.confidence * 100).toFixed(2)}%</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-auto">
                        {isRejecting ? (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                              <textarea 
                                placeholder="Specify legal rejection reason..." 
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-bold focus:ring-4 focus:ring-red-100 focus:border-red-200 outline-none transition-all min-h-[140px]"
                              />
                              <div className="flex gap-4">
                                 <button 
                                   onClick={() => setIsRejecting(false)}
                                   className="px-8 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors"
                                 >
                                    Back
                                 </button>
                                 <button 
                                   onClick={() => handleAction('reject')}
                                   className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all"
                                 >
                                    Confirm Rejection
                                 </button>
                              </div>
                           </motion.div>
                        ) : (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                              <button 
                                onClick={() => setIsRejecting(true)}
                                className="flex-1 py-6 bg-white border-2 border-slate-100 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:border-red-200 hover:text-red-500 transition-all flex items-center justify-center gap-2"
                              >
                                 <XCircle className="w-5 h-5" /> Reject
                              </button>
                              <button 
                                onClick={() => handleAction('accept')}
                                className="flex-1 py-6 bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-600/40 active:scale-95 transition-all flex items-center justify-center gap-2"
                              >
                                 <CheckCircle className="w-5 h-5" /> Accept
                              </button>
                           </motion.div>
                        )}
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
   return (
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
         <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
         </div>
         <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-black text-slate-800">{value}</p>
         </div>
      </div>
   )
}

function TabButton({ active, onClick, icon: Icon, label, count }: any) {
   return (
      <button 
        onClick={onClick}
        className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
           active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
        }`}
      >
         <Icon className="w-4 h-4" />
         {label}
         <span className={`px-2 py-0.5 rounded-full text-[9px] ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
            {count}
         </span>
      </button>
   )
}
