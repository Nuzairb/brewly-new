
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
    <div className="w-full min-h-screen bg-white opacity-100 mx-auto relative box-border p-0 flex flex-col">
      <CreateBundleHeader
        step={step}
        onNext={() => setStep(step < 3 ? step + 1 : step)}
        onBack={() => router.back()}
      />
      <div className="w-full mx-auto px-4 flex justify-center">
        <div className="w-full max-w-full">
          {step === 1 && <BundleStrategy />}
          {step === 2 && <ProjectManagement />}
          {step === 3 && <BundlePricing />}
        </div>
      </div>
    </div>
  );
}
