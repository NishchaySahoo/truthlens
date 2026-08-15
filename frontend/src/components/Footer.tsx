export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-white">TruthLens</span>
          <span>-</span>
          <span>"The goal is not to make you dependent on TruthLens. It is to make you need TruthLens less over time."</span>
        </div>
        <div className="text-xs text-slate-500">
          Media & Information Literacy Engine | Offline Demo Mode
        </div>
      </div>
    </footer>
  );
}
