"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import AISuggestedSection from '@/components/features/ai-suggestions/AISuggestedSection';
import AISuggestedPageHeader from '@/components/features/ai-suggestions/AISuggestedPageHeader';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function AISuggestedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  return (
    <AppLayout>
      <div className="p-6 w-full box-border">
        <AISuggestedPageHeader
          onBackClick={() => {}}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <AISuggestedSection
          searchTerm={searchTerm}
          onEdit={(bundleId: number) => {
            router.push(`/create-bundle?edit=${encodeURIComponent(String(bundleId))}`);
          }}
        />
      </div>
    </AppLayout>
  );
}
