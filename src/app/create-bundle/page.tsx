
"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CreateBundleHeader from "@/components/features/create-bundle/CreateBundleHeader";
import BundleStrategy from "@/components/features/create-bundle/BundleStrategy";
import ProjectManagement from "@/components/features/create-bundle/ProductManagement";
import BundlePricing from "@/components/features/create-bundle/BundlePricing";
import { createBundle, CreateBundlePayload } from "@/app/api/bundles/createBundle";

type StrategyForm = {
  bundle_strategy: string;
  slot1Category: string;
  slot2Category: string;
  bundle_name: string;
  bundle_type: string;
};

type SelectedProduct = {
  id: string;
  name: string;
  price: number;
};

type PricingForm = {
  bundle_price?: number;
  discount_percentage?: number;
  startDate?: Date;
  endDate?: Date;
  autoActivate: boolean;
  showOnKiosk: boolean;
  showOnStaff: boolean;
};

export default function CreateBundlePage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [strategyForm, setStrategyForm] = useState<StrategyForm>({
    bundle_strategy: "",
    slot1Category: "",
    slot2Category: "",
    bundle_name: "",
    bundle_type: "manual",
  });

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const [pricingForm, setPricingForm] = useState<PricingForm>({
    bundle_price: undefined,
    discount_percentage: undefined,
    startDate: undefined,
    endDate: undefined,
    autoActivate: true,
    showOnKiosk: true,
    showOnStaff: true,
  });

  const [saving, setSaving] = useState(false);

  const handleStrategyChange = (updated: Partial<StrategyForm>) => {
    setStrategyForm((prev) => ({ ...prev, ...updated }));
  };

  const handlePricingChange = (updated: Partial<PricingForm>) => {
    setPricingForm((prev) => ({ ...prev, ...updated }));
  };

  const toggleProductSelection = (product: any) => {
    const id = String(product?.id ?? product?.product_id ?? product?.product_name ?? product?.name ?? "");
    const name = String(product?.name ?? product?.product_name ?? "");
    const rawPrice = product?.price ?? product?.product_price ?? 0;
    const priceNumber = typeof rawPrice === "number" ? rawPrice : Number(String(rawPrice).replace(/[^\d.-]/g, "")) || 0;

    if (!id) return;

    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === id);
      if (exists) {
        return prev.filter((p) => p.id !== id);
      }
      return [...prev, { id, name, price: priceNumber }];
    });
  };

  const handleSave = async () => {
    if (!strategyForm.bundle_strategy) {
      alert("Please select a bundle strategy.");
      return;
    }
    if (!strategyForm.bundle_name) {
      alert("Please choose a bundle name.");
      return;
    }
    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    const payload: CreateBundlePayload = {
      bundle_name: strategyForm.bundle_name || "Untitled Bundle",
      description: "",
      product_ids: selectedProducts.map((p) => p.id),
      product_names: selectedProducts.map((p) => p.name),
      original_price: selectedProducts.reduce((sum, p) => sum + (p.price || 0), 0),
      bundle_price: Number(pricingForm.bundle_price ?? 0),
      discount_percentage: Number(pricingForm.discount_percentage ?? 0),
      bundle_strategy: strategyForm.bundle_strategy,
      bundle_type: strategyForm.bundle_type || "manual",
      is_manual: strategyForm.bundle_type === "manual",
      start_date: pricingForm.startDate ? pricingForm.startDate.toISOString() : undefined,
      end_date: pricingForm.endDate ? pricingForm.endDate.toISOString() : undefined,
      auto_activate: pricingForm.autoActivate,
      show_on_kiosk: pricingForm.showOnKiosk,
      show_on_staff: pricingForm.showOnStaff,
    };

    try {
      setSaving(true);
      await createBundle(payload);
      alert("Bundle created successfully.");
      router.push("/bundles-dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create bundle. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    if (!saving) {
      await handleSave();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white opacity-100 mx-auto relative box-border p-0 flex flex-col">
      <CreateBundleHeader
        step={step}
        onNext={handleNext}
        onBack={() => router.back()}
      />
      <div className="w-full mx-auto px-4 flex justify-center">
        <div className="w-full max-w-full">
          {step === 1 && <BundleStrategy value={strategyForm} onChange={handleStrategyChange} />}
          {step === 2 && (
            <ProjectManagement
              selectedProducts={selectedProducts}
              onToggleProduct={toggleProductSelection}
            />
          )}
          {step === 3 && <BundlePricing value={pricingForm} onChange={handlePricingChange} />}
        </div>
      </div>
    </div>
  );
}
