'use client';

import { Panel } from '@/components/Panel';
import { DpStep } from '@/utils/types';

interface DpVisualizerProps {
  step?: DpStep;
}

export const DpVisualizer = ({ step }: DpVisualizerProps) => (
  <Panel title="DP Table" subtitle="Bottom-up state updates for tabulation.">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {(step?.cells ?? []).map((cell) => (
        <div
          key={cell.index}
          className={`rounded-3xl border p-4 transition ${
            cell.active
              ? 'border-accent bg-orange-50 dark:border-accent dark:bg-orange-500/10'
              : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Index {cell.index}</p>
          <p className="mt-2 font-display text-2xl font-bold">{cell.value}</p>
        </div>
      ))}
    </div>
  </Panel>
);
