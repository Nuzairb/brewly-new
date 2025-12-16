"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} onCollapsedChange={setIsSidebarCollapsed} />
      <div
        className={`transition-all duration-300 min-h-screen bg-white overflow-x-hidden overflow-y-auto box-border ${isSidebarCollapsed ? 'lg:ml-[68px] lg:w-[calc(100vw-68px)]' : 'lg:ml-[256px] lg:w-[calc(100vw-256px)]'}`}
        style={{ zIndex: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
