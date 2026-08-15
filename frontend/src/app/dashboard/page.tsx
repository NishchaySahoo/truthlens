'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Trophy, Flame, ArrowRight } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/dashboard')
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading || !data) {
    return <div className="max-w-6xl mx-auto py-24 text-center text-slate-400">Loading your literacy overview...</div>;
  }

  const { progress, recent_analyses, daily_challenge } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Total Learning XP</div>
          <div className="text-2xl font-bold text-white mt-1 flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>{progress.total_xp}</span>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Daily Streak</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{progress.streak_days} Days</span>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Analyses Run</div>
          <div className="text-2xl font-bold text-white mt-1">{progress.analyses_count}</div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/5">
          <div className="text-xs text-slate-400 font-medium">Challenges Solved</div>
          <div className="text-2xl font-bold text-white mt-1">{progress.challenges_completed}</div>
        </div>
      </div>

      <div className="p-8 rounded-2xl glass-card border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40">
        <div>
          <h2 className="text-2xl font-bold text-white">Have a suspicious message or claim?</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Run an instant diagnostic to deconstruct the manipulation techniques and extract verified evidence.
          </p>
        </div>
        <Link
          href="/analyze"
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center space-x-2 transition shadow-lg shadow-emerald-900/30 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start Verification Analysis</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Skill Competency Progress</h3>
            <span className="text-xs text-slate-400">Self-verification proficiency</span>
          </div>
          <div className="space-y-3">
            {Object.entries(progress.skills).map(([skill, val]: any) => (
              <div key={skill} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{skill}</span>
                  <span className="text-emerald-400 font-bold">{val}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: val + '%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-emerald-500/20 bg-slate-900/60">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4" />
              <span>Today&apos;s Featured Challenge</span>
            </div>
            <h4 className="font-bold text-white text-base mb-2">{daily_challenge.title}</h4>
            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{daily_challenge.scenario}</p>
          </div>
          <div className="pt-6">
            <Link
              href={'/challenge?id=' + daily_challenge.id}
              className="w-full py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
            >
              <span>Solve Challenge (+{daily_challenge.xp_reward} XP)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">Recent Verification Reports</h3>
          <Link href="/history" className="text-xs text-emerald-400 hover:underline">View All History -&gt;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recent_analyses.map((ana: any) => (
            <Link
              key={ana.id}
              href={'/results/' + ana.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">{ana.timestamp}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">{ana.verdict}</span>
                </div>
                <div className="font-semibold text-white text-sm line-clamp-1">{ana.title}</div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                <span>Concept: {ana.media_literacy_concept}</span>
                <span className="text-emerald-400 font-semibold">Inspect -&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
