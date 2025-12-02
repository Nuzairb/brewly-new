'use client';

import React from 'react';

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
      style={{
        width: "100%",
        height: "auto",
        minHeight: "451.73px",
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        opacity: 1,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        {/* Title and Date Selector */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <h3
              style={{
                width: "160.43983459472656px",
                height: "13.718403816223145px",
                fontFamily: "Lato",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "14px",
                letterSpacing: "0%",
                color: "#787777",
                margin: 0,
                opacity: 1,
              }}
            >
              Revenue by Bundle
            </h3>
            
            {/* Legend - Moved to top */}
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C093" }} />
                <span style={{ 
                  width: "auto",
                  height: "14px",
                  fontFamily: "Lato", 
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "14px",
                  letterSpacing: "0%",
                  color: "#787777",
                  opacity: 1,
                  whiteSpace: "nowrap",
                }}>
                  AI Bundles
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#409CFF" }} />
                <span style={{ 
                  width: "auto",
                  height: "14px",
                  fontFamily: "Lato", 
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "14px",
                  letterSpacing: "0%",
                  color: "#787777",
                  opacity: 1,
                  whiteSpace: "nowrap",
                }}>
                  Admin Bundles
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6961" }} />
                <span style={{ 
                  width: "auto",
                  height: "14px",
                  fontFamily: "Lato", 
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "14px",
                  letterSpacing: "0%",
                  color: "#787777",
                  opacity: 1,
                  whiteSpace: "nowrap",
                }}>
                  Event Bundles
                </span>
              </div>
            </div>
          </div>
          
          <div
            style={{
              width: "166.58062744140625px",
              height: "43.11498260498047px",
              gap: "6px",
              fontFamily: "Lato",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "14px",
              letterSpacing: "0%",
              textAlign: "center" as const,
              color: "#1E1E1E",
              background: "#FAFAFA",
              border: "1px solid #EEEEEE",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 1,
            }}
          >
            Jan 2024 - Dec 2024
            <span>▼</span>
          </div>
        </div>

        {/* Value and Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: "97px",
              height: "32px",
              fontFamily: "'Mona-Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "0px",
              color: "#1E1E1E",
              opacity: 1,
            }}
          >
            $240.8K
          </div>
          <div
            style={{
              fontFamily: "Lato",
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "16px",
              color: "#10B981",
              background: "#D1FAE5",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            +14.05%
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div style={{ position: "relative", height: chartHeight }}>
        <svg width="100%" height={chartHeight} viewBox="0 0 600 230">
          {/* Y-axis labels */}
          <text x="30" y="5" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%">100K</text>
          <text x="30" y="60" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%">80K</text>
          <text x="30" y="115" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%">40K</text>
          <text x="30" y="170" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%">20K</text>
          <text x="30" y="210" fill="#9CA3AF" fontSize="10" fontFamily="Lato" fontWeight="500" textAnchor="end" letterSpacing="0%">0K</text>

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
                  fill="#00C093"
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
