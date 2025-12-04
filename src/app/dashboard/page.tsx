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
      <div className="w-full p-6 box-border">
        {/* Header with Overview, Date and Buttons */}
        <div className="flex justify-between items-center mt-2.5 mb-8">
          {/* Overview Heading */}
          <h1 className="font-lato font-semibold text-[32px] leading-[38px] text-black m-0">
            Overview
          </h1>

          {/* Right side: Date Selector and Buttons */}
          <div className="flex items-center gap-4">
            {/* Date Selector */}

            <select
              className="font-normal text-sm text-[#787777] border border-gray-200 rounded-lg px-3 pr-8 py-2 bg-white cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center] bg-[image:url('data:image/svg+xml,%3Csvg_width=\'12\'_height=\'8\'_viewBox=\'0_0_12_8\'_fill=\'none\'_xmlns=\'www.w3.org\'%3E%3Cpath_d=\'M1_1.5L6_6.5L11_1.5\'_stroke=\'%23787777\'_stroke-width=\'1.5\'_stroke-linecap=\'round\'_stroke-linejoin=\'round\'/%3E%3C/svg%3E')]"
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
            <div className="flex gap-3">
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
        <div className="w-full grid mt-8 mb-6 [grid-template-columns:2fr_1fr]">
          {/* Sales & Overall Performance Chart */}
          <div className="w-full min-h-[533px] bg-white border border-gray-200 rounded-xl p-6 box-border flex flex-col">
            {/* Chart Header */}
            <div className="mb-5">
              {/* Top Row: Title, Legend (Center), Date */}
              <div className="flex justify-between items-center mb-3">
                {/* Title */}
                <h3 className="font-lato font-normal text-base leading-6 text-[#787777] m-0 flex-1">
                  Sales & Upsell Performance
                </h3>
                
                {/* Legend - Center */}
                <div className="flex gap-6 flex-1 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                    <span className="font-lato text-sm font-normal text-[#787777]">
                      Revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1E1E1E]" />
                    <span className="font-lato text-sm font-normal text-[#787777]">
                      Expenses
                    </span>
                  </div>
                </div>

                {/* Date Dropdown - Right */}
                <div className="flex-1 flex justify-end">
                  <select
                  className="font-normal text-sm text-[#787777] border border-gray-200 rounded-lg px-3 pr-8 py-1.5 bg-white cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center] bg-[image:url('data:image/svg+xml,%3Csvg_width=\'12\'_height=\'8\'_viewBox=\'0_0_12_8\'_fill=\'none\'_xmlns=\'www.w3.org\'%3E%3Cpath_d=\'M1_1.5L6_6.5L11_1.5\'_stroke=\'%23787777\'_stroke-width=\'1.5\'_stroke-linecap=\'round\'_stroke-linejoin=\'round\'/%3E%3C/svg%3E')]">
                    <option>Jan 2024 - Dec 2024</option>
                    <option>Jan 2024 - Jun 2024</option>
                    <option>Jul 2024 - Dec 2024</option>
                  </select>
                </div>
              </div>

              {/* Value and Percentage */}
              <div className="flex items-center gap-3">
                <span className="font-lato font-normal text-2xl leading-10 text-[#1E1E1E]">
                  AED 240.8K
                </span>
                <span className="font-lato font-semibold text-sm leading-5 text-[#10B981] bg-[#D1FAE5] px-2 py-0.5 rounded">
                  24.6% ↗
                </span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative">
              {/* Tooltip */}
             <div className="absolute top-[80px] left-[180px] bg-[#1E1E1E] rounded-[8px] px-3 py-2 text-white text-[12px] font-lato z-10">
              <div className="mb-0.5 text-[10px] text-[#9CA3AF]">
                June 22 2025
              </div>
              <div className="font-semibold">
                1,890 orders
              </div>
            </div>

              {/* SVG Chart */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 670 380"
                className="block"
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
          <div className="w-full bg-white border border-gray-200 rounded-xl flex flex-col gap-0">
            {/* Top Chart - Time Saved from AI */}
            <div className="w-full min-h-[266.49px] p-6 border-b border-gray-200 box-border">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-lato font-normal text-lg leading-6 text-[#1E1E1E] m-0">
                  Time Saved from AI
                </h3>
                <div className="font-lato font-semibold text-xs leading-4 text-[#10B981] bg-[#D1FAE5] px-2 py-1 rounded">
                  0.0%
                </div>
              </div>

              {/* Value */}
              <div className="font-lato font-bold text-2xl leading-10 text-[#1E1E1E] mb-3">
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
            <div className="w-full min-h-[266.49px] p-6 box-border">
              {/* Header */}
              <h3 className="font-semibold text-sm leading-[100%] text-[#1E1E1E] mb-4 w-[312px] h-[17px]">
                Total Profit Made by Promoting slow moving items
              </h3>

              {/* Value and Badge */}
              <div className="flex items-center gap-3 mb-5">
                <div className="font-lato font-normal text-2xl leading-8 text-[#1E1E1E]">
                  400 AED
                </div>
                <div className="font-lato font-semibold text-xs leading-4 text-[#10B981] bg-[#D1FAE5] px-2 py-1 rounded flex items-center gap-1">
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
              <div className="flex items-center gap-2 mt-3">
                <div className="font-lato font-semibold text-xs leading-4 text-[#10B981] bg-[#D1FAE5] px-2 py-1 rounded flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Live
                </div>
                <span className="font-lato font-normal text-sm text-[#787777]">
                  10x visitors
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row Grid Layout - Predictive Analytics */}
        <div className="w-full grid mb-6 [grid-template-columns:1fr_2fr]">

          {/* Predictive Analytics Chart - Left */}
          <PredictiveAnalyticsChart />

          {/* Revenue by Bundle Chart - Right */}
          <RevenueByBundleChart />
        </div>

        {/* Fourth Row Grid Layout - Waste Reduction & Customer Retention */}
            <div className="w-full grid mb-6 [grid-template-columns:1.3fr_1fr]">
          {/* Waste Reduction Chart - Left */}
          <div className="w-full h-auto">
            <WasteReductionChart />
          </div>

          {/* Customer Retention - Right */}
          <div className="w-full h-auto">
            <CustomerRetention />
          </div>
        </div>

        {/* Charts will be added here */}
      </div>
    </AppLayout>
  );
}
