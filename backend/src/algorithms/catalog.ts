import { AlgorithmDefinition } from '../types';

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
