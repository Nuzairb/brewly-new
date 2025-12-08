"use client";

import React, { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/features/dashboard/DashboardStats";
import PredictiveAnalyticsChart from "@/components/features/dashboard/PredictiveAnalyticsChart";
import RevenueByBundleChart from "@/components/features/dashboard/RevenueByBundleChart";
import { WasteReductionChart } from "@/components/features/dashboard/WasteReductionChart";
import { SalesPerformanceChart } from "@/components/features/dashboard/SalesPerformanceChart";
import { CustomerRetention } from "@/components/features/dashboard/CustomerRetention";

export default function DashboardPage() {
  const [csvName, setCsvName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showToast, setShowToast] = useState(false);

  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvName(e.target.files[0].name);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  // CSV Export logic
  const handleExportClick = () => {
    // Stat card data (should match the data in StatCard.tsx)
    const statCardsData = [
      {
        title: "AI Profit",
        value: "+38,240 AED",
        percentage: "+12%",
        description: "This Month"
      },
      {
        title: "AI Upsell Revenue ",
        value: "+38,240 AED",
        percentage: "+12%",
        description: "This Month"
      },
      {
        title: "Labor Cost Saved ",
        value: "+38,240 AED",
        percentage: "+12%",
        description: "This Month"
      },
      {
        title: "Waste Reduced",
        value: "+38,240 AED",
        percentage: "+12%",
        description: "This Month"
      }
    ];
    const csvRows = [
      ["Title", "Value", "Percentage", "Description"],
      ...statCardsData.map(row => [row.title, row.value, row.percentage, row.description])
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            <select className="font-normal text-sm text-[#787777] border border-gray-200 rounded-lg px-3 pr-8 py-2 bg-white cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20d%3D%22M1%201.5L6%206.5L11%201.5%22%20stroke%3D%22%23787777%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
              <option value="jan-dec-2024">Jan 2024 - Dec 2024</option>
              <option value="jan-jun-2024">Jan 2024 - Jun 2024</option>
              <option value="jul-dec-2024">Jul 2024 - Dec 2024</option>
            </select>
            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                variant="pageHeaderSecondary"
                size="pageHeader"
                onClick={handleImportClick}
              >
                Import CSV
              </Button>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="bundlesHeaderPrimary"
                size="pageHeader"
                onClick={handleExportClick}
              >
                Export Report
              </Button>
            </div>
            {showToast && (
              <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
                CSV Imported: {csvName}
              </div>
            )}
          </div>
        </div>
        

        {/* First Row - Dashboard Stats */}
        <div className="mb-6">
          <DashboardStats />
        </div>

        {/* Second Row Grid Layout */}
        <div className="w-full grid grid-cols-[2fr_1fr]  mb-6">
          {/* Left Column - Sales Performance Chart */}
          
            <SalesPerformanceChart />
          

          {/* Right Column Grid - Bundle Orders & Bundle Performance */}
          <div className="w-full min-h-[533px] grid grid-cols-1 ">
            {/* Time Saved from AI Chart */}
            <div className="w-full min-h-[266px] bg-white border border-gray-200 rounded-xl p-6 box-border mb-0">
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-lato font-weight:600 font-semibold text-sm text-[#1E1E1E] mb-2">
                  Time Saved from AI
                </h3>
              </div>

              {/* Value */}
              <div className="font-lato font-normal text-2xl leading-10 text-[#1E1E1E] mb-2">
                400h
              </div>

              {/* Chart Area */}
              <svg width="100%" height="100" viewBox="0 0 320 100">
                {/* Y-axis labels */}
                <text x="0" y="8" className="fill-[#9CA3AF] text-[10px] font-lato">5h</text>
                <text x="0" y="28" className="fill-[#9CA3AF] text-[10px] font-lato">4h</text>
                <text x="0" y="48" className="fill-[#9CA3AF] text-[10px] font-lato">3h</text>
                <text x="0" y="68" className="fill-[#9CA3AF] text-[10px] font-lato">2h</text>
                <text x="0" y="88" className="fill-[#9CA3AF] text-[10px] font-lato">1h</text>

                {/* Red line chart */}
                <path
                  d="M 40 63 L 80 63 L 120 58 L 160 43 L 200 33 L 240 38 L 280 28"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                />

                {/* X-axis labels */}
                <text x="40" y="90" className="fill-[#9CA3AF] text-[10px] font-lato">Mon</text>
                <text x="80" y="90" className="fill-[#9CA3AF] text-[10px] font-lato">Tue</text>
                <text x="120" y="90" className="fill-[#9CA3AF] text-[10px] font-lato">Wed</text>
                <text x="160" y="90" className="fill-[#9CA3AF] text-[10px] font-lato">Thur</text>
                <text x="200" y="90" className="fill-[#9CA3AF] text-[10px] font-lato">Fri</text>
                <text x="240" y="90" className="fill-[#9CA3AF] text-[10px] font-lato">Sat</text>
                <text x="280" y="90" className="fill-[#9CA3AF] text-[10px] font-lato">Sun</text>
              </svg>
            </div>

            {/* Bottom Chart - Total Profit Made by Promoting slow moving items */}
            <div className="w-full min-h-[266.49px] p-6 box-border bg-white border border-gray-200 rounded-xl">
              {/* Header */}
              <h3 className="font-semibold font-lato font-weight:600 text-sm text-[#1E1E1E] mb-4">
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
                <text x="0" y="20" className="fill-[#9CA3AF] text-[10px] font-lato">500</text>
                <text x="0" y="45" className="fill-[#9CA3AF] text-[10px] font-lato">250</text>
                <text x="0" y="70" className="fill-[#9CA3AF] text-[10px] font-lato">100</text>
                <text x="0" y="95" className="fill-[#9CA3AF] text-[10px] font-lato">0</text>

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
                <text x="35" y="108" className="fill-[#9CA3AF] text-[10px] font-lato">12 AM</text>
                <text x="125" y="108" className="fill-[#9CA3AF] text-[10px] font-lato">8 AM</text>
                <text x="225" y="108" className="fill-[#9CA3AF] text-[10px] font-lato">4 PM</text>
                <text x="270" y="108" className="fill-[#9CA3AF] text-[10px] font-lato">11 PM</text>
              </svg>

              {/* Live visitors badge */}
              <div className="flex items-center gap-2 ">
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
        <div className="w-full grid grid-cols-[1fr_2fr] mb-6 gap-6">
          {/* Predictive Analytics Chart - Left */}
          <PredictiveAnalyticsChart />

          {/* Revenue by Bundle Chart - Right */}
          <RevenueByBundleChart />
        </div>

        {/* Fourth Row Grid Layout - Waste Reduction & Customer Retention */}
        <div className="w-full grid grid-cols-[1.3fr_1fr] mb-6 gap-6">
          {/* Waste Reduction Chart - Left */}
          <div className="w-full h-auto">
            <WasteReductionChart />
          </div>

          {/* Customer Retention - Right */}
          <div className="w-full h-auto">
            <CustomerRetention />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}