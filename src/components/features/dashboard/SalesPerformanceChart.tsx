"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function SalesPerformanceChart() {
  return (
    <Card className="w-full bg-white border border-[#FFFFFF] rounded-[16px] p-[20px_24px]">
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontFamily: "Lato",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "24px",
            color: "#1E1E1E",
            marginBottom: 4,
          }}
        >
          Sales & Gross Performance
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: 28,
              lineHeight: "36px",
              color: "#1E1E1E",
            }}
          >
            AED 240.8K
          </span>
          <span
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "#10B981",
            }}
          >
            +8%
          </span>
        </div>
      </div>

      {/* Chart Area */}
      <div
        style={{
          width: "100%",
          height: 220,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
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
      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: "#787777" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, background: "#3B82F6", borderRadius: 2 }}></div>
          <span>Revenue</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, background: "#EF4444", borderRadius: 2 }}></div>
          <span>Expenses</span>
        </div>
      </div>
    </Card>
  );
}
