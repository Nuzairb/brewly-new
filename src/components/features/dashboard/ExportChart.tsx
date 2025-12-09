"use client";

import React from "react";

export function ExportChart() {
  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E4E4E7] p-[20px] px-[24px]">
      {/* Header */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <div className="font-lato font-semibold text-[16px] leading-6 text-[#1E1E1E] mb-1">
            Export
          </div>
          <div className="font-lato font-bold text-[24px] leading-8 text-[#1E1E1E]">
            $240.6K
          </div>
        </div>
        <div className="text-[12px] text-[#787777]">Jan 2024 - Dec 2024</div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-[12px]">
        <div className="flex items-center gap-[6px]">
          <div className="w-[12px] h-[12px] bg-[#06B6D4] rounded-[2px]"></div>
          <span className="text-[#787777]">Bundles</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <div className="w-[12px] h-[12px] bg-[#3B82F6] rounded-[2px]"></div>
          <span className="text-[#787777]">Manual Bundles</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <div className="w-[12px] h-[12px] bg-[#EF4444] rounded-[2px]"></div>
          <span className="text-[#787777]">Goods Bundles</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-[200px] flex items-end gap-2 pb-[10px]">
        {[
          { heights: [50, 80, 40] },
          { heights: [70, 100, 60] },
          { heights: [90, 120, 80] },
          { heights: [60, 90, 50] },
          { heights: [80, 110, 70] },
          { heights: [100, 140, 90] },
          { heights: [70, 100, 60] },
          { heights: [90, 130, 80] },
          { heights: [60, 95, 55] },
          { heights: [85, 115, 75] },
          { heights: [95, 125, 85] },
          { heights: [75, 105, 65] },
        ].map((bar, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center gap-[2px] h-full justify-end"
          >
            <div
              
              className={`w-full bg-[#EF4444] rounded-t-[4px] height-[${bar.heights[2]}px]`} 
            />
            <div
              
              className={`w-full bg-[#3B82F6] height-[${bar.heights[1]}px]`} 
            />
            <div
             
              className={`w-full bg-[#06B6D4] rounded-b-[4px] height-[${bar.heights[0]}px]`} 
            />
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-[11px] text-[#787777] mt-2">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
          (month) => (
            <span key={month}>{month}</span>
          )
        )}
      </div>
    </div>
  );
}
