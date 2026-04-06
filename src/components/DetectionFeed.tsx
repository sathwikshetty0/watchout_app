"use client";

import React from "react";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert,
  EyeOff,
  ChevronRight,
  Hash
} from "lucide-react";
import { motion } from "framer-motion";

const violations = [
  {
    id: "V-9021",
    type: "Red Light Jump",
    location: "Koramangala 5th Block",
    time: "2 mins ago",
    status: "Verified",
    confidence: 99.4,
    fine: "₹ 500",
    reward: "₹ 50"
  },
  {
    id: "V-9018",
    type: "Wrong Way Driving",
    location: "Indiranagar 100ft Rd",
    time: "15 mins ago",
    status: "Pending",
    confidence: 88.2,
    fine: "₹ 1,000",
    reward: "₹ 100"
  },
  {
    id: "V-8995",
    type: "No Helmet Detection",
    location: "MG Road Metro",
    time: "1 hour ago",
    status: "Verified",
    confidence: 97.8,
    fine: "₹ 500",
    reward: "₹ 50"
  }
];

const ViolationCard = ({ violation }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group"
  >
    <div className="flex gap-6">
      <div className="relative w-48 h-32 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center grayscale opacity-50 blur-[2px]" />
        <div className="absolute inset-x-8 inset-y-12 bg-white/40 backdrop-blur-md rounded-lg flex items-center justify-center">
          <EyeOff className="w-5 h-5 text-slate-700" />
        </div>
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-[10px] text-white font-mono flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {violation.time}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                violation.status === 'Verified' ? 'bg-emerald-50 text-success' : 'bg-amber-50 text-amber-600'
              }`}>
                {violation.status}
              </span>
              <span className="text-[10px] text-secondary font-mono flex items-center gap-1">
                <Hash className="w-3 h-3" /> {violation.id}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{violation.type}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-success">Reward: {violation.reward}</p>
            <p className="text-[10px] text-secondary">AI Confidence: {violation.confidence}%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-secondary mt-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {violation.location}
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            BSA Sec 63 Signed
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-slate-50 text-slate-300 group-hover:text-primary transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  </motion.div>
);

export const DetectionFeed = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Detection Feed</h2>
          <p className="text-secondary">Review real-time violations processed by your local node.</p>
        </div>
        <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live Monitoring
        </div>
      </header>

      <div className="space-y-4">
        {violations.map((v) => (
          <ViolationCard key={v.id} violation={v} />
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 border-dashed text-center">
        <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-4" />
        <h4 className="text-sm font-bold text-secondary uppercase tracking-widest">End of Stream</h4>
        <p className="text-xs text-slate-400 mt-1">New detections will appear here automatically.</p>
      </div>
    </div>
  );
};
