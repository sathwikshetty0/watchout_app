'use client';

import { useState } from 'react';
import { Camera, Bell, Shield, Wifi, Save } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoSubmit, setAutoSubmit] = useState(true);
  const [faceBlur, setFaceBlur] = useState(true);
  const [quality, setQuality] = useState('1080p');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-400 mt-0.5">Device and application configuration</p>
      </div>

      <div className="space-y-4">
        {/* Camera */}
        <Section icon={<Camera className="w-4 h-4 text-sky-500" />} title="Camera">
          <SettingRow label="Recording Quality" description="Higher quality improves AI accuracy">
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <option>1080p</option>
              <option>720p</option>
              <option>480p</option>
            </select>
          </SettingRow>
          <SettingRow label="Privacy — Blur Faces" description="Automatically blur bystander faces">
            <Toggle value={faceBlur} onChange={setFaceBlur} />
          </SettingRow>
        </Section>

        {/* Notifications */}
        <Section icon={<Bell className="w-4 h-4 text-sky-500" />} title="Notifications">
          <SettingRow label="Violation Alerts" description="Notify on every new detection">
            <Toggle value={notifications} onChange={setNotifications} />
          </SettingRow>
        </Section>

        {/* Enforcement */}
        <Section icon={<Shield className="w-4 h-4 text-sky-500" />} title="Enforcement">
          <SettingRow
            label="Auto-Submit Evidence"
            description="Automatically forward verified detections to authorities"
          >
            <Toggle value={autoSubmit} onChange={setAutoSubmit} />
          </SettingRow>
        </Section>

        {/* Connectivity */}
        <Section icon={<Wifi className="w-4 h-4 text-sky-500" />} title="Connectivity">
          <SettingRow label="Supabase Endpoint" description="Backend sync endpoint">
            <span className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'Not configured'}
            </span>
          </SettingRow>
        </Section>
      </div>

      <div className="flex">
        <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
        <div className="w-6 h-6 rounded-md bg-sky-50 flex items-center justify-center">{icon}</div>
        <p className="text-sm font-medium text-slate-700">{title}</p>
      </div>
      <div className="divide-y divide-slate-50">{children}</div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4 gap-4">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5.5 rounded-full transition-colors ${value ? 'bg-sky-500' : 'bg-slate-200'}`}
      style={{ height: '22px' }}
    >
      <span
        className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform ${
          value ? 'translate-x-5' : 'translate-x-0.5'
        }`}
        style={{ width: '18px', height: '18px', top: '2px' }}
      />
    </button>
  );
}
