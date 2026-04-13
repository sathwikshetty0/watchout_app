"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Overview from "@/components/Overview";
import LiveView from "@/components/LiveView";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CreditCard, ShieldCheck, TrendingUp, Loader2, Plus, Download, Shield, ArrowRight } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalEarned: 0,
    verifiedViolations: 0,
    pendingVerifications: 0,
    systemHealth: 0
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 gap-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="font-extrabold text-slate-400 uppercase tracking-widest text-sm font-sans">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#fafbfc] font-sans">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Welcome back, <span className="text-blue-600 font-black">{user?.user_metadata?.full_name?.split(' ')[0] || "Chief"}</span>
            </h1>
            <p className="text-slate-400 font-bold tracking-tight">System Status: <span className="text-green-500 uppercase tracking-wider text-xs ml-2 border border-green-200 px-3 py-1 rounded-full bg-green-50">Operational</span></p>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
              <Bell className="w-6 h-6 text-slate-400" />
              <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
            </button>
            <div className="h-14 w-[1px] bg-slate-100" />
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Session ID</p>
                <code className="text-xs font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg tracking-widest">
                  PENDING
                </code>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-10 animate-entrance">
          {/* Top Row: Quick Stats */}
          <div className="col-span-12 grid grid-cols-4 gap-8">
            <StatCard 
               label="Total Earnings" 
               value={`₹${stats.totalEarned.toLocaleString()}`} 
               icon={CreditCard} 
               trend="+12% today" 
               color="blue"
            />
            <StatCard 
               label="Cases Approved" 
               value={stats.verifiedViolations.toString()} 
               icon={ShieldCheck} 
               trend="+4 this wk"
               color="green" 
            />
            <StatCard 
               label="Cases Filed" 
               value={stats.pendingVerifications.toString()} 
               icon={Loader2} 
               trend="Avg 2hr"
               color="amber"
            />
            <StatCard 
               label="AI Detections" 
               value="124" 
               icon={TrendingUp} 
               trend="Optimal"
               color="slate"
            />
          </div>

          {/* Main Area: Live View & Activity */}
          <div className="col-span-8 flex flex-col gap-10">
             <LiveView />
             <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <div>
                      <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Activity Log</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Violation Ledger</p>
                   </div>
                   <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sync</span>
                   </div>
                </div>
                <Overview />
             </div>
          </div>

          {/* Sidebar Area: Quick Actions & Rewards */}
          <div className="col-span-4 space-y-10">
             {/* Quick Actions */}
             <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl shadow-slate-100/50">
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Quick Actions</h3>
                <div className="space-y-4">
                   <DashAction icon={Plus} label="New Detection" desc="Manual entry for edge cases" />
                   <DashAction icon={Download} label="Export Evidence" desc="Today's compliance vault" />
                   <DashAction icon={Shield} label="Sync Node" desc="NXR-1194 connectivity" />
                   <DashAction icon={ArrowRight} label="Request Payout" desc="Process available earnings" primary />
                </div>
             </div>

             {/* System Integrity */}
             <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                   <h3 className="text-xl font-black tracking-tight mb-4">AI Integrity</h3>
                   <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed mb-8">Your local processing node is running at optimal efficiency.</p>
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase text-white/30">NPU Load</span>
                      <span className="text-xs font-black text-blue-400">92%</span>
                   </div>
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        className="h-full bg-blue-500" 
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashAction({ icon: Icon, label, desc, primary }: any) {
   return (
      <button className={`w-full flex items-center gap-5 p-5 rounded-[28px] transition-all group ${
         primary ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-slate-50 hover:bg-slate-100'
      }`}>
         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 ${
            primary ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-slate-100 text-slate-400'
         }`}>
            <Icon className="w-5 h-5" />
         </div>
         <div className="text-left font-sans">
            <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className={`text-[10px] font-bold ${primary ? 'text-white/40' : 'text-slate-400'}`}>{desc}</p>
         </div>
      </button>
   )
}

function StatCard({ label, value, icon: Icon, trend, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    slate: "bg-slate-50 text-slate-600 border-slate-100",
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all group font-sans">
      <div className={`w-12 h-12 ${colorMap[color]} rounded-2xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.15em] mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${color === 'amber' ? 'text-amber-500 bg-amber-50' : 'text-green-500 bg-green-50'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
