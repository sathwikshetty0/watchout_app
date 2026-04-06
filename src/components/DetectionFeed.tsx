'use client';

import { useState } from 'react';
import { Camera, Clock, MapPin, FileCheck, ChevronRight } from 'lucide-react';

type ViolationType = 'Red Light Jump' | 'Wrong-Way' | 'No Helmet';

interface Detection {
  id: string;
  type: ViolationType;
  timestamp: string;
  location: string;
  plate: string;
  hash: string;
  status: 'Submitted' | 'Verified' | 'Pending';
}

const detections: Detection[] = [
  {
    id: 'DET-001',
    type: 'Red Light Jump',
    timestamp: '2026-04-06 14:32:07',
    location: 'MG Road Signal, Bengaluru',
    plate: 'KA 01 AB 1234',
    hash: 'a3f9c2e1b7d804f65c291ae3',
    status: 'Verified',
  },
  {
    id: 'DET-002',
    type: 'No Helmet',
    timestamp: '2026-04-06 14:14:51',
    location: 'Koramangala 5th Block',
    plate: 'KA 03 MN 5678',
    hash: 'b72e1d034ca8f921e6b5047d',
    status: 'Submitted',
  },
  {
    id: 'DET-003',
    type: 'Wrong-Way',
    timestamp: '2026-04-06 13:51:20',
    location: 'Indiranagar 100ft Rd',
    plate: 'KA 05 XY 9012',
    hash: 'c18a4f72b39d05e7a2cf631b',
    status: 'Pending',
  },
  {
    id: 'DET-004',
    type: 'Red Light Jump',
    timestamp: '2026-04-06 13:32:44',
    location: 'Whitefield Main Rd',
    plate: 'KA 02 CD 3456',
    hash: 'd54c7b19e280af43c7d9512e',
    status: 'Verified',
  },
  {
    id: 'DET-005',
    type: 'No Helmet',
    timestamp: '2026-04-06 12:58:03',
    location: 'HSR Layout Sector 4',
    plate: 'KA 04 GH 7890',
    hash: 'e965f230d1b74ac8e3f08729',
    status: 'Submitted',
  },
];

const typeBadge: Record<ViolationType, string> = {
  'Red Light Jump': 'bg-red-50 text-red-600 border border-red-100',
  'Wrong-Way': 'bg-orange-50 text-orange-600 border border-orange-100',
  'No Helmet': 'bg-amber-50 text-amber-600 border border-amber-100',
};

const statusBadge: Record<Detection['status'], string> = {
  Verified: 'bg-emerald-50 text-emerald-600',
  Submitted: 'bg-sky-50 text-sky-600',
  Pending: 'bg-slate-100 text-slate-500',
};

export default function DetectionFeed() {
  const [selected, setSelected] = useState<Detection | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Detection Feed</h1>
        <p className="text-sm text-slate-400 mt-0.5">AI-flagged violations from your dashcam</p>
      </div>

      <div className="flex gap-4">
        {/* Feed list */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">Recent Detections</p>
            <span className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-medium">
              {detections.length} today
            </span>
          </div>
          <ul className="divide-y divide-slate-50">
            {detections.map((d) => (
              <li
                key={d.id}
                onClick={() => setSelected(d)}
                className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors ${
                  selected?.id === d.id ? 'bg-sky-50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeBadge[d.type]}`}>
                      {d.type}
                    </span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusBadge[d.status]}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-300 shrink-0" />
                    <span className="text-xs text-slate-500 truncate">{d.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{d.timestamp.slice(11)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{d.plate}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence panel */}
        {selected && (
          <div className="w-72 shrink-0 bg-white rounded-xl border border-slate-200 p-5 space-y-4 self-start">
            <p className="text-sm font-semibold text-slate-800">Evidence View</p>

            {/* Blurred thumbnail placeholder */}
            <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
              <div className="absolute inset-0 backdrop-blur-sm" />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <Camera className="w-6 h-6 text-slate-400" />
                <p className="text-[11px] text-slate-500 font-medium">Face-blurred for privacy</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <Row label="Detection ID" value={selected.id} />
              <Row label="Type" value={selected.type} />
              <Row label="Timestamp" value={selected.timestamp} />
              <Row label="Plate" value={selected.plate} />
              <Row label="Location" value={selected.location} />
              <div>
                <p className="text-slate-400 mb-0.5">Evidence Hash</p>
                <p className="font-mono text-slate-600 break-all bg-slate-50 px-2 py-1.5 rounded text-[10px]">
                  {selected.hash}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
              <FileCheck className="w-3.5 h-3.5 shrink-0" />
              <span>BSA 2023 Sec 63 compliant</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-400">{label}</p>
      <p className="text-slate-700 font-medium">{value}</p>
    </div>
  );
}
