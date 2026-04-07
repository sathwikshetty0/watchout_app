'use client';

import { ShieldCheck, Download, Hash, Clock, FileCheck, CheckCircle2, AlertCircle, ExternalLink, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

interface Certificate {
  id: string;
  detectionId: string;
  violation: string;
  issuedAt: string;
  plate: string;
  sha256: string;
  signature: string;
  status: 'Valid' | 'Pending';
}

const certificates: Certificate[] = [
  {
    id: 'CERT-20260406-001',
    detectionId: 'DET-001',
    violation: 'Red Light Jump',
    issuedAt: '2026-04-06 14:33:02',
    plate: 'KA 01 AB 1234',
    sha256: '3a7f2e9c1b4d806f5c291ae3b72e1d034ca8f921e6b5047da3f9c2e1b7d804f6',
    signature: 'MEUCIQDkZ2x9...rT4bN==',
    status: 'Valid',
  },
  {
    id: 'CERT-20260406-002',
    detectionId: 'DET-004',
    violation: 'Red Light Jump',
    issuedAt: '2026-04-06 13:33:15',
    plate: 'KA 02 CD 3456',
    sha256: 'd54c7b19e280af43c7d9512ec18a4f72b39d05e7a2cf631bb72e1d034ca8f921',
    signature: 'MEQCIHpF8y1b...mX9cA==',
    status: 'Valid',
  },
  {
    id: 'CERT-20260406-003',
    detectionId: 'DET-002',
    violation: 'No Helmet',
    issuedAt: '2026-04-06 14:15:30',
    plate: 'KA 03 MN 5678',
    sha256: 'b72e1d034ca8f921e6b5047da3f9c2e1b7d804f63a7f2e9c1b4d806f5c291ae3',
    signature: '—',
    status: 'Pending',
  },
];

const violationColors: Record<string, string> = {
  'Red Light Jump': 'bg-red-50 text-red-600 border-red-100',
  'No Helmet': 'bg-amber-50 text-amber-600 border-amber-100',
  'Wrong-Way': 'bg-orange-50 text-orange-600 border-orange-100',
};

export default function ComplianceLog() {
  return (
    <div className="space-y-12">
      <header className="flex items-start justify-between">
         <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Legal Compliance Log</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
               Evidence certificates generated and vaulted under <strong>Bharatiya Sakshya Adhiniyam 2023, Section 63</strong>. 
               All logs are cryptographically sealed at the time of detection.
            </p>
         </div>
         <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-2xl flex flex-col items-center justify-center gap-2">
            <Scale className="w-8 h-8 text-blue-200" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Legal Status</p>
            <p className="text-lg font-black tracking-tight">Admissible</p>
         </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
         {/* Main Log */}
         <div className="col-span-8 space-y-6">
            {certificates.map((cert, index) => (
               <motion.div 
                 key={cert.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden group hover:border-blue-200 transition-all"
               >
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                           <FileCheck className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                           <p className="text-sm font-black text-slate-800 tracking-tight">{cert.id}</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Hash: {cert.sha256.slice(0, 12)}...</p>
                        </div>
                     </div>
                     <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        cert.status === 'Valid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-500 border border-amber-100'
                     }`}>
                        {cert.status} Evidence
                     </span>
                  </div>

                  <div className="p-8 grid grid-cols-2 gap-10">
                     <div className="space-y-6">
                        <Field label="Violation Category" value={cert.violation} badge={violationColors[cert.violation]} />
                        <Field label="Vehicle Registration" value={cert.plate} mono />
                        <Field label="Cloud Signature" value={cert.signature} mono truncate />
                     </div>
                     <div className="space-y-6">
                        <Field label="Vault Timestamp" value={cert.issuedAt} />
                        <Field label="Authority Check" value={cert.status === 'Valid' ? 'Verified by Traffic Police' : 'Awaiting Review'} color={cert.status === 'Valid' ? 'text-emerald-500' : 'text-amber-500'} />
                        <div className="pt-4 flex gap-3">
                           <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" /> Export Evidence
                           </button>
                           <button className="w-12 h-12 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
                              <ExternalLink className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Side Info */}
         <div className="col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
               <h4 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
                  <Scale className="text-blue-400 w-5 h-5" /> Evidence Protocol
               </h4>
               <p className="text-xs font-bold text-white/50 leading-relaxed mb-6">
                  The dashcam generates on-chip cryptographic signatures using <strong>ECC-P256</strong>. These are immutable and time-stamped via a decentralized NTP server.
               </p>
               <div className="space-y-3">
                  <StatusStep label="Local Hash Generation" active />
                  <StatusStep label="Authority Handshake" active />
                  <StatusStep label="Evidence Vaulting" active />
                  <StatusStep label="Legal Accessibility" />
               </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-[32px] p-8 group hover:bg-amber-100 transition-colors">
               <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-200">
                  <ShieldCheck className="text-white w-6 h-6" />
               </div>
               <h4 className="text-lg font-black text-amber-900 tracking-tight mb-2">Notice of Admissibility</h4>
               <p className="text-xs font-bold text-amber-700/70 leading-relaxed">
                  Certificate generation is compliant with the updated standards as of <strong>July 2024</strong>. Check legal documentation for local district nuances.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

function Field({ label, value, badge, mono, color, truncate }: any) {
  return (
    <div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
       {badge ? (
         <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${badge}`}>{value}</span>
       ) : (
         <p className={`text-sm font-black tracking-tight ${mono ? 'font-mono uppercase' : ''} ${color || 'text-slate-800'} ${truncate ? 'truncate max-w-[150px]' : ''}`}>
            {value}
         </p>
       )}
    </div>
  )
}

function StatusStep({ label, active }: any) {
   return (
      <div className="flex items-center gap-3">
         <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-white/10'}`} />
         <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-white/20'}`}>{label}</span>
      </div>
   )
}
