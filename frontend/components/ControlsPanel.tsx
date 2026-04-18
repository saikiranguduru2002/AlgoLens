'use client';

import { Panel } from '@/components/Panel';
import { AlgorithmDefinition, AlgorithmId } from '@/utils/types';

interface ControlsPanelProps {
  algorithms: AlgorithmDefinition[];
  selectedAlgorithm: AlgorithmId;
  inputMode: 'random' | 'manual';
  manualInput: string;
  arraySize: number;
  targetValue: number;
  dpCount: number;
  speed: number;
  onAlgorithmChange: (algorithmId: AlgorithmId) => void;
  onInputModeChange: (mode: 'random' | 'manual') => void;
  onManualInputChange: (value: string) => void;
  onArraySizeChange: (value: number) => void;
  onTargetValueChange: (value: number) => void;
  onDpCountChange: (value: number) => void;
  onSpeedChange: (value: number) => void;
  onGenerate: () => void;
}

export const ControlsPanel = ({
  algorithms,
  selectedAlgorithm,
  inputMode,
  manualInput,
  arraySize,
  targetValue,
  dpCount,
  speed,
  onAlgorithmChange,
  onInputModeChange,
  onManualInputChange,
  onArraySizeChange,
  onTargetValueChange,
  onDpCountChange,
  onSpeedChange,
  onGenerate
}: ControlsPanelProps) => {
  const selected = algorithms.find((algorithm) => algorithm.id === selectedAlgorithm) ?? algorithms[0];
  const showArrayControls = selected?.visualizer === 'array';
  const showBinarySearchTarget = selectedAlgorithm === 'binary-search';
  const showDpControls = selectedAlgorithm === 'fibonacci-tabulation';

  return (
    <Panel title="Controls" subtitle="Customize inputs and regenerate steps whenever you want.">
      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-100">Algorithm</span>
          <select
            value={selectedAlgorithm}
            onChange={(event) => onAlgorithmChange(event.target.value as AlgorithmId)}
            className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm outline-none ring-accent transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {algorithms.map((algorithm) => (
              <option key={algorithm.id} value={algorithm.id}>
                {algorithm.name}
              </option>
            ))}
          </select>
        </label>

        {showArrayControls ? (
          <>
            <div>
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-100">Input Mode</span>
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/5">
                {(['random', 'manual'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => onInputModeChange(mode)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      inputMode === mode
                        ? 'bg-white text-ink shadow-sm dark:bg-white/10 dark:text-white'
                        : 'text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    {mode === 'random' ? 'Random' : 'Manual'}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-100">Array Size</span>
              <input
                type="range"
                min={5}
                max={18}
                value={arraySize}
                onChange={(event) => onArraySizeChange(Number(event.target.value))}
                className="w-full accent-accent"
              />
              <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">{arraySize} bars</span>
            </label>

            {inputMode === 'manual' ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-100">
                  Manual Values
                </span>
                <textarea
                  value={manualInput}
                  onChange={(event) => onManualInputChange(event.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm outline-none ring-accent transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  placeholder="42, 19, 33, 8, 27"
                />
              </label>
            ) : null}
          </>
        ) : null}

        {showBinarySearchTarget ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-100">Target Value</span>
            <input
              type="number"
              value={targetValue}
              onChange={(event) => onTargetValueChange(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm outline-none ring-accent transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </label>
        ) : null}

        {showDpControls ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-100">
              Fibonacci Count
            </span>
            <input
              type="number"
              min={2}
              max={20}
              value={dpCount}
              onChange={(event) => onDpCountChange(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm outline-none ring-accent transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-100">Animation Speed</span>
          <input
            type="range"
            min={120}
            max={1400}
            step={40}
            value={speed}
            onChange={(event) => onSpeedChange(Number(event.target.value))}
            className="w-full accent-cyan"
          />
          <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">{speed}ms per step</span>
        </label>

        <button
          type="button"
          onClick={onGenerate}
          className="w-full rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-gradient-to-r dark:from-accent dark:to-cyan dark:text-slate-950"
        >
          Generate Visualization
        </button>
      </div>
    </Panel>
  );
};
