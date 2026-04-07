'use client';

import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, AlertCircle, CreditCard, Landmark, Banknote, ChevronRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

const transactions = [
  { id: 'TXN-001', type: 'Reward', description: 'Red Light Jump • KA 01 AB 1234', amount: 150, date: 'Apr 06, 14:33', status: 'Verified', method: 'AI Core' },
  { id: 'TXN-002', type: 'Reward', description: 'Red Light Jump • KA 02 CD 3456', amount: 150, date: 'Apr 06, 13:33', status: 'Verified', method: 'AI Core' },
  { id: 'TXN-003', type: 'Reward', description: 'No Helmet • KA 03 MN 5678', amount: 100, date: 'Apr 06, 14:15', status: 'Processing', method: 'Manual Rev' },
  { id: 'TXN-004', type: 'Withdrawal', description: 'Bank Transfer • UPI-9921', amount: -500, date: 'Apr 05, 18:00', status: 'Completed', method: 'Instant' },
  { id: 'TXN-005', type: 'Reward', description: 'Wrong-Way • KA 05 XY 9012', amount: 200, date: 'Apr 06, 13:51', status: 'Pending', method: 'AI Core' },
];

export default function RewardsPage() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const balance = transactions
    .filter((t) => t.status === 'Verified' || t.status === 'Completed')
    .reduce((sum, t) => sum + (t.status === 'Completed' ? 0 : t.amount), 3850); // Simulating higher total

  return (
    <div className="flex h-screen bg-[#fafbfc]">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Reward Wallet</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-[0.2em] text-[10px]">Financial Hub • Bengaluru Local Center</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                   <TrendingUp className="text-white w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Global Rank</p>
                   <p className="text-sm font-black text-slate-800">Top 1% Driver</p>
                </div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Balance Card */}
          <div className="col-span-7">
             <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-slate-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/30 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
                
                <div className="relative z-10">
                   <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                            <ShieldCheck className="w-6 h-6 text-blue-400" />
                         </div>
                         <p className="text-sm font-black tracking-widest uppercase text-white/60">Guardian Card</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-white/20" />
                   </div>

                   <p className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-2">Available Balance</p>
                   <div className="flex items-baseline gap-4 mb-12">
                      <h2 className="text-6xl font-black tracking-tighter">₹{balance.toLocaleString()}</h2>
                      <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-full">+12% this month</span>
                   </div>

                   <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsWithdrawOpen(true)}
                        className="flex-1 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-95"
                      >
                         Instant Cash Out
                      </button>
                      <button className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all">
                         <Landmark className="w-6 h-6" />
                      </button>
                   </div>
                </div>
             </div>

             <div className="mt-10 grid grid-cols-2 gap-6">
                <QuickStat label="Total Rewards" value="₹12,450" icon={ArrowUpRight} color="blue" />
                <QuickStat label="Withdrawn" value="₹8,600" icon={ArrowDownLeft} color="emerald" />
             </div>
          </div>

          {/* Activity Feed */}
          <div className="col-span-5 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col">
             <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Ledger</h3>
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Download PDF</button>
             </div>
             <div className="p-4 space-y-4">
                {transactions.map((t) => (
                   <div key={t.id} className="flex items-center gap-5 p-5 rounded-[28px] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 ${
                         t.amount > 0 ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                         {t.amount > 0 ? <Banknote className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-black text-slate-800 tracking-tight">{t.description.split('•')[0]}</p>
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.date}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t.method}</p>
                            <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'Verified' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                         </div>
                      </div>
                      <div className="text-right">
                         <p className={`text-lg font-black tracking-tight ${t.amount > 0 ? 'text-emerald-500' : 'text-slate-800'}`}>
                            {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
                         </p>
                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">TXN-{t.id.split('-')[1]}</p>
                      </div>
                   </div>
                ))}
             </div>
             <div className="p-8 mt-auto border-t border-slate-50">
                <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-all">
                   <span className="text-sm font-black text-slate-700 tracking-tight">Full Transaction Audit</span>
                   <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
         {isWithdrawOpen && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsWithdrawOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl p-12"
              >
                 <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100">
                       <Landmark className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Withdraw Earnings</h3>
                    <p className="text-slate-400 font-bold text-sm">Select your primary payout method</p>
                 </div>

                 <div className="space-y-4 mb-10">
                    <PayoutOption icon={CreditCard} title="UPI Instant Payout" subtitle="sathwik@okaxis" active />
                    <PayoutOption icon={Landmark} title="State Bank of India" subtitle="Acc: •••• 9921" />
                 </div>

                 <div className="p-8 bg-slate-50 rounded-[32px] mb-10 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Amount</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">₹{balance.toLocaleString()}</p>
                 </div>

                 <button 
                   onClick={() => setIsWithdrawOpen(false)}
                   className="w-full py-6 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
                 >
                    Confirm & Payout
                 </button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}

function QuickStat({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100"
  }
  return (
    <div className={`p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between group hover:border-${color}-200 transition-all`}>
       <div className={`w-12 h-12 ${colors[color]} rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="mt-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
       </div>
    </div>
  )
}

function PayoutOption({ icon: Icon, title, subtitle, active }: any) {
   return (
      <div className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center gap-5 ${
         active ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'
      }`}>
         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            <Icon className="w-6 h-6" />
         </div>
         <div>
            <p className="text-sm font-black text-slate-900 leading-none mb-1">{title}</p>
            <p className="text-xs font-bold text-slate-400 italic">{subtitle}</p>
         </div>
         {active && <div className="ml-auto w-3 h-3 bg-blue-600 rounded-full" />}
      </div>
   )
}
