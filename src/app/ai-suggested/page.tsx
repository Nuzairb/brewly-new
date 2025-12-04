"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import AISuggestedSection from '@/components/features/ai-suggestions/AISuggestedSection';
import AISuggestedPageHeader from '@/components/features/ai-suggestions/AISuggestedPageHeader';

export default function AISuggestedPage() {
  return (
    <AppLayout>
      <div className="p-6 w-full box-border">
        <AISuggestedPageHeader onBackClick={() => {}} />
        <AISuggestedSection />
      </div>
    </AppLayout>
  );
}
