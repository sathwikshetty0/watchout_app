'use client';

import Sidebar from "@/components/Sidebar";
import { History, Play, Download, Search, Calendar, HardDrive } from "lucide-react";
import { motion } from "framer-motion";

const recordings = [
  { id: 'REC-001', date: '2026-04-13', time: '14:20', duration: '15:00', size: '256MB', location: 'Silk Board' },
  { id: 'REC-002', date: '2026-04-13', time: '12:10', duration: '10:00', size: '180MB', location: 'MG Road' },
  { id: 'REC-003', date: '2026-04-12', time: '18:45', duration: '45:00', size: '1.2GB', location: 'Indiranagar' },
  { id: 'REC-004', date: '2026-04-12', time: '09:30', duration: '20:00', size: '400MB', location: 'Koramangala' },
  { id: 'REC-005', date: '2026-04-11', time: '22:15', duration: '60:00', size: '2.4GB', location: 'Electronic City' },
];

export default function RecordingsPage() {
  return (
    <div className="flex h-screen bg-[#fafbfc] font-sans">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-10">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-[28px] flex items-center justify-center shadow-xl shadow-blue-200">
              <HardDrive className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight italic">
                Cloud <span className="text-blue-600">Vault</span>
              </h1>
              <p className="text-slate-400 font-bold tracking-tight uppercase tracking-widest text-[10px] mt-1">7-Day Rolling Storage • 4K Encryption</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search location..." 
                  className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all w-64 shadow-sm"
                />
             </div>
             <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all shadow-sm">
                <Calendar className="w-5 h-5" />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
           {recordings.map((rec, i) => (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               key={rec.id}
               className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:shadow-2xl hover:shadow-slate-200/50 transition-all"
             >
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <Play className="w-6 h-6 text-slate-400 group-hover:text-blue-600 fill-current" />
                   </div>
                   <div>
                      <p className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">{rec.location}</p>
                      <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <span>{rec.date}</span>
                         <span>•</span>
                         <span>{rec.time}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-12">
                   <div className="text-right">
                      <p className="text-xs font-black text-slate-800 mb-1">{rec.duration}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black text-slate-800 mb-1">{rec.size}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</p>
                   </div>
                   <button className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-all shadow-xl shadow-slate-200">
                      <Download className="w-5 h-5 text-white" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="mt-12 p-10 bg-slate-900 rounded-[40px] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
           <div className="relative z-10 flex items-center justify-between">
              <div>
                 <h3 className="text-2xl font-black tracking-tight mb-2">Storage Status</h3>
                 <p className="text-white/40 text-sm font-bold">12.4 GB used of 50 GB Global Quota</p>
              </div>
              <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '25%' }}
                   className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                 />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
