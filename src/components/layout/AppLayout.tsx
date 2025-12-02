"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "white", overflowX: "hidden" }}>
      <Sidebar isCollapsed={isSidebarCollapsed} onCollapsedChange={setIsSidebarCollapsed} />
      <div 
        style={{ 
          marginLeft: isSidebarCollapsed ? "68px" : "256px",
          transition: "margin-left 0.3s ease",
          width: `calc(100vw - ${isSidebarCollapsed ? "68px" : "256px"})`,
          background: "white",
          minHeight: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
          boxSizing: "border-box"
        }}
      >
        {children}
      </div>
    </div>
  );
}
