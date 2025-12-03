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
      <div className="flex flex-col items-start w-full px-8 pt-6 pb-12" style={{ boxSizing: "border-box" }}>
        {/* Page Header */}
        <div className="mb-8 mt-2">
          <h1
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
              fontSize: 32,
              lineHeight: "38px",
              color: "#00674E",
              margin: 0,
            }}
          >
            Settings
          </h1>
        </div>

        {/* Tabs - Figma style */}
        <div className="mb-8">
            <div
                style={{
                    width: 464,
                    height: 40,
                    padding: 4,
                    gap: 4,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#DBDFE9',
                    background: '#F5F5F5',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 1,
                    marginBottom: 32
                }}
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
                    style={{
                      minWidth: 40,
                      height: 32,
                      gap: 10,
                      borderRadius: 8,
                      paddingTop: 9,
                      paddingRight: 16,
                      paddingBottom: 9,
                      paddingLeft: 16,
                      background: activeTab === tab.key ? '#FFFFFF' : 'transparent',
                      border: activeTab === tab.key ? '1px solid #DBDFE9' : '1px solid transparent',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: 13,
                      lineHeight: '14px',
                      letterSpacing: 0,
                      color: '#1E1E1E',
                      opacity: 1,
                      boxShadow: activeTab === tab.key ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                      marginRight: idx !== 3 ? 4 : 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      flex: '0 1 auto'
                    }}
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
