"use client";

import React from "react";
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  IndianRupee,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', earnings: 400 },
  { name: 'Tue', earnings: 300 },
  { name: 'Wed', earnings: 200 },
  { name: 'Thu', earnings: 600 },
  { name: 'Fri', earnings: 180 },
  { name: 'Sat', earnings: 450 },
  { name: 'Sun', earnings: 390 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 rounded-xl bg-slate-50 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          trend === 'up' ? 'text-success bg-emerald-50' : 'text-amber-500 bg-amber-50'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </div>
    <h3 className="text-sm font-medium text-secondary">{title}</h3>
    <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
  </div>
);

export const Overview = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-secondary">Welcome back. Your on-device AI is currently monitoring roads in Bengaluru South.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Rewards" 
          value="₹ 2,450.00" 
          icon={IndianRupee} 
          trend="up" 
          trendValue="+12%"
        />
        <StatCard 
          title="Verified Reports" 
          value="48" 
          icon={CheckCircle2} 
          trend="up" 
          trendValue="+5"
        />
        <StatCard 
          title="AI Accuracy" 
          value="98.2%" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="+0.4%"
        />
        <StatCard 
          title="System Health" 
          value="Optimal" 
          icon={ShieldCheck} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground">Earnest Analytics</h3>
              <p className="text-xs text-secondary mt-1">Reward trajectory for the last 7 days.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/20" />
                <span className="text-xs text-secondary font-medium">Daily Goal: ₹ 500</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorEarnings)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-primary text-white shadow-lg overflow-hidden relative">
          <div className="relative z-10">
            <Activity className="w-8 h-8 mb-6 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Device Status</h3>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Live & Streaming</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm opacity-70">GPS Lock</span>
                <span className="text-sm font-medium">9 Satellites</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm opacity-70">Network</span>
                <span className="text-sm font-medium">JIO 5G (Excellent)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm opacity-70">Storage</span>
                <span className="text-sm font-medium">12% used</span>
              </div>
            </div>

            <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-bold text-sm">
              Refresh Stream
            </button>
          </div>
          
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl transition-transform" />
        </div>
      </div>
    </div>
  );
};
