'use client';

import Sidebar from "@/components/Sidebar";
import { Server, Shield, Users, Activity, Zap, Cpu, Global, Database, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-[#fafbfc] font-sans">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-10">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 rounded-[28px] flex items-center justify-center shadow-xl shadow-slate-200">
              <Server className="text-blue-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                CamX <span className="text-blue-600">Core</span>
              </h1>
              <p className="text-slate-400 font-bold tracking-tight uppercase tracking-widest text-[10px] mt-1">Superuser Command & Control Center</p>
            </div>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-blue-100 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Cluster Healthy
             </div>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-8 mb-12">
           <AdminStat label="Total Operators" value="8,402" icon={Users} />
           <AdminStat label="Cluster Throughput" value="1.2 GB/s" icon={Zap} />
           <AdminStat label="Verification Nodes" value="142" icon={Cpu} />
           <AdminStat label="System Security" value="v4.2-E" icon={Lock} />
        </div>

        <div className="grid grid-cols-12 gap-10">
           <div className="col-span-8 bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-black tracking-tight mb-8">Global Node Activity</h3>
              <div className="relative h-64 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                 <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Network Map Visualization Not Loaded</p>
              </div>
              <div className="mt-8 grid grid-cols-4 gap-4">
                 <p className="text-[10px] font-black uppercase text-white/20">Active Regions: 12</p>
                 <p className="text-[10px] font-black uppercase text-white/20">Latency: 14ms</p>
                 <p className="text-[10px] font-black uppercase text-white/20">Protocol: CAMX-SECURE</p>
                 <p className="text-[10px] font-black uppercase text-white/20">Identity: ROOT</p>
              </div>
           </div>

           <div className="col-span-4 bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8 text-center uppercase tracking-widest">Health Monitor</h3>
              <div className="flex flex-col items-center justify-center gap-6">
                 <div className="w-32 h-32 border-8 border-emerald-500 border-t-slate-100 rounded-full flex items-center justify-center relative">
                    <p className="text-2xl font-black text-slate-800">98%</p>
                 </div>
                 <div className="text-center">
                    <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">Uptime Optimised</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Last reset: 124 days ago</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function AdminStat({ label, value, icon: Icon }: any) {
   return (
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-6">
            <Icon className="w-6 h-6 text-slate-400" />
         </div>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
         <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
      </div>
   )
}
