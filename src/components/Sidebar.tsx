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
  Bike,
  Wifi,
  Camera
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [deviceOnline, setDeviceOnline] = useState(true);

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

  const isPolice = pathname?.startsWith('/police');

  const navItems = isPolice ? [
    { label: "Case Inbox", icon: ShieldCheck, href: "/police/dashboard" },
    { label: "Account Settings", icon: Settings, href: "/settings" },
  ] : [
    { label: "Overview", icon: Target, href: "/" },
    { label: "Live Detection", icon: History, href: "/feed" },
    { label: "Cloud Recordings", icon: History, href: "/recordings" },
    { label: "Reward Wallet", icon: CreditCard, href: "/rewards" },
    { label: "Map Interface", icon: MapPin, href: "/map" },
    { label: "Compliance Log", icon: ShieldCheck, href: "/compliance" },
    { label: "Account Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-slate-100 flex flex-col p-10 z-50">
      {/* Brand */}
      <div className="flex items-center gap-5 mb-14 group cursor-pointer">
        <div className="w-14 h-14 bg-blue-600 rounded-[22px] flex items-center justify-center shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
          <Camera className="text-white w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none italic">Cam<span className="text-blue-600">X</span></h2>
          <div className="flex items-center gap-2 mt-1.5">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active AI Node</p>
          </div>
        </div>
      </div>

      {/* Connection Card */}
      <div className="mb-12 p-6 bg-slate-900 rounded-[32px] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/20 transition-colors" />
         <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
               <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Device Status</p>
               <Wifi className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-lg font-black mb-1">Linked Device</p>
            <p className="text-[11px] font-bold text-slate-400 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-slate-400" />
               Initializing Link...
            </p>
         </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`relative flex items-center justify-between p-4 rounded-2xl transition-all group overflow-hidden ${
                isActive 
                  ? "text-slate-900" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNavBG" 
                  className="absolute inset-0 bg-slate-50 border border-slate-100 rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-4">
                <item.icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-blue-600" : "group-hover:text-slate-600"}`} />
                <span className={`text-sm font-black tracking-tight ${isActive ? "text-slate-900" : "text-slate-400"}`}>{item.label}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="activeNavDot" 
                  className="relative z-10 w-1.5 h-1.5 bg-blue-600 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="mt-auto pt-10 border-t border-slate-50">
        <div className="flex items-center justify-between group">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 group-hover:border-blue-200 transition-colors">
                 <User className="text-slate-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
              </div>
              <div>
                 <p className="text-sm font-black text-slate-800 leading-none mb-1">{profile?.full_name?.split(' ')[0] || "Chief"}</p>
                 <button onClick={handleLogout} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">Log Out</button>
              </div>
           </div>
           <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Settings className="w-4 h-4 text-slate-400" />
           </button>
        </div>
      </div>
    </aside>
  );
}
