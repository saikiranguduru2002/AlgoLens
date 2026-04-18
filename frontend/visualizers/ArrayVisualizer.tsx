'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { ArrayStep } from '@/utils/types';

interface ArrayVisualizerProps {
  step?: ArrayStep;
}

const DEFAULT_HEIGHT = 360;
const DEFAULT_WIDTH = 720;

export const ArrayVisualizer = ({ step }: ArrayVisualizerProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const data = useMemo(() => step?.array ?? [], [step]);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const comparedIndices = step?.comparedIndices ?? [];
    const swappedIndices = step?.swappedIndices ?? [];
    const sortedIndices = step?.sortedIndices ?? [];
    const foundIndex = step?.foundIndex;
    const range = step?.range;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = DEFAULT_WIDTH;
    const height = DEFAULT_HEIGHT;
    const margin = { top: 32, right: 24, bottom: 42, left: 24 };
    const plottingBottom = height - margin.bottom;

    const xScale = d3
      .scaleBand<number>()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.18);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) ?? 0])
      .nice()
      .range([plottingBottom, margin.top]);

    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('rx', 28)
      .attr('fill', '#020617');

    svg
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top - 10)
      .attr('width', width - margin.left - margin.right)
      .attr('height', plottingBottom - margin.top + 10)
      .attr('rx', 24)
      .attr('fill', 'url(#chart-panel)');

    const defs = svg.append('defs');

    const chartGradient = defs.append('linearGradient').attr('id', 'chart-panel').attr('x1', '0%').attr('x2', '100%').attr('y1', '0%').attr('y2', '100%');
    chartGradient.append('stop').attr('offset', '0%').attr('stop-color', '#0f172a');
    chartGradient.append('stop').attr('offset', '100%').attr('stop-color', '#111827');

    const defaultGradient = defs.append('linearGradient').attr('id', 'bar-default').attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');
    defaultGradient.append('stop').attr('offset', '0%').attr('stop-color', '#60a5fa');
    defaultGradient.append('stop').attr('offset', '100%').attr('stop-color', '#1d4ed8');

    const compareGradient = defs.append('linearGradient').attr('id', 'bar-compare').attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');
    compareGradient.append('stop').attr('offset', '0%').attr('stop-color', '#67e8f9');
    compareGradient.append('stop').attr('offset', '100%').attr('stop-color', '#0891b2');

    const swapGradient = defs.append('linearGradient').attr('id', 'bar-swap').attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');
    swapGradient.append('stop').attr('offset', '0%').attr('stop-color', '#fdba74');
    swapGradient.append('stop').attr('offset', '100%').attr('stop-color', '#ea580c');

    const sortedGradient = defs.append('linearGradient').attr('id', 'bar-sorted').attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');
    sortedGradient.append('stop').attr('offset', '0%').attr('stop-color', '#86efac');
    sortedGradient.append('stop').attr('offset', '100%').attr('stop-color', '#16a34a');

    const mutedGradient = defs.append('linearGradient').attr('id', 'bar-muted').attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');
    mutedGradient.append('stop').attr('offset', '0%').attr('stop-color', '#475569');
    mutedGradient.append('stop').attr('offset', '100%').attr('stop-color', '#334155');

    svg
      .append('g')
      .attr('opacity', 0.32)
      .selectAll('line')
      .data(yScale.ticks(5))
      .enter()
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', (value) => yScale(value))
      .attr('y2', (value) => yScale(value))
      .attr('stroke', '#334155')
      .attr('stroke-dasharray', '5 7');

    const bars = svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, index) => xScale(index) ?? 0)
      .attr('y', height - margin.bottom)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('rx', 12)
      .attr('fill', (_, index) => {
        if (foundIndex === index) return 'url(#bar-sorted)';
        if (swappedIndices.includes(index)) return 'url(#bar-swap)';
        if (comparedIndices.includes(index)) return 'url(#bar-compare)';
        if (sortedIndices.includes(index)) return 'url(#bar-sorted)';
        if (range && (index < range[0] || index > range[1])) return 'url(#bar-muted)';
        return 'url(#bar-default)';
      });

    bars
      .transition()
      .duration(320)
      .ease(d3.easeCubicOut)
      .attr('y', (value) => yScale(value))
      .attr('height', (value) => plottingBottom - yScale(value));

    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, index) => xScale(index) ?? 0)
      .attr('y', (value) => yScale(value))
      .attr('width', xScale.bandwidth())
      .attr('height', (value) => plottingBottom - yScale(value))
      .attr('rx', 12)
      .attr('fill', 'transparent')
      .attr('stroke', (_, index) =>
        comparedIndices.includes(index) || swappedIndices.includes(index) || foundIndex === index ? '#f8fafc' : 'transparent'
      )
      .attr('stroke-width', 2);

    svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (_, index) => (xScale(index) ?? 0) + xScale.bandwidth() / 2)
      .attr('y', (value) => yScale(value) - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', 12)
      .attr('font-weight', 700)
      .text((value) => value);

    svg
      .append('g')
      .attr('transform', `translate(0, ${plottingBottom + 24})`)
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (_, index) => (xScale(index) ?? 0) + xScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', 11)
      .text((_, index) => index);

    if (range) {
      svg
        .append('rect')
        .attr('x', xScale(range[0]) ?? margin.left)
        .attr('y', margin.top - 10)
        .attr('width', (xScale(range[1]) ?? width - margin.right) - (xScale(range[0]) ?? margin.left) + xScale.bandwidth())
        .attr('height', plottingBottom - margin.top + 10)
        .attr('rx', 24)
        .attr('fill', 'transparent')
        .attr('stroke', '#38bdf8')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '8 8')
        .attr('opacity', 0.75);
    }
  }, [data, step]);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/80">
      <svg ref={svgRef} viewBox={`0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}`} className="h-[360px] w-full" />
    </div>
  );
};
