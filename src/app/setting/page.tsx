"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import AISettings from "@/components/features/setting/ai-setting";
import MainHeader from '@/components/ui/MainHeader';
import SystemSettings from "@/components/features/setting/system-setting";
import AccessManagement from "@/components/features/setting/access-management";
import LocationManagement from "@/components/features/setting/location-management";
import IntegrationsScreen from "@/components/features/setting/IntegrationsScreen";

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState("ai");
  return (
    <AppLayout>
      <div className="px-6">
        <MainHeader variant="default" />
      </div>
      <div className="flex flex-col items-start w-full px-8 pt-6 pb-12 gap-[20px] bg-[#FDFDFD]">
        {/* Page Header */}
        <div className="mb-4 mt-2">
          <h1 className="font-semibold text-3xl leading-[38px] text-[#00674E] m-0 font-lato">
            Settings
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex items-start w-full rounded-[12px]">
          <div className="bg-neutral-100 border border-[#DBDFE9] border-solid flex gap-[4px] items-center p-[4px] rounded-[8px]">
            {[
              { label: "AI Settings", key: "ai" },
              { label: "Location", key: "location" },
              { label: "Access Management", key: "access" },
              { label: "System", key: "system" },
              { label: "Integrations", key: "integrations" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center justify-center overflow-clip px-[16px] py-[9px] rounded-[8px]
                  font-inter font-normal text-[13px] leading-[14px] whitespace-nowrap
                  ${activeTab === tab.key
                    ? 'bg-white text-black'
                    : 'bg-transparent text-[#4b5675]'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "ai" && <AISettings />}
        {activeTab === "location" && <LocationManagement />}
        {activeTab === "access" && <AccessManagement />}
        {activeTab === "system" && <SystemSettings />}
        {activeTab === "integrations" && <IntegrationsScreen />}
      </div>
    </AppLayout>
  );
}
