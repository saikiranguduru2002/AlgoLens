'use client';

import { Panel } from '@/components/Panel';
import { GraphInput, GraphStep } from '@/utils/types';

interface GraphVisualizerProps {
  graph: GraphInput;
  step?: GraphStep;
}

export const GraphVisualizer = ({ graph, step }: GraphVisualizerProps) => {
  const visited = new Set(step?.visitedNodeIds ?? []);
  const frontier = new Set(step?.frontierNodeIds ?? []);
  const activeEdge = step?.activeEdge;

  return (
    <Panel title="Graph Canvas" subtitle="Node-edge traversal with active frontier highlighting." className="h-full">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
        <svg viewBox="0 0 540 320" className="h-[360px] w-full">
          {graph.edges.map((edge) => {
            const source = graph.nodes.find((node) => node.id === edge.source);
            const target = graph.nodes.find((node) => node.id === edge.target);
            if (!source || !target) return null;

            const isActive =
              activeEdge &&
              ((activeEdge[0] === edge.source && activeEdge[1] === edge.target) ||
                (activeEdge[0] === edge.target && activeEdge[1] === edge.source));

            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isActive ? '#fb923c' : '#64748b'}
                strokeWidth={isActive ? 5 : 2.5}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            );
          })}

          {graph.nodes.map((node) => {
            const isActive = step?.activeNodeId === node.id;
            const isVisited = visited.has(node.id);
            const isFrontier = frontier.has(node.id);
            const fill = isActive ? '#fb923c' : isFrontier ? '#38bdf8' : isVisited ? '#14b8a6' : '#1e293b';

            return (
              <g key={node.id} className="transition-all duration-300">
                <circle cx={node.x} cy={node.y} r={28} fill={fill} />
                <circle cx={node.x} cy={node.y} r={33} fill="transparent" stroke={fill} opacity={0.22} strokeWidth={10} />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="white"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Panel>
  );
};
