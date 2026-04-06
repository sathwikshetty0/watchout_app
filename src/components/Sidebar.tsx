"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Video, 
  Wallet, 
  FileCheck, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Live Feed", icon: Video, href: "/feed" },
  { name: "Reward Wallet", icon: Wallet, href: "/rewards" },
  { name: "Compliance Log", icon: FileCheck, href: "/compliance" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-slate-200">
      <div className="flex items-center gap-3 p-6 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
          <Zap className="w-6 h-6 fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">WatchOut</h1>
          <p className="text-[10px] font-medium text-secondary uppercase tracking-widest leading-none">AI Surveillance</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/10" 
                  : "text-secondary hover:bg-slate-50 hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span className="text-xs font-semibold text-foreground">Compliance Active</span>
          </div>
          <p className="text-[10px] text-secondary leading-relaxed">
            Privacy masking & BSA Sec 63 digital signature active.
          </p>
        </div>
        
        <button className="flex items-center gap-3 w-full px-4 py-3 text-secondary hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl font-medium text-sm group">
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
