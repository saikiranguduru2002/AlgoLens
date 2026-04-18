import { Panel } from '@/components/Panel';

interface PseudocodePanelProps {
  title: string;
  description: string;
  pseudocode: string[];
  activeLine: number;
  timeComplexity: string;
  spaceComplexity: string;
  currentDescription?: string;
}

export const PseudocodePanel = ({
  title,
  description,
  pseudocode,
  activeLine,
  timeComplexity,
  spaceComplexity,
  currentDescription
}: PseudocodePanelProps) => (
  <Panel title="Learning Panel" subtitle={title}>
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-100/90 p-4 text-sm leading-6 text-slate-600 dark:bg-white/5 dark:text-slate-200">
        {description}
      </div>
      <div className="space-y-2 rounded-[26px] border border-slate-900/90 bg-slate-950 p-4 text-sm text-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-950/90">
        {pseudocode.map((line, index) => {
          const lineNumber = index + 1;
          return (
            <div
              key={`${line}-${lineNumber}`}
              className={`grid grid-cols-[32px_1fr] gap-3 rounded-xl px-3 py-2 transition ${
                activeLine === lineNumber
                  ? 'bg-gradient-to-r from-cyan/25 to-orange-400/20 text-white'
                  : 'text-slate-400'
              }`}
            >
              <span className="text-right text-xs">{lineNumber}</span>
              <span>{line}</span>
            </div>
          );
        })}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Time</p>
          <p className="mt-2 font-display text-lg font-semibold">{timeComplexity}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Space</p>
          <p className="mt-2 font-display text-lg font-semibold">{spaceComplexity}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
        {currentDescription ?? 'Run the algorithm to inspect each step.'}
      </div>
    </div>
  </Panel>
);
