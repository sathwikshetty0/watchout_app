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
import { IndianRupee, ShieldCheck, Cpu, TrendingUp } from 'lucide-react';

// Data will be fetched from Supabase
const earningsData: any[] = [];
const recentActivity: any[] = [];


const violationColors: Record<string, string> = {
  'Red Light Jump': 'bg-red-50 text-red-600',
  'No Helmet': 'bg-amber-50 text-amber-600',
  'Wrong-Way': 'bg-orange-50 text-orange-600',
};

export default function Overview() {
  return (
    <div className="p-8 space-y-10">
      {/* Earnings Chart */}
      <div className="bg-slate-50/50 rounded-[24px] border border-slate-100 p-8 hover:bg-slate-50 transition-colors group">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-[0.15em] mb-1">Weekly Payout Performance</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight flex items-baseline gap-2">
               ₹0 
               <span className="text-[10px] font-black text-slate-300 bg-slate-50 px-2 py-0.5 rounded-full">+0.0%</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
             <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        {earningsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={earningsData} margin={{ top: 20, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="6 6" stroke="#e2e8f0" vertical={false} />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} 
                axisLine={false} 
                tickLine={false}
                dy={15}
              />
              <YAxis 
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} 
                axisLine={false} 
                tickLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{ 
                  border: 'none', 
                  borderRadius: 20, 
                  fontSize: 12, 
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                  padding: '16px',
                  fontWeight: 800,
                  color: '#1e293b'
                }}
                formatter={(v) => [`₹${v}`, 'Earned']}
                cursor={{ stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={4}
                fill="url(#earningsGradient)"
                dot={{ r: 4, strokeWidth: 0, fill: '#2563eb' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#000' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[240px] flex items-center justify-center text-slate-300 font-bold text-xs uppercase tracking-[0.2em]">
            No activity data available
          </div>
        )}
      </div>

      {/* Recent Activity Ledger */}
      <div>
        <div className="flex items-center justify-between mb-6">
           <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Latest Proofs Generated</h4>
           <button className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest px-4 py-2 border border-blue-100 rounded-xl hover:bg-blue-50">Filter Results</button>
        </div>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-6 p-6 rounded-[24px] border border-slate-50 hover:bg-slate-50 transition-all hover:border-slate-100 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6 ${violationColors[item.type] ?? 'bg-slate-100 text-slate-500'} bg-opacity-20`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                     <p className="text-sm font-black text-slate-800 tracking-tight">{item.type}</p>
                     <span className="w-1 h-1 rounded-full bg-slate-300" />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.time}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                     <span className="truncate max-w-[200px]">{item.location}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-600">+ ₹{item.reward}</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">Status: Verified</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No recent proofs found</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
