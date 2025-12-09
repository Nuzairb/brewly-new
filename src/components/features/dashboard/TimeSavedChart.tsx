"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", hours: 2 },
  { day: "Tues", hours: 2 },
  { day: "Wed", hours: 3.5 },
  { day: "Thurs", hours: 4.5 },
  { day: "Fri", hours: 3.8 },
  { day: "Sat", hours: 4 },
  { day: "Sun", hours: 4.2 },
];

export function TimeSavedChart() {
  return (
    <div className="w-full h-[267px] bg-white border border-[#EEEEEE] rounded-tr-[12px] p-[25px]">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-lato font-semibold text-[14px] leading-normal text-[#1E1E1E]">
            Time Saved from AI
          </h3>
          <div className="bg-[#E3E8EE] rounded-[4px] px-[6px] py-[2px]">
            <span className="font-lato font-medium text-[12px] leading-normal text-[#787777]">
              0.0%
            </span>
          </div>
        </div>
        <div className="font-lato font-normal text-[24px] leading-[32px] text-[#1E1E1E]">
          400h
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full h-[0.6px] bg-[#E5E7EB] mb-4" />

      {/* Chart */}
      <div className="w-full h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={0.6}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#787777",
                fontSize: 8,
                fontFamily: "var(--font-lato)",
                fontWeight: 500,
              }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#787777",
                fontSize: 8,
                fontFamily: "var(--font-lato)",
                fontWeight: 500,
              }}
              ticks={[1, 2, 3, 4, 5]}
              domain={[0, 5]}
              tickFormatter={(value) => `${value}h`}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E1E1E",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                color: "white",
              }}
              labelStyle={{ color: "white" }}
              formatter={(value: any) => [`${value}h`, "Time Saved"]}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#FF6B6B"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#FF6B6B",
                stroke: "#FF6B6B",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
