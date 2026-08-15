'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Trophy, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function ChallengePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const challengeId = searchParams.get('id') || 'challenge_phishing_1';

  const [challenge, setChallenge] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchApi('/api/challenges/' + challengeId)
      .then((res) => {
        setChallenge(res);
        setSelectedOption(null);
        setResult(null);
      })
      .catch((err) => console.error(err));
  }, [challengeId]);

  const handleSubmit = async () => {
    if (!selectedOption) return;
    setSubmitting(true);
    try {
      const res = await fetchApi('/api/challenges/' + challenge.id + '/submit', {
        method: 'POST',
        body: JSON.stringify({ selected_option_id: selectedOption }),
      });
      setResult(res);
    } catch (err) {
      alert('Could not submit challenge.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!challenge) {
    return <div className="max-w-2xl mx-auto py-24 text-center text-slate-400">Loading challenge...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>Interactive Verification Challenge</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">{challenge.title}</h1>
        <p className="text-slate-400 text-sm mt-1">Category: {challenge.category} | Reward: +{challenge.xp_reward} XP</p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4 border border-white/10 mb-6">
        <div className="text-xs uppercase tracking-wider font-bold text-slate-400">The Scenario</div>
        <p className="text-slate-200 text-sm leading-relaxed">{challenge.scenario}</p>

        <div className="p-4 rounded-xl bg-slate-900 border-l-4 border-amber-500 text-xs sm:text-sm font-mono text-amber-200">
          {challenge.suspicious_message}
        </div>

        <div className="pt-2 font-bold text-white text-base">
          {challenge.question}
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {challenge.options.map((opt: any) => {
          const isSelected = selectedOption === opt.id;
          let optionStyles = 'bg-slate-900/60 border-white/5 hover:border-slate-700';

          if (result) {
            if (opt.id === result.correct_option_id) {
              optionStyles = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
            } else if (isSelected && !result.is_correct) {
              optionStyles = 'bg-rose-950/50 border-rose-500 text-rose-200';
            } else {
              optionStyles = 'opacity-50 bg-slate-900/30 border-white/5';
            }
          } else if (isSelected) {
            optionStyles = 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500/30';
          }

          return (
            <div
              key={opt.id}
              onClick={() => !result && setSelectedOption(opt.id)}
              className={'p-4 rounded-xl border cursor-pointer transition text-sm flex items-start space-x-3 ' + optionStyles}
            >
              <div className="mt-0.5">
                {result && opt.id === result.correct_option_id ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : result && isSelected && !result.is_correct ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                ) : (
                  <div className={'w-4 h-4 rounded-full border ' + (isSelected ? 'border-emerald-400 bg-emerald-500' : 'border-slate-600')} />
                )}
              </div>
              <span className="flex-1">{opt.text}</span>
            </div>
          );
        })}
      </div>

      {result ? (
        <div className={'p-6 rounded-2xl border mb-6 ' + (result.is_correct ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-slate-900 border-amber-500/40')}>
          <div className="flex items-center space-x-3 mb-2">
            {result.is_correct ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span className="text-lg font-bold text-white">Outstanding Decision! (+{result.xp_awarded} XP)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span className="text-lg font-bold text-white">Good Learning Moment (+{result.xp_awarded} XP)</span>
              </>
            )}
          </div>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">{result.explanation}</p>

          <div className="mt-6 flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-white/10">
            <div className="text-xs text-slate-400">
              Total XP: <span className="font-bold text-emerald-400">{result.new_total_xp}</span> | Streak: <span className="font-bold text-white">{result.streak} days</span>
            </div>
            <button
              onClick={() => router.push('/progress')}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center space-x-2 transition"
            >
              <span>View Updated Learning Progress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || submitting}
            className={'px-7 py-3 rounded-xl font-semibold text-sm transition flex items-center space-x-2 ' + (
              selectedOption && !submitting
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            )}
          >
            <span>Submit Verification Choice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
