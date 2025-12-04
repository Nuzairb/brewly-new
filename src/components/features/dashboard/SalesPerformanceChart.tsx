"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function SalesPerformanceChart() {
  return (
    <Card className="w-full bg-white border border-[#FFFFFF] rounded-[16px] p-[20px_24px]">
      {/* Header */}
      <div className="mb-4">
        <div className="font-lato font-semibold text-[16px] leading-6 text-[#1E1E1E] mb-1">Sales & Gross Performance</div>
        <div className="flex items-baseline gap-2">
          <span className="font-lato font-bold text-[28px] leading-[36px] text-[#1E1E1E]">AED 240.8K</span>
          <span className="font-medium text-[14px] text-[#10B981]">+8%</span>
        </div>
      </div>

      {/* Chart Area */}
      <div
        className="w-full h-[220px] relative flex items-center justify-center"
      >
        <svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="44" x2="600" y2="44" stroke="#F5F5F5" strokeWidth="1" />
          <line x1="0" y1="88" x2="600" y2="88" stroke="#F5F5F5" strokeWidth="1" />
          <line x1="0" y1="132" x2="600" y2="132" stroke="#F5F5F5" strokeWidth="1" />
          <line x1="0" y1="176" x2="600" y2="176" stroke="#F5F5F5" strokeWidth="1" />
          
          {/* Blue area fill */}
          <path
            d="M 0 180 Q 75 160, 120 140 T 240 100 T 360 80 T 480 60 T 600 45 L 600 220 L 0 220 Z"
            fill="url(#blueGradient)"
            opacity="0.4"
          />
          
          {/* Blue line */}
          <path
            d="M 0 180 Q 75 160, 120 140 T 240 100 T 360 80 T 480 60 T 600 45"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
          />
          
          {/* Red line overlay */}
          <path
            d="M 0 170 Q 80 145, 150 120 T 300 85 T 450 55 T 600 35"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.5"
          />
          
          {/* 1,890 orders label */}
          <g>
            <rect x="160" y="85" width="80" height="28" rx="4" fill="#1E1E1E"/>
            <text x="200" y="104" textAnchor="middle" fill="white" fontSize="12" fontFamily="Lato">
              1,890 orders
            </text>
          </g>
          
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 text-[12px] text-[#787777]">
        <div className="flex items-center gap-[6px]">
          <div className="w-[12px] h-[12px] bg-[#3B82F6] rounded-[2px]"></div>
          <span>Revenue</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <div className="w-[12px] h-[12px] bg-[#EF4444] rounded-[2px]"></div>
          <span>Expenses</span>
        </div>
      </div>
    </Card>
  );
}
