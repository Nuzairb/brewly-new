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
      style={{
        width: "100%",
        height: "auto",
        minHeight: "452.72px",
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3
          style={{
            width: "163.78585815429688px",
            height: "18px",
            fontFamily: "Work Sans",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "18px",
            letterSpacing: "0%",
            color: "#1E1E1E",
            margin: 0,
            opacity: 1,
          }}
        >
          Predictive Analytics
        </h3>
        <button
          style={{
            width: "91px",
            height: "44px",
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
          Export
        </button>
      </div>

      {/* Circular Gauge Container */}
      <div style={{ 
        width: "204.347900390625px",
        height: "204.347900390625px",
        margin: "auto",
        marginTop: "30px",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        opacity: 1,
        borderRadius: "0.67px",
      }}>
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
            fontSize="20"
            fontWeight="700"
            fill="#1E1E1E"
          >
            +AED {totalValue.toLocaleString()}
          </text>
        </svg>
      </div>

      {/* Legend at bottom */}
      <div style={{ 
        width: "281.41796875px",
        height: "107.00004577636719px",
        display: "flex", 
        flexDirection: "column", 
        gap: "14px", 
        marginTop: 24,
        opacity: 1,
      }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
              <span style={{ 
                width: "125px",
                height: "16px",
                fontFamily: "Work Sans", 
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "0px",
                color: "#787777",
                opacity: 1,
                whiteSpace: "nowrap" as const,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {item.category}
              </span>
            </div>
            <span style={{ 
              width: "30px",
              height: "14px",
              fontFamily: "Work Sans", 
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "14px",
              letterSpacing: "0%",
              textAlign: "right" as const,
              color: "#1E1E1E",
              opacity: 1,
            }}>
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveAnalyticsChart;
