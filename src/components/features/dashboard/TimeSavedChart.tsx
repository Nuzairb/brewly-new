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
    <div className="w-full h-[267px] bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-lato font-semibold text-sm text-[#1E1E1E]">
            Time Saved from AI
          </h3>

          <div className="bg-[#05C16833] rounded px-2 py-[2px]">
            <span className="font-lato font-medium text-xs text-[#14CA74]">
              0.0%
            </span>
          </div>
        </div>

        <div className="font-lato font-normal text-2xl text-[#1E1E1E]">
          400h
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-gray-200 mb-4" />

      {/* Chart */}
      <div className="w-full h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }} // required by Recharts
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={0.6}
              horizontal
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                className:
                  "font-lato font-medium text-[10px] leading-[12px] tracking-[0px] text-[#1E1E1E]",
              }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                className:
                  "font-lato font-medium text-[10px] leading-[12px] tracking-[0px] text-[#1E1E1E]",
              }}
              ticks={[1, 2, 3, 4, 5]}
              domain={[0, 5]}
              tickFormatter={(value) => `${value}h`}
              dx={-5}
            />

            <Tooltip
              wrapperClassName="!bg-[#1E1E1E] !text-white !rounded-lg !border-none !px-3 !py-2 text-xs font-lato"
              labelClassName="!text-white"
              itemStyle={{}} // must exist → but empty → NO inline CSS
              formatter={(value: any) => [`${value}h`, "Time Saved"]}
            />

            <Line
              type="monotone"
              dataKey="hours"
              stroke="#FF6B6B"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }} // required object, no inline styling
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
