'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

const RevenueByBundleChart: React.FC = () => {
  // Monthly data for stacked bar chart
  const monthlyData = [
    { month: 'Jan', ai: 20, admin: 10, event: 10 },
    { month: 'Feb', ai: 40, admin: 30, event: 10 },
    { month: 'Mar', ai: 40, admin: 20, event: 30 },
    { month: 'Apr', ai: 30, admin: 20, event: 20 },
    { month: 'May', ai: 15, admin: 10, event: 5 },
    { month: 'Jun', ai: 30, admin: 20, event: 10 },
    { month: 'Jul', ai: 10, admin: 5, event: 5 },
    { month: 'Aug', ai: 40, admin: 30, event: 20 },
    { month: 'Sep', ai: 20, admin: 15, event: 10 },
    { month: 'Oct', ai: 25, admin: 20, event: 15 },
    { month: 'Nov', ai: 20, admin: 15, event: 10 },
    { month: 'Dec', ai: 35, admin: 20, event: 15 },
  ];

  const maxValue = 100; // 100K
  const chartHeight = 320;
  const barWidth = 11.758630752563477;
  const barSpacing = 48;

  return (
    <div
      className="w-full min-h-[451.73px] bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col opacity-100 box-border"
    >
      {/* Header */}
      <div className="mb-5">
        {/* Title and Date Selector */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-5 items-center">
            <h3 className="w-[160.44px] h-[13.72px] font-lato font-normal text-[14px] leading-[14px] text-[#787777] m-0 opacity-100">Revenue by Bundle</h3>
            
            {/* Legend - Moved to top */}
            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-[6px]">
                <div className={`w-2 h-2 rounded-full bg-[#1A5D4A]`} />
                <span className="h-[14px] font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">AI Bundles</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className={`w-2 h-2 rounded-full bg-[#409CFF]`} />
                <span className="h-[14px] font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">Admin Bundles</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className={`w-2 h-2 rounded-full bg-[#FF6961]`} />
                <span className="h-[14px] font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">Event Bundles</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <select className="h-[43.11px] font-lato font-medium text-[14px] leading-[14px] text-center text-[#1E1E1E] bg-[#FAFAFA] border border-[#EEEEEE] rounded-[8px] px-3 pr-10 py-2 cursor-pointer appearance-none">
              <option>Jan 2024 - Dec 2024</option>
              <option>Jan 2024 - Jun 2024</option>
              <option>Jul 2024 - Dec 2024</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1E1E1E]"
              size={16}
            />
          </div>
        </div>

        {/* Value and Badge */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[97px] h-[32px] font-mona-sans font-semibold font-weight:600 text-[24px] leading-[32px] text-[#1E1E1E] opacity-100">$240.8K</div>
          <div className="font-lato font-semibold text-[12px] leading-4 text-[#10B981] bg-[#D1FAE5] px-2 py-1 rounded">+14.05%</div>
        </div>
      </div>

      {/* Chart Area */}
      <div className={`relative height-[${chartHeight}px] `}>
        <svg width="100%" height={chartHeight} viewBox="0 0 600 230">
          {/* Y-axis labels */}
          <text x="30" y="5" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%" style={{lineHeight:'14px',textAlign:'right'}}>100K</text>
          <text x="30" y="60" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%" style={{lineHeight:'14px',textAlign:'right'}}>80K</text>
          <text x="30" y="115" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%" style={{lineHeight:'14px',textAlign:'right'}}>40K</text>
          <text x="30" y="170" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%" style={{lineHeight:'14px',textAlign:'right'}}>20K</text>
          <text x="30" y="210" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%" style={{lineHeight:'14px',textAlign:'right'}}>0K</text>

          {/* Stacked Bars */}
          {monthlyData.map((data, index) => {
            const x = 45 + index * barSpacing;
            const totalHeight = data.ai + data.admin + data.event;
            
            // Calculate heights (scale to fit chart)
            const scale = 2.0; // Scale factor to fit 100K in chart
            const aiHeight = data.ai * scale;
            const adminHeight = data.admin * scale;
            const eventHeight = data.event * scale;
            
            // Y positions (from bottom to top)
            const baseY = 200;
            const eventY = baseY - eventHeight;
            const adminY = eventY - adminHeight;
            const aiY = adminY - aiHeight;

            return (
              <g key={index}>
                {/* AI Bundles (Green) - Bottom */}
                <rect
                  x={x}
                  y={aiY}
                  width={barWidth}
                  height={aiHeight}
                  fill="#1A5D4A"
                  opacity={1}
                />
                {/* Admin Bundles (Blue) - Middle */}
                <rect
                  x={x}
                  y={adminY}
                  width={barWidth}
                  height={adminHeight}
                  fill="#409CFF"
                  opacity={1}
                />
                {/* Event Bundles (Red) - Top */}
                <rect
                  x={x}
                  y={eventY}
                  width={barWidth}
                  height={eventHeight}
                  fill="#FF6961"
                  opacity={1}
                />
                
                {/* Month label */}
                <text
                  x={x + barWidth / 2}
                  y="220"
                  fill="#9CA3AF"
                  fontSize="10"
                  fontFamily="Lato"
                  fontWeight="500"
                  textAnchor="middle"
                  letterSpacing="0%"
                >
                  {data.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RevenueByBundleChart;
