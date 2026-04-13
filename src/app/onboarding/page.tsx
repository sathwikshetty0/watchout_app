"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { User, Car, Hash, ArrowRight, ShieldCheck, Mail, LogOut, CheckCircle2, Camera, Bike } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");
  const [regNo, setRegNo] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setEmail(user.email ?? null);
        setFullName(user.user_metadata?.full_name || "");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
       setStep(step + 1);
       return;
    }
    
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: fullName,
          vehicle_type: vehicleType,
          registration_number: regNo.toUpperCase(),
          is_onboarded: true,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      router.push("/");
    } catch (err: any) {
      alert(err.message || "Failed to update profile. Ensure the 'profiles' table exists in Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] -ml-[250px] -mt-[250px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[100px] -mr-[250px] -mb-[250px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 p-16 border border-slate-100 flex flex-col lg:flex-row gap-20 relative z-10"
      >
        {/* Left: Progress & Narrative */}
        <div className="flex-1 space-y-12">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                <Camera className="text-white w-6 h-6" />
             </div>
             <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Cam<span className="text-blue-600">X</span></h2>
          </div>

          <div className="space-y-6">
             <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-[1.1]">
                Complete your <br />
                <span className="text-blue-600">Verification.</span>
             </h1>
             <p className="text-slate-500 font-bold text-sm uppercase tracking-widest leading-relaxed">
                Step {step} of 3: {
                  step === 1 ? "Identity Setup" : 
                  step === 2 ? "Vehicle Registration" : 
                  "Final Confirmation"
                }
             </p>
          </div>

          <div className="space-y-4">
             <StepIndicator num={1} label="Identity" active={step >= 1} done={step > 1} />
             <StepIndicator num={2} label="Vehicle" active={step >= 2} done={step > 2} />
             <StepIndicator num={3} label="Deployment" active={step >= 3} done={step > 3} />
          </div>

          <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                   <User className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px]">{email}</span>
             </div>
             <button onClick={logout} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Exit Setup</button>
          </div>
        </div>

        {/* Right: Interactive Form */}
        <div className="flex-1">
           <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 flex-1"
                    >
                       <div className="p-8 bg-blue-50/50 rounded-[32px] border border-blue-100 space-y-4">
                          <h3 className="text-lg font-black text-slate-800 mb-2">Personal Identity</h3>
                          <div className="relative group">
                             <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                             <input 
                               type="text" 
                               placeholder="Full Name" 
                               value={fullName}
                               onChange={(e) => setFullName(e.target.value)}
                               required
                               className="w-full pl-16 pr-8 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-800 shadow-sm"
                             />
                          </div>
                          <div className="relative group">
                             <input 
                               type="tel" 
                               placeholder="Phone Number" 
                               value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                               required
                               className="w-full px-8 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-800 shadow-sm"
                             />
                          </div>
                          <div className="relative group">
                             <textarea 
                               placeholder="Residential Address" 
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               required
                               className="w-full px-8 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-800 shadow-sm min-h-[100px]"
                             />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 flex-1"
                    >
                       <div className="space-y-6">
                          <h3 className="text-lg font-black text-slate-800">Vehicle & Verification</h3>
                          <div className="grid grid-cols-2 gap-4">
                             <VehicleTab 
                               active={vehicleType === 'car'} 
                               onClick={() => setVehicleType('car')} 
                               icon={Car} 
                               label="Car" 
                             />
                             <VehicleTab 
                               active={vehicleType === 'bike'} 
                               onClick={() => setVehicleType('bike')} 
                               icon={Bike} 
                               label="Bike" 
                             />
                          </div>
                          <div className="space-y-4">
                            <div className="relative group">
                               <input 
                                 type="text" 
                                 placeholder="Vehicle Registration No (e.g. KA 03 AA 1234)" 
                                 value={regNo}
                                 onChange={(e) => setRegNo(e.target.value)}
                                 required
                                 className="w-full px-8 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-black uppercase tracking-widest text-slate-800 shadow-sm"
                               />
                            </div>
                            <div className="relative group">
                               <input 
                                 type="text" 
                                 placeholder="Aadhar / PAN Card Number" 
                                 value={aadhar}
                                 onChange={(e) => setAadhar(e.target.value)}
                                 required
                                 className="w-full px-8 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-black uppercase tracking-widest text-slate-800 shadow-sm"
                               />
                            </div>
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 flex-1"
                    >
                       <div className="text-center py-6 space-y-6">
                          <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-100">
                             <ShieldCheck className="w-12 h-12 text-emerald-500" />
                          </div>
                          <div>
                             <h3 className="text-2xl font-black text-slate-800 tracking-tight">Ready for Deployment</h3>
                             <p className="text-slate-400 font-bold text-sm mt-2">Your node is cryptographically verified.</p>
                          </div>
                          <div className="p-6 bg-slate-50 border border-slate-100 rounded-[28px] text-left">
                             <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator</p>
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                             </div>
                             <p className="text-sm font-black text-slate-800 tracking-tight mb-4">{fullName}</p>
                             <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification Node</p>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             </div>
                             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">GLOBAL-DEPLOYMENT</p>
                          </div>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>

              <div className="mt-auto flex gap-4 pt-10">
                 {step > 1 && (
                    <button 
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-8 py-5 border border-slate-100 hover:bg-slate-50 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 transition-all font-sans"
                    >
                       Back
                    </button>
                 )}
                 <button
                   type="submit"
                   disabled={loading}
                   className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xs uppercase tracking-widest group font-sans"
                 >
                   {loading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <>
                       {step === 3 ? "Complete Deployment" : "Continue"}
                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </>
                   )}
                 </button>
              </div>
           </form>
        </div>
      </motion.div>
    </div>
  );
}

function StepIndicator({ num, label, active, done }: any) {
   return (
      <div className="flex items-center gap-5 group">
         <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
            done ? 'bg-emerald-500 border-emerald-500 text-white' : 
            active ? 'bg-blue-600 border-blue-600 text-white scale-110' : 
            'bg-white border-slate-100 text-slate-300'
         }`}>
            {done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-black">{num}</span>}
         </div>
         <p className={`text-xs font-black uppercase tracking-widest transition-colors duration-500 ${
            done ? 'text-emerald-500' : active ? 'text-blue-600' : 'text-slate-300'
         }`}>{label}</p>
      </div>
   )
}

function VehicleTab({ active, onClick, icon: Icon, label }: any) {
   return (
      <button 
        type="button"
        onClick={onClick}
        className={`p-6 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 ${
           active ? 'border-blue-600 bg-blue-50/50' : 'border-slate-50 hover:border-slate-100 bg-slate-50/50'
        }`}
      >
         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white border border-slate-100 text-slate-300'
         }`}>
            <Icon className="w-6 h-6" />
         </div>
         <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-blue-600' : 'text-slate-400'}`}>{label}</span>
      </button>
   )
}
