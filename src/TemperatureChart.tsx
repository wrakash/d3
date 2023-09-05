import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface TemperatureDataPoint {
  date: string;
  temperature: number;
}

interface TemperatureChartProps {
  data: TemperatureDataPoint[];
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", height);

    const xScale = d3
      .scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.temperature)!])
      .nice()
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(6);
    const yAxis = d3.axisLeft(yScale).ticks(6);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(${margin.left},${innerHeight + margin.top})`
      )
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    const line = d3
      .line<TemperatureDataPoint>()
      .x((d) => xScale(new Date(d.date)) + margin.left)
      .y((d) => yScale(d.temperature) + margin.top);

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("stroke", "blue")
      .attr("fill", "none");

    svg
      .append("text")
      .attr("class", "x-label")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .style("text-anchor", "middle")
      .text("Date");

    svg
      .append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .text("Temperature (°F)");

    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", margin.top)
      .style("text-anchor", "middle")
      .style("font-size", "1.5rem")
      .text("Temperature vs. Date Chart");
  }, [data]);

  return <svg ref={svgRef}></svg>;
}


