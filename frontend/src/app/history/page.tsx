'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, ExternalLink, Calendar } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<any[]>([]);

  useEffect(() => {
    fetchApi<any[]>('/api/analyses')
      .then((data) => setAnalyses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <History className="w-3.5 h-3.5" />
          <span>Saved Analysis Records</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Verification History</h1>
        <p className="text-slate-400 text-sm mt-2">Revisit past reports, cross-examinations, and educational takeaways.</p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        {analyses.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">No analysis reports stored yet.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {analyses.map((ana) => (
              <div key={ana.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                      {ana.verdict}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {ana.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-base">{ana.title}</h3>
                  <p className="text-xs text-slate-400">Concept: {ana.media_literacy_concept}</p>
                </div>
                <Link
                  href={'/results/' + ana.id}
                  className="inline-flex items-center space-x-1 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 transition whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Open Report</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
