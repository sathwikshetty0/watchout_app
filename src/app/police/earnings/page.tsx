'use client';

import Sidebar from "@/components/Sidebar";
import { TrendingUp, Users, FileText, CheckCircle, BarChart3, PieChart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PoliceEarnings() {
  return (
    <div className="flex h-screen bg-[#fafbfc] font-sans">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-10">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-600 rounded-[28px] flex items-center justify-center shadow-xl shadow-emerald-200">
              <TrendingUp className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Police <span className="text-emerald-600">Revenue</span>
              </h1>
              <p className="text-slate-400 font-bold tracking-tight uppercase tracking-widest text-[10px] mt-1">Enforcement Budget & Collection Metrics</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
           <div className="col-span-8 space-y-10">
              <div className="grid grid-cols-3 gap-8">
                 <RevenueCard label="Total Collected" value="₹42.8L" trend="+8.2%" color="emerald" />
                 <RevenueCard label="Active Citations" value="12,402" trend="+401" color="blue" />
                 <RevenueCard label="User Commissions" value="₹4.2L" trend="-2.1%" color="amber" />
              </div>

              <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Collection Trends</h3>
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-[10px] font-black uppercase text-slate-400">Published</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-black uppercase text-slate-400">Recovered</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="h-64 flex items-end gap-3 px-4">
                    {[40, 60, 45, 90, 65, 80, 55, 70, 85, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                         <div className="w-full bg-slate-50 rounded-t-xl relative overflow-hidden h-full">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              className="absolute bottom-0 left-0 right-0 bg-blue-500 group-hover:bg-blue-600 transition-colors"
                            />
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h * 0.7}%` }}
                              className="absolute bottom-0 left-0 right-0 bg-emerald-500 group-hover:bg-emerald-600 transition-colors border-t border-white/20"
                            />
                         </div>
                         <span className="text-[9px] font-black text-slate-300 uppercase">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="col-span-4 space-y-10">
              <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                 <h3 className="text-xl font-black tracking-tight mb-8">System Allocation</h3>
                 <div className="space-y-6">
                    <AllocationItem label="State Treasury" val="70%" color="bg-emerald-500" />
                    <AllocationItem label="CamX User Pool" val="10%" color="bg-blue-500" />
                    <AllocationItem label="Infra Maintenance" val="15%" color="bg-slate-500" />
                    <AllocationItem label="Safety Fund" val="5%" color="bg-amber-500" />
                 </div>
              </div>

              <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
                 <h3 className="text-xl font-black text-slate-800 tracking-tight mb-6">Top Enforcers</h3>
                 <div className="space-y-6">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-400 text-xs">{n}</div>
                            <div>
                               <p className="text-sm font-black text-slate-800">Station {100+n}</p>
                               <p className="text-[10px] font-bold text-slate-400">842 Citations</p>
                            </div>
                         </div>
                         <ArrowUpRight className="w-4 h-4 text-slate-200" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function RevenueCard({ label, value, trend, color }: any) {
   const colors: any = {
      emerald: "text-emerald-500",
      blue: "text-blue-500",
      amber: "text-amber-500"
   }
   return (
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
         <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
            <span className={`text-[10px] font-black ${colors[color]}`}>{trend}</span>
         </div>
      </div>
   )
}

function AllocationItem({ label, val, color }: any) {
   return (
      <div className="space-y-2">
         <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
            <span>{label}</span>
            <span>{val}</span>
         </div>
         <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: val }}
               className={`h-full ${color}`} 
            />
         </div>
      </div>
   )
}
