'use client';
import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, Clock, Lightbulb } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function LearnPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  useEffect(() => {
    fetchApi<any[]>('/api/lessons')
      .then((data) => {
        setLessons(data);
        if (data.length > 0) setActiveLesson(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Media & Information Literacy Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Essential Verification Modules</h1>
        <p className="text-slate-400 text-sm mt-2">Bite-sized tactical lessons on deconstructing digital deception.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Lesson Modules</div>
          {lessons.map((les) => {
            const isSel = activeLesson?.id === les.id;
            return (
              <div
                key={les.id}
                onClick={() => setActiveLesson(les)}
                className={'p-4 rounded-xl border cursor-pointer transition ' + (
                  isSel
                    ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/60 border-white/5 hover:border-slate-700'
                )}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{les.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {les.read_time}</span>
                </div>
                <div className="font-semibold text-white text-sm">{les.title}</div>
              </div>
            );
          })}
        </div>

        {activeLesson && (
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl space-y-6 border border-white/10">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs text-emerald-400 font-semibold">{activeLesson.category}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{activeLesson.title}</h2>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-2">Module Overview</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{activeLesson.overview}</p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Core Takeaways</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {activeLesson.key_takeaways.map((item: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">*</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Pro Verification Checklist</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeLesson.pro_tips.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400">[x]</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
