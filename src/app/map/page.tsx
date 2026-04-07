"use client";

import { useState, useEffect } from "react";
import { MapPin, ShieldAlert, Crosshair, Filter, Layers, Navigation2, Search, Database, Target, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

const mockViolations = [
  { id: 1, type: 'Red Light Jump', x: 45, y: 35, severity: 'high' },
  { id: 2, type: 'No Helmet', x: 55, y: 45, severity: 'medium' },
  { id: 3, type: 'Wrong-Way', x: 38, y: 52, severity: 'high' },
  { id: 4, type: 'Red Light Jump', x: 62, y: 38, severity: 'high' },
  { id: 5, type: 'No Helmet', x: 42, y: 65, severity: 'medium' },
];

export default function MapPage() {
  const [selectedViolation, setSelectedViolation] = useState<any>(null);
  const [zoom, setZoom] = useState(1);
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="flex h-screen bg-[#fafbfc]">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-hidden flex flex-col">
        {/* Header Overlay */}
        <header className="absolute top-10 left-[360px] right-10 z-20 flex items-center justify-between pointer-events-none">
           <div className="flex items-center gap-4 pointer-events-auto">
              <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-2 rounded-2xl shadow-2xl flex items-center gap-2">
                 <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg">
                    <Search className="w-5 h-5" />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Search location or coordinates..." 
                   className="bg-transparent border-none text-sm font-bold text-slate-800 focus:ring-0 w-64 px-2"
                 />
              </div>
              <button className="bg-white/80 backdrop-blur-xl border border-slate-100 p-4 rounded-2xl shadow-2xl hover:bg-white transition-all text-slate-600">
                 <Filter className="w-5 h-5" />
              </button>
           </div>

           <div className="flex items-center gap-4 pointer-events-auto">
              <div className="bg-slate-900 text-white p-2 rounded-2xl shadow-2xl flex items-center gap-4 pl-4">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Node</span>
                    <span className="text-xs font-black">Bengaluru Central</span>
                 </div>
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Database className="w-5 h-5" />
                 </div>
              </div>
           </div>
        </header>

        {/* Tactical Map Simulation */}
        <div className="relative flex-1 bg-slate-200 overflow-hidden cursor-crosshair">
           {/* Grid Background */}
           <div className="absolute inset-0 bg-[#0f172a]" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
              backgroundSize: '40px 40px' 
           }} />

           {/* Simulated Map Topography (Simplified SVG) */}
           <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
              <path d="M0,200 Q250,150 500,200 T1000,200" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="10 10" />
              <path d="M300,0 L300,1000" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
              <path d="M700,0 L700,1000" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
              <circle cx="500" cy="500" r="300" fill="none" stroke="#2563eb" strokeWidth="0.5" />
           </svg>

           {/* Animated Heatmap Spots */}
           <div className="absolute inset-0">
              {mockViolations.map((v) => (
                <div 
                  key={v.id} 
                  className="absolute" 
                  style={{ left: `${v.x}%`, top: `${v.y}%` }}
                >
                   <motion.div 
                     animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className={`w-12 h-12 rounded-full -ml-6 -mt-6 ${v.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`}
                   />
                   <button 
                     onClick={() => setSelectedViolation(v)}
                     className={`relative w-4 h-4 rounded-full border-2 border-white shadow-xl transition-all hover:scale-150 ${
                        v.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'
                     }`}
                   />
                </div>
              ))}
           </div>

           {/* Live Vehicle Pulse */}
           {isLive && (
             <motion.div 
                className="absolute z-10"
                initial={{ left: '10%', top: '10%' }}
                animate={{ left: '48%', top: '42%' }}
                transition={{ duration: 20, ease: "linear" }}
             >
                <div className="relative">
                   <div className="bg-blue-600 p-2 rounded-lg shadow-2xl rotate-45 border border-blue-400">
                      <Navigation2 className="w-5 h-5 text-white -rotate-45" />
                   </div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500/20 rounded-full animate-ping" />
                   
                   <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap border border-white/10">
                      Your Vehicle
                   </div>
                </div>
             </motion.div>
           )}
        </div>

        {/* Bottom Panel Overlay */}
        <footer className="absolute bottom-10 left-[360px] right-10 z-20 flex gap-6 pointer-events-none">
           <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-8 rounded-[32px] shadow-2xl flex-1 pointer-events-auto">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Violation Sites</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aggregated from local dashcam mesh</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all">Today</button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">This Week</button>
                 </div>
              </div>
              <div className="grid grid-cols-4 gap-6">
                 <MapStat label="High Priority" value="12" color="red" />
                 <MapStat label="Total Detections" value="142" color="blue" />
                 <MapStat label="Police Units Near" value="03" color="emerald" />
                 <MapStat label="Average Latency" value="1.2s" color="slate" />
              </div>
           </div>

           <AnimatePresence>
              {selectedViolation && (
                <motion.div 
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  className="w-80 bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl pointer-events-auto border border-white/5"
                >
                   <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/50">
                         <ShieldAlert className="w-6 h-6 text-red-500" />
                      </div>
                      <button 
                        onClick={() => setSelectedViolation(null)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                         Close
                      </button>
                   </div>
                   <h4 className="text-2xl font-black mb-1">{selectedViolation.type}</h4>
                   <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Sector 4 • 14:02 PM</p>
                   
                   <div className="space-y-4 mb-8">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Coordinates</p>
                         <p className="text-sm font-mono font-bold">12.9716, 77.5946</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Police Dispatch</p>
                         <p className="text-sm font-bold text-emerald-400">Available (4 min away)</p>
                      </div>
                   </div>

                   <button className="w-full py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all shadow-xl">
                      Dispatch Unit
                   </button>
                </motion.div>
              )}
           </AnimatePresence>
        </footer>

        {/* Map Controls */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
           <ControlBtn icon={Crosshair} onClick={() => setIsLive(true)} />
           <ControlBtn icon={Layers} />
           <div className="h-[1px] bg-slate-100 mx-2" />
           <ControlBtn icon={Plus} onClick={() => setZoom(z => z + 0.1)} />
           <ControlBtn icon={Minus} onClick={() => setZoom(z => z - 0.1)} />
        </div>
      </main>
    </div>
  );
}

function MapStat({ label, value, color }: any) {
  const colorMap: any = {
    red: "text-red-500 bg-red-50 border-red-100",
    blue: "text-blue-500 bg-blue-50 border-blue-100",
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-100",
    slate: "text-slate-500 bg-slate-50 border-slate-100",
  }
  return (
    <div className={`p-4 rounded-2xl border ${colorMap[color]}`}>
       <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
       <p className="text-xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function ControlBtn({ icon: Icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-14 h-14 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:scale-110"
    >
       <Icon className="w-6 h-6" />
    </button>
  );
}
