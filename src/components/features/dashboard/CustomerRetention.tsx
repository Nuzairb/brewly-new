"use client";

import React from "react";

export function CustomerRetention() {
  return (
    <div
      className="relative w-full min-h-[414px] bg-white rounded-[14px] border border-[#E5E7EB] p-0 opacity-100 box-border"
    >
      {/* Header */}
      <div
        className="absolute top-[27px] left-[20px] w-[435px] h-[28px] font-lato font-medium text-[18px] leading-[28px] tracking-[0%] text-[#1E1E1E] opacity-100"
      >
        Customer Retention
      </div>

      {/* Pentagon Chart */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[400px] h-[350px]">
        <svg width="400" height="350" viewBox="0 0 400 350">
          {/* Center point for pentagon */}
          <defs>
            <linearGradient id="pentagonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1BF8C4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1BF8C4" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Pentagon calculations: 5 points in a circle */}
          {/* Center: (200, 180) */}
          
          {/* Outer border 3 (outermost - lightest) */}
          <polygon
            points="200,70 305,135 270,260 130,260 95,135"
            fill="none"
            stroke="#E8FEF8"
            strokeWidth="1"
          />
          
          {/* Outer border 2 */}
          <polygon
            points="200,85 295,140 265,255 135,255 105,140"
            fill="none"
            stroke="#D0FDF2"
            strokeWidth="1"
          />
          
          {/* Outer border 1 (closest to data) */}
          <polygon
            points="200,100 285,145 260,250 140,250 115,145"
            fill="none"
            stroke="#B8FCEA"
            strokeWidth="1"
          />

          {/* Grid lines from center to each vertex */}
          <line x1="200" y1="180" x2="200" y2="70" stroke="#E5E7EB" strokeWidth="0.5" />
          <line x1="200" y1="180" x2="305" y2="135" stroke="#E5E7EB" strokeWidth="0.5" />
          <line x1="200" y1="180" x2="270" y2="260" stroke="#E5E7EB" strokeWidth="0.5" />
          <line x1="200" y1="180" x2="130" y2="260" stroke="#E5E7EB" strokeWidth="0.5" />
          <line x1="200" y1="180" x2="95" y2="135" stroke="#E5E7EB" strokeWidth="0.5" />

          {/* Data pentagon (filled with gradient) */}
          <polygon
            points="200,115 275,150 255,245 145,245 125,150"
            fill="url(#pentagonGradient)"
            stroke="#1BF8C4"
            strokeWidth="2.5"
          />

          {/* Inner border 2 (inside data pentagon) */}
          <polygon
            points="200,140 255,165 240,225 160,225 145,165"
            fill="none"
            stroke="#70FBDA"
            strokeWidth="1"
          />

          {/* Inner border 1 (innermost) */}
          <polygon
            points="200,165 235,180 225,205 175,205 165,180"
            fill="none"
            stroke="#A0FDEB"
            strokeWidth="1"
          />

          {/* Data points (circles) */}
          <circle cx="200" cy="115" r="4" fill="#1BF8C4" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="275" cy="150" r="4" fill="#1BF8C4" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="255" cy="245" r="4" fill="#1BF8C4" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="145" cy="245" r="4" fill="#1BF8C4" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="125" cy="150" r="4" fill="#1BF8C4" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Labels for each axis */}
          <text x="200" y="50" textAnchor="middle" fontSize="14" fontFamily="DM Sans" fontWeight="500" fill="#1E1E1E">
            Repeat Customers %
          </text>
          <text x="320" y="130" textAnchor="start" fontSize="14" fontFamily="DM Sans" fontWeight="500" fill="#1E1E1E">
            Avg Visit
          </text>
          <text x="320" y="145" textAnchor="start" fontSize="14" fontFamily="DM Sans" fontWeight="500" fill="#1E1E1E">
            Frequency
          </text>
          <text x="280" y="290" textAnchor="middle" fontSize="14" fontFamily="DM Sans" fontWeight="500" fill="#1E1E1E">
            AOV Returning Users
          </text>
          <text x="120" y="290" textAnchor="middle" fontSize="14" fontFamily="DM Sans" fontWeight="500" fill="#1E1E1E">
            Bundle Adoption
          </text>
          <text x="100" y="140" textAnchor="end" fontSize="14" fontFamily="DM Sans" fontWeight="500" fill="#1E1E1E">
            Loyalty Growth
          </text>

          {/* Scale numbers on top axis */}
          <text x="200" y="65" textAnchor="middle" fontSize="12" fontFamily="DM Sans" fontWeight="400" fill="#9CA3AF">
            100
          </text>
          <text x="200" y="78" textAnchor="middle" fontSize="12" fontFamily="DM Sans" fontWeight="400" fill="#9CA3AF">
            80
          </text>
          <text x="200" y="105" textAnchor="middle" fontSize="12" fontFamily="DM Sans" fontWeight="400" fill="#9CA3AF">
            60
          </text>
          <text x="200" y="125" textAnchor="middle" fontSize="12" fontFamily="DM Sans" fontWeight="400" fill="#9CA3AF">
            40
          </text>
          <text x="200" y="155" textAnchor="middle" fontSize="12" fontFamily="DM Sans" fontWeight="400" fill="#9CA3AF">
            20
          </text>
        </svg>
      </div>
    </div>
  );
}
