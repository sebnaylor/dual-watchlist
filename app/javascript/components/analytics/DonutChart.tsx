import React from "react";

interface DonutChartProps {
  data: { value: number; label: string; color: string }[];
  size?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  strokeWidth = 32,
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativeOffset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((segment, i) => {
        const ratio = segment.value / total;
        const dashLength = circumference * ratio;
        const gapLength = circumference - dashLength;
        const offset = -cumulativeOffset + circumference * 0.25;
        cumulativeOffset += dashLength;

        return (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        );
      })}
    </svg>
  );
};

export default DonutChart;
