'use client';

import { MoonStar, SunMedium } from 'lucide-react';

interface HeaderProps {
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

export const Header = ({ onThemeToggle, theme }: HeaderProps) => (
  <header className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/65 p-6 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,24,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(43,197,214,0.14),transparent_34%)]" />
    <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 dark:text-cyan-200/70">AlgoLens MVP</p>
      <h1 className="font-display text-3xl font-bold text-ink dark:text-white sm:text-4xl">
        Interactive Algorithm Visualizer
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
        Learn how algorithms evolve step by step with playback controls, live pseudocode tracking, and D3-powered animations.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          Playable timelines
        </span>
        <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          Pseudocode sync
        </span>
        <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          Sorting, search, graph
        </span>
      </div>
    </div>

    <button
      type="button"
      onClick={onThemeToggle}
      className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
    >
      {theme === 'light' ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
    </div>
  </header>
);
