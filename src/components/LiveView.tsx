"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, Radio, Signal, Loader2, Wifi, WifiOff, MapPin, Gauge, ShieldAlert, CheckCircle2, Cpu, Activity, Zap, HardDrive } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Detection {
  id: string;
  type: string;
  plate: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  isViolation?: boolean;
  trackingId: string;
  latency: number;
}

export default function LiveView() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [status, setStatus] = useState<"idle" | "connecting" | "live">("idle");
  const [detections, setDetections] = useState<Detection[]>([]);
  const [telemetry, setTelemetry] = useState({ 
    speed: 45, 
    lat: 12.9716, 
    lng: 77.5946,
    fps: 24.5,
    temp: 42,
    latency: 18
  });
  const [reporting, setReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // High-precision tracking simulation
  useEffect(() => {
    if (status !== "live") {
      setDetections([]);
      return;
    }

    const interval = setInterval(() => {
      setDetections(prev => {
        // Move existing detections slightly
        const updated = prev.map(det => ({
          ...det,
          x: det.x + (Math.random() - 0.5) * 0.5,
          y: det.y + (Math.random() - 0.5) * 0.5,
          confidence: Math.min(0.9999, Math.max(0.95, det.confidence + (Math.random() - 0.5) * 0.01)),
          latency: 15 + Math.floor(Math.random() * 8)
        })).filter(det => det.x > 0 && det.x < 100 && det.y > 0 && det.y < 100);

        // Periodically add new detections or remove some to simulate traffic
        if (updated.length < 3 && Math.random() > 0.7) {
          const id = Math.random().toString(36).substr(2, 9);
          const isViolation = Math.random() > 0.8;
          updated.push({
            id,
            trackingId: `TRK-${Math.floor(1000 + Math.random() * 9000)}`,
            type: Math.random() > 0.5 ? "Motorcycle" : "Car",
            plate: `KA 0${Math.floor(Math.random() * 9)} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(1000 + Math.random() * 8999)}`,
            x: Math.random() * 70 + 10,
            y: Math.random() * 70 + 10,
            width: 15 + Math.random() * 10,
            height: 20 + Math.random() * 15,
            confidence: 0.98,
            isViolation,
            latency: 18
          });
        }
        
        // Randomly remove one if there are too many
        if (updated.length > 5) updated.shift();

        return updated;
      });

      // Update telemetry
      setTelemetry(t => ({
        ...t,
        speed: Math.max(0, t.speed + (Math.random() - 0.5) * 2),
        fps: 24 + Math.random(),
        latency: 15 + Math.floor(Math.random() * 10),
        temp: 40 + Math.random() * 5
      }));
    }, 100);

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
              {/* HUD: Top Left - Status & Processing Stats */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 font-mono">
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-red-500/20">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Live
                  </div>
                  <div className="bg-black/60 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border border-white/10">
                    {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}.{(Math.random() * 1000).toFixed(0).padStart(3, '0')}
                  </div>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/5 flex flex-col gap-1.5">
                   <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/60">
                      <div className="flex items-center gap-1.5 min-w-[60px]">
                        <Activity className="w-3 h-3 text-blue-400" />
                        <span>FPS: <span className="text-white">{telemetry.fps.toFixed(1)}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-[70px]">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span>Lat: <span className="text-white">{telemetry.latency}ms</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-[70px]">
                        <Cpu className="w-3 h-3 text-red-400" />
                        <span>Temp: <span className="text-white">{telemetry.temp.toFixed(1)}°C</span></span>
                      </div>
                   </div>
                </div>
              </div>

              {/* HUD: Top Right - Telemetry & Connectivity */}
              <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-10 transition-all">
                <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/5 flex items-center gap-4 text-white/90">
                   <div className="flex items-center gap-2">
                      <Gauge className={`w-4 h-4 ${telemetry.speed > 55 ? 'text-red-400' : 'text-blue-400'}`} />
                      <span className="font-mono text-sm font-black">{telemetry.speed.toFixed(0)} <span className="text-[10px] opacity-60 font-sans">KM/H</span></span>
                   </div>
                   <div className="w-[1px] h-4 bg-white/10" />
                   <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-[10px] font-bold">{telemetry.lat.toFixed(4)}, {telemetry.lng.toFixed(4)}</span>
                   </div>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-green-400 backdrop-blur-sm">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                   Neural Sync: Stable
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
                       : 'bg-black/60 text-white hover:bg-black/80 ring-1 ring-white/10'
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
              
              {/* Live Feed Simulator / Placeholder */}
              <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                 {/* Visual Scan Grid */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                 }} />
                 
                 <div className="flex flex-col items-center gap-4 opacity-10">
                    <HardDrive className="w-12 h-12 text-blue-400" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Edge Node Processing</p>
                 </div>
              </div>

              
              {/* Overlay: AI Processing Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
                 
                 {/* Precision Crosshair */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20 border border-white/20 rounded-full" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/40" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/40" />

                 {/* Dynamic Detections */}
                 {detections.map((det) => (
                   <motion.div
                     key={det.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{
                       left: `${det.x}%`,
                       top: `${det.y}%`,
                       width: `${det.width}%`,
                       height: `${det.height}%`,
                       opacity: 1,
                       scale: 1,
                     }}
                     transition={{ duration: 0.2, ease: "linear" }}
                     className={`absolute border-2 rounded-xl transition-colors duration-500 ${
                       det.isViolation ? 'border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-blue-400/60 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                     }`}
                   >
                     {/* Label and High-Fidelity Metadata */}
                     <div className={`absolute -top-10 left-0 flex flex-col items-start gap-1 whitespace-nowrap transition-colors`}>
                        <div className={`px-2 py-0.5 rounded-md flex items-center gap-2 ${det.isViolation ? 'bg-red-600' : 'bg-blue-600'}`}>
                           <span className="text-[9px] text-white font-black uppercase tracking-[0.1em]">{det.type} • {det.trackingId}</span>
                           <div className="w-[1px] h-2 bg-white/30" />
                           <span className="text-[9px] text-white/90 font-mono">{(det.confidence * 100).toFixed(2)}%</span>
                        </div>
                        <div className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-[8px] text-white/70 font-mono border border-white/10">
                           {det.plate} • {det.latency}ms
                        </div>
                     </div>
                     
                     {/* Corner markers - more futuristic */}
                     <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${det.isViolation ? 'border-red-400' : 'border-blue-300'} -ml-1 -mt-1`} />
                     <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${det.isViolation ? 'border-red-400' : 'border-blue-300'} -mr-1 -mt-1`} />
                     <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${det.isViolation ? 'border-red-400' : 'border-blue-300'} -ml-1 -mb-1`} />
                     <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${det.isViolation ? 'border-red-400' : 'border-blue-300'} -mr-1 -mb-1`} />
                     
                     {/* Internal scanning lines for violation */}
                     {det.isViolation && (
                        <motion.div 
                           animate={{ top: ['0%', '100%', '0%'] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                           className="absolute left-0 right-0 h-0.5 bg-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-0"
                        />
                     )}
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
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Neural Edge Core</span>
          </div>
          <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
            Local inference running <strong>YOLOv8-Nano</strong>. Latency optimized for sub-20ms detection-to-sync.
          </p>
        </div>
        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 group hover:bg-emerald-50 transition-colors">
           <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">ZK-Proof Engine</span>
          </div>
          <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
            Generating <strong>Zero-Knowledge proofs</strong> of violations for cryptographic privacy compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
