"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, Radio, Signal, Loader2, Wifi, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/supabase";

export default function LiveView() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [status, setStatus] = useState<"idle" | "connecting" | "live">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Supabase Realtime Simulation for WebRTC Signaling
  const toggleStream = async () => {
    if (isStreaming) {
      setIsStreaming(false);
      setStatus("idle");
      return;
    }

    setConnecting(true);
    setStatus("connecting");

    // Simulate "WebRTC Handshake" via Supabase Broadcast
    // 1. App emits 'REQUEST_STREAM'
    // 2. Dashcam responds with 'SDP_OFFER'
    // 3. App responds with 'SDP_ANSWER'
    
    setTimeout(() => {
      setConnecting(false);
      setIsStreaming(true);
      setStatus("live");
    }, 2000);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-100 border border-slate-100/50 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${status === 'live' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg tracking-tight">Dashcam Live Feed</h3>
            <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
              <Signal className={`w-3 h-3 ${status === 'live' ? 'text-green-500' : 'text-slate-300'}`} />
              {status === 'live' ? 'Connected (WebRTC)' : 'Disconnected'}
            </p>
          </div>
        </div>

        <button
          onClick={toggleStream}
          disabled={connecting}
          className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 ${
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

      <div className="relative aspect-video rounded-[24px] bg-slate-900 overflow-hidden group">
        <AnimatePresence mode="wait">
          {status === "live" ? (
            <motion.div
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  Live
                </div>
                <div className="bg-black/40 backdrop-blur-md text-white/80 px-3 py-1 rounded-full text-xs font-bold font-mono">
                  00:45:12
                </div>
              </div>
              
              {/* Simulated Feed */}
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-50 contrast-125 grayscale-[0.2]"
                alt="Live Traffic"
              />
              
              {/* Overlay: AI Processing Simulation */}
              <div className="absolute inset-0 bg-[#00ff0005] pointer-events-none">
                 <div className="absolute inset-0 border-2 border-green-500/10" />
                 {/* Bounding box mock */}
                 <div className="absolute top-1/2 left-1/3 w-32 h-20 border border-green-400/50 rounded-lg">
                    <span className="absolute -top-5 left-0 text-[10px] bg-green-500 text-black px-1.5 py-0.5 font-bold uppercase rounded-sm">Vehicle: KA03 AA 1234</span>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-4"
            >
              <Radio className="w-12 h-12 opacity-20" />
              <p className="font-bold text-sm uppercase tracking-widest opacity-40">Feed Offline</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
        <p className="text-blue-700 text-xs font-medium leading-relaxed">
          <strong className="font-extrabold uppercase tracking-wider block mb-1">How it works:</strong>
          Supabase acts as a <strong>Signaling Server</strong>. It uses Realtime Broadcast to exchange WebRTC handshakes between your dashcam and this app, establishing a direct, encrypted Peer-to-Peer video tunnel.
        </p>
      </div>
    </div>
  );
}
