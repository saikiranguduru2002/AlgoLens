import {
  AlgorithmDefinition,
  AlgorithmId,
  ArrayStep,
  DpStep,
  GraphInput,
  GraphStep,
  RunAlgorithmPayload,
  VisualizerStep
} from '@/utils/types';

const cloneArray = (array: number[]) => [...array];

export const algorithmCatalog: AlgorithmDefinition[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    visualizer: 'array',
    description: 'Repeatedly compares adjacent values and swaps them until the largest values bubble to the end.',
    pseudocode: [
      'for pass from 0 to n - 1',
      '  for index from 0 to n - pass - 2',
      '    compare array[index] and array[index + 1]',
      '    if left > right, swap them',
      '  mark last unsorted element as sorted',
      'return array'
    ],
    complexity: { time: 'O(n^2)', space: 'O(1)' }
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    visualizer: 'array',
    description: 'Divides the array into halves, recursively sorts them, then merges the results.',
    pseudocode: [
      'split array into left and right halves',
      'recursively sort the left half',
      'recursively sort the right half',
      'merge both halves in sorted order',
      'return merged array'
    ],
    complexity: { time: 'O(n log n)', space: 'O(n)' }
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    visualizer: 'array',
    description: 'Partitions elements around a pivot and recursively sorts both partitions.',
    pseudocode: [
      'pick a pivot element',
      'partition values into less than and greater than pivot',
      'place the pivot in its final index',
      'recursively sort left partition',
      'recursively sort right partition'
    ],
    complexity: { time: 'O(n log n) average', space: 'O(log n)' }
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    visualizer: 'array',
    description: 'Searches a sorted array by repeatedly halving the active search range.',
    pseudocode: [
      'set low to 0 and high to n - 1',
      'while low <= high',
      '  mid = floor((low + high) / 2)',
      '  compare array[mid] to target',
      '  shrink to left or right half',
      'return found index or not found'
    ],
    complexity: { time: 'O(log n)', space: 'O(1)' }
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'graph',
    visualizer: 'graph',
    description: 'Traverses neighbors level by level using a queue.',
    pseudocode: [
      'create an empty queue',
      'enqueue the start node and mark it visited',
      'while the queue is not empty',
      '  dequeue the next node',
      '  visit each unvisited neighbor',
      '    mark visited and enqueue it'
    ],
    complexity: { time: 'O(V + E)', space: 'O(V)' }
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'graph',
    visualizer: 'graph',
    description: 'Traverses deep into one branch before backtracking.',
    pseudocode: [
      'create a stack with the start node',
      'while the stack is not empty',
      '  pop a node',
      '  if node was not visited, mark it visited',
      '  push its unvisited neighbors',
      'continue until all reachable nodes are visited'
    ],
    complexity: { time: 'O(V + E)', space: 'O(V)' }
  },
  {
    id: 'fibonacci-tabulation',
    name: 'Fibonacci Tabulation',
    category: 'dynamic-programming',
    visualizer: 'dp',
    description: 'Builds Fibonacci values bottom-up in a table.',
    pseudocode: [
      'create a table of size n + 1',
      'set table[0] = 0 and table[1] = 1',
      'for index from 2 to n',
      '  table[index] = table[index - 1] + table[index - 2]',
      'return table[n]'
    ],
    complexity: { time: 'O(n)', space: 'O(n)' }
  }
];

const pushCompleteArrayStep = (
  steps: ArrayStep[],
  array: number[],
  sortedIndices: number[],
  activeLine: number,
  description: string
) => {
  steps.push({
    type: 'complete',
    array: cloneArray(array),
    sortedIndices,
    activeLine,
    description
  });
};

export const generateBubbleSortSteps = (input: number[]): ArrayStep[] => {
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

  pushCompleteArrayStep(steps, array, array.map((_, index) => index), 6, 'Bubble Sort is complete.');

  return steps;
};

export const generateBinarySearchSteps = (input: number[], target: number): ArrayStep[] => {
  const array = cloneArray(input).sort((a, b) => a - b);
  const steps: ArrayStep[] = [
    {
      type: 'initialize',
      array,
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

  pushCompleteArrayStep(steps, array, [], 6, `${target} was not found in the array.`);
  return steps;
};

export const generateMergeSortSteps = (input: number[]): ArrayStep[] => {
  const array = cloneArray(input);
  const steps: ArrayStep[] = [
    {
      type: 'initialize',
      array: cloneArray(array),
      activeLine: 1,
      description: 'Start Merge Sort by splitting the array into smaller halves.'
    }
  ];

  const mergeSort = (start: number, end: number) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    steps.push({
      type: 'mark-range',
      array: cloneArray(array),
      range: [start, end],
      activeLine: 1,
      description: `Split the range ${start} to ${end} around ${mid}.`
    });
    mergeSort(start, mid);
    mergeSort(mid + 1, end);

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

  mergeSort(0, array.length - 1);
  pushCompleteArrayStep(steps, array, array.map((_, index) => index), 5, 'Merge Sort is complete.');
  return steps;
};

export const generateQuickSortSteps = (input: number[]): ArrayStep[] => {
  const array = cloneArray(input);
  const steps: ArrayStep[] = [
    {
      type: 'initialize',
      array: cloneArray(array),
      activeLine: 1,
      description: 'Start Quick Sort by selecting a pivot.'
    }
  ];

  const quickSort = (low: number, high: number) => {
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

    quickSort(low, partitionIndex - 1);
    quickSort(partitionIndex + 1, high);
  };

  quickSort(0, array.length - 1);
  pushCompleteArrayStep(steps, array, array.map((_, index) => index), 5, 'Quick Sort is complete.');
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

export const generateBfsSteps = (graph: GraphInput): GraphStep[] => {
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

export const generateDfsSteps = (graph: GraphInput): GraphStep[] => {
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

      const neighbors = [...(adjacency.get(node) ?? [])].reverse();
      neighbors.forEach((neighbor) => {
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

export const generateFibonacciSteps = (count: number): DpStep[] => {
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

export const generateAlgorithmSteps = (payload: RunAlgorithmPayload): VisualizerStep[] => {
  switch (payload.algorithm) {
    case 'bubble-sort':
      return generateBubbleSortSteps(payload.input.array ?? []);
    case 'merge-sort':
      return generateMergeSortSteps(payload.input.array ?? []);
    case 'quick-sort':
      return generateQuickSortSteps(payload.input.array ?? []);
    case 'binary-search':
      return generateBinarySearchSteps(payload.input.array ?? [], payload.input.target ?? 0);
    case 'bfs':
      return generateBfsSteps(payload.input.graph as GraphInput);
    case 'dfs':
      return generateDfsSteps(payload.input.graph as GraphInput);
    case 'fibonacci-tabulation':
      return generateFibonacciSteps(payload.input.count ?? 8);
    default:
      return [];
  }
};

export const getAlgorithmDefinition = (algorithmId: AlgorithmId) =>
  algorithmCatalog.find((algorithm) => algorithm.id === algorithmId) ?? algorithmCatalog[0];
