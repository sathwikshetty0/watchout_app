"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, Radio, Signal, Loader2, Wifi, WifiOff, MapPin, Gauge, ShieldAlert, CheckCircle2, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/supabase";

interface Detection {
  id: string;
  type: string;
  plate: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isViolation?: boolean;
}

export default function LiveView() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [status, setStatus] = useState<"idle" | "connecting" | "live">("idle");
  const [detections, setDetections] = useState<Detection[]>([]);
  const [telemetry, setTelemetry] = useState({ speed: 45, lat: 12.9716, lng: 77.5946 });
  const [reporting, setReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulation: Dynamic Detections
  useEffect(() => {
    if (status !== "live") {
      setDetections([]);
      return;
    }

    const interval = setInterval(() => {
      const mockDetections: Detection[] = [
        {
          id: "1",
          type: "Vehicle",
          plate: "KA 03 AA 1234",
          x: 30 + Math.random() * 5,
          y: 40 + Math.random() * 5,
          width: 30,
          height: 25,
        },
        {
          id: "2",
          type: "Bike",
          plate: "KA 05 MN 9988",
          x: 60 + Math.random() * 5,
          y: 50 + Math.random() * 5,
          width: 15,
          height: 20,
          isViolation: Math.random() > 0.8,
        }
      ];
      setDetections(mockDetections);
      
      // Update telemetry
      setTelemetry(prev => ({
        ...prev,
        speed: 40 + Math.floor(Math.random() * 15),
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001,
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [status]);

  const toggleStream = async () => {
    if (isStreaming) {
      setIsStreaming(false);
      setStatus("idle");
      return;
    }

    setConnecting(true);
    setStatus("connecting");
    
    setTimeout(() => {
      setConnecting(false);
      setIsStreaming(true);
      setStatus("live");
    }, 2000);
  };

  const handleReport = () => {
    setReporting(true);
    // Simulate API call to report violation
    setTimeout(() => {
      setReporting(false);
      setReportSuccess(true);
      setTimeout(() => setReportSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-100 border border-slate-100/50 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl transition-colors duration-500 ${status === 'live' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
            <Camera className={`w-6 h-6 ${status === 'live' ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg tracking-tight">Dashcam Live Feed</h3>
            <div className="flex items-center gap-3">
               <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                 <Signal className={`w-3 h-3 ${status === 'live' ? 'text-green-500' : 'text-slate-300'}`} />
                 {status === 'live' ? 'Connected (WebRTC)' : 'Disconnected'}
               </p>
               {status === 'live' && (
                 <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
               )}
               {status === 'live' && (
                 <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">ID: HD-8821</p>
               )}
            </div>
          </div>
        </div>

        <button
          onClick={toggleStream}
          disabled={connecting}
          className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 active:scale-95 ${
            status === 'live' 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
          }`}
        >
          {connecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : status === 'live' ? (
            <>
              <WifiOff className="w-5 h-5" />
              Stop Feed
            </>
          ) : (
            <>
              <Wifi className="w-5 h-5" />
              Go Live
            </>
          )}
        </button>
      </div>

      <div className="relative aspect-video rounded-[24px] bg-slate-900 overflow-hidden group border-4 border-slate-100/50">
        <AnimatePresence mode="wait">
          {status === "live" ? (
            <motion.div
              key="live"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0"
            >
              {/* HUD: Top Left - Status */}
              <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-red-500/20">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Live
                </div>
                <div className="bg-black/60 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider border border-white/10">
                  00:{telemetry.speed > 55 ? '58' : '45'}:12
                </div>
              </div>

              {/* HUD: Top Right - Telemetry */}
              <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-10 transition-all">
                <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/5 flex items-center gap-4 text-white/90">
                   <div className="flex items-center gap-2">
                      <Gauge className={`w-4 h-4 ${telemetry.speed > 55 ? 'text-red-400' : 'text-blue-400'}`} />
                      <span className="font-mono text-sm font-black">{telemetry.speed} <span className="text-[10px] opacity-60">KM/H</span></span>
                   </div>
                   <div className="w-[1px] h-4 bg-white/10" />
                   <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-[10px] font-bold">{telemetry.lat.toFixed(4)}, {telemetry.lng.toFixed(4)}</span>
                   </div>
                </div>
              </div>

              {/* Report Violation Call-to-Action */}
              <div className="absolute bottom-6 inset-x-6 flex justify-center z-10">
                 <button
                   onClick={handleReport}
                   disabled={reporting || reportSuccess}
                   className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 backdrop-blur-xl border border-white/20 shadow-2xl ${
                     reportSuccess 
                       ? 'bg-green-500/90 text-white border-green-400'
                       : 'bg-black/60 text-white hover:bg-black/80'
                   }`}
                 >
                   {reporting ? (
                     <>
                       <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                       Uploading Evidence...
                     </>
                   ) : reportSuccess ? (
                     <>
                       <CheckCircle2 className="w-4 h-4" />
                       Violation Reported +₹150
                     </>
                   ) : (
                     <>
                       <ShieldAlert className="w-4 h-4 text-yellow-400" />
                       Report Active Violation
                     </>
                   )}
                 </button>
              </div>
              
              {/* Simulated Feed */}
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-60 transition-all duration-1000"
                style={{ filter: telemetry.speed > 55 ? 'contrast(1.5) saturate(1.2)' : 'none' }}
                alt="Live Traffic"
              />
              
              {/* Overlay: AI Processing Simulation */}
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
                 
                 {/* Dynamic Detections */}
                 {detections.map((det) => (
                   <motion.div
                     key={det.id}
                     initial={false}
                     animate={{
                       left: `${det.x}%`,
                       top: `${det.y}%`,
                       width: `${det.width}%`,
                       height: `${det.height}%`,
                     }}
                     className={`absolute border-2 rounded-xl transition-colors duration-500 ${
                       det.isViolation ? 'border-red-500/60 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-blue-400/40 bg-blue-500/5'
                     }`}
                   >
                     <div className={`absolute -top-6 left-0 flex items-center gap-2 whitespace-nowrap px-2 py-0.5 rounded-t-lg transition-colors ${
                       det.isViolation ? 'bg-red-600' : 'bg-blue-600'
                     }`}>
                        <span className="text-[10px] text-white font-black uppercase tracking-wider">{det.type} • {det.plate}</span>
                        {det.isViolation && <ShieldAlert className="w-3 h-3 text-white fill-white/20 animate-bounce" />}
                     </div>
                     
                     {/* Corner markers */}
                     <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/40 -ml-0.5 -mt-0.5" />
                     <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/40 -mr-0.5 -mt-0.5" />
                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/40 -ml-0.5 -mb-0.5" />
                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/40 -mr-0.5 -mb-0.5" />
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-4"
            >
              <div className="relative">
                <Radio className="w-16 h-16 opacity-10" />
                <motion.div 
                  className="absolute inset-0 border-2 border-slate-200 rounded-full"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="text-center">
                 <p className="font-extrabold text-[10px] uppercase tracking-[0.3em] opacity-40">Feed Offline</p>
                 <p className="text-xs font-bold text-slate-300 mt-1">Waiting for WebRTC Uplink</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 group hover:bg-blue-50 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">AI Local Core</span>
          </div>
          <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
            On-device inference processing at <strong>24.5 FPS</strong>. Anonymizing PII before cloud sync.
          </p>
        </div>
        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 group hover:bg-emerald-50 transition-colors">
           <div className="flex items-center gap-2 mb-2">
            <Signal className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Storage Link</span>
          </div>
          <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
            Proof-of-Violation hashes being written to <strong>IPFS Cluster</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
