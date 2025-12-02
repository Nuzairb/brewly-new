"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import AISuggestedSection from '@/components/features/ai-suggestions/AISuggestedSection';
import AISuggestedPageHeader from '@/components/features/ai-suggestions/AISuggestedPageHeader';

export default function AISuggestedPage() {
  return (
    <AppLayout>
      <div 
        style={{ 
          padding: "24px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        <AISuggestedPageHeader onBackClick={() => {}} />
        <AISuggestedSection />
      </div>
    </AppLayout>
  );
}
