'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Compass, Sparkles, BookOpen, Trophy, History } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Compass },
    { label: 'Analyze', href: '/analyze', icon: Sparkles },
    { label: 'Challenge', href: '/challenge', icon: Trophy },
    { label: 'Learn', href: '/learn', icon: BookOpen },
    { label: 'Progress', href: '/progress', icon: ShieldCheck },
    { label: 'History', href: '/history', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
            TL
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">Truth<span className="text-emerald-400">Lens</span></span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Demo Mode</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            href="/analyze"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Verify Claim</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
