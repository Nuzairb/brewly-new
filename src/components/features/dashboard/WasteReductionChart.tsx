"use client";

import React from "react";

export function WasteReductionChart() {
  const monthlyData = [
    { month: 'Jan', manual: 320, ai: 180 },
    { month: 'Feb', manual: 350, ai: 200 },
    { month: 'Mar', manual: 280, ai: 150 },
    { month: 'Apr', manual: 310, ai: 170 },
    { month: 'May', manual: 290, ai: 160 },
    { month: 'Jun', manual: 330, ai: 190 },
    { month: 'Jul', manual: 300, ai: 165 },
    { month: 'Aug', manual: 360, ai: 210 },
    { month: 'Sep', manual: 340, ai: 195 },
    { month: 'Oct', manual: 310, ai: 175 },
    { month: 'Nov', manual: 380, ai: 220 },
    { month: 'Dec', manual: 370, ai: 205 },
  ];

  return (
    <div
      className="relative w-full min-h-[520px] h-[520px] bg-white rounded-[14px] border border-[#E5E7EB] p-0 box-border opacity-100"
    >
      {/* Header */}
      <div
        className="absolute w-[223px] h-[28px] top-[27px]  left-[20px] font-lato font-weight:500 font-medium text-[18px] leading-[28px] tracking-[0%] text-[#1E1E1E] opacity-100"
      >
        Waste Reduction Over Time
      </div>

      {/* Chart */}
      <div className="absolute font-poppins font-weight:400 w-[650px] h-[260px] top-[111.78px] left-0 opacity-100">
        <svg width="650" height="260" viewBox="0 0 650 300">
          {/* Y-axis labels */}
          <text x="35" y="20" fill="#9CA3AF" fontSize="12" fontFamily="Poppins" fontWeight="400" textAnchor="end" letterSpacing="0px" style={{lineHeight:'16px',textAlign:'right'}}>400</text>
          <text x="35" y="75" fill="#9CA3AF" fontSize="12" fontFamily="Poppins" fontWeight="400" textAnchor="end" letterSpacing="0px" style={{lineHeight:'16px',textAlign:'right'}}>300</text>
          <text x="35" y="130" fill="#9CA3AF" fontSize="12" fontFamily="Poppins" fontWeight="400" textAnchor="end" letterSpacing="0px" style={{lineHeight:'16px',textAlign:'right'}}>200</text>
          <text x="35" y="185" fill="#9CA3AF" fontSize="12" fontFamily="Poppins" fontWeight="400" textAnchor="end" letterSpacing="0px" style={{lineHeight:'16px',textAlign:'right'}}>100</text>
          <text x="35" y="235" fill="#9CA3AF" fontSize="12" fontFamily="Poppins" fontWeight="400" textAnchor="end" letterSpacing="0px" style={{lineHeight:'16px',textAlign:'right'}}>0</text>

          {/* Grid lines */}
          <line x1="45" y1="20" x2="540" y2="20" stroke="#E5E7EB" strokeWidth="0.5" />
          <line x1="45" y1="75" x2="540" y2="75" stroke="#E5E7EB" strokeWidth="0.5" />
          <line x1="45" y1="130" x2="540" y2="130" stroke="#E5E7EB" strokeWidth="0.5" />
          <line x1="45" y1="185" x2="540" y2="185" stroke="#E5E7EB" strokeWidth="0.5" />

          {/* Manual Bundles Line (Red) */}
          <path
            d={monthlyData.map((d, i) => {
              const x = 45 + (i * 41);
              const y = 230 - (d.manual / 400 * 210);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
          />

          {/* AI Generated Line (Green) */}
          <path
            d={monthlyData.map((d, i) => {
              const x = 45 + (i * 41);
              const y = 230 - (d.ai / 400 * 210);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />

          {/* X-axis labels */}
          {monthlyData.map((d, i) => (
            <text
              key={i}
              x={45 + (i * 41)}
              y="245"
              fill="#9CA3AF"
              fontSize="10"
              fontFamily="Epilogue"
              fontWeight="400"
              textAnchor="middle"
              letterSpacing="0px"
              style={{lineHeight:'100%',textAlign:'center'}}
            >
              {d.month}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute flex gap-4 bottom-[30px] left-[50px]">
        <div className="flex items-center gap-[6px]">
          <div className="w-[12px] h-[12px] bg-[#EF4444] rounded-[2px]"></div>
          <span className="font-lato font-medium text-[12px] leading-[100%] tracking-[0px] text-[#787777]">Manual Bundles</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <div className="w-[12px] h-[12px] bg-[#10B981] rounded-[2px]"></div>
          <span className="font-lato font-medium text-[12px] leading-[100%] tracking-[0px] text-[#787777]">AI Suggested</span>
        </div>
      </div>
    </div>
  );
}
