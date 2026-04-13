'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Clock, MapPin, FileCheck, ChevronRight, Filter, MoreVertical, ShieldAlert, History, Upload, Play, ScanLine, BrainCircuit, CheckCircle2, Activity, Zap, Cpu, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DetectionType = 'Violation' | 'Compliance' | 'Vehicle Classification';

interface Detection {
  id: string;
  type: DetectionType;
  category: 'Helmet' | 'Vehicle';
  vehicleType?: string;
  helmetStatus?: 'Detected' | 'Not Detected';
  timestamp: string;
  location: string;
  plate: string;
  hash: string;
  status: 'Submitted' | 'Verified' | 'Pending';
  confidence: number;
  latency: number;
  isNew?: boolean;
}

const initialDetections: Detection[] = [
  {
    id: 'CAMX-8821',
    type: 'Violation',
    category: 'Helmet',
    vehicleType: 'Motorcycle',
    helmetStatus: 'Not Detected',
    timestamp: '2026-04-13 15:45',
    location: 'MG Road, Bangalore',
    plate: 'KA 01 EK 4432',
    hash: '0x9d2b1f...5562',
    status: 'Submitted',
    confidence: 0.992,
    latency: 18.4
  },
  {
    id: 'CAMX-9902',
    type: 'Compliance',
    category: 'Helmet',
    vehicleType: 'Scooter',
    helmetStatus: 'Detected',
    timestamp: '2026-04-13 16:10',
    location: 'Indiranagar',
    plate: 'KA 03 MH 1120',
    hash: '0x4f2d1a...8892',
    status: 'Verified',
    confidence: 0.9998,
    latency: 16.2
  }
];

const typeBadge: Record<DetectionType, string> = {
  'Violation': 'bg-red-50 text-red-600 border border-red-100',
  'Compliance': 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  'Vehicle Classification': 'bg-blue-50 text-blue-600 border border-blue-100',
};

export default function DetectionFeed() {
  const [detections, setDetections] = useState<Detection[]>(initialDetections);
  const [selected, setSelected] = useState<Detection | null>(null);
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [simulatedBoxes, setSimulatedBoxes] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setScanComplete(false);
      setSelected(null);
    }
  };

  const runAiAnalysis = () => {
    setIsScanning(true);
    setScanComplete(false);
    setSimulatedBoxes([]);

    const isCompliant = Math.random() > 0.5;

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      const newDetection: Detection = {
         id: `CAMX-VAULT-${Math.floor(Math.random() * 90000) + 10000}`,
         type: isCompliant ? 'Compliance' : 'Violation',
         category: 'Helmet',
         vehicleType: 'Two-Wheeler (Motorcycle)',
         helmetStatus: isCompliant ? 'Detected' : 'Not Detected',
         timestamp: new Date().toISOString().replace('T', ' ').replace('Z', '').slice(0, 23),
         location: 'Silk Board Junction',
         plate: 'KA 05 MN ' + Math.floor(1000 + Math.random() * 9000),
         hash: '0x' + Math.random().toString(16).substr(2, 24),
         status: isCompliant ? 'Verified' : 'Pending',
         confidence: 0.998 + (Math.random() * 0.0019),
         latency: 15 + Math.floor(Math.random() * 5),
         isNew: true
      };
      
      setSimulatedBoxes([
        { 
          label: 'Vehicle: Motorcycle',
          confidence: '99.98%',
          animate: { 
            left: ['25%', '35%', '30%', '20%', '25%'], 
            top: ['30%', '35%', '32%', '28%', '30%'],
            width: ['50%', '52%', '50%', '48%', '50%'],
            height: ['60%', '62%', '60%', '58%', '60%']
          },
          transition: { duration: 8, repeat: Infinity, ease: "linear" },
          color: 'border-blue-500',
          glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
        },
        { 
          label: isCompliant ? 'Helmet: Detected' : 'No Helmet: Warning',
          confidence: '99.95%',
          animate: { 
            left: ['47%', '57%', '52%', '42%', '47%'], 
            top: ['33%', '38%', '35%', '31%', '33%'],
            width: ['6%', '7%', '6%', '5%', '6%'],
            height: ['8%', '9%', '8%', '7%', '8%']
          },
          transition: { duration: 8, repeat: Infinity, ease: "linear" },
          color: isCompliant ? 'border-emerald-500' : 'border-red-500',
          glow: isCompliant ? 'shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
        }
      ]);
      
      setDetections(prev => [newDetection, ...prev]);
      setSelected(newDetection);
    }, 4000);
  };

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-[28px] flex items-center justify-center shadow-xl shadow-blue-200 cursor-pointer hover:scale-105 transition-transform" onClick={() => fileInputRef.current?.click()}>
               <Upload className="text-white w-8 h-8" />
            </div>
            <div>
               <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-none">Detection <span className="text-blue-600 italic">Feed</span></h1>
               <p className="text-slate-400 font-bold mt-1 uppercase tracking-[0.2em] text-[10px]">Cloud Vault • Edge AI Active</p>
            </div>
         </div>
         <div className="flex gap-4">
            <input type="file" accept="video/mp4,video/x-m4v,video/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="bg-slate-900 px-6 py-4 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-95 transition-all flex items-center gap-2">
               <Upload className="w-4 h-4" /> Upload Dashcam Footage
            </button>
         </div>
      </header>

      {/* Video Scanner Area */}
      <AnimatePresence>
         {videoUrl && (
            <motion.div 
               initial={{ opacity: 0, height: 0, scale: 0.95 }}
               animate={{ opacity: 1, height: 'auto', scale: 1 }}
               exit={{ opacity: 0, height: 0, scale: 0.95 }}
               className="w-full bg-slate-900 rounded-[40px] overflow-hidden relative shadow-2xl shadow-slate-200/50 block"
            >
               <div className="p-6 border-b border-white/5 flex items-center justify-between z-10 relative bg-slate-900">
                  <div className="flex items-center gap-4 text-white">
                     <BrainCircuit className="w-6 h-6 text-blue-400" />
                     <div>
                        <h3 className="font-black text-lg tracking-tight leading-none">Neural Core Analysis</h3>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Processing uploaded evidence</p>
                     </div>
                  </div>
                  {!isScanning && !scanComplete && (
                     <button onClick={runAiAnalysis} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2">
                        <ScanLine className="w-4 h-4" /> Run AI Detection
                     </button>
                  )}
                  {scanComplete && (
                     <div className="px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Analysis Complete: {(detections[0].confidence * 100).toFixed(2)}% Confidence
                     </div>
                  )}
               </div>
               
               <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                  <video src={videoUrl} controls={!isScanning} autoPlay loop muted className={`w-full h-full object-contain ${isScanning ? 'opacity-50 blur-[2px]' : 'opacity-100'} transition-all duration-700`} />
                  
                  {isScanning && (
                     <>
                        <motion.div 
                           animate={{ top: ['0%', '100%', '0%'] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-20" 
                        />
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                           <div className="flex flex-col items-center gap-3">
                              <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                              <p className="text-white font-black text-xs uppercase tracking-[0.3em] animate-pulse">Running Neural Models...</p>
                           </div>
                        </div>
                     </>
                  )}

                  {scanComplete && simulatedBoxes.map((box, i) => (
                     <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                           opacity: 1, 
                           scale: 1,
                           ...box.animate 
                        }}
                        transition={{ 
                           ...box.transition,
                           opacity: { duration: 0.4 },
                           scale: { duration: 0.4 }
                        }}
                        className={`absolute border-2 ${box.color} bg-white/5 z-20 flex flex-col items-start rounded-lg ${box.glow}`}
                     >
                        <div className={`${box.color.replace('border-', 'bg-')} text-white px-2 py-0.5 translate-y-[-100%] rounded-t-sm whitespace-nowrap flex items-center gap-2 border-b border-white/20`}>
                           <span className="text-[8px] font-black uppercase tracking-widest">{box.label}</span>
                           <span className="text-[7px] font-mono opacity-80">{box.confidence}</span>
                        </div>
                        
                        {/* Futuristic Corner Accents */}
                        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${box.color} -ml-[2px] -mt-[2px]`} />
                        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${box.color} -mr-[2px] -mt-[2px]`} />
                        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${box.color} -ml-[2px] -mb-[2px]`} />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${box.color} -mr-[2px] -mb-[2px]`} />
                        
                        {/* Target Crosshair lines */}
                        <div className={`absolute top-1/2 left-[-10px] w-2 h-[1px] ${box.color.replace('border-', 'bg-')} opacity-40`} />
                        <div className={`absolute top-1/2 right-[-10px] w-2 h-[1px] ${box.color.replace('border-', 'bg-')} opacity-40`} />
                        <div className={`absolute left-1/2 top-[-10px] h-2 w-[1px] ${box.color.replace('border-', 'bg-')} opacity-40`} />
                        <div className={`absolute left-1/2 bottom-[-10px] h-2 w-[1px] ${box.color.replace('border-', 'bg-')} opacity-40`} />
                     </motion.div>
                  ))}
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <div className="grid grid-cols-12 gap-10 font-sans">
        <div className="col-span-12 lg:col-span-7 space-y-4">
           {detections.map((d) => (
             <motion.div
               key={d.id}
               initial={d.isNew ? { opacity: 0, x: -20, backgroundColor: '#eff6ff' } : {}}
               animate={{ opacity: 1, x: 0, backgroundColor: selected?.id === d.id ? '#ffffff' : 'rgba(255,255,255,0.7)' }}
               transition={{ duration: 0.4 }}
               onClick={() => setSelected(d)}
               whileHover={{ x: 5 }}
               className={`p-6 rounded-[32px] border transition-all cursor-pointer flex items-center gap-6 ${
                  selected?.id === d.id 
                     ? 'border-blue-200 shadow-2xl shadow-blue-100/50' 
                     : 'border-slate-50 hover:bg-white hover:border-slate-100'
               }`}
             >
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                  selected?.id === d.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-slate-100 text-slate-400'
                }`}>
                   <Camera className="w-7 h-7" />
                   {d.isNew && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />}
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${typeBadge[d.type]}`}>
                         {d.type}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white border border-slate-800">
                         AI Conf: {(d.confidence * 100).toFixed(2)}%
                      </span>
                      {d.isNew && <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest animate-pulse">Neural Core V8</span>}
                   </div>
                   <p className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">{d.plate}</p>
                   <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-500" /> {d.location}
                   </p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-slate-800 tracking-tight mb-1">{d.timestamp.split(' ')[1]}</p>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{d.latency}ms Pulse</p>
                </div>
                <ChevronRight className={`w-5 h-5 transition-colors ${selected?.id === d.id ? 'text-blue-600' : 'text-slate-200'}`} />
             </motion.div>
           ))}
        </div>

        <div className="col-span-12 lg:col-span-5">
           <AnimatePresence mode="wait">
              {selected ? (
                 <motion.div 
                    key={selected.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/10 flex flex-col gap-8 sticky top-12"
                 >
                    <div className="flex items-center justify-between">
                       <div>
                          <h3 className="text-2xl font-black tracking-tight uppercase">Evidence Insight</h3>
                          <div className="flex items-center gap-2 mt-1">
                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                             <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">Neural Verification Active</p>
                          </div>
                       </div>
                    </div>

                    <div className="aspect-square bg-white/5 rounded-[32px] border border-white/5 relative overflow-hidden group flex flex-col items-center justify-center gap-3">
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/20 z-0" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/20 z-0" />
                        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 group-hover:scale-110 transition-transform duration-500 z-10">
                           <ShieldAlert className="w-12 h-12 text-blue-400" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 z-10">Secure Artifact Hash</p>
                        <div className="absolute bottom-6 left-6 right-6 z-10">
                           <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">TS: {selected.timestamp}</span>
                              <Lock className="w-3 h-3 text-emerald-400" />
                           </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                       <InspectorField label="Confidence" value={`${(selected.confidence * 100).toFixed(4)}%`} color="text-emerald-400" />
                       <InspectorField label="Inference" value={`${selected.latency}ms`} color="text-yellow-400" />
                       <InspectorField label="Model Architecture" value="ResNet-50-Temporal" />
                       <InspectorField label="Device ID" value="JETSON-XAVIER-04" />
                       <InspectorField label="Precision Status" value="High Dynamic" color="text-blue-400" />
                       <InspectorField label="Privacy Layer" value="ZK-Anonymized" color="text-purple-400" />
                    </div>

                    <div className="space-y-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <Activity className="w-4 h-4 text-blue-400" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Edge Load</span>
                          </div>
                          <span className="text-xs font-mono font-bold">14% AI Core</span>
                       </div>
                       
                       <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3">
                          <FileCheck className="w-5 h-5" /> Attest & Submit
                       </button>
                    </div>
                 </motion.div>
              ) : (
                <div className="p-16 text-center bg-white/30 rounded-[40px] border border-dashed border-slate-200 sticky top-12 mt-12 backdrop-blur-sm">
                   <div className="w-20 h-20 bg-slate-100 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-10 h-10 text-slate-300" />
                   </div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Ready for Inspection</p>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 max-w-[200px] mx-auto leading-relaxed">Select a detection artifact to view the full neural provenance and evidence</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function InspectorField({ label, value, mono, color }: any) {
  return (
     <div className="space-y-1">
        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.1em]">{label}</p>
        <p className={`text-sm font-black tracking-tight ${mono ? 'font-mono uppercase' : ''} ${color || 'text-white/90'}`}>{value}</p>
     </div>
  )
}
