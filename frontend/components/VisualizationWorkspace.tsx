'use client';

import { Panel } from '@/components/Panel';
import { ArrayVisualizer } from '@/visualizers/ArrayVisualizer';
import { DpVisualizer } from '@/visualizers/DpVisualizer';
import { GraphVisualizer } from '@/visualizers/GraphVisualizer';
import { ArrayStep, GraphInput, VisualizerKind, VisualizerStep } from '@/utils/types';

interface VisualizationWorkspaceProps {
  visualizer: VisualizerKind;
  step?: VisualizerStep;
  graph: GraphInput;
}

export const VisualizationWorkspace = ({ visualizer, step, graph }: VisualizationWorkspaceProps) => {
  if (visualizer === 'graph') {
    return <GraphVisualizer graph={graph} step={step as never} />;
  }

  if (visualizer === 'dp') {
    return <DpVisualizer step={step as never} />;
  }

  return (
    <Panel title="Visualization Canvas" subtitle="D3 animates each array transition for clear step-by-step feedback.">
      <ArrayInsights step={step as ArrayStep | undefined} />
      <ArrayVisualizer step={step as never} />
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Legend color="bg-slate-800 dark:bg-slate-200" label="Default" />
        <Legend color="bg-sky-400" label="Comparing" />
        <Legend color="bg-orange-400" label="Swapping / Active" />
        <Legend color="bg-green-500" label="Sorted / Found" />
      </div>
    </Panel>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5">
    <span className={`h-3 w-3 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
);

const ArrayInsights = ({ step }: { step?: ArrayStep }) => {
  const compared = step?.comparedIndices?.length ? step.comparedIndices.join(' & ') : 'None';
  const swapped = step?.swappedIndices?.length ? step.swappedIndices.join(' & ') : 'None';
  const sortedCount = step?.sortedIndices?.length ?? 0;

  return (
    <div className="mb-4 grid gap-3 md:grid-cols-3">
      <InsightCard label="Comparing" value={compared} accent="from-sky-400/20 to-sky-300/5" />
      <InsightCard label="Swapping" value={swapped} accent="from-orange-400/20 to-orange-300/5" />
      <InsightCard label="Locked In" value={`${sortedCount} bars`} accent="from-emerald-400/20 to-emerald-300/5" />
    </div>
  );
};

const InsightCard = ({
  label,
  value,
  accent
}: {
  label: string;
  value: string;
  accent: string;
}) => (
  <div className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${accent} p-4 dark:border-white/10`}>
    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
    <p className="mt-2 font-display text-xl font-semibold text-slate-900 dark:text-white">{value}</p>
  </div>
);
