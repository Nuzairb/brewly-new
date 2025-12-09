'use client';

import React from 'react';
import { Download } from 'lucide-react';

const PredictiveAnalyticsChart: React.FC = () => {
  const data = [
    { name: 'Oat Milk Upgrades', value: 30, color: '#1A5D4A' },
    { name: 'Smart Combos (Bundles)', value: 50, color: '#FF6961' },
    { name: 'Custom AI Promos', value: 20, color: '#6AC4DC' },
  ];

  const totalValue = 43640;

  return (
    <div className="w-full h-[453px] bg-white border border-transparent rounded-[12px] p-[21px] flex flex-col box-border">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-work-sans font-medium text-[16px] leading-[18px] text-[#1E1E1E]">
          Predictive Analytics
        </h3>
        <button className="h-[44px] px-[8px] gap-[6px] font-lato font-medium text-[14px] leading-[14px] text-center text-[#1E1E1E] bg-[#FAFAFA] border border-[#EEEEEE] rounded-[8px] cursor-pointer flex items-center justify-center">
          Export
          <Download className="w-[10px] h-[10px]" />
        </button>
      </div>

      {/* Circular Arc Chart */}
      <div className="w-[204px] h-[204px] mx-auto relative">
        <svg width="204.35" height="204.35" viewBox="0 0 204.35 204.35" className="block">
          <style>
            {`
              @keyframes drawArc1 {
                from {
                  stroke-dashoffset: ${2 * Math.PI * 99.109};
                }
                to {
                  stroke-dashoffset: ${2 * Math.PI * 99.109 * -0.25};
                }
              }
              @keyframes drawArc2 {
                from {
                  stroke-dashoffset: ${2 * Math.PI * 88.909};
                }
                to {
                  stroke-dashoffset: ${2 * Math.PI * 88.909 * -0.16};
                }
              }
              @keyframes drawArc3 {
                from {
                  stroke-dashoffset: ${2 * Math.PI * 77.332};
                }
                to {
                  stroke-dashoffset: ${2 * Math.PI * 77.332 * -0.25};
                }
              }
              @keyframes fadeInScale {
                from {
                  opacity: 0;
                  transform: scale(0.9);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
              .arc-1 {
                animation: drawArc1 1.2s ease-out forwards;
              }
              .arc-2 {
                animation: drawArc2 1.2s ease-out 0.2s forwards;
              }
              .arc-3 {
                animation: drawArc3 1.2s ease-out 0.4s forwards;
              }
            `}
          </style>

          {/* Outer ring - Teal/Green (#1A5D4A) - 30% */}
          <circle
            className="arc-1"
            cx="102.174"
            cy="102.174"
            r="99.109"
            fill="none"
            stroke="#1A5D4A"
            strokeWidth="6.13"
            strokeDasharray={`${2 * Math.PI * 99.109 * 0.7} ${2 * Math.PI * 99.109}`}
            strokeDashoffset={`${2 * Math.PI * 99.109}`}
            strokeLinecap="round"
            transform="rotate(-90 102.174 102.174)"
          />

          {/* Middle ring - Red/Coral (#FF6961) - 50% */}
          <circle
            className="arc-2"
            cx="102.174"
            cy="102.174"
            r="88.909"
            fill="none"
            stroke="#FF6961"
            strokeWidth="6.44"
            strokeDasharray={`${2 * Math.PI * 88.909 * 0.75} ${2 * Math.PI * 88.909}`}
            strokeDashoffset={`${2 * Math.PI * 88.909}`}
            strokeLinecap="round"
            transform="rotate(-90 102.174 102.174)"
          />

          {/* Inner ring - Light Blue (#6AC4DC) - 20% */}
          <circle
            className="arc-3"
            cx="102.174"
            cy="102.174"
            r="77.332"
            fill="none"
            stroke="#6AC4DC"
            strokeWidth="6.44"
            strokeDasharray={`${2 * Math.PI * 77.332 * 0.5} ${2 * Math.PI * 77.332}`}
            strokeDashoffset={`${2 * Math.PI * 77.332}`}
            strokeLinecap="round"
            transform="rotate(-90 102.174 102.174)"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center animate-[fadeInScale_0.8s_ease-out_0.6s_forwards] opacity-0">
          <p className="font-work-sans font-semibold text-[20px] leading-[32px] text-center text-[#1E1E1E]">
            +AED {totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-[14px] mt-[29px] mx-[19px]">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="flex justify-between items-center opacity-0 animate-[fadeInScale_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${0.8 + index * 0.15}s` }}
            >
              <div className="flex items-center gap-[8px]">
                <div
                  className="w-[7px] h-[7px] rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-work-sans font-normal text-[14px] leading-[16px] text-[#787777]">
                  {item.name}
                </span>
              </div>
              <span className="font-work-sans font-medium text-[14px] leading-[14px] text-right text-[#1E1E1E]">
                {item.value}%
              </span>
            </div>
            {index < data.length - 1 && (
              <div className="w-full h-[0.6px] bg-[#E5E7EB]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PredictiveAnalyticsChart;
