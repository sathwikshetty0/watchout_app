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

const earningsData = [
  { day: 'Mon', amount: 480 },
  { day: 'Tue', amount: 720 },
  { day: 'Wed', amount: 560 },
  { day: 'Thu', amount: 1040 },
  { day: 'Fri', amount: 880 },
  { day: 'Sat', amount: 1360 },
  { day: 'Sun', amount: 1120 },
];

const recentActivity = [
  { id: 1, type: 'Red Light Jump', location: 'MG Road, Bengaluru', time: '2 min ago', reward: 150 },
  { id: 2, type: 'No Helmet', location: 'Koramangala 5th Block', time: '18 min ago', reward: 100 },
  { id: 3, type: 'Wrong-Way', location: 'Indiranagar 100ft Rd', time: '41 min ago', reward: 200 },
  { id: 4, type: 'Red Light Jump', location: 'Whitefield Main Rd', time: '1 hr ago', reward: 150 },
];

const violationColors: Record<string, string> = {
  'Red Light Jump': 'bg-red-50 text-red-600',
  'No Helmet': 'bg-amber-50 text-amber-600',
  'Wrong-Way': 'bg-orange-50 text-orange-600',
};

export default function Overview() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
        <p className="text-sm text-slate-400 mt-0.5">Live dashboard — last updated just now</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<IndianRupee className="w-4 h-4 text-sky-500" />}
          label="Total Earned"
          value="₹6,160"
          sub="+₹1,120 today"
          subColor="text-emerald-500"
        />
        <StatCard
          icon={<ShieldCheck className="w-4 h-4 text-sky-500" />}
          label="Violations Verified"
          value="38"
          sub="4 pending review"
          subColor="text-amber-500"
        />
        <StatCard
          icon={<Cpu className="w-4 h-4 text-sky-500" />}
          label="System Health"
          value="Optimal"
          sub="Camera • GPS • AI active"
          subColor="text-emerald-500"
        />
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-slate-700">Weekly Earnings</p>
            <p className="text-xs text-slate-400">This week vs last week</p>
          </div>
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={earningsData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              formatter={(v) => [`₹${v}`, 'Earned']}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#0ea5e9"
              strokeWidth={2}
              fill="url(#earningsGradient)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: '#0ea5e9' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-medium text-slate-700">Recent Activity</p>
        </div>
        <ul className="divide-y divide-slate-50">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-5 py-3.5">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${violationColors[item.type] ?? 'bg-slate-100 text-slate-500'}`}>
                {item.type}
              </span>
              <span className="text-sm text-slate-600 flex-1 truncate">{item.location}</span>
              <span className="text-xs text-slate-400 shrink-0">{item.time}</span>
              <span className="text-sm font-medium text-emerald-600 shrink-0">+₹{item.reward}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  subColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  subColor: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center">{icon}</div>
      </div>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className={`text-xs font-medium ${subColor}`}>{sub}</p>
    </div>
  );
}
