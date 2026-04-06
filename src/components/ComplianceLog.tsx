"use client";

import React from "react";
import { 
  FileCheck, 
  ShieldCheck, 
  Lock, 
  Search, 
  Database,
  ExternalLink,
  ChevronRight,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

const certificates = [
  {
    id: "BSA-63-0012",
    violationId: "V-9021",
    type: "Digital Evidence Certificate",
    timestamp: "Apr 6, 2026 14:32:10 IST",
    hash: "f4a1...2c8d",
    status : "Verified",
    signer: "Police Forensic Node #04"
  },
  {
    id: "BSA-63-0011",
    violationId: "V-8995",
    type: "Digital Evidence Certificate",
    timestamp: "Apr 6, 2026 12:15:45 IST",
    hash: "b9e3...a0f1",
    status : "Verified",
    signer: "Police Forensic Node #04"
  },
  {
    id: "BSA-63-0010",
    violationId: "V-8954",
    type: "Digital Evidence Certificate",
    timestamp: "Apr 5, 2026 18:20:00 IST",
    hash: "d7c2...5b9e",
    status : "Verified",
    signer: "Police Forensic Node #02"
  }
];

export const ComplianceLog = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Compliance & Legal Log</h2>
        <p className="text-secondary">Official Bharatiya Sakshya Adhiniyam, 2023 (Sec 63) Evidence Certificates.</p>
      </header>

      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-4">
        <div className="p-2 rounded-xl bg-success text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-success uppercase tracking-widest leading-none mb-2">Evidence Integrity Guaranteed</h4>
          <p className="text-xs text-emerald-700/80 leading-relaxed font-medium">
            All submitted evidence is cryptographically hashed at the point of capture and digitally signed by authorized police forensic nodes. This ensures full admissibility under Section 63 of the BSA, 2023.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-foreground">
            <FileText className="w-4 h-4 text-primary" /> Active Certificates
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID..." 
              className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {certificates.map((cert) => (
            <div key={cert.id} className="p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:text-primary transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-foreground flex items-center gap-2">
                      {cert.id}
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-success text-[10px] font-bold">VERIFIED</span>
                    </h5>
                    <p className="text-xs text-secondary font-medium">Related Violation: {cert.violationId}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all">
                  View Full Certificate <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1">
                <div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Hashed Integrity</p>
                  <p className="text-xs font-mono text-secondary bg-slate-50 p-1 rounded border border-slate-100">{cert.hash}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Timestamp</p>
                  <p className="text-xs text-secondary font-medium">{cert.timestamp}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Signer</p>
                  <p className="text-xs text-secondary font-medium">{cert.signer}</p>
                </div>
                <div className="text-right flex items-end justify-end">
                  <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-primary transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
        <Database className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4">Secure Storage Architecture</h3>
          <p className="text-sm opacity-70 mb-6 max-w-lg leading-relaxed">
            Personal data is never stored locally. Violation clips are encrypted and streamed directly to government-hosted data warehouses. Local buffer is cleared every 48 hours.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> AES-256 Encrypted
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Direct-to-Police Pipe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
