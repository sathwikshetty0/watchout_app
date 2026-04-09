'use client';

import { useState } from 'react';
import { Camera, Clock, MapPin, FileCheck, ChevronRight, Filter, MoreVertical, ShieldAlert, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ViolationType = 'Red Light Jump' | 'Wrong-Way' | 'No Helmet';

interface Detection {
  id: string;
  type: ViolationType;
  timestamp: string;
  location: string;
  plate: string;
  hash: string;
  status: 'Submitted' | 'Verified' | 'Pending';
}

// Data will be fetched from Supabase
const detections: Detection[] = [];

const typeBadge: Record<ViolationType, string> = {
  'Red Light Jump': 'bg-red-50 text-red-600 border border-red-100',
  'Wrong-Way': 'bg-orange-50 text-orange-600 border border-orange-100',
  'No Helmet': 'bg-amber-50 text-amber-600 border border-amber-100',
};

const statusBadge: Record<Detection['status'], string> = {
  Verified: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  Submitted: 'bg-sky-50 text-sky-600 border border-sky-100',
  Pending: 'bg-slate-50 text-slate-400 border border-slate-100',
};

export default function DetectionFeed() {
  const [selected, setSelected] = useState<Detection | null>(null);


  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 rounded-[28px] flex items-center justify-center shadow-xl shadow-slate-200">
               <History className="text-blue-400 w-8 h-8" />
            </div>
            <div>
               <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Detection Archive</h1>
               <p className="text-slate-400 font-bold mt-1 uppercase tracking-[0.2em] text-[10px]">Cloud Vault • Edge Sync Active</p>
            </div>
         </div>
         <div className="flex gap-4">
            <button className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-slate-500 hover:text-slate-800 transition-all">
               <Filter className="w-5 h-5" />
            </button>
            <button className="bg-slate-900 px-6 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-95 transition-all">
               Sync Dashcam
            </button>
         </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        {/* Feed List */}
        <div className="col-span-7 space-y-4">
           {detections.length > 0 ? (
             detections.map((d) => (
               <motion.div
                 key={d.id}
                 onClick={() => setSelected(d)}
                 whileHover={{ x: 10 }}
                 className={`p-6 rounded-[32px] border transition-all cursor-pointer flex items-center gap-6 ${
                    selected?.id === d.id 
                      ? 'bg-white border-blue-200 shadow-2xl shadow-blue-100/50' 
                      : 'bg-white/50 border-slate-50 hover:bg-white hover:border-slate-100'
                 }`}
               >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    selected?.id === d.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-slate-100 text-slate-400'
                  }`}>
                     <Camera className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${typeBadge[d.type]}`}>
                           {d.type}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${statusBadge[d.status]}`}>
                           {d.status}
                        </span>
                     </div>
                     <p className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">{d.plate}</p>
                     <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {d.location}
                     </p>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-black text-slate-800 tracking-tight mb-1">{d.timestamp.split(' ')[1]}</p>
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{d.id}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-colors ${selected?.id === d.id ? 'text-blue-600' : 'text-slate-200'}`} />
               </motion.div>
            ))
           ) : (
             <div className="p-20 text-center bg-white/50 rounded-[40px] border border-dashed border-slate-200">
                <Camera className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No detections captured yet</p>
                <p className="text-[10px] font-bold text-slate-300 mt-2">Connect your dashcam to start sync</p>
             </div>
           )}
        </div>


        {/* Evidence Inspector */}
        <div className="col-span-5">
           <AnimatePresence mode="wait">
              {selected && (
                 <motion.div 
                    key={selected.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl shadow-slate-300 flex flex-col gap-8 sticky top-12"
                 >
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-black tracking-tight">Evidence View</h3>
                       <button className="text-white/40 hover:text-white transition-colors">
                          <MoreVertical className="w-5 h-5" />
                       </button>
                    </div>

                    {/* Evidence Image Holder */}
                    <div className="aspect-video bg-white/5 rounded-[32px] border border-white/5 relative overflow-hidden group flex flex-col items-center justify-center gap-3">
                        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                           <ShieldAlert className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Waiting for Evidence Uplink</p>
                    </div>


                    <div className="grid grid-cols-2 gap-6">
                       <InspectorField label="Vault Node" value="BGL-CENTRAL" />
                       <InspectorField label="AI Confidence" value="99.2%" color="text-emerald-400" />
                       <InspectorField label="Device ID" value="NXR-194BF" />
                       <InspectorField label="IPFS Link" value="QmX...9cA" mono />
                    </div>

                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Cryptographic Proof</p>
                       <p className="text-[10px] font-mono break-all text-blue-400 leading-relaxed font-bold">
                          {selected.hash.repeat(2)}
                       </p>
                    </div>

                    <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                       <FileCheck className="w-5 h-5" /> Export Compliance PDF
                    </button>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function InspectorField({ label, value, mono, color }: any) {
   return (
      <div>
         <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{label}</p>
         <p className={`text-sm font-black tracking-tight ${mono ? 'font-mono uppercase' : ''} ${color || 'text-white/90'}`}>{value}</p>
      </div>
   )
}
