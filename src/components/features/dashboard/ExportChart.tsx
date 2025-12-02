"use client";

import React from "react";

export function ExportChart() {
  return (
    <div
      style={{
        width: "100%",
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid #E4E4E7",
        padding: "20px 24px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: "24px",
              color: "#1E1E1E",
              marginBottom: 4,
            }}
          >
            Export
          </div>
          <div
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: "32px",
              color: "#1E1E1E",
            }}
          >
            $240.6K
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#787777" }}>Jan 2024 - Dec 2024</div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, background: "#06B6D4", borderRadius: 2 }}></div>
          <span style={{ color: "#787777" }}>Bundles</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, background: "#3B82F6", borderRadius: 2 }}></div>
          <span style={{ color: "#787777" }}>Manual Bundles</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, background: "#EF4444", borderRadius: 2 }}></div>
          <span style={{ color: "#787777" }}>Goods Bundles</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        style={{
          width: "100%",
          height: 200,
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          paddingBottom: 10,
        }}
      >
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
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${bar.heights[2]}px`,
                background: "#EF4444",
                borderRadius: "4px 4px 0 0",
              }}
            />
            <div
              style={{
                width: "100%",
                height: `${bar.heights[1]}px`,
                background: "#3B82F6",
              }}
            />
            <div
              style={{
                width: "100%",
                height: `${bar.heights[0]}px`,
                background: "#06B6D4",
                borderRadius: "0 0 4px 4px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#787777",
          marginTop: 8,
        }}
      >
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}
