'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';

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
  barCenterX: number;
  barTopY: number;
}

const RevenueByBundleChart: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([]);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [svgWidth, setSvgWidth] = useState<number>(600);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Monthly data for stacked bar chart
  const monthlyData: MonthData[] = [
    { month: 'Jan', ai: 8, admin: 6, event: 3 },
    { month: 'Feb', ai: 12, admin: 9, event: 6 },
    { month: 'Mar', ai: 15, admin: 12, event: 8 },
    { month: 'Apr', ai: 14, admin: 9, event: 5 },
    { month: 'May', ai: 9, admin: 6, event: 4 },
    { month: 'Jun', ai: 12, admin: 8, event: 6 },
    { month: 'Jul', ai: 6, admin: 4, event: 3 },
    { month: 'Aug', ai: 16, admin: 12, event: 9 },
    { month: 'Sep', ai: 10, admin: 8, event: 6 },
    { month: 'Oct', ai: 14, admin: 9, event: 7 },
    { month: 'Nov', ai: 11, admin: 8, event: 5 },
    { month: 'Dec', ai: 15, admin: 12, event: 8 },
  ];

  const maxValue = 45;
  const chartHeight = 302;
  const leftMargin = 45;
  const rightMargin = 45;
  const targetValue = 240.8;

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Responsive width calculation
  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.clientWidth;
        // Minimum width ensure karein aur reasonable max width
        const calculatedWidth = Math.max(400, Math.min(1200, containerWidth));
        setSvgWidth(calculatedWidth);
      }
    };

    updateDimensions();
    
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    window.addEventListener('resize', updateDimensions);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
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

  const handleBarHover = (index: number, data: MonthData, event: React.MouseEvent<SVGRectElement>) => {
    setHoveredBar(index);
    
    // Calculate exact position relative to window
    const barRect = event.currentTarget.getBoundingClientRect();
    const total = data.ai + data.admin + data.event;
    
    // Bar center position in window coordinates
    const barCenterX = barRect.left + (barRect.width / 2);
    const barTopY = barRect.top;
    
    // Calculate Y position (bar ke upar)
    const scale = 4.0;
    const barHeight = (data.ai + data.admin + data.event) * scale;
    
    // Relative position for internal calculations
    const relativeY = (200 - barHeight) - 10;
    
    setTooltip({
      month: data.month,
      ai: data.ai,
      admin: data.admin,
      event: data.event,
      total,
      x: barCenterX,
      y: barTopY,
      barCenterX,
      barTopY
    });
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
    setTooltip(null);
  };

  // Calculate responsive bar dimensions
  const calculateBarDimensions = () => {
    const availableWidth = svgWidth - leftMargin - rightMargin;
    const barSpacing = availableWidth / monthlyData.length;
    const barWidth = Math.max(8, Math.min(35, barSpacing * 0.3));
    return { barSpacing, barWidth };
  };

  const { barSpacing, barWidth } = calculateBarDimensions();

  // Tooltip positioning logic
  const getTooltipPosition = () => {
    if (!tooltip) return { left: 0, top: 0, placement: 'top' };
    
    const tooltipWidth = 160; // Estimated tooltip width
    const tooltipHeight = 180; // Estimated tooltip height
    const offset = 10; // Offset from bar
    
    // Calculate position for tooltip above the bar
    let left = tooltip.barCenterX;
    let top = tooltip.barTopY - offset;
    let placement: 'top' | 'bottom' = 'top';
    
    // Check if tooltip would go above viewport
    if (top < tooltipHeight) {
      // Show tooltip below the bar instead
      top = tooltip.barTopY + 20 + offset; // Add some offset for the bar height
      placement = 'bottom';
    }
    
    // Adjust horizontal position to stay within viewport
    left = Math.max(
      tooltipWidth / 2,
      Math.min(window.innerWidth - tooltipWidth / 2, left)
    );
    
    // Adjust vertical position to stay within viewport
    if (placement === 'top') {
      top = Math.max(tooltipHeight + 10, top);
    } else {
      top = Math.min(window.innerHeight - tooltipHeight - 10, top);
    }
    
    return { left, top, placement };
  };

  const tooltipPosition = getTooltipPosition();

  return (
    <div
      className={`w-full min-h-[451.73px] bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col box-border transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header - Responsive */}
      <div className="mb-5">
        {/* Title and Date Selector - Responsive flex layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
            <h3 className="font-lato font-normal text-[14px] leading-[14px] text-[#787777] m-0 opacity-100 whitespace-nowrap">
              Revenue by Bundle
            </h3>
            
            {/* Legend - Responsive layout */}
            <div className="flex flex-wrap gap-3 sm:gap-5 items-center">
              <div className={`flex items-center gap-[6px] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#1A5D4A]" />
                <span className="font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
                  AI Bundles
                </span>
              </div>
              <div className={`flex items-center gap-[6px] transition-all duration-500 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#409CFF]" />
                <span className="font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
                  Admin Bundles
                </span>
              </div>
              <div className={`flex items-center gap-[6px] transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#FF6961]" />
                <span className="font-lato text-[10px] font-normal leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
                  Event Bundles
                </span>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-500 delay-300 w-full lg:w-auto ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <select className="w-full lg:w-auto h-[43.11px] font-lato font-medium text-[14px] leading-[14px] text-left lg:text-center text-[#1E1E1E] bg-[#FAFAFA] border border-[#EEEEEE] rounded-[8px] px-3 pr-10 py-2 cursor-pointer appearance-none">
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
          <div className={`font-mona-sans font-semibold text-[20px] sm:text-[24px] leading-[32px] text-[#1E1E1E] transition-all duration-500 ${
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

      {/* Chart Area - Fully responsive */}
      <div ref={chartContainerRef} className="relative w-full overflow-hidden mt-16">
        <svg 
          ref={svgRef}
          width="100%" 
          height={chartHeight} 
          viewBox={`0 0 ${svgWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
        > 
          {/* Y-axis labels */}
          {[
            { y: 5, label: '45K' },
            { y: 75, label: '30K' },
            { y: 145, label: '15K' },
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

          {/* Horizontal grid lines */}
          {[5, 75, 145, 210].map((y, index) => (
            <line
              key={`grid-${index}`}
              x1={leftMargin}
              y1={y}
              x2={svgWidth - rightMargin}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              opacity={isVisible ? 0.5 : 0}
              className="transition-all duration-500"
              style={{ transitionDelay: `${index * 50}ms` }}
            />
          ))}

          {/* Stacked Bars */}
          {monthlyData.map((data, index) => {
            const x = leftMargin + index * barSpacing + (barSpacing - barWidth) / 2;
            const isBarVisible = animatedHeights.includes(index);
            const isHovered = hoveredBar === index;
            
            const scale = 4.0;
            const aiHeight = data.ai * scale;
            const adminHeight = data.admin * scale;
            const eventHeight = data.event * scale;
            
            const baseY = 200;
            const eventY = baseY - eventHeight;
            const adminY = eventY - adminHeight;
            const aiY = adminY - aiHeight;

            return (
              <g key={index}>
                {/* Invisible hover area - bar ke exact position pe */}
                <rect
                  x={x}
                  y={0}
                  width={barWidth}
                  height={200}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={(e) => handleBarHover(index, data, e)}
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
      </div>

      {/* Portal Tooltip - Rendered directly to body */}
      {tooltip && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed bg-white border border-[#E5E7EB] rounded-lg shadow-lg p-3 pointer-events-none z-[9999] transition-all duration-200"
          style={{
            left: `${tooltipPosition.left}px`,
            top: `${tooltipPosition.top}px`,
            transform: 'translate(-50%, -100%)',
            minWidth: '140px'
          }}
        >
          <div className="flex flex-col gap-2">
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
        </div>,
        document.body
      )}
    </div>
  );
};

export default RevenueByBundleChart;