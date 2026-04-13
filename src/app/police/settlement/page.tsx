'use client';

import Sidebar from "@/components/Sidebar";
import { CreditCard, Landmark, CheckCircle, Clock, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const settlements = [
  { id: 'CHAL-001', plate: 'KA 03 MH 9982', amount: '₹1,500', status: 'Paid', date: 'Apr 13', method: 'UPI' },
  { id: 'CHAL-002', plate: 'KA 01 EK 4432', amount: '₹500', status: 'Pending', date: 'Apr 12', method: '-' },
  { id: 'CHAL-003', plate: 'KA 09 PL 1120', amount: '₹1,500', status: 'Published', date: 'Apr 12', method: '-' },
  { id: 'CHAL-004', plate: 'KA 05 XY 9012', amount: '₹2,000', status: 'Draft', date: '-', method: '-' },
];

export default function PoliceSettlement() {
  return (
    <div className="flex h-screen bg-[#fafbfc] font-sans">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-10">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 rounded-[28px] flex items-center justify-center shadow-xl shadow-slate-200">
              <CreditCard className="text-blue-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Violation <span className="text-blue-600">Settlement</span>
              </h1>
              <p className="text-slate-400 font-bold tracking-tight uppercase tracking-widest text-[10px] mt-1">Challan Lifecycle Tracking</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8 mb-12">
           <SettlementStat label="Challans Published" value="1,204" icon={FileText} color="blue" />
           <SettlementStat label="Recovered (Paid)" value="842" icon={CheckCircle} color="emerald" />
           <SettlementStat label="Payment Pending" value="362" icon={Clock} color="amber" />
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Active Challan Registry</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">Export CSV</button>
           </div>
           
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-slate-50">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Case ID</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plate No</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {settlements.map((s) => (
                   <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                         <p className="text-sm font-black text-slate-800">{s.id}</p>
                         <p className="text-[10px] font-bold text-slate-400">{s.date}</p>
                      </td>
                      <td className="px-8 py-6">
                         <span className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-black tracking-widest text-slate-600">{s.plate}</span>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-sm font-black text-slate-800">{s.amount}</p>
                      </td>
                      <td className="px-8 py-6">
                         <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            s.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                            s.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                            s.status === 'Published' ? 'bg-blue-50 text-blue-600' :
                            'bg-slate-50 text-slate-400'
                         }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                               s.status === 'Paid' ? 'bg-emerald-500' :
                               s.status === 'Pending' ? 'bg-amber-500' :
                               s.status === 'Published' ? 'bg-blue-500' :
                               'bg-slate-400'
                            }`} />
                            {s.status}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all group-hover:scale-110">
                            <ArrowRight className="w-4 h-4" />
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </main>
    </div>
  );
}

function SettlementStat({ label, value, icon: Icon, color }: any) {
   const colors: any = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      amber: "bg-amber-50 text-amber-600 border-amber-100"
   }
   return (
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all group">
         <div className={`w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
         </div>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
         <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
      </div>
   )
}
