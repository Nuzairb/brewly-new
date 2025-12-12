"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { month: "Jan", revenue: 20000, expenses: 30000, orders: 500 },
  { month: "Feb", revenue: 15000, expenses: 45000, orders: 800 },
  { month: "Mar", revenue: 25000, expenses: 20000, orders: 1200 },
  { month: "Apr", revenue: 50000, expenses: 35000, orders: 1500 },
  { month: "May", revenue: 80000, expenses: 60000, orders: 1700 },
  { month: "Jun", revenue: 95000, expenses: 100000, orders: 1890 },
  { month: "Jul", revenue: 110000, expenses: 70000, orders: 1600 },
  { month: "Aug", revenue: 130000, expenses: 120000, orders: 1800 },
  { month: "Sep", revenue: 140000, expenses: 150000, orders: 2000 },
  { month: "Oct", revenue: 180000, expenses: 90000, orders: 2200 },
  { month: "Nov", revenue: 210000, expenses: 70000, orders: 2500 },
  { month: "Dec", revenue: 230000, expenses: 80000, orders: 2700 },
];

// Custom tooltip for Figma design
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;

    return (
      <div className="bg-[#1E1E1E] text-white rounded-lg px-[14px] py-[13px] font-lato shadow-lg">
        <div className="text-[12px] leading-[12px] font-normal opacity-50 tracking-[0.3px] mb-[8px]">
          June 22.2025
        </div>
        <div className="text-[16px] leading-[16px] font-poppins font-medium tracking-[0.3px]">
          {dataPoint.orders?.toLocaleString()} orders
        </div>
      </div>
    );
  }
  return null;
};

export function SalesPerformanceChart({ compact }: { compact?: boolean }) {
  // Use Tailwind classes only — no inline styles
  const cardClassName = compact
    ? 'w-full bg-white border border-[#EEEEEE] rounded-[12px] p-4 sm:p-6 h-[300px] sm:h-[344px] overflow-hidden'
    : 'w-full bg-white border border-[#EEEEEE] rounded-[12px] p-[44px] h-[556px]';

  // Reduce chart heights so header + chart don't exceed card height on large screens
  const chartClassName = compact
    ? 'w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px]'
    : 'w-full h-[190px]';

  return (
    <Card className={cardClassName}>
      {/* Header Section */}
      <div className="mb-4">
        {/* Title and Date Row */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-lato font-normal text-[14px] leading-[14px] text-[#787777] mb-3">
              Sales & Upsell Performance
            </h3>
            <div className="flex items-center gap-[6px]">
              <span className="font-lato font-normal text-[24px] leading-[32px] text-[#1E1E1E]">
                AED 240.8K
              </span>
              <div className="bg-[#05C16833] border border-[rgba(5,193,104,0.2)] rounded-[2px] px-[4px] py-[2px] flex items-center gap-[2px]">
                <span className="font-lato font-medium text-[10px] leading-[14px] text-[#14CA74]">
                  24.6%
                </span>
                <ArrowUpRight className="w-[8px] h-[8px] text-[#14CA74]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            {/* Date Dropdown */}
            <div className="relative">
              <button className="font-lato font-medium text-[14px] leading-[14px] text-[#1E1E1E] border border-[#EEEEEE] bg-[#FAFAFA] rounded-[8px] px-[8px] py-[14px] cursor-pointer flex items-center gap-[6px]">
                Jan 2024 - Dec 2024
                <ChevronDown className="w-[10px] h-[5px] text-[#1E1E1E]" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex gap-[24px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#1A5D4A]" />
                <span className="font-lato font-normal text-[12px] leading-[14px] text-[#787777]">
                  Revenue
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#1E1E1E]" />
                <span className="font-lato font-normal text-[12px] leading-[14px] text-[#787777]">
                  Expenses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className={chartClassName}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {/* Revenue gradient - Light blue */}
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9DCEF5" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#9DCEF5" stopOpacity={0.1} />
              </linearGradient>

              {/* Expenses gradient - Light pink/red */}
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFB4B4" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#FFB4B4" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={0.6}
              horizontal={true}
              vertical={false}
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#787777',
                fontSize: 10,
                fontFamily: 'var(--font-lato)',
                fontWeight: 500,
              }}
              dy={10}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#787777',
                fontSize: 12,
                fontFamily: 'var(--font-lato)',
                fontWeight: 500,
              }}
              tickFormatter={(value) => `${value / 1000}K`}
              domain={[0, 250000]}
              ticks={[0, 25000, 50000, 100000, 150000, 200000, 250000]}
              dx={-5}
            />

            {/* Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />

            {/* Expenses Area */}
            <Area
              type="natural"
              dataKey="expenses"
              stroke="#FF8B8B"
              strokeWidth={2}
              fill="url(#expensesGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: '#1E1E1E',
                stroke: '#1E1E1E',
                strokeWidth: 2,
              }}
            />

            {/* Revenue Area */}
            <Area
              type="natural"
              dataKey="revenue"
              stroke="#6DB4E8"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: '#1A5D4A',
                stroke: '#1A5D4A',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}