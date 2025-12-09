"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import AISettings from "@/components/features/setting/ai-setting";
import SystemSettings from "@/components/features/setting/system-setting";
import AccessManagement from "@/components/features/setting/access-management";
import IntegrationsScreen from "@/components/features/setting/IntegrationsScreen";

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState("ai");
  return (
    <AppLayout>
      <div className="flex flex-col items-start w-full px-8 pt-6 pb-12 box-border">
        {/* Page Header */}
        <div className="mb-8 mt-2">
          <h1 className="font-semibold text-3xl leading-[38px] text-[#00674E] m-0 font-lato">
            Settings
          </h1>
        </div>

        {/* Tabs - Figma style */}
        <div className="mb-8">
            <div
              className="w-[520px] h-10 p-1 gap-1 rounded-lg border border-[#DBDFE9] bg-[#F5F5F5] flex items-center opacity-100 mb-8 overflow-hidden"
            >
                {[
                  { label: "AI Settings", key: "ai" },
                  { label: "Access Management", key: "access" },
                  { label: "System", key: "system" },
                  { label: "Integrations", key: "integrations" }
                ].map((tab, idx) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
                      min-w-[40px] h-8 gap-2 rounded-lg px-4 py-[9px] flex items-center justify-center whitespace-nowrap flex-shrink-0
                      font-inter font-normal text-[13px] leading-[14px] tracking-[0px] text-[#1E1E1E] opacity-100
                      ${activeTab === tab.key
                        ? 'bg-white border border-[#DBDFE9] shadow-sm'
                        : 'bg-transparent border border-transparent'
                      }
                      ${idx !== 3 ? 'mr-1' : 'mr-0'}
                    `}
                  >
                    {tab.label}
                  </button>

                ))}
            </div>
        </div>
        {/* Tab Content */}
        {activeTab === "ai" && <AISettings />}
        {activeTab === "access" && <AccessManagement />}
        {activeTab === "system" && <SystemSettings />}
        {activeTab === "integrations" && <IntegrationsScreen />}
      </div>
    </AppLayout>
  );
}
