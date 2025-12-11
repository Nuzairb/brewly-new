'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface MonthData {
  month: string;
  ai: number;
  admin: number;
  event: number;
}

interface TooltipData {
  month: string;
  ai: number;
  admin: number;
  event: number;
  total: number;
  x: number;
  y: number;
}

const RevenueByBundleChart: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([]);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Monthly data for stacked bar chart
  const monthlyData: MonthData[] = [
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

  const maxValue = 100;
  const chartHeight = 320;
  const [svgWidth, setSvgWidth] = useState<number>(600);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  // spacing and bar width will be calculated based on available svg width
  const leftMargin = 45;
  const rightMargin = 45;
  const targetValue = 240.8;

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Measure container width for responsive svg sizing
  useEffect(() => {
    const measure = () => {
      const w = wrapperRef.current?.clientWidth || 600;
      setSvgWidth(Math.max(300, Math.round(w)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Animate bars progressively
  useEffect(() => {
    if (!isVisible) return;

    const delays = monthlyData.map((_, index) => index * 80);
    const timers: NodeJS.Timeout[] = [];

    delays.forEach((delay, index) => {
      const timer = setTimeout(() => {
        setAnimatedHeights(prev => [...prev, index]);
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [isVisible]);

  // Animate counter
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        setAnimatedValue(targetValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  const handleBarHover = (index: number, data: MonthData, x: number) => {
    setHoveredBar(index);
    const total = data.ai + data.admin + data.event;
    setTooltip({
      month: data.month,
      ai: data.ai,
      admin: data.admin,
      event: data.event,
      total,
      x: x,
      y: 50
    });
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
    setTooltip(null);
  };

  return (
    <div
      className={`w-full min-h-[451.73px] bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col box-border transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="mb-5">
        {/* Title and Date Selector */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-5 items-center">
            <h3 className="w-[160.44px] h-[13.72px] font-lato font-normal text-[14px] leading-[14px] text-[#787777] m-0 opacity-100">
              Revenue by Bundle
            </h3>
            
            {/* Legend */}
            <div className="flex gap-5 items-center">
              <div className={`flex items-center gap-[6px] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#1A5D4A]" />
                <span className="h-[14px] font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
                  AI Bundles
                </span>
              </div>
              <div className={`flex items-center gap-[6px] transition-all duration-500 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#409CFF]" />
                <span className="h-[14px] font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
                  Admin Bundles
                </span>
              </div>
              <div className={`flex items-center gap-[6px] transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#FF6961]" />
                <span className="h-[14px] font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
                  Event Bundles
                </span>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-500 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
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
          <div className={`w-[97px] h-[32px] font-mona-sans font-semibold text-[24px] leading-[32px] text-[#1E1E1E] transition-all duration-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            ${animatedValue.toFixed(1)}K
          </div>
          <div className={`font-lato font-semibold text-[12px] leading-4 text-[#10B981] bg-[#D1FAE5] px-2 py-1 rounded transition-all duration-500 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            +14.05%
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div ref={wrapperRef} className="relative">
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${svgWidth} ${chartHeight}`}> 
          {/* Y-axis labels */}
          {[
            { y: 5, label: '100K' },
            { y: 60, label: '80K' },
            { y: 115, label: '40K' },
            { y: 170, label: '20K' },
            { y: 210, label: '0K' }
          ].map((item, index) => (
            <text
              key={index}
              x="30"
              y={item.y}
              fill="#9CA3AF"
              fontSize="10"
              fontFamily="Lato"
              fontWeight="500"
              textAnchor="end"
              className="transition-all duration-500"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${index * 50}ms`
              }}
            >
              {item.label}
            </text>
          ))}

          {/* Stacked Bars */}
          {monthlyData.map((data, index) => {
            const availableWidth = Math.max(300, svgWidth) - leftMargin - rightMargin;
            const barSpacing = availableWidth / monthlyData.length;
            const barWidth = Math.max(8, Math.min(40, barSpacing * 0.25));
            const x = leftMargin + index * barSpacing + (barSpacing - barWidth) / 2;
            const isBarVisible = animatedHeights.includes(index);
            const isHovered = hoveredBar === index;
            
            const scale = 2.0;
            const aiHeight = data.ai * scale;
            const adminHeight = data.admin * scale;
            const eventHeight = data.event * scale;
            
            const baseY = 200;
            const eventY = baseY - eventHeight;
            const adminY = eventY - adminHeight;
            const aiY = adminY - aiHeight;

            return (
              <g key={index}>
                {/* Invisible hover area */}
                <rect
                  x={x - 5}
                  y={0}
                  width={barWidth + 10}
                  height={200}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => handleBarHover(index, data, x + barWidth / 2)}
                  onMouseLeave={handleBarLeave}
                />

                {/* AI Bundles (Green) - Bottom */}
                <rect
                  x={x}
                  y={isBarVisible ? aiY : baseY}
                  width={barWidth}
                  height={isBarVisible ? aiHeight : 0}
                  fill="#1A5D4A"
                  opacity={isBarVisible ? (isHovered ? 0.8 : 1) : 0}
                  className="transition-all duration-300 ease-out pointer-events-none"
                />
                {/* Admin Bundles (Blue) - Middle */}
                <rect
                  x={x}
                  y={isBarVisible ? adminY : baseY}
                  width={barWidth}
                  height={isBarVisible ? adminHeight : 0}
                  fill="#409CFF"
                  opacity={isBarVisible ? (isHovered ? 0.8 : 1) : 0}
                  className="transition-all duration-300 ease-out pointer-events-none"
                  style={{ transitionDelay: '100ms' }}
                />
                {/* Event Bundles (Red) - Top */}
                <rect
                  x={x}
                  y={isBarVisible ? eventY : baseY}
                  width={barWidth}
                  height={isBarVisible ? eventHeight : 0}
                  fill="#FF6961"
                  opacity={isBarVisible ? (isHovered ? 0.8 : 1) : 0}
                  className="transition-all duration-300 ease-out pointer-events-none"
                  style={{ transitionDelay: '200ms' }}
                />
                
                {/* Month label */}
                <text
                  x={x + barWidth / 2}
                  y="220"
                  fill={isHovered ? "#1E1E1E" : "#9CA3AF"}
                  fontSize="10"
                  fontFamily="Lato"
                  fontWeight={isHovered ? "600" : "500"}
                  textAnchor="middle"
                  className="transition-all duration-300 pointer-events-none"
                  style={{ 
                    opacity: isBarVisible ? 1 : 0,
                    transitionDelay: '300ms'
                  }}
                >
                  {data.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div 
            className="absolute bg-white border border-[#E5E7EB] rounded-lg shadow-lg p-3 pointer-events-none z-50 transition-all duration-200"
            style={{
              left: `${(tooltip.x / 600) * 100}%`,
              top: `${tooltip.y}px`,
              transform: 'translate(-50%, -100%)',
              marginTop: '-10px'
            }}
          >
            <div className="flex flex-col gap-2 min-w-[140px]">
              <div className="font-lato font-semibold text-[12px] text-[#1E1E1E] border-b border-[#E5E7EB] pb-2">
                {tooltip.month} 2024
              </div>
              
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1A5D4A]" />
                  <span className="font-lato text-[10px] text-[#787777]">AI Bundles</span>
                </div>
                <span className="font-lato font-semibold text-[11px] text-[#1E1E1E]">${tooltip.ai}K</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#409CFF]" />
                  <span className="font-lato text-[10px] text-[#787777]">Admin</span>
                </div>
                <span className="font-lato font-semibold text-[11px] text-[#1E1E1E]">${tooltip.admin}K</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF6961]" />
                  <span className="font-lato text-[10px] text-[#787777]">Events</span>
                </div>
                <span className="font-lato font-semibold text-[11px] text-[#1E1E1E]">${tooltip.event}K</span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E5E7EB]">
                <span className="font-lato font-semibold text-[11px] text-[#1E1E1E]">Total</span>
                <span className="font-lato font-bold text-[12px] text-[#1A5D4A]">${tooltip.total}K</span>
              </div>
            </div>

            {/* Tooltip arrow */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueByBundleChart;