"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, UserPlus, LogIn, Camera, ShieldCheck, Globe, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        if (error) throw error;
        alert("Registration successful! Check your email for verification.");
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_onboarded")
          .eq("id", data.user.id)
          .single();

        if (profile?.is_onboarded) {
          router.push("/");
        } else {
          router.push("/onboarding");
        }
      }
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -mr-[400px] -mt-[400px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] -ml-[300px] -mb-[300px]" />
      
      <div className="w-full max-w-5xl grid grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Side: Brand & Mission */}
        <div className="col-span-12 lg:col-span-7 space-y-12 pr-12 hidden lg:block">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                 <Camera className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">WatchOut</h2>
           </div>

           <div className="space-y-6">
              <h1 className="text-6xl font-black text-white tracking-tighter leading-[1.1]">
                 The Future of <br />
                 <span className="text-blue-500">Road Governance.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg font-medium">
                 Join the decentralized network of citizens making Indian roads safer using AI-powered edge detection and evidence vaulting.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-8 pt-8">
              <FeatureItem icon={ShieldCheck} title="BSA 2023 Compliant" subtitle="Legal-grade evidence vault" />
              <FeatureItem icon={Star} title="Reward Ecosystem" subtitle="Earn for every verified detection" />
           </div>
        </div>

        {/* Right Side: Auth Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 lg:col-span-5 bg-white/5 backdrop-blur-3xl rounded-[48px] p-12 border border-white/10 shadow-2xl"
        >
          <div className="mb-10 lg:hidden">
             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Camera className="text-white w-6 h-6" />
             </div>
          </div>

          <div className="mb-10">
             <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                {mode === "login" ? "Welcome Back" : "Deploy Your Node"}
             </h2>
             <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                {mode === "login" ? "Identity Verification Required" : "Create Citizen Investigator Identity"}
             </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-8 p-5 bg-red-500/10 text-red-400 rounded-2xl text-xs font-bold border border-red-500/20 flex items-start gap-4"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <AuthInput 
                icon={Mail} 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={setEmail} 
              />
              <AuthInput 
                icon={Lock} 
                type="password" 
                placeholder="Secure Password" 
                value={password} 
                onChange={setPassword} 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : mode === "login" ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Request Access
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Initialize Profile
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-white/5">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              {mode === "login" ? "New Investigator?" : "Existing Citizen?"}{" "}
              <button 
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {mode === "login" ? "Register Node" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, subtitle }: any) {
   return (
      <div className="flex items-start gap-5">
         <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
            <Icon className="text-blue-400 w-6 h-6" />
         </div>
         <div>
            <p className="text-white font-black text-sm mb-1">{title}</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{subtitle}</p>
         </div>
      </div>
   )
}

function AuthInput({ icon: Icon, type, placeholder, value, onChange }: any) {
   return (
      <div className="relative group">
         <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
            <Icon className="w-5 h-5" />
         </div>
         <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600/50 transition-all text-white font-bold text-sm placeholder:text-slate-600"
         />
      </div>
   )
}

function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
