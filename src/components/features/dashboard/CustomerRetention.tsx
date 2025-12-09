"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export function CustomerRetention() {
  const data = [
    { subject: "Repeat Customers %", value: 85, fullMark: 100 },
    { subject: "Avg Visit Frequency", value: 75, fullMark: 100 },
    { subject: "AOV Returning Users", value: 65, fullMark: 100 },
    { subject: "Bundle Adoption", value: 65, fullMark: 100 },
    { subject: "Loyalty Growth", value: 75, fullMark: 100 },
  ];

  return (
    <div className="relative w-full h-[414px] bg-white rounded-[14px] border border-[#F6F6F6] p-0 box-border overflow-clip">
      {/* Header */}
      <div className="absolute top-[24px] left-[24px] font-lato font-medium text-[18px] leading-[28px] text-[#1E1E1E]">
        Customer Retention
      </div>

      {/* Radar Chart */}
      <div className="absolute top-[70px] left-0 right-0 bottom-0 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 40, right: 100, bottom: 40, left: 100 }}>
            <PolarGrid stroke="rgba(60, 216, 86, 0.2)" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#1E1E1E",
                fontSize: 16,
                fontFamily: "var(--font-lato)",
                fontWeight: 500,
              }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{
                fill: "#787777",
                fontSize: 12,
                fontFamily: "var(--font-lato)",
                fontWeight: 500,
              }}
              tickCount={6}
              axisLine={false}
            />
            <Radar
              name="Retention"
              dataKey="value"
              stroke="#3CD856"
              fill="#3CD856"
              fillOpacity={0.5}
              strokeWidth={2}
              dot={{
                fill: "#3CD856",
                stroke: "#ffffff",
                strokeWidth: 2,
                r: 5,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
