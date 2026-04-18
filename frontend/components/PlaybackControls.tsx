'use client';

import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  progress: number;
  stepLabel: string;
  onPlayPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
}

export const PlaybackControls = ({
  isPlaying,
  progress,
  stepLabel,
  onPlayPause,
  onStepForward,
  onReset
}: PlaybackControlsProps) => (
  <div className="rounded-[30px] border border-white/70 bg-white/70 p-4 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
    <div className="mb-3 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">Playback</p>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-300">{stepLabel}</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPlayPause}
          className="rounded-2xl bg-ink p-3 text-white transition hover:bg-slate-800 dark:bg-accent dark:text-slate-950"
          aria-label={isPlaying ? 'Pause playback' : 'Play playback'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={onStepForward}
          className="rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          aria-label="Step forward"
        >
          <SkipForward className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          aria-label="Reset playback"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent to-cyan transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);
