"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ArrowUpRight } from "lucide-react";

const data = [
  { time: "12 AM", value: 120 },
  { time: "8 AM", value: 280 },
  { time: "4 PM", value: 320 },
  { time: "11 PM", value: 350 },
];

export function TotalProfitChart() {
  return (
    <div className="w-full h-[267px] bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-lato font-semibold text-sm text-[#1E1E1E] mb-3">
          Total Profit Made by Promoting slow moving items
        </h3>

        <div className="flex items-center gap-1.5">
          <span className="font-lato font-normal text-2xl text-[#1E1E1E]">
            400 AED
          </span>

          <div className="bg-[#05C16833] border border-green-500/20 rounded-sm px-1 py-[2px] flex items-center gap-1">
            <span className="font-lato font-medium text-[10px] text-[#14CA74]">
              16.8%
            </span>
            <ArrowUpRight className="w-2 h-2 text-[#14CA74]" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[100px]">
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={data} margin={{}}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8AB4F8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8AB4F8" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={0.6}
              horizontal
              vertical={false}
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{
                className:
                  "font-lato font-medium text-[10px] leading-[12px] tracking-[0px] text-[#787777]",
              }}
              dy={5}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                className:
                  "font-lato font-medium text-[10px] leading-[12px] tracking-[0px] text-[#787777]",
              }}
              ticks={[0, 100, 250, 500]}
              domain={[0, 500]}
              dx={-5}
            />

            <Tooltip
              wrapperClassName="!bg-[#1E1E1E] !text-white !rounded-lg !border-none !px-3 !py-2 text-sm font-lato"
              labelClassName="!text-white"
              
              formatter={(value: any) => [`${value} AED`, "Profit"]}
            />

            <Area
              type="natural"
              dataKey="value"
              stroke="#6DB4E8"
              strokeWidth={2}
              fill="url(#profitGradient)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="mt-3 pt-3">
        <div className="flex items-center gap-1.5">
          <div className="bg-green-500/20 border border-green-500/20 rounded-sm px-1.5 py-[2px] flex items-center gap-1">
            <div className="w-[3px] h-[3px] rounded-full bg-green-500" />
            <span className="font-lato font-medium text-[10px] text-green-500">
              Live
            </span>
          </div>

          <span className="font-lato font-medium text-xs text-[#787777]">
            10k visitors
          </span>
        </div>
      </div>
    </div>
  );
}
