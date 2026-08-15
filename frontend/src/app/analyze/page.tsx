'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, Link as LinkIcon, Image as ImageIcon, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { fetchApi } from '@/lib/api';

const DEMO_PRESETS = [
  { id: 'scholarship-misinformation', label: 'Rs 50,000 Scholarship Scam', type: 'WhatsApp Chain / Phishing' },
  { id: 'old-news-breaking', label: 'Old Cyclone News Shared as Today', type: 'Decontextualized Video' },
  { id: 'misleading-statistic', label: '94% Youth Unemployment Spike', type: 'Statistical Framing' },
  { id: 'ai-generated-image', label: 'Underwater Glass Palace', type: 'Synthetic AI Media' },
  { id: 'sensational-health-claim', label: 'Papaya Leaf 3-Hour Fever Cure', type: 'Medical Miracle Bait' },
];

const ANALYSIS_STEPS = [
  'Reading Content & Structure',
  'Extracting Key Claims',
  'Checking Evidence & Registries',
  'Analyzing Context & Manipulation Cues',
  'Building Media-Literacy Report',
];

export default function AnalyzePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'image' | 'demo'>('demo');
  
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [selectedDemo, setSelectedDemo] = useState('scholarship-misinformation');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const demoParam = searchParams.get('demo');
    if (demoParam && DEMO_PRESETS.some((d) => d.id === demoParam)) {
      setSelectedDemo(demoParam);
      setActiveTab('demo');
    }
  }, [searchParams]);

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 700);

    try {
      let payload: any = { content_type: activeTab };
      if (activeTab === 'demo') {
        payload.demo_id = selectedDemo;
      } else if (activeTab === 'text') {
        payload.raw_content = textContent;
      } else if (activeTab === 'url') {
        payload.raw_content = urlContent;
      } else if (activeTab === 'image') {
        payload.raw_content = 'Uploaded image sample: visual_artifact_inspection.png';
      }

      const res: any = await fetchApi('/api/analyze', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setTimeout(() => {
        clearInterval(interval);
        router.push('/results/' + res.id);
      }, 3600);
    } catch (err) {
      clearInterval(interval);
      setIsAnalyzing(false);
      alert('Verification analysis failed. Please ensure the backend is running.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verification Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Inspect & Verify Information</h1>
        <p className="text-slate-400 mt-2">Submit text, links, or simulated demo items to generate an in-depth breakdown.</p>
      </div>

      {isAnalyzing ? (
        <div className="glass-card p-10 rounded-2xl max-w-xl mx-auto text-center border-emerald-500/30">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Analyzing Information</h3>
          <p className="text-sm text-slate-400 mb-8">Applying multi-layered media literacy diagnostics...</p>

          <div className="space-y-3 text-left max-w-sm mx-auto">
            {ANALYSIS_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={step} className="flex items-center space-x-3 text-sm">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                  )}
                  <span className={isCompleted ? 'text-slate-300' : isCurrent ? 'text-emerald-300 font-semibold' : 'text-slate-600'}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
          <div className="flex border-b border-slate-800 pb-4 mb-6 gap-2 overflow-x-auto">
            {[
              { id: 'demo', label: 'Interactive Demo Cases', icon: Sparkles },
              { id: 'text', label: 'Text Input', icon: FileText },
              { id: 'url', label: 'Web URL', icon: LinkIcon },
              { id: 'image', label: 'Image Forensics', icon: ImageIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === 'demo' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-xs">
                <strong>DEMO EXAMPLE</strong>: These cases require zero external API keys and illustrate key media-literacy dynamics.
              </div>
              <div className="grid grid-cols-1 gap-3">
                {DEMO_PRESETS.map((demo) => {
                  const isSel = selectedDemo === demo.id;
                  return (
                    <div
                      key={demo.id}
                      onClick={() => setSelectedDemo(demo.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        isSel
                          ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                          : 'bg-slate-900/50 border-white/5 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white text-base">{demo.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">Category: {demo.type}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSel ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700'}`}>
                        {isSel && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">Paste WhatsApp message, tweet, or article snippet</label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="e.g., 'URGENT: Government announced a 50,000 scholarship for all students...'"
                rows={5}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">Article or Social Post URL</label>
              <input
                type="url"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                placeholder="https://example-news.org/live/breaking-claim"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {activeTab === 'image' && (
            <div className="p-8 border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl text-center space-y-3 cursor-pointer bg-slate-900/30">
              <ImageIcon className="w-10 h-10 mx-auto text-slate-500" />
              <div className="text-sm text-slate-300 font-medium">Click to select or drag & drop image for forensic check</div>
              <div className="text-xs text-slate-500">Supports PNG, JPG, WebP. (Simulated demo image will be inspected)</div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleStartAnalysis}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center space-x-2 transition shadow-lg shadow-emerald-900/20"
            >
              <span>Run Verification Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
