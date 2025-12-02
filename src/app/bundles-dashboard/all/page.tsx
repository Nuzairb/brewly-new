"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import BundlesSection from '@/components/features/bundles/BundlesSection';
import BundlesPageHeader from '@/components/features/bundles/BundlesPageHeader';
import { DashboardStats } from '@/components/features/dashboard/DashboardStats';

export default function AllBundlesPage() {
  return (
    <AppLayout>
      <div 
        style={{ 
          padding: "24px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        <BundlesPageHeader onBackClick={() => {}} />
        
        {/* Page Title */}
        <h1
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 500,
            fontSize: 32,
            lineHeight: "100%",
            letterSpacing: 0,
            color: "#000000",
            margin: 0,
            marginTop: 32,
            marginBottom: 32,
          }}
        >
          Bundles
        </h1>
        
        {/* Stats Cards */}
        <DashboardStats />
        
        <BundlesSection />
      </div>
    </AppLayout>
  );
}
