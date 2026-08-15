'use client';
import { useEffect, useState } from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function ProgressPage() {
  const [prog, setProg] = useState<any>(null);

  useEffect(() => {
    fetchApi('/api/progress')
      .then((data) => setProg(data))
      .catch((err) => console.error(err));
  }, []);

  if (!prog) return <div className="max-w-4xl mx-auto py-24 text-center text-slate-400">Loading progress...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Skill Progress & Diagnostics</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Your Verification Mastery</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
          Tracking your literacy habits and critical verification instincts over time.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl text-center border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Total Experience</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{prog.total_xp} XP</div>
        </div>
        <div className="glass-card p-4 rounded-xl text-center border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Active Streak</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{prog.streak_days} Days</div>
        </div>
        <div className="glass-card p-4 rounded-xl text-center border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Analyses Run</div>
          <div className="text-2xl font-bold text-white mt-1">{prog.analyses_count}</div>
        </div>
        <div className="glass-card p-4 rounded-xl text-center border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Challenges Solved</div>
          <div className="text-2xl font-bold text-white mt-1">{prog.challenges_completed}</div>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
        <h3 className="font-bold text-white text-base">Competency Breakdown</h3>
        <p className="text-xs text-slate-400">
          Reflects demonstrated practice across challenges and analysis reports.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {Object.entries(prog.skills).map(([skill, val]: any) => (
            <div key={skill} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-200 font-semibold">{skill}</span>
                <span className="text-emerald-400 font-bold">{val}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: val + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Verification Badges</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {prog.badges.map((b: any) => (
            <div
              key={b.id}
              className={'p-4 rounded-xl border flex items-center space-x-3 ' + (
                b.unlocked
                  ? 'bg-slate-900/80 border-emerald-500/40'
                  : 'bg-slate-950/40 border-white/5 opacity-50'
              )}
            >
              <div className="text-sm font-mono text-emerald-400 font-bold">{b.icon}</div>
              <div>
                <div className="font-semibold text-white text-xs">{b.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{b.desc}</div>
                {b.unlocked && <span className="text-[9px] font-bold text-emerald-400 uppercase">Unlocked</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
