import { algorithmCatalog, generateAlgorithmSteps } from '@/utils/algorithms';
import { AlgorithmDefinition, RunAlgorithmPayload, VisualizerStep } from '@/utils/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const fetchAlgorithms = async (): Promise<AlgorithmDefinition[]> => {
  if (!API_URL) {
    return algorithmCatalog;
  }

  try {
    const response = await fetch(`${API_URL}/algorithms`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch algorithms');
    }
    return (await response.json()) as AlgorithmDefinition[];
  } catch {
    return algorithmCatalog;
  }
};

export const runAlgorithm = async (
  payload: RunAlgorithmPayload
): Promise<{ steps: VisualizerStep[]; source: 'frontend' | 'backend' }> => {
  if (!API_URL) {
    return {
      steps: generateAlgorithmSteps(payload),
      source: 'frontend'
    };
  }

  try {
    const response = await fetch(`${API_URL}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to run algorithm');
    }

    const data = (await response.json()) as { steps: VisualizerStep[] };
    return {
      steps: data.steps,
      source: 'backend'
    };
  } catch {
    return {
      steps: generateAlgorithmSteps(payload),
      source: 'frontend'
    };
  }
};
