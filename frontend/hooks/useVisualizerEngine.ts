'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { VisualizerStep } from '@/utils/types';

interface UseVisualizerEngineOptions<TStep extends VisualizerStep> {
  steps: TStep[];
  speed: number;
}

export const useVisualizerEngine = <TStep extends VisualizerStep>({
  steps,
  speed
}: UseVisualizerEngineOptions<TStep>) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentStepIndex((currentIndex) => Math.min(currentIndex + 1, steps.length - 1));
    }, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStepIndex, isPlaying, speed, steps.length]);

  const currentStep = useMemo(() => steps[currentStepIndex], [currentStepIndex, steps]);

  const controls = {
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    toggle: () => setIsPlaying((current) => !current),
    stepForward: () => {
      setIsPlaying(false);
      setCurrentStepIndex((currentIndex) => Math.min(currentIndex + 1, steps.length - 1));
    },
    reset: () => {
      setIsPlaying(false);
      setCurrentStepIndex(0);
    }
  };

  return {
    controls,
    currentStep,
    currentStepIndex,
    isPlaying,
    progress: steps.length > 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0
  };
};
