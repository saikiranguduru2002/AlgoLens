export type AlgorithmCategory = 'sorting' | 'searching' | 'graph' | 'dynamic-programming';

export type AlgorithmId =
  | 'bubble-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'binary-search'
  | 'bfs'
  | 'dfs'
  | 'fibonacci-tabulation';

export type VisualizerKind = 'array' | 'graph' | 'dp';

export interface ArrayStep {
  type:
    | 'initialize'
    | 'compare'
    | 'swap'
    | 'overwrite'
    | 'mark-sorted'
    | 'mark-found'
    | 'mark-range'
    | 'complete';
  array: number[];
  comparedIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  activeLine: number;
  description: string;
  foundIndex?: number;
  range?: [number, number];
}

export interface GraphNodeDatum {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdgeDatum {
  source: string;
  target: string;
}

export interface GraphInput {
  nodes: GraphNodeDatum[];
  edges: GraphEdgeDatum[];
  startNodeId: string;
}

export interface GraphStep {
  type: 'initialize' | 'visit-node' | 'inspect-edge' | 'enqueue' | 'complete';
  activeNodeId?: string;
  activeEdge?: [string, string];
  visitedNodeIds: string[];
  frontierNodeIds?: string[];
  activeLine: number;
  description: string;
}

export interface FibonacciCell {
  index: number;
  value: number;
  active?: boolean;
}

export interface DpStep {
  type: 'initialize' | 'update-cell' | 'complete';
  cells: FibonacciCell[];
  activeLine: number;
  description: string;
}

export type VisualizerStep = ArrayStep | GraphStep | DpStep;

export interface AlgorithmDefinition {
  id: AlgorithmId;
  name: string;
  category: AlgorithmCategory;
  visualizer: VisualizerKind;
  description: string;
  pseudocode: string[];
  complexity: {
    time: string;
    space: string;
  };
}

export interface RunAlgorithmPayload {
  algorithm: AlgorithmId;
  input: {
    array?: number[];
    target?: number;
    graph?: GraphInput;
    count?: number;
  };
}
