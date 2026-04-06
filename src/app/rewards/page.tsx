'use client';

import { Wallet, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

const transactions = [
  { id: 'TXN-001', type: 'Reward', description: 'Red Light Jump — DET-001', amount: 150, date: '2026-04-06 14:33', status: 'Completed' },
  { id: 'TXN-002', type: 'Reward', description: 'Red Light Jump — DET-004', amount: 150, date: '2026-04-06 13:33', status: 'Completed' },
  { id: 'TXN-003', type: 'Reward', description: 'No Helmet — DET-002', amount: 100, date: '2026-04-06 14:15', status: 'Processing' },
  { id: 'TXN-004', type: 'Withdrawal', description: 'UPI Transfer', amount: -500, date: '2026-04-05 18:00', status: 'Completed' },
  { id: 'TXN-005', type: 'Reward', description: 'Wrong-Way — DET-003', amount: 200, date: '2026-04-06 13:51', status: 'Pending' },
];

const statusIcon = {
  Completed: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
  Processing: <Clock className="w-3.5 h-3.5 text-sky-500" />,
  Pending: <Clock className="w-3.5 h-3.5 text-amber-400" />,
  Failed: <XCircle className="w-3.5 h-3.5 text-red-400" />,
};

const statusColor: Record<string, string> = {
  Completed: 'text-emerald-600',
  Processing: 'text-sky-600',
  Pending: 'text-amber-500',
  Failed: 'text-red-500',
};

export default function RewardsPage() {
  const balance = transactions
    .filter((t) => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Reward Wallet</h1>
        <p className="text-sm text-slate-400 mt-0.5">Earnings from verified violations</p>
      </div>

      {/* Balance card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Available Balance</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">₹{balance}</p>
            <p className="text-xs text-slate-400 mt-1">Withdrawable via UPI / Bank Transfer</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-sky-500" />
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3">
          <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <ArrowDownLeft className="w-4 h-4" />
            Withdraw
          </button>
          <button className="text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-200 px-4 py-2 rounded-lg transition-colors">
            View History
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Earned', value: '₹6,160', color: 'text-emerald-600' },
          { label: 'Processing', value: '₹300', color: 'text-sky-600' },
          { label: 'Withdrawn', value: '₹5,710', color: 'text-slate-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-4 py-3.5">
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className={`text-lg font-semibold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-medium text-slate-700">Transactions</p>
        </div>
        <ul className="divide-y divide-slate-50">
          {transactions.map((t) => (
            <li key={t.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                {statusIcon[t.status as keyof typeof statusIcon]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 font-medium truncate">{t.description}</p>
                <p className="text-xs text-slate-400">{t.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-semibold ${t.amount > 0 ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
                </p>
                <p className={`text-[11px] font-medium ${statusColor[t.status]}`}>{t.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
