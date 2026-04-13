'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { IndianRupee, ShieldCheck, Cpu, TrendingUp, Activity, Zap, ShieldAlert } from 'lucide-react';

// Demo data for Investor Presentation
const earningsData = [
  { day: 'Mon', amount: 450, precision: 98.2 },
  { day: 'Tue', amount: 820, precision: 99.1 },
  { day: 'Wed', amount: 650, precision: 98.5 },
  { day: 'Thu', amount: 1200, precision: 99.8 },
  { day: 'Fri', amount: 950, precision: 99.3 },
  { day: 'Sat', amount: 1540, precision: 99.9 },
  { day: 'Sun', amount: 1100, precision: 99.7 },
];

const recentActivity = [
  { id: 1, type: 'No Helmet', time: '12 mins ago', location: 'Silk Board, BLR', reward: 150, hash: '0x9d2...b1f', confidence: 0.9992 },
  { id: 2, type: 'Red Light Jump', time: '45 mins ago', location: 'Indiranagar, BLR', reward: 200, hash: '0x4f2...d1a', confidence: 0.9985 },
  { id: 3, type: 'Wrong-Way', time: '1 hour ago', location: 'MG Road, BLR', reward: 250, hash: '0x7c1...e2d', confidence: 0.9962 },
];

const violationColors: Record<string, string> = {
  'Red Light Jump': 'bg-red-50 text-red-600',
  'No Helmet': 'bg-amber-50 text-amber-600',
  'Wrong-Way': 'bg-orange-50 text-orange-600',
};

export default function Overview() {
  return (
    <div className="p-8 space-y-10">
      {/* Top AI Performance Headline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatBlock label="Edge Inference FPS" value="24.5 / 30" icon={Activity} color="text-blue-500" />
         <StatBlock label="Global Precision" value="99.92%" icon={Zap} color="text-emerald-500" />
         <StatBlock label="Neural Provance" value="ZK-Verified" icon={ShieldCheck} color="text-purple-500" />
      </div>

      {/* Earnings & Precision Chart */}
      <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-blue-100/20 transition-all group">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Network Payout Velocity</p>
            <div className="flex items-baseline gap-3">
               <p className="text-4xl font-black text-slate-800 tracking-tight">₹6,710</p>
               <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+12.4% vs L.W.</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[28px] flex items-center justify-center border border-blue-100 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-100">
             <TrendingUp className="w-8 h-8" />
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={earningsData} margin={{ top: 20, right: 0, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="8 8" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} 
              axisLine={false} 
              tickLine={false}
              dy={15}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} 
              axisLine={false} 
              tickLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{ 
                border: 'none', 
                borderRadius: 24, 
                fontSize: 12, 
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                padding: '20px',
                fontWeight: 800,
                color: '#1e293b'
              }}
              formatter={(v) => [`₹${v}`, 'Network Payout']}
              cursor={{ stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={5}
              fill="url(#earningsGradient)"
              dot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
              activeDot={{ r: 8, strokeWidth: 0, fill: '#000' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Ledger */}
      <div>
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-slate-800" />
              <h4 className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">Latest Neural <span className="text-blue-600 italic">Proofs</span></h4>
           </div>
           <button className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em] px-5 py-3 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">Audit History</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentActivity.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 transition-all hover:border-blue-100 group relative overflow-hidden">
               <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${violationColors[item.type] ?? 'bg-slate-100 text-slate-500'} bg-opacity-20`}>
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+₹{item.reward}</p>
                     <p className="text-[9px] font-bold text-slate-300 uppercase mt-1">{item.time}</p>
                  </div>
               </div>
               <h5 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">{item.type}</h5>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{item.location}</p>
               
               <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-300 uppercase tracking-widest">{item.hash}</span>
                  <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">{(item.confidence * 100).toFixed(2)}% Conf</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value, icon: Icon, color }: any) {
   return (
      <div className="bg-slate-900 rounded-[32px] p-6 text-white shadow-xl shadow-blue-900/10 flex items-center gap-5 border border-white/5">
         <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${color} border border-white/10`}>
            <Icon className="w-6 h-6" />
         </div>
         <div>
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-lg font-black tracking-tight">{value}</p>
         </div>
      </div>
   )
}
