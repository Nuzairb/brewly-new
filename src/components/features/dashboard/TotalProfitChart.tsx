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
    <div className="w-full h-[267px] bg-white border border-white rounded-bl-[12px] p-[25px]">
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-lato font-semibold text-[14px] leading-normal text-[#1E1E1E] mb-3">
          Total Profit Made by Promoting slow moving items
        </h3>
        <div className="flex items-center gap-[6px]">
          <span className="font-lato font-normal text-[24px] leading-[32px] text-[#1E1E1E]">
            400 AED
          </span>
          <div className="bg-[rgba(5,193,104,0.2)] border border-[rgba(5,193,104,0.2)] rounded-[2px] px-[4px] py-[2px] flex items-center gap-[2px]">
            <span className="font-lato font-medium text-[10px] leading-[14px] text-[#14CA74]">
              16.8%
            </span>
            <ArrowUpRight className="w-[8px] h-[8px] text-[#14CA74]" />
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full h-[0.6px] bg-[#E5E7EB] mb-4" />

      {/* Chart */}
      <div className="w-full h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8AB4F8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8AB4F8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={0.6}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="time"
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
              ticks={[0, 100, 250, 500]}
              domain={[0, 500]}
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
              formatter={(value: any) => [`${value} AED`, "Profit"]}
            />
            <Area
              type="natural"
              dataKey="value"
              stroke="#6DB4E8"
              strokeWidth={2}
              fill="url(#profitGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#6DB4E8",
                stroke: "#6DB4E8",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-[6px]">
          <div className="bg-[rgba(5,193,104,0.2)] border border-[rgba(5,193,104,0.2)] rounded-[2px] px-[6px] py-[2px] flex items-center gap-[4px]">
            <div className="w-[3px] h-[3px] rounded-full bg-[#14CA74]" />
            <span className="font-lato font-medium text-[10px] leading-[14px] text-[#14CA74]">
              Live
            </span>
          </div>
          <span className="font-lato font-medium text-[12px] leading-[14px] text-[#787777]">
            10k visitors
          </span>
        </div>
      </div>
    </div>
  );
}
