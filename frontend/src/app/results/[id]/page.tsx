'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, XCircle, 
  BookOpen, Trophy, ArrowRight, Calendar, Info, Layers, Eye
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function ResultsPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchApi('/api/analyses/' + params.id)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-400">
        Loading verification report...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white">Report Not Found</h2>
        <p className="text-slate-400 mt-2">The requested analysis could not be retrieved.</p>
        <Link href="/analyze" className="mt-6 inline-block text-emerald-400 font-semibold">
          Return to Analyzer
        </Link>
      </div>
    );
  }

  const getVerdictStyle = (v: string) => {
    switch (v) {
      case 'Likely False':
        return { color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-500/40', icon: XCircle };
      case 'Misleading':
        return { color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-500/40', icon: AlertTriangle };
      case 'Mostly Accurate':
      case 'Likely Accurate':
        return { color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/40', icon: CheckCircle2 };
      default:
        return { color: 'text-yellow-400', bg: 'bg-yellow-950/40 border-yellow-500/40', icon: HelpCircle };
    }
  };

  const vStyle = getVerdictStyle(data.verdict);
  const VerdictIcon = vStyle.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
        <span>Analysis ID: <span className="font-mono text-slate-300">{data.id}</span> | {data.timestamp}</span>
        <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-medium">DEMO VERIFIED REPORT</span>
      </div>

      <div className={'p-6 sm:p-8 rounded-2xl border backdrop-blur-md ' + vStyle.bg}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Assessment Outcome</div>
            <div className="flex items-center space-x-3">
              <VerdictIcon className={'w-8 h-8 ' + vStyle.color} />
              <h1 className={'text-2xl sm:text-3xl font-extrabold ' + vStyle.color}>{data.verdict}</h1>
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Confidence Indicator</div>
            <div className="text-2xl font-bold text-white">{Math.round(data.confidence * 100)}%</div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-white mb-2">{data.title}</h2>
          <p className="text-slate-300 text-sm leading-relaxed">{data.summary}</p>
        </div>

        <div className="mt-6 p-3 bg-slate-950/60 rounded-lg border border-white/5 text-xs text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span><strong>Uncertainty Note:</strong> {data.uncertainty_notes}</span>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Extracted Claims Under Review</span>
        </h3>
        <ul className="space-y-2">
          {data.extracted_claims.map((claim: string, i: number) => (
            <li key={i} className="text-sm text-slate-300 flex items-start space-x-2 bg-slate-900/60 p-3 rounded-lg border border-white/5">
              <span className="text-emerald-400 font-bold">*</span>
              <span>{claim}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>Evidence & Registry Corroboration</span>
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {data.evidence_cards.map((ev: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-semibold text-white text-sm">{ev.title}</div>
                <span className="text-xs bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">
                  {ev.source_type}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{ev.summary}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ev.published_date}</span>
                <span>Source: <strong className="text-slate-300">{ev.source_name}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3">
          <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Missing Context</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {data.missing_context.map((mc: string, idx: number) => (
              <li key={idx} className="p-2.5 rounded bg-slate-900/60 border border-white/5">* {mc}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Manipulation Techniques</span>
          </h4>
          <div className="space-y-2">
            {data.manipulation_techniques.map((mt: any, idx: number) => (
              <div key={idx} className="p-2.5 rounded bg-slate-900/60 border border-white/5 text-xs">
                <div className="font-semibold text-white flex justify-between">
                  <span>{mt.technique}</span>
                  <span className="text-rose-400 text-[10px] uppercase font-bold">{mt.severity}</span>
                </div>
                <div className="text-slate-400 mt-1">{mt.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.ai_media_forensics && (
        <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 space-y-1">
          <div className="font-bold text-sm text-purple-300">AI Media / Generative Forensics</div>
          <div>{data.ai_media_forensics}</div>
        </div>
      )}

      <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border-2 border-emerald-500/40 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">Educational Takeaway</span>
            <h3 className="text-xl font-bold text-white">Learn From This: {data.media_literacy_concept}</h3>
          </div>
        </div>

        <p className="text-slate-200 text-sm leading-relaxed">{data.concept_explanation}</p>

        <div className="bg-slate-950/70 p-4 rounded-xl border border-white/5 space-y-2">
          <div className="text-xs font-semibold text-slate-300">Practical Questions to Ask Next Time:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
            {data.verification_questions.map((q: string, idx: number) => (
              <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                [Check] {q}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Test your understanding and earn <span className="text-emerald-400 font-bold">+50 XP</span> towards your literacy progress.
          </div>
          <Link
            href={'/challenge?id=' + (data.related_challenge_id || 'challenge_phishing_1')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center space-x-2 transition shadow-lg shadow-emerald-900/30 whitespace-nowrap"
          >
            <Trophy className="w-4 h-4" />
            <span>Take Related Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
