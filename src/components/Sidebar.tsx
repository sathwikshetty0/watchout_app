"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { 
  BarChart3, 
  MapPin, 
  Settings, 
  History, 
  ShieldCheck, 
  ChevronRight, 
  LogOut,
  User,
  CreditCard,
  Target,
  Car,
  Bike
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
          .then(({ data }) => setProfile(data));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { label: "Overview", icon: Target, href: "/" },
    { label: "Live Detection", icon: History, href: "/feed" },
    { label: "Reward Wallet", icon: CreditCard, href: "/rewards" },
    { label: "Map Interface", icon: MapPin, href: "/map" },
    { label: "Compliance Log", icon: ShieldCheck, href: "/compliance" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-slate-100 flex flex-col p-8 z-50">
      {/* Brand */}
      <div className="flex items-center gap-4 mb-12 group">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:bg-blue-700 transition-colors">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">WatchOut</h2>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Pilot 2026.4</p>
        </div>
      </div>

      {/* Profile Card */}
      {user ? (
        <div className="mb-10 p-5 bg-slate-50 rounded-[28px] border border-slate-100/50 group hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
               {profile?.vehicle_type === 'bike' ? <Bike className="w-5 h-5 text-slate-400" /> : <Car className="w-5 h-5 text-slate-400" />}
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-sm font-extrabold text-slate-800 truncate leading-none mb-1">
                 {profile?.full_name || "Profile Incomplete"}
               </p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                 {profile?.registration_number || user.email}
               </p>
            </div>
          </div>
        </div>
      ) : (
        <Link href="/login" className="mb-10 text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 py-4 bg-blue-50 rounded-2xl">
          <User className="w-4 h-4" /> Sign In to Start
        </Link>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                isActive 
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-blue-400" : "group-hover:text-blue-600"}`} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </div>
              {isActive && (
                <motion.div layoutId="activeNav" className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-slate-50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
