"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import BundlesSection from '@/components/features/bundles/BundlesSection';
import BundlesPageHeader from '@/components/features/bundles/BundlesPageHeader';
import { DashboardStats } from '@/components/features/dashboard/DashboardStats';

export default function AllBundlesPage() {
  return (
    <AppLayout>
      <div className="p-6 w-full box-border">
        <BundlesPageHeader onBackClick={() => {}} />
        {/* Page Title */}
        <h1 className="font-lato font-medium text-[32px] leading-none text-black m-0 mt-8 mb-8">
          Bundles
        </h1>
        {/* Stats Cards */}
        <DashboardStats />
        <BundlesSection />
      </div>
    </AppLayout>
  );
}
