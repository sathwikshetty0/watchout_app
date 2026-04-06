'use client';

import { ShieldCheck, Download, Hash, Clock, FileCheck } from 'lucide-react';

interface Certificate {
  id: string;
  detectionId: string;
  violation: string;
  issuedAt: string;
  plate: string;
  sha256: string;
  signature: string;
  status: 'Valid' | 'Pending';
}

const certificates: Certificate[] = [
  {
    id: 'CERT-20260406-001',
    detectionId: 'DET-001',
    violation: 'Red Light Jump',
    issuedAt: '2026-04-06 14:33:02',
    plate: 'KA 01 AB 1234',
    sha256: '3a7f2e9c1b4d806f5c291ae3b72e1d034ca8f921e6b5047da3f9c2e1b7d804f6',
    signature: 'MEUCIQDkZ2x9...rT4bN==',
    status: 'Valid',
  },
  {
    id: 'CERT-20260406-002',
    detectionId: 'DET-004',
    violation: 'Red Light Jump',
    issuedAt: '2026-04-06 13:33:15',
    plate: 'KA 02 CD 3456',
    sha256: 'd54c7b19e280af43c7d9512ec18a4f72b39d05e7a2cf631bb72e1d034ca8f921',
    signature: 'MEQCIHpF8y1b...mX9cA==',
    status: 'Valid',
  },
  {
    id: 'CERT-20260406-003',
    detectionId: 'DET-002',
    violation: 'No Helmet',
    issuedAt: '2026-04-06 14:15:30',
    plate: 'KA 03 MN 5678',
    sha256: 'b72e1d034ca8f921e6b5047da3f9c2e1b7d804f63a7f2e9c1b4d806f5c291ae3',
    signature: '—',
    status: 'Pending',
  },
];

const violationColors: Record<string, string> = {
  'Red Light Jump': 'bg-red-50 text-red-600',
  'No Helmet': 'bg-amber-50 text-amber-600',
  'Wrong-Way': 'bg-orange-50 text-orange-600',
};

export default function ComplianceLog() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Legal Compliance</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Evidence certificates generated under BSA 2023 Sec 63
        </p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3.5">
        <ShieldCheck className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
        <p className="text-xs text-sky-700 leading-relaxed">
          Each certificate is SHA-256 hashed and digitally signed at the time of detection. This
          evidence is admissible under the <strong>Bharatiya Sakshya Adhiniyam 2023, Section 63</strong>.
        </p>
      </div>

      {/* Certificate cards */}
      <div className="space-y-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{cert.id}</p>
                  <p className="text-[11px] text-slate-400">Ref: {cert.detectionId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                    cert.status === 'Valid'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-500'
                  }`}
                >
                  {cert.status}
                </span>
                {cert.status === 'Valid' && (
                  <button className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1 transition-colors">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                )}
              </div>
            </div>

            {/* Card body */}
            <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
              <Field label="Violation Type">
                <span className={`px-2 py-0.5 rounded-full font-medium ${violationColors[cert.violation] ?? 'bg-slate-100 text-slate-500'}`}>
                  {cert.violation}
                </span>
              </Field>
              <Field label="Vehicle Plate">
                <span className="font-mono text-slate-700">{cert.plate}</span>
              </Field>
              <Field label="Issued At">
                <span className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3 h-3 text-slate-300" />
                  {cert.issuedAt}
                </span>
              </Field>
              <Field label="Digital Signature">
                <span className="font-mono text-slate-500 truncate">{cert.signature}</span>
              </Field>
              <div className="col-span-2">
                <p className="text-slate-400 mb-1 flex items-center gap-1">
                  <Hash className="w-3 h-3" /> SHA-256 Hash
                </p>
                <p className="font-mono text-[10px] text-slate-600 bg-slate-50 rounded-lg px-3 py-2 break-all border border-slate-100">
                  {cert.sha256}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-slate-400 mb-0.5">{label}</p>
      <div className="text-slate-700">{children}</div>
    </div>
  );
}
