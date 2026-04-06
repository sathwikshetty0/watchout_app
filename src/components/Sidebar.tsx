'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Camera,
  Wallet,
  ShieldCheck,
  Settings,
  Eye,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/feed', label: 'Detection Feed', icon: Camera },
  { href: '/rewards', label: 'Reward Wallet', icon: Wallet },
  { href: '/compliance', label: 'Legal Compliance', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col bg-white border-r border-slate-200">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500">
          <Eye className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 leading-tight">WatchOut</p>
          <p className="text-[10px] text-slate-400 leading-tight">AI Enforcement</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-sky-500' : 'text-slate-400'}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-xs font-semibold text-sky-600">
            U
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-700 truncate">User</p>
            <p className="text-[10px] text-slate-400 truncate">Active Device</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
