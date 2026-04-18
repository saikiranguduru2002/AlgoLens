import { GraphInput } from '@/utils/types';

export const DEFAULT_ARRAY = [42, 19, 33, 8, 27, 14, 5, 31];

export const DEFAULT_GRAPH: GraphInput = {
  startNodeId: 'A',
  nodes: [
    { id: 'A', x: 100, y: 80 },
    { id: 'B', x: 250, y: 50 },
    { id: 'C', x: 380, y: 120 },
    { id: 'D', x: 140, y: 220 },
    { id: 'E', x: 280, y: 240 },
    { id: 'F', x: 430, y: 260 }
  ],
  edges: [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'D' },
    { source: 'B', target: 'C' },
    { source: 'B', target: 'E' },
    { source: 'C', target: 'F' },
    { source: 'D', target: 'E' },
    { source: 'E', target: 'F' }
  ]
};

export const randomArray = (size: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

export const parseManualArray = (value: string) =>
  value
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((item) => !Number.isNaN(item));
