
"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CreateBundleHeader from "@/components/features/create-bundle/CreateBundleHeader";
import BundleStrategy from "@/components/features/create-bundle/BundleStrategy";
import ProjectManagement from "@/components/features/create-bundle/ProductManagement";
import BundlePricing from "@/components/features/create-bundle/BundlePricing";

export default function CreateBundlePage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#fff',
        opacity: 1,
        margin: '0 auto',
        position: 'relative',
        boxSizing: 'border-box',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CreateBundleHeader
        step={step}
        onNext={() => setStep(step < 3 ? step + 1 : step)}
        onBack={() => {
          if (step > 1) {
            setStep(step - 1);
          } else {
            router.back();
          }
        }}
      />
      
<div style={{ 
  width: '100%',
  margin: '0 auto',
  padding: '0 16px',
  display: 'flex',
  justifyContent: 'center'
}}>
  <div style={{ width: '100%', maxWidth: '100%' }}>
    {step === 1 && <BundleStrategy />}
    {step === 2 && <ProjectManagement />}
    {step === 3 && <BundlePricing />}
  </div>
</div>
    </div>
  );
}
