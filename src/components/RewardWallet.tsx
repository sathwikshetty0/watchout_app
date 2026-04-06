"use client";

import React from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownToLine, 
  CreditCard,
  Target,
  History,
  TrendingUp,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

const transactions = [
  { id: 1, type: "Reward", amount: 50, date: "Apr 6, 2026", status: "Completed", violation: "V-9021" },
  { id: 2, type: "Reward", amount: 100, date: "Apr 5, 2026", status: "Completed", violation: "V-8912" },
  { id: 3, type: "Monthly Bonus", amount: 500, date: "Apr 1, 2026", status: "Completed", violation: "Top Citizen Tier" },
  { id: 4, type: "Payout", amount: -2000, date: "Mar 28, 2026", status: "Sent to Bank", violation: "Withdrawal #WF-12" },
];

export const RewardWallet = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Reward Wallet</h2>
        <p className="text-secondary text-sm font-medium uppercase tracking-wider">Financial Overview & Payouts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Current Balance</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-foreground tracking-tighter">₹ 1,450.00</span>
              <span className="text-sm font-bold text-success flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +15.5%
              </span>
            </div>
            
            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                <ArrowDownToLine className="w-4 h-4" /> Withdraw
              </button>
              <button className="flex-1 py-3 bg-amber-50 text-amber-600 border border-amber-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-100 transition-all">
                <CreditCard className="w-4 h-4" /> Manage Bank
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8">
            <Wallet className="w-16 h-16 text-slate-50 stroke-[1.5px]" />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
          <div>
            <Target className="w-6 h-6 text-primary mb-2" />
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Next Tier Progress</h4>
            <div className="w-full h-2 bg-slate-200 rounded-full mb-2">
              <div className="w-[65%] h-full bg-primary rounded-full" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">6/10 Reports</p>
            <p className="text-xs text-secondary mt-1">Get 4 more verified reports for a ₹ 500 bonus.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <History className="w-5 h-5 text-secondary" /> Recent Transactions
          </div>
          <button className="text-xs font-bold text-primary hover:underline transition-all">View Full Statement</button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-50">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl border ${
                    tx.amount > 0 ? 'bg-emerald-50 border-emerald-100 text-success' : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}>
                    {tx.amount > 0 ? <Award className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">{tx.type}</h5>
                    <p className="text-xs text-secondary font-medium">{tx.violation} · {tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    {tx.amount > 0 ? `+ ₹ ${tx.amount}` : `- ₹ ${Math.abs(tx.amount)}`}
                  </p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
