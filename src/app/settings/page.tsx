'use client';

import { useState } from 'react';
import { Camera, Bell, Shield, Wifi, Save, User, Car, Lock, Globe, Smartphone, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoSubmit, setAutoSubmit] = useState(true);
  const [faceBlur, setFaceBlur] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex h-screen bg-[#fafbfc]">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">System Settings</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-[0.2em] text-[10px]">Node Configuration • VXR-9921</p>
          </div>
          <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
               isSaved ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Preferences Saved' : 'Save Changes'}
          </button>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Settings Sections */}
          <div className="col-span-8 space-y-10">
            {/* Vehicle Profile */}
            <section>
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Linked Vehicle Profile</h3>
               <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-100/50 flex items-center justify-between group hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-slate-900 rounded-[24px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <Car className="text-blue-400 w-10 h-10" />
                     </div>
                     <div>
                        <p className="text-2xl font-black text-slate-800 tracking-tight">Tesla Model 3</p>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Reg: KA 01 AB 1234 • Blue Metallic</p>
                     </div>
                  </div>
                  <button className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Edit Registry</button>
               </div>
            </section>

            {/* Core Configuration */}
            <section className="space-y-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Device & AI Core</h3>
               
               <SettingsCard icon={Camera} title="Vision & Capture" description="AI processing and privacy masking">
                  <SettingToggle label="Anonymize Bystanders" description="Auto-blur faces and unrelated plates" value={faceBlur} onChange={setFaceBlur} />
                  <div className="flex items-center justify-between p-6">
                     <div>
                        <p className="text-sm font-black text-slate-800 tracking-tight">Capture Resolution</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Native hardware stream</p>
                     </div>
                     <select 
                       className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-black text-slate-600 focus:ring-2 focus:ring-blue-100 outline-none"
                       value={quality}
                       onChange={(e) => setQuality(e.target.value)}
                     >
                        <option value="4k">4K (Ultra HD)</option>
                        <option value="1080p">1080p (Balanced)</option>
                        <option value="720p">720p (Max Depth)</option>
                     </select>
                  </div>
               </SettingsCard>

               <SettingsCard icon={Shield} title="Compliance & Enforcement" description="Authority communication protocols">
                  <SettingToggle label="Automated Payouts" description="Transfer rewards to wallet instantly" value={autoSubmit} onChange={setAutoSubmit} />
               </SettingsCard>
            </section>
          </div>

          {/* Sidebar Settings / Stats */}
          <div className="col-span-4 space-y-6">
            <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
               <Globe className="w-8 h-8 text-blue-200 mb-6" />
               <h4 className="text-xl font-black tracking-tight mb-2">Cloud Connectivity</h4>
               <p className="text-xs font-bold text-blue-100/60 leading-relaxed mb-6">
                  Your node is currently synced with the <strong>Bengaluru South Edge Cluster</strong>.
               </p>
               <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Node ID: WCH-1194-BF</span>
               </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-100/50">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Quick Links</h4>
               <div className="space-y-4">
                  <SideLink icon={Lock} label="Security & Keys" />
                  <SideLink icon={Smartphone} label="Mobile App Link" />
                  <SideLink icon={Bell} label="Alert Channels" />
               </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
               <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
               <p className="text-[10px] font-bold text-blue-700 leading-tight">
                  Applying changes requires a manual dashcam reboot within 24 hours.
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsCard({ icon: Icon, title, description, children }: any) {
   return (
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
               <Icon className="w-6 h-6" />
            </div>
            <div>
               <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">{title}</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{description}</p>
            </div>
         </div>
         <div className="divide-y divide-slate-50">
            {children}
         </div>
      </div>
   )
}

function SettingToggle({ label, description, value, onChange }: any) {
   return (
      <div className="flex items-center justify-between p-8 group">
         <div>
            <p className="text-sm font-black text-slate-800 tracking-tight leading-tight mb-1">{label}</p>
            <p className="text-xs font-bold text-slate-400 max-w-[200px]">{description}</p>
         </div>
         <button 
           onClick={() => onChange(!value)}
           className={`relative w-14 h-8 rounded-full transition-all duration-500 ${value ? 'bg-blue-600 shadow-lg shadow-blue-100' : 'bg-slate-200'}`}
         >
            <motion.div 
               animate={{ x: value ? 28 : 4 }}
               className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
         </button>
      </div>
   )
}

function SideLink({ icon: Icon, label }: any) {
   return (
      <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-all">
         <div className="flex items-center gap-3">
            <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
            <span className="text-xs font-black text-slate-600 tracking-tight group-hover:text-slate-800">{label}</span>
         </div>
         <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
      </button>
   )
}
