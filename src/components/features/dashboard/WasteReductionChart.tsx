"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

export function WasteReductionChart() {
  const monthlyData = [
    { month: 'Jan', manual: 290, ai: 360 },
    { month: 'Feb', manual: 250, ai: 340 },
    { month: 'Mar', manual: 190, ai: 280 },
    { month: 'Apr', manual: 200, ai: 250 },
    { month: 'May', manual: 180, ai: 220 },
    { month: 'Jun', manual: 270, ai: 280 },
    { month: 'Jun', manual: 320, ai: 320 },
    { month: 'Jul', manual: 370, ai: 340 },
    { month: 'Sept', manual: 340, ai: 310 },
    { month: 'Oct', manual: 300, ai: 250 },
    { month: 'Nov', manual: 220, ai: 220 },
    { month: 'Des', manual: 170, ai: 220 },
  ];

  // Custom dot component to only show dot on July
  const CustomDot = (props: any) => {
    const { cx, cy, payload, dataKey } = props;

    // Only show dot for Manual data on July (index 7)
    if (dataKey === "manual" && payload.month === "Jul") {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#EF4444"
          stroke="#ffffff"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return (
    <div className="relative w-full h-[414px] bg-white rounded-[20px] border border-[#F8F9FA] shadow-[0px_4px_20px_0px_rgba(238,238,238,0.5)] p-0 box-border">
      {/* Header */}
      <div className="absolute top-[41px] left-[20px] font-lato font-medium text-[18px] leading-[28px] text-[#1E1E1E]">
        Waste Reduction Over Time
      </div>

      {/* Chart */}
      <div className="absolute top-[76px] left-0 right-0 bottom-[48px] px-[20px]">
        {/* parent height 414 - top 76 - bottom 48 => ~290px */}
        <ResponsiveContainer width="100%" height={290}>
          <LineChart
            data={monthlyData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke="rgba(70, 78, 95, 0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#787777",
                fontSize: 10,
                fontFamily: "var(--font-lato)",
                opacity: 1,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#787777",
                fontSize: 12,
                fontFamily: "var(--font-lato)",
                opacity: 0.7,
              }}
              ticks={[0, 100, 200, 300, 400]}
              domain={[0, 400]}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="natural"
              dataKey="ai"
              stroke="#3CD856"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="natural"
              dataKey="manual"
              stroke="#EF4444"
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="absolute bottom-[16px] left-[27px] flex gap-4">
        <div className="flex items-center gap-[4px]">
          <div className="w-[12px] h-[12px] bg-[#EF4444] rounded-[2px]"></div>
          <span className="font-lato font-medium text-[12px] leading-normal text-[#787777]">
            Manual Bundle
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <div className="w-[12px] h-[12px] bg-[#3CD856] rounded-[2px]"></div>
          <span className="font-lato font-medium text-[12px] leading-normal text-[#787777]">
            AI suggested
          </span>
        </div>
      </div>
    </div>
  );
}
