
"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CreateBundleHeader from "@/components/CreateBundles/CreateBundleHeader";
import BundleStrategy from "@/components/CreateBundles/BundleStrategy";
import ProjectManagement from "@/components/CreateBundles/ProductManagement";
import BundlePricing from "@/components/CreateBundles/BundlePricing";

export default function CreateBundlePage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <div
      style={{
        width: 1260,
        height: 800,
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
            router.push('/bundles');
          }
        }}
      />
      <div style={{ marginBottom: 32 }}></div>
<div style={{ 
  marginLeft: step === 1 ? 81 : step === 3 ? 81 : 48 
}}>
  {step === 1 && <BundleStrategy />}
  {step === 2 && <ProjectManagement />}
  {step === 3 && <BundlePricing />}
</div>
    </div>
  );
}
