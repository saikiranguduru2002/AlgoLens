import { GraphInput, RunAlgorithmPayload, VisualizerStep, ArrayStep, GraphStep, DpStep } from '../types';

const cloneArray = (array: number[]) => [...array];

const completeArray = (steps: ArrayStep[], array: number[], description: string, activeLine: number) => {
  steps.push({
    type: 'complete',
    array: cloneArray(array),
    sortedIndices: array.map((_, index) => index),
    activeLine,
    description
  });
};

const bubbleSort = (input: number[]): ArrayStep[] => {
  const array = cloneArray(input);
  const steps: ArrayStep[] = [
    {
      type: 'initialize',
      array: cloneArray(array),
      activeLine: 1,
      description: 'Start Bubble Sort with the provided array.'
    }
  ];
  const sortedIndices: number[] = [];

  for (let pass = 0; pass < array.length; pass += 1) {
    for (let index = 0; index < array.length - pass - 1; index += 1) {
      steps.push({
        type: 'compare',
        array: cloneArray(array),
        comparedIndices: [index, index + 1],
        sortedIndices: [...sortedIndices],
        activeLine: 3,
        description: `Compare ${array[index]} and ${array[index + 1]}.`
      });

      if (array[index] > array[index + 1]) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
        steps.push({
          type: 'swap',
          array: cloneArray(array),
          swappedIndices: [index, index + 1],
          sortedIndices: [...sortedIndices],
          activeLine: 4,
          description: `Swap ${array[index + 1]} with ${array[index]}.`
        });
      }
    }

    sortedIndices.unshift(array.length - pass - 1);
    steps.push({
      type: 'mark-sorted',
      array: cloneArray(array),
      sortedIndices: [...sortedIndices],
      activeLine: 5,
      description: `${array[array.length - pass - 1]} is now fixed in its final position.`
    });
  }

  completeArray(steps, array, 'Bubble Sort is complete.', 6);
  return steps;
};

const mergeSort = (input: number[]): ArrayStep[] => {
  const array = cloneArray(input);
  const steps: ArrayStep[] = [
    {
      type: 'initialize',
      array: cloneArray(array),
      activeLine: 1,
      description: 'Start Merge Sort by splitting the array into smaller halves.'
    }
  ];

  const sort = (start: number, end: number) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    steps.push({
      type: 'mark-range',
      array: cloneArray(array),
      range: [start, end],
      activeLine: 1,
      description: `Split the range ${start} to ${end} around ${mid}.`
    });

    sort(start, mid);
    sort(mid + 1, end);

    const merged: number[] = [];
    let left = start;
    let right = mid + 1;

    while (left <= mid && right <= end) {
      steps.push({
        type: 'compare',
        array: cloneArray(array),
        comparedIndices: [left, right],
        activeLine: 4,
        description: `Compare ${array[left]} and ${array[right]} while merging.`
      });

      if (array[left] <= array[right]) {
        merged.push(array[left]);
        left += 1;
      } else {
        merged.push(array[right]);
        right += 1;
      }
    }

    while (left <= mid) {
      merged.push(array[left]);
      left += 1;
    }

    while (right <= end) {
      merged.push(array[right]);
      right += 1;
    }

    merged.forEach((value, offset) => {
      array[start + offset] = value;
      steps.push({
        type: 'overwrite',
        array: cloneArray(array),
        comparedIndices: [start + offset],
        activeLine: 4,
        description: `Write ${value} back into index ${start + offset}.`
      });
    });
  };

  sort(0, array.length - 1);
  completeArray(steps, array, 'Merge Sort is complete.', 5);
  return steps;
};

const quickSort = (input: number[]): ArrayStep[] => {
  const array = cloneArray(input);
  const steps: ArrayStep[] = [
    {
      type: 'initialize',
      array: cloneArray(array),
      activeLine: 1,
      description: 'Start Quick Sort by selecting a pivot.'
    }
  ];

  const sort = (low: number, high: number) => {
    if (low >= high) return;
    const pivot = array[high];
    let partitionIndex = low;

    for (let current = low; current < high; current += 1) {
      steps.push({
        type: 'compare',
        array: cloneArray(array),
        comparedIndices: [current, high],
        activeLine: 2,
        description: `Compare ${array[current]} with pivot ${pivot}.`
      });

      if (array[current] < pivot) {
        [array[current], array[partitionIndex]] = [array[partitionIndex], array[current]];
        steps.push({
          type: 'swap',
          array: cloneArray(array),
          swappedIndices: [current, partitionIndex],
          activeLine: 3,
          description: `Move ${array[partitionIndex]} into the lower partition.`
        });
        partitionIndex += 1;
      }
    }

    [array[partitionIndex], array[high]] = [array[high], array[partitionIndex]];
    steps.push({
      type: 'swap',
      array: cloneArray(array),
      swappedIndices: [partitionIndex, high],
      activeLine: 3,
      description: `Place pivot ${pivot} at index ${partitionIndex}.`
    });

    sort(low, partitionIndex - 1);
    sort(partitionIndex + 1, high);
  };

  sort(0, array.length - 1);
  completeArray(steps, array, 'Quick Sort is complete.', 5);
  return steps;
};

const binarySearch = (input: number[], target: number): ArrayStep[] => {
  const array = cloneArray(input).sort((a, b) => a - b);
  const steps: ArrayStep[] = [
    {
      type: 'initialize',
      array: cloneArray(array),
      activeLine: 1,
      range: [0, array.length - 1],
      description: `Search for ${target} in the sorted array.`
    }
  ];

  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      type: 'compare',
      array: cloneArray(array),
      comparedIndices: [mid],
      range: [low, high],
      activeLine: 4,
      description: `Check middle value ${array[mid]} at index ${mid}.`
    });

    if (array[mid] === target) {
      steps.push({
        type: 'mark-found',
        array: cloneArray(array),
        comparedIndices: [mid],
        foundIndex: mid,
        range: [low, high],
        activeLine: 6,
        description: `Found ${target} at index ${mid}.`
      });
      return steps;
    }

    if (array[mid] < target) {
      low = mid + 1;
      steps.push({
        type: 'mark-range',
        array: cloneArray(array),
        range: [low, high],
        activeLine: 5,
        description: `${target} is larger, so move to the right half.`
      });
    } else {
      high = mid - 1;
      steps.push({
        type: 'mark-range',
        array: cloneArray(array),
        range: [low, high],
        activeLine: 5,
        description: `${target} is smaller, so move to the left half.`
      });
    }
  }

  steps.push({
    type: 'complete',
    array: cloneArray(array),
    activeLine: 6,
    description: `${target} was not found in the array.`
  });
  return steps;
};

const buildAdjacency = (graph: GraphInput) => {
  const adjacency = new Map<string, string[]>();
  graph.nodes.forEach((node) => adjacency.set(node.id, []));
  graph.edges.forEach((edge) => {
    adjacency.get(edge.source)?.push(edge.target);
    adjacency.get(edge.target)?.push(edge.source);
  });
  return adjacency;
};

const bfs = (graph: GraphInput): GraphStep[] => {
  const adjacency = buildAdjacency(graph);
  const queue = [graph.startNodeId];
  const visited = new Set<string>([graph.startNodeId]);
  const steps: GraphStep[] = [
    {
      type: 'initialize',
      activeNodeId: graph.startNodeId,
      visitedNodeIds: [graph.startNodeId],
      frontierNodeIds: [graph.startNodeId],
      activeLine: 2,
      description: `Start BFS from node ${graph.startNodeId}.`
    }
  ];

  while (queue.length > 0) {
    const node = queue.shift() as string;
    steps.push({
      type: 'visit-node',
      activeNodeId: node,
      visitedNodeIds: [...visited],
      frontierNodeIds: [...queue],
      activeLine: 4,
      description: `Visit node ${node} from the front of the queue.`
    });

    for (const neighbor of adjacency.get(node) ?? []) {
      steps.push({
        type: 'inspect-edge',
        activeNodeId: node,
        activeEdge: [node, neighbor],
        visitedNodeIds: [...visited],
        frontierNodeIds: [...queue],
        activeLine: 5,
        description: `Inspect edge ${node} -> ${neighbor}.`
      });

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({
          type: 'enqueue',
          activeNodeId: neighbor,
          activeEdge: [node, neighbor],
          visitedNodeIds: [...visited],
          frontierNodeIds: [...queue],
          activeLine: 6,
          description: `Mark ${neighbor} visited and enqueue it.`
        });
      }
    }
  }

  steps.push({
    type: 'complete',
    visitedNodeIds: [...visited],
    activeLine: 6,
    description: 'BFS traversal is complete.'
  });
  return steps;
};

const dfs = (graph: GraphInput): GraphStep[] => {
  const adjacency = buildAdjacency(graph);
  const stack = [graph.startNodeId];
  const visited = new Set<string>();
  const steps: GraphStep[] = [
    {
      type: 'initialize',
      activeNodeId: graph.startNodeId,
      visitedNodeIds: [],
      frontierNodeIds: [...stack],
      activeLine: 1,
      description: `Push start node ${graph.startNodeId} on the stack.`
    }
  ];

  while (stack.length > 0) {
    const node = stack.pop() as string;
    steps.push({
      type: 'visit-node',
      activeNodeId: node,
      visitedNodeIds: [...visited],
      frontierNodeIds: [...stack],
      activeLine: 3,
      description: `Pop node ${node} from the stack.`
    });

    if (!visited.has(node)) {
      visited.add(node);
      steps.push({
        type: 'visit-node',
        activeNodeId: node,
        visitedNodeIds: [...visited],
        frontierNodeIds: [...stack],
        activeLine: 4,
        description: `Visit node ${node}.`
      });

      [...(adjacency.get(node) ?? [])]
        .reverse()
        .forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
            steps.push({
              type: 'enqueue',
              activeNodeId: neighbor,
              activeEdge: [node, neighbor],
              visitedNodeIds: [...visited],
              frontierNodeIds: [...stack],
              activeLine: 5,
              description: `Push neighbor ${neighbor} for later exploration.`
            });
          }
        });
    }
  }

  steps.push({
    type: 'complete',
    visitedNodeIds: [...visited],
    activeLine: 6,
    description: 'DFS traversal is complete.'
  });
  return steps;
};

const fibonacci = (count: number): DpStep[] => {
  const limit = Math.max(2, count);
  const cells = Array.from({ length: limit + 1 }, (_, index) => ({
    index,
    value: index === 0 ? 0 : index === 1 ? 1 : 0
  }));

  const steps: DpStep[] = [
    {
      type: 'initialize',
      cells: cells.map((cell) => ({ ...cell })),
      activeLine: 2,
      description: 'Seed the first two Fibonacci values.'
    }
  ];

  for (let index = 2; index <= limit; index += 1) {
    cells[index].value = cells[index - 1].value + cells[index - 2].value;
    steps.push({
      type: 'update-cell',
      cells: cells.map((cell) => ({
        ...cell,
        active: cell.index === index
      })),
      activeLine: 4,
      description: `Compute fib(${index}) = fib(${index - 1}) + fib(${index - 2}).`
    });
  }

  steps.push({
    type: 'complete',
    cells: cells.map((cell) => ({ ...cell })),
    activeLine: 5,
    description: `Fibonacci tabulation complete. Result = ${cells[limit].value}.`
  });

  return steps;
};

export const generateSteps = (payload: RunAlgorithmPayload): VisualizerStep[] => {
  switch (payload.algorithm) {
    case 'bubble-sort':
      return bubbleSort(payload.input.array ?? []);
    case 'merge-sort':
      return mergeSort(payload.input.array ?? []);
    case 'quick-sort':
      return quickSort(payload.input.array ?? []);
    case 'binary-search':
      return binarySearch(payload.input.array ?? [], payload.input.target ?? 0);
    case 'bfs':
      return bfs(payload.input.graph as GraphInput);
    case 'dfs':
      return dfs(payload.input.graph as GraphInput);
    case 'fibonacci-tabulation':
      return fibonacci(payload.input.count ?? 8);
    default:
      return [];
  }
};
