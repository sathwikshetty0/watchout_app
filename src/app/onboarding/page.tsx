"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { User, Car, Hash, ArrowRight, ShieldCheck, Mail, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const [fullName, setFullName] = useState("");
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");
  const [regNo, setRegNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  // Check auth and current progress
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setEmail(user.email ?? null);
        // Pre-fill full name if available from metadata
        setFullName(user.user_metadata?.full_name || "");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // UPSERT into profiles table
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-12 border border-slate-100 flex flex-col md:flex-row gap-12"
      >
        {/* Left Side: Illustration / Welcome */}
        <div className="flex-1 space-y-6">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="text-green-600 w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
              One more step, <span className="text-blue-600">Chief</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              We need a few details to link your Dashcam and process rewards correctly.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50">
            <div className="flex items-center gap-3 text-slate-400 mb-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Authenticated as</span>
            </div>
            <p className="text-slate-700 font-bold">{email}</p>
            <button onClick={logout} className="mt-4 text-sm text-red-500 hover:text-red-600 font-bold flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-slate-600 font-bold text-sm flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700 font-medium"
              />
            </div>

            {/* Vehicle Type Toggle */}
            <div className="space-y-2">
              <label className="text-slate-600 font-bold text-sm flex items-center gap-2">
                <Car className="w-4 h-4" /> Vehicle Type
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-50 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setVehicleType("car")}
                  className={`py-3 rounded-xl font-bold transition-all ${vehicleType === "car" ? "bg-white shadow-md text-blue-600 ring-1 ring-slate-100" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Car
                </button>
                <button
                  type="button"
                  onClick={() => setVehicleType("bike")}
                  className={`py-3 rounded-xl font-bold transition-all ${vehicleType === "bike" ? "bg-white shadow-md text-blue-600 ring-1 ring-slate-100" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Bike
                </button>
              </div>
            </div>

            {/* Registration Number */}
            <div className="space-y-2">
              <label className="text-slate-600 font-bold text-sm flex items-center gap-2">
                <Hash className="w-4 h-4" /> Registration Number
              </label>
              <input
                type="text"
                placeholder="KA 03 AA 1234"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700 font-bold placeholder:font-normal uppercase tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Let's Go
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
