import { ReactNode } from 'react';
import clsx from 'clsx';

interface PanelProps {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

export const Panel = ({ title, subtitle, className, children }: PanelProps) => (
  <section
    className={clsx(
      'rounded-[30px] border border-white/70 bg-white/70 p-5 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70',
      className
    )}
  >
    <div className="mb-4">
      <h2 className="font-display text-lg font-bold text-ink dark:text-slate-50">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{subtitle}</p> : null}
    </div>
    {children}
  </section>
);
