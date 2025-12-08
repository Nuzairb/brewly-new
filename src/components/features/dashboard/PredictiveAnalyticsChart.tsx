'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const PredictiveAnalyticsChart: React.FC = () => {
  const data = [
    { category: 'Oat Milk Upgrades', percentage: 30, color: '#06B6D4' },
    { category: 'Smart Combos (Bundles)', percentage: 50, color: '#EF4444' },
    { category: 'Custom AI Promos', percentage: 20, color: '#06B6D4' },
  ];

  const totalValue = 43640;

  // Calculate stroke dasharray for circular arcs
  // Circle circumference = 2 * PI * r = 2 * 3.14159 * 73 = 458.67
  const radius = 73;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="w-full min-h-[452.72px] bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col opacity-100 box-border"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="w-[163.8px] h-[18px] font-Work Sans font-medium text-[16px] leading-[18px] text-[#1E1E1E] m-0 opacity-100">Predictive Analytics</h3>
        <button className="w-[91px] h-[44px] gap-[6px] font-lato font-medium text-[14px] leading-[14px] text-center text-[#1E1E1E] bg-[#FAFAFA] border border-[#EEEEEE] rounded-[8px] p-2 cursor-pointer flex items-center justify-center opacity-100">Export</button>
      </div>

      {/* Circular Gauge Container */}
      <div className="w-[204.35px] h-[204.35px] mx-auto mt-[30px] flex items-center justify-center opacity-100 rounded-[0.67px]">
        <svg width="204.35" height="204.35" viewBox="0 0 204 204">
          <defs>
            {/* Gradient for cyan sections */}
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            {/* Gradient for red section */}
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="102"
            cy="102"
            r="73"
            fill="none"
            stroke="#F3F4F6"
            strokeWidth="18"
          />

          {/* Cyan arc 1 (Oat Milk Upgrades - 30%) - Top Right */}
          <circle
            cx="102"
            cy="102"
            r="73"
            fill="none"
            stroke="url(#cyanGradient)"
            strokeWidth="18"
            strokeDasharray={`${circumference * 0.3} ${circumference}`}
            strokeDashoffset="0"
            transform="rotate(-90 102 102)"
            strokeLinecap="round"
          />

          {/* Red arc (Smart Combos - 50%) - Left side */}
          <circle
            cx="102"
            cy="102"
            r="73"
            fill="none"
            stroke="url(#redGradient)"
            strokeWidth="18"
            strokeDasharray={`${circumference * 0.5} ${circumference}`}
            strokeDashoffset={`-${circumference * 0.3}`}
            transform="rotate(-90 102 102)"
            strokeLinecap="round"
          />

          {/* Cyan arc 2 (Custom AI Promos - 20%) - Bottom */}
          <circle
            cx="102"
            cy="102"
            r="73"
            fill="none"
            stroke="url(#cyanGradient)"
            strokeWidth="18"
            strokeDasharray={`${circumference * 0.2} ${circumference}`}
            strokeDashoffset={`-${circumference * 0.8}`}
            transform="rotate(-90 102 102)"
            strokeLinecap="round"
          />

          {/* Center text */}
          <text
            x="102"
            y="106"
            textAnchor="middle"
            fontFamily="Lato"
            fontSize="12"
            fontWeight="500"
            style={{lineHeight:'14px',letterSpacing:'0%',textAlign:'right'}}
            fill="#1E1E1E"
          >
            +AED {totalValue.toLocaleString()}
          </text>
        </svg>
      </div>

      {/* Legend at bottom */}
      <div className="w-[281.42px] h-[107px] flex flex-col gap-[14px] mt-6 opacity-100">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
            
              {/* Dynamic Color Swatch */}
              <div className={`w-2 h-2 rounded-full bg-[${item.color}]`} />

              {/* Category Text */}
              <span className="w-[125px] h-[16px] font-normal text-[14px] leading-[16px] text-[#787777] whitespace-nowrap overflow-hidden text-ellipsis">
                {item.category}
              </span>
            </div>
            <span className="w-[30px] h-[14px] font-work-sans text-[14px] font-medium leading-[14px] text-right text-[#1E1E1E] opacity-100">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveAnalyticsChart;
