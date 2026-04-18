'use client';

import { useEffect, useState } from 'react';
import { ControlsPanel } from '@/components/ControlsPanel';
import { Header } from '@/components/Header';
import { PlaybackControls } from '@/components/PlaybackControls';
import { PseudocodePanel } from '@/components/PseudocodePanel';
import { StatusStrip } from '@/components/StatusStrip';
import { VisualizationWorkspace } from '@/components/VisualizationWorkspace';
import { useTheme } from '@/hooks/useTheme';
import { useVisualizerEngine } from '@/hooks/useVisualizerEngine';
import { fetchAlgorithms, runAlgorithm } from '@/utils/api';
import { getAlgorithmDefinition } from '@/utils/algorithms';
import { DEFAULT_ARRAY, DEFAULT_GRAPH, parseManualArray, randomArray } from '@/utils/defaults';
import { AlgorithmDefinition, AlgorithmId, RunAlgorithmPayload, VisualizerStep } from '@/utils/types';

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [algorithms, setAlgorithms] = useState<AlgorithmDefinition[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmId>('bubble-sort');
  const [inputMode, setInputMode] = useState<'random' | 'manual'>('random');
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY.length);
  const [manualInput, setManualInput] = useState(DEFAULT_ARRAY.join(', '));
  const [targetValue, setTargetValue] = useState(27);
  const [dpCount, setDpCount] = useState(8);
  const [speed, setSpeed] = useState(500);
  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [executionSource, setExecutionSource] = useState<'frontend' | 'backend'>('frontend');

  const { controls, currentStep, currentStepIndex, isPlaying, progress } = useVisualizerEngine({
    steps,
    speed
  });

  useEffect(() => {
    const loadAlgorithms = async () => {
      const data = await fetchAlgorithms();
      setAlgorithms(data);
    };

    loadAlgorithms().catch(() => {
      setAlgorithms([getAlgorithmDefinition('bubble-sort')]);
    });
  }, []);

  const buildPayload = (): RunAlgorithmPayload => {
    const manualArray = parseManualArray(manualInput);
    const arrayInput = inputMode === 'manual' && manualArray.length > 0 ? manualArray : randomArray(arraySize);

    if (selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs') {
      return {
        algorithm: selectedAlgorithm,
        input: {
          graph: DEFAULT_GRAPH
        }
      };
    }

    if (selectedAlgorithm === 'fibonacci-tabulation') {
      return {
        algorithm: selectedAlgorithm,
        input: {
          count: dpCount
        }
      };
    }

    return {
      algorithm: selectedAlgorithm,
      input: {
        array: selectedAlgorithm === 'binary-search' ? [...arrayInput].sort((a, b) => a - b) : arrayInput,
        target: targetValue
      }
    };
  };

  const generateSteps = async () => {
    const payload = buildPayload();
    const result = await runAlgorithm(payload);
    setExecutionSource(result.source);
    setSteps(result.steps);

    if (payload.input.array) {
      setManualInput(payload.input.array.join(', '));
    }
  };

  useEffect(() => {
    if (algorithms.length > 0 && steps.length === 0) {
      generateSteps().catch(() => undefined);
    }
    // We intentionally run after metadata is loaded to seed the initial algorithm.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithms.length]);

  useEffect(() => {
    if (algorithms.length > 0) {
      generateSteps().catch(() => undefined);
    }
    // Regenerate when users switch algorithm families to keep the canvas in sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlgorithm]);

  const selected = algorithms.find((algorithm) => algorithm.id === selectedAlgorithm) ?? getAlgorithmDefinition(selectedAlgorithm);

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
        <Header onThemeToggle={toggleTheme} theme={theme} />

        <StatusStrip
          algorithmName={selected.name}
          totalSteps={steps.length}
          currentStepNumber={Math.min(currentStepIndex + 1, Math.max(steps.length, 1))}
          source={executionSource}
        />

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <ControlsPanel
              algorithms={algorithms.length > 0 ? algorithms : [selected]}
              selectedAlgorithm={selectedAlgorithm}
              inputMode={inputMode}
              manualInput={manualInput}
              arraySize={arraySize}
              targetValue={targetValue}
              dpCount={dpCount}
              speed={speed}
              onAlgorithmChange={(algorithmId) => {
                setSelectedAlgorithm(algorithmId);
              }}
              onInputModeChange={setInputMode}
              onManualInputChange={setManualInput}
              onArraySizeChange={setArraySize}
              onTargetValueChange={setTargetValue}
              onDpCountChange={setDpCount}
              onSpeedChange={setSpeed}
              onGenerate={() => {
                generateSteps().catch(() => undefined);
              }}
            />

            <PlaybackControls
              isPlaying={isPlaying}
              progress={progress}
              stepLabel={currentStep ? currentStep.description : 'No steps generated yet'}
              onPlayPause={controls.toggle}
              onStepForward={controls.stepForward}
              onReset={controls.reset}
            />
          </div>

          <VisualizationWorkspace visualizer={selected.visualizer} step={currentStep} graph={DEFAULT_GRAPH} />

          <PseudocodePanel
            title={selected.name}
            description={selected.description}
            pseudocode={selected.pseudocode}
            activeLine={currentStep?.activeLine ?? 0}
            timeComplexity={selected.complexity.time}
            spaceComplexity={selected.complexity.space}
            currentDescription={currentStep?.description}
          />
        </div>
      </div>
    </main>
  );
}
