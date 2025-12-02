"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/features/dashboard/DashboardStats";
import PredictiveAnalyticsChart from "@/components/features/dashboard/PredictiveAnalyticsChart";
import RevenueByBundleChart from "@/components/features/dashboard/RevenueByBundleChart";
import { WasteReductionChart } from "@/components/features/dashboard/WasteReductionChart";
import { CustomerRetention } from "@/components/features/dashboard/CustomerRetention";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div 
        style={{ 
          padding: "24px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* Header with Overview, Date and Buttons */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginTop: 10,
            marginBottom: 32,
          }}
        >
          {/* Overview Heading */}
          <h1
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
              fontSize: 32,
              lineHeight: "38px",
              color: "#000000",
              margin: 0,
            }}
          >
            Overview
          </h1>

          {/* Right side: Date Selector and Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Date Selector */}
            <select
              style={{
                fontFamily: "Lato",
                fontWeight: 400,
                fontSize: 14,
                color: "#787777",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "8px 32px 8px 12px",
                background: "white",
                cursor: "pointer",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23787777' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="jan-dec-2024">Jan 2024 - Dec 2024</option>
              <option value="jan-jun-2024">Jan 2024 - Jun 2024</option>
              <option value="jul-dec-2024">Jul 2024 - Dec 2024</option>
              <option value="q1-2024">Q1 2024</option>
              <option value="q2-2024">Q2 2024</option>
              <option value="q3-2024">Q3 2024</option>
              <option value="q4-2024">Q4 2024</option>
            </select>
            
            {/* Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <Button
                variant="pageHeaderSecondary"
                size="pageHeader"
              >
                Import CSV
              </Button>
              <Button
                variant="bundlesHeaderPrimary"
                size="pageHeader"
              >
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards Component */}
        <DashboardStats />

        {/* First Row Grid Layout - Sales & Overall Performance */}
        <div
          style={{
            width: "100%",
            display: "grid",
            marginTop: 32,
            gridTemplateColumns: "2fr 1fr",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {/* Sales & Overall Performance Chart */}
          <div
            style={{
              width: "100%",
              height: "auto",
              minHeight: "532.99px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "24px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Chart Header */}
            <div style={{ marginBottom: 20 }}>
              {/* Top Row: Title, Legend (Center), Date */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: 0,
                    color: "#787777",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  Sales & Upsell Performance
                </h3>
                
                {/* Legend - Center */}
                <div style={{ display: "flex", gap: 24, flex: 1, justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#10B981",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Lato",
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#787777",
                      }}
                    >
                      Revenue
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#1E1E1E",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Lato",
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#787777",
                      }}
                    >
                      Expenses
                    </span>
                  </div>
                </div>

                {/* Date Dropdown - Right */}
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <select
                    style={{
                      fontFamily: "Lato",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#787777",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      padding: "6px 32px 6px 12px",
                      background: "white",
                      cursor: "pointer",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23787777' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                    }}
                  >
                    <option>Jan 2024 - Dec 2024</option>
                    <option>Jan 2024 - Jun 2024</option>
                    <option>Jul 2024 - Dec 2024</option>
                  </select>
                </div>
              </div>

              {/* Value and Percentage */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 400,
                    fontSize: 24,
                    lineHeight: "40px",
                    color: "#1E1E1E",
                  }}
                >
                  AED 240.8K
                </span>
                <span
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#10B981",
                    background: "#D1FAE5",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  24.6% ↗
                </span>
              </div>
            </div>

            {/* Chart Area */}
            <div style={{ flex: 1, position: "relative" }}>
              {/* Tooltip */}
              <div
                style={{
                  position: "absolute",
                  top: "80px",
                  left: "180px",
                  background: "#1E1E1E",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "white",
                  fontSize: "12px",
                  fontFamily: "Lato, sans-serif",
                  zIndex: 10,
                }}
              >
                <div style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "2px" }}>
                  June 22 2025
                </div>
                <div style={{ fontWeight: 600 }}>1,890 orders</div>
              </div>

              {/* SVG Chart */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 670 380"
                style={{ display: "block" }}
              >
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Y-axis labels */}
                <text x="0" y="20" fill="#9CA3AF" fontSize="12" fontFamily="Lato">25K</text>
                <text x="0" y="80" fill="#9CA3AF" fontSize="12" fontFamily="Lato">20K</text>
                <text x="0" y="140" fill="#9CA3AF" fontSize="12" fontFamily="Lato">15K</text>
                <text x="0" y="200" fill="#9CA3AF" fontSize="12" fontFamily="Lato">10K</text>
                <text x="0" y="260" fill="#9CA3AF" fontSize="12" fontFamily="Lato">5K</text>
                <text x="0" y="320" fill="#9CA3AF" fontSize="12" fontFamily="Lato">0K</text>

                {/* Blue Revenue Area */}
                <path
                  d="M 60 280 Q 120 260 180 180 T 300 140 T 420 120 T 540 80 T 650 60 L 650 320 L 60 320 Z"
                  fill="url(#blueGradient)"
                />
                <path
                  d="M 60 280 Q 120 260 180 180 T 300 140 T 420 120 T 540 80 T 650 60"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="2"
                />

                {/* Red Expenses Line */}
                <path
                  d="M 60 240 Q 120 220 180 200 T 300 180 T 420 160 T 540 140 T 650 120"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                />

                {/* Marker dot on blue line */}
                <circle cx="180" cy="180" r="5" fill="#60A5FA" stroke="white" strokeWidth="2" />

                {/* X-axis labels */}
                <text x="60" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Jan</text>
                <text x="120" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Feb</text>
                <text x="180" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Mar</text>
                <text x="240" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Apr</text>
                <text x="300" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">May</text>
                <text x="360" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Jun</text>
                <text x="420" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Jul</text>
                <text x="480" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Aug</text>
                <text x="540" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Sep</text>
                <text x="600" y="360" fill="#9CA3AF" fontSize="12" fontFamily="Lato">Oct</text>
              </svg>
            </div>
          </div>

          {/* Right Column - Two Stacked Charts */}
          <div
            style={{
              width: "100%",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {/* Top Chart - Time Saved from AI */}
            <div style={{ 
              width: "100%",
              minHeight: "266.49px",
              padding: "24px", 
              borderBottom: "1px solid #E5E7EB",
              boxSizing: "border-box"
            }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <h3
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: "24px",
                    color: "#1E1E1E",
                    margin: 0,
                  }}
                >
                  Time Saved from AI
                </h3>
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
                  0.0%
                </div>
              </div>

              {/* Value */}
              <div
                style={{
                  fontFamily: "Lato",
                  fontWeight: 700,
                  fontSize: 32,
                  lineHeight: "40px",
                  color: "#1E1E1E",
                  marginBottom: 12,
                }}
              >
                400h
              </div>

              {/* Chart Area */}
              <svg width="100%" height="100" viewBox="0 0 320 100">
                {/* Y-axis labels */}
                <text x="0" y="8" fill="#9CA3AF" fontSize="10" fontFamily="Lato">5h</text>
                <text x="0" y="28" fill="#9CA3AF" fontSize="10" fontFamily="Lato">4h</text>
                <text x="0" y="48" fill="#9CA3AF" fontSize="10" fontFamily="Lato">3h</text>
                <text x="0" y="68" fill="#9CA3AF" fontSize="10" fontFamily="Lato">2h</text>
                <text x="0" y="88" fill="#9CA3AF" fontSize="10" fontFamily="Lato">1h</text>

                {/* Red line chart */}
                <path
                  d="M 40 63 L 80 63 L 120 58 L 160 43 L 200 33 L 240 38 L 280 28"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                />

                {/* X-axis labels */}
                <text x="40" y="90" fill="#9CA3AF" fontSize="10" fontFamily="Lato">Mon</text>
                <text x="80" y="90" fill="#9CA3AF" fontSize="10" fontFamily="Lato">Tue</text>
                <text x="120" y="90" fill="#9CA3AF" fontSize="10" fontFamily="Lato">Wed</text>
                <text x="160" y="90" fill="#9CA3AF" fontSize="10" fontFamily="Lato">Thur</text>
                <text x="200" y="90" fill="#9CA3AF" fontSize="10" fontFamily="Lato">Fri</text>
                <text x="240" y="90" fill="#9CA3AF" fontSize="10" fontFamily="Lato">Sat</text>
                <text x="280" y="90" fill="#9CA3AF" fontSize="10" fontFamily="Lato">Sun</text>
              </svg>
            </div>

            {/* Bottom Chart - Total Profit Made by Promoting slow moving items */}
            <div style={{ 
              width: "100%",
              minHeight: "266.49px",
              padding: "24px",
              boxSizing: "border-box"
            }}>
              {/* Header */}
              <h3
                style={{
                  width: "312px",
                  height: "17px",
                  fontFamily: "Lato",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: "100%",
                  letterSpacing: 0,
                  color: "#1E1E1E",
                  margin: "0 0 16px 0",
                }}
              >
                Total Profit Made by Promoting slow moving items
              </h3>

              {/* Value and Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 400,
                    fontSize: 24,
                    lineHeight: "32px",
                    letterSpacing: 0,
                    color: "#1E1E1E",
                  }}
                >
                  400 AED
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
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Live ↗
                </div>
              </div>

              {/* Chart Area */}
              <svg width="100%" height="110" viewBox="0 0 320 110">
                <defs>
                  <linearGradient id="blueGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Y-axis labels */}
                <text x="0" y="20" fill="#9CA3AF" fontSize="10" fontFamily="Lato">500</text>
                <text x="0" y="45" fill="#9CA3AF" fontSize="10" fontFamily="Lato">250</text>
                <text x="0" y="70" fill="#9CA3AF" fontSize="10" fontFamily="Lato">100</text>
                <text x="0" y="95" fill="#9CA3AF" fontSize="10" fontFamily="Lato">0</text>

                {/* Blue area chart */}
                <path
                  d="M 40 70 L 100 62 L 160 58 L 220 52 L 280 48 L 280 95 L 40 95 Z"
                  fill="url(#blueGradient3)"
                />
                <path
                  d="M 40 70 L 100 62 L 160 58 L 220 52 L 280 48"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />

                {/* X-axis labels */}
                <text x="35" y="108" fill="#9CA3AF" fontSize="10" fontFamily="Lato">12 AM</text>
                <text x="125" y="108" fill="#9CA3AF" fontSize="10" fontFamily="Lato">8 AM</text>
                <text x="225" y="108" fill="#9CA3AF" fontSize="10" fontFamily="Lato">4 PM</text>
                <text x="270" y="108" fill="#9CA3AF" fontSize="10" fontFamily="Lato">11 PM</text>
              </svg>

              {/* Live visitors badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
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
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                  Live
                </div>
                <span
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#787777",
                  }}
                >
                  10x visitors
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row Grid Layout - Predictive Analytics */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "30px",
            marginBottom: 24,
          }}
        >
          {/* Predictive Analytics Chart - Left */}
          <PredictiveAnalyticsChart />

          {/* Revenue by Bundle Chart - Right */}
          <RevenueByBundleChart />
        </div>

        {/* Fourth Row Grid Layout - Waste Reduction & Customer Retention */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "30px",
            marginBottom: 24,
          }}
        >
          {/* Waste Reduction Chart - Left */}
          <div style={{ width: "100%", height: "auto" }}>
            <WasteReductionChart />
          </div>

          {/* Customer Retention - Right */}
          <div style={{ width: "100%", height: "auto" }}>
            <CustomerRetention />
          </div>
        </div>

        {/* Charts will be added here */}
      </div>
    </AppLayout>
  );
}
