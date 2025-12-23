"use client";

import React, { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/features/dashboard/DashboardStats";
import dynamic from "next/dynamic";
// Dynamically load chart components on the client to avoid Recharts measuring during build/SSR
const PredictiveAnalyticsChart = dynamic(
  () => import("@/components/features/dashboard/PredictiveAnalyticsChart"),
  { ssr: false }
);
const RevenueByBundleChart = dynamic(
  () => import("@/components/features/dashboard/RevenueByBundleChart").then(mod => mod.default),
  { ssr: false }
);
const WasteReductionChart = dynamic(
  () => import("@/components/features/dashboard/WasteReductionChart").then(mod => mod.WasteReductionChart),
  { ssr: false }
);
const SalesPerformanceChart = dynamic(
  () => import("@/components/features/dashboard/SalesPerformanceChart").then(mod => mod.SalesPerformanceChart),
  { ssr: false }
);
const CustomerRetention = dynamic(
  () => import("@/components/features/dashboard/CustomerRetention").then(mod => mod.CustomerRetention),
  { ssr: false }
);
const TimeSavedChart = dynamic(
  () => import("@/components/features/dashboard/TimeSavedChart").then(mod => mod.TimeSavedChart),
  { ssr: false }
);
const TotalProfitChart = dynamic(
  () => import("@/components/features/dashboard/TotalProfitChart").then(mod => mod.TotalProfitChart),
  { ssr: false }
);
import { ChevronDown } from "lucide-react";
import MainHeader from '@/components/ui/MainHeader';

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
      <div className="px-6">
        <div className="ml-2.5">
          <MainHeader variant="no-search" />
        </div>
      </div>
      <div className="w-full p-6 box-border">
        {/* Header with Overview, Date and Buttons */}
        <div className="flex justify-between items-center mt-2.5 mb-8">
          {/* Overview Heading */}
          <h1 className="font-lato font-semibold text-[32px] leading-[38px] text-black m-0">
            Overview
          </h1>

          {/* Right side: Date Selector and Buttons */}
          <div className="flex items-center gap-4">
            <div className="relative">
                <select className="font-lato font-medium text-[14px] text-black border border-[#EEEEEE] rounded-lg px-3 pr-10 py-2 bg-white cursor-pointer appearance-none h-[48px]">
                  <option className="border-none" value="jan-dec-2024">Jan 2024 - Dec 2024</option>
                  <option className="border-none" value="jan-jun-2024">Jan 2024 - Jun 2024</option>
                  <option className="border-none"  value="jul-dec-2024">Jul 2024 - Dec 2024</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#787777]" />
              </div>
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
          <DashboardStats cardClassName="min-h-[120px] p-0" />
        </div>

        {/* Second Row Grid Layout */}
        <div className="w-full grid grid-cols-[2fr_1fr] gap-6 mb-6">
          {/* Left Column - Sales Performance Chart (dashboard-specific height: 532px) */}
          <SalesPerformanceChart className="h-[555px]" chartClassName="h-[420px]" />

          {/* Right Column Grid - Bundle Orders & Bundle Performance */}
          <div className="w-full h-[556px] grid grid-cols-1 gap-6">
            <TimeSavedChart />
            {/* Bottom Chart - Total Profit Made by Promoting slow moving items */}
            <TotalProfitChart />
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