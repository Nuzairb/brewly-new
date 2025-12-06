"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import MainContent from '@/components/layout/MainContent';
import { useState } from 'react';

export default function BundlesPage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'bundles' | 'ai-suggested'>('dashboard');

  return (
    <AppLayout>
      <MainContent view={currentView} onViewChange={setCurrentView} />
    </AppLayout>
  );
}
