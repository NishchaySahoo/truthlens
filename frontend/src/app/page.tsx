import Link from 'next/link';
import { Sparkles, Play, ShieldAlert, Brain, Lightbulb, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const steps = [
    { number: '01', title: 'Analyze', desc: 'Inspect text, links, or media claims with zero friction.', icon: Sparkles },
    { number: '02', title: 'Understand', desc: 'Identify decontextualization, artificial urgency, and framing tricks.', icon: ShieldAlert },
    { number: '03', title: 'Learn', desc: 'Master the underlying media literacy concept with practical checks.', icon: Lightbulb },
    { number: '04', title: 'Practice', desc: 'Solve rapid real-world challenges, earn XP, and build lifelong verification instincts.', icon: Brain },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] -z-10 pointer-events-none" />

      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>UNESCO Hackathon Showcase MVP</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Don&apos;t Just Know.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Learn to Verify.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Analyze the information you encounter online, understand what&apos;s behind it, and build the skills to recognize misinformation yourself.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/analyze"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-900/30"
          >
            <Sparkles className="w-5 h-5" />
            <span>Analyze Something</span>
          </Link>
          <Link
            href="/analyze?demo=scholarship-misinformation"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base flex items-center justify-center space-x-2 transition"
          >
            <Play className="w-4 h-4 fill-current text-emerald-400" />
            <span>Try Scholarship Demo</span>
          </Link>
        </div>

        <div className="mt-16 p-4 rounded-xl glass-card max-w-2xl mx-auto text-slate-300 text-sm border-emerald-500/20 flex items-center justify-center gap-3">
          <span className="font-semibold text-emerald-400">Core Loop:</span>
          <span>Analyze -&gt; Explain -&gt; Learn -&gt; Challenge -&gt; Progress</span>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How TruthLens Works</h2>
          <p className="text-slate-400 mt-2">A continuous cycle to make you independently discerning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.number} className="glass-card p-6 rounded-xl relative flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">{s.number}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-normal">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
          <div className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2">Our Mission</div>
          <blockquote className="text-xl sm:text-2xl font-semibold text-slate-100 max-w-2xl mx-auto">
            &ldquo;The goal isn&apos;t to make you dependent on TruthLens. It&apos;s to make you need TruthLens less over time.&rdquo;
          </blockquote>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm"
            >
              <span>Explore the Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
