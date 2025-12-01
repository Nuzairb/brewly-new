"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'bundles' | 'ai-suggested'>('dashboard');

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full min-h-screen flex flex-col lg:flex-row items-start bg-white dark:bg-black overflow-y-auto gap-[35px] pr-[20px]">
        <Sidebar onNavigate={setCurrentView} />
        <MainContent view={currentView} onViewChange={setCurrentView} />
      </main>
    </div>
  );
}
