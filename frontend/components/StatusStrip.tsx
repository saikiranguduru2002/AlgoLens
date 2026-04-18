interface StatusStripProps {
  algorithmName: string;
  totalSteps: number;
  currentStepNumber: number;
  source: 'frontend' | 'backend';
}

export const StatusStrip = ({
  algorithmName,
  totalSteps,
  currentStepNumber,
  source
}: StatusStripProps) => (
  <div className="grid gap-3 sm:grid-cols-3">
    <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-panel backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Algorithm</p>
      <p className="mt-2 font-display text-lg font-semibold">{algorithmName}</p>
    </div>
    <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-panel backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Progress</p>
      <p className="mt-2 font-display text-lg font-semibold">
        Step {currentStepNumber} / {totalSteps}
      </p>
    </div>
    <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-panel backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Execution Source</p>
      <p className="mt-2 font-display text-lg font-semibold">{source === 'backend' ? 'Backend API' : 'Frontend Fallback'}</p>
    </div>
  </div>
);
