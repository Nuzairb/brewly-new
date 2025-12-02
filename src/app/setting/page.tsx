"use client";

import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function SettingPage() {
  return (
    <AppLayout>
      <div 
        style={{ 
          padding: "24px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* Page Header */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginTop: 10,
            marginBottom: 32,
          }}
        >
          {/* Settings Heading */}
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
            Settings
          </h1>
        </div>

        {/* Settings Content - You can add your components here */}
        <div>
          <p style={{ fontFamily: "Lato", fontSize: "16px", color: "#787777" }}>
            Settings page content will go here
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
