"use client";

import React from "react";
import { 
  User, 
  Car, 
  Shield, 
  Bell, 
  Smartphone,
  ChevronRight,
  Monitor,
  Eye,
  CreditCard,
  Key
} from "lucide-react";
import { motion } from "framer-motion";

const SettingItem = ({ icon: Icon, title, description, value, badge }: any) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          {title}
          {badge && <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">{badge}</span>}
        </h4>
        <p className="text-xs text-secondary font-medium">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      {value && <span className="text-xs font-bold text-secondary uppercase tracking-widest">{value}</span>}
      <ChevronRight className="w-4 h-4 text-slate-300" />
    </div>
  </div>
);

const SettingSection = ({ title, children }: any) => (
  <div className="space-y-4">
    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">{title}</h3>
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
      {children}
    </div>
  </div>
);

export const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Account Settings</h2>
        <p className="text-secondary">Configure your profile, device preferences and security.</p>
      </header>

      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-black">
          S
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Sathwik Shetty</h3>
          <p className="text-sm text-secondary font-medium mb-1">sathwik@watchout.ai</p>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.22em] flex items-center gap-1.5">
            <Shield className="w-3 h-3" /> TR-04 Verified Citizen 
          </p>
        </div>
        <button className="ml-auto px-6 py-2 bg-white border border-slate-100 rounded-xl font-bold text-xs text-foreground shadow-sm hover:shadow-md transition-all">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <SettingSection title="Personal Information">
            <SettingItem icon={CreditCard} title="Bank Details" description="Managed linked bank for payouts" value="SBI ****21" />
            <SettingItem icon={Car} title="Vehicle ID" description="Registered dashcam vehicle" value="KA-19-P-1234" />
          </SettingSection>

          <SettingSection title="Device & AI">
            <SettingItem icon={Monitor} title="On-Device AI" description="Sensitivity & Detection Threshold" value="High (95%)" />
            <SettingItem icon={Eye} title="Privacy Mode" description="Automatic face blurring intensity" badge="Enhanced" />
            <SettingItem icon={Smartphone} title="SIM Card Data" description="Manage built-in JIO 5G plan" value="4.2 GB Used" />
          </SettingSection>
        </div>

        <div className="space-y-8">
          <SettingSection title="Security & API">
            <SettingItem icon={Key} title="API Access" description="Generate keys for insurance reports" />
            <SettingItem icon={Lock} title="Two-Factor Auth" description="Extra layer of protection" value="SMS Active" />
          </SettingSection>

          <SettingSection title="Notifications">
            <SettingItem icon={Bell} title="System Alerts" description="Email notifications for violations" value="On" />
            <SettingItem icon={Shield} title="Legal Summary" description="Weekly BSA compliance reports" value="Weekly" />
          </SettingSection>

          <div className="p-8 rounded-3xl bg-red-50 border border-red-100/50 flex flex-col gap-4 text-center">
             <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest leading-none">Emergency Actions</h4>
             <p className="text-[10px] text-red-700/60 font-medium">Resetting your device will clear all local buffers and evidence logs immediately.</p>
             <button className="w-full py-3 bg-red-600 text-white rounded-2xl font-bold text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-200">
               Factory Reset Device
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
