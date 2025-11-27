"use client";
import BundlesSection from '@/components/features/bundles/BundlesSection';
import BundlesPageHeader from '@/components/features/bundles/BundlesPageHeader';

export default function BundlesPage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
      <BundlesPageHeader onBackClick={() => {}} />
      <BundlesSection />
    </div>
  );
}
