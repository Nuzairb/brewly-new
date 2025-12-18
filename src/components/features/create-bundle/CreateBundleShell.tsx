"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import CreateBundleHeader from "@/components/features/create-bundle/CreateBundleHeader";
import BundleStrategy from "@/components/features/create-bundle/BundleStrategy";
import ProjectManagement from "@/components/features/create-bundle/ProductManagement";
import BundlePricing from "@/components/features/create-bundle/BundlePricing";
import BundleEditForm from '@/components/features/ai-suggestions/Editbundle';
import { createBundle, CreateBundlePayload } from "@/app/api/bundles/createBundle";
import { getProducts } from '@/app/api/products/getProducts';

export default function CreateBundleShell() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get('edit');

  const [strategyForm, setStrategyForm] = useState<any>({
    bundle_strategy: "",
    bundle_name: "",
    bundle_type: "manual",
    description: "",
  });

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const [pricingForm, setPricingForm] = useState<any>({
    bundle_price: undefined,
    discount_percentage: undefined,
    startDate: undefined,
    endDate: undefined,
    autoActivate: true,
    showOnKiosk: true,
    showOnStaff: true,
  });

  const [saving, setSaving] = useState(false);

  const handleStrategyChange = (updated: Partial<any>) => {
    setStrategyForm((prev: any) => ({ ...prev, ...updated }));
  };

  const handlePricingChange = (updated: Partial<any>) => {
    setPricingForm((prev: any) => ({ ...prev, ...updated }));
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

    // Enrich selected products with backend data (image, numeric id, price) so backend can persist them
    let allProducts: any[] = [];
    try {
      allProducts = await getProducts();
    } catch (e) {
      allProducts = [];
    }

    const productsForPayload = selectedProducts.map((p) => {
      const rawId = String(p.id ?? '').trim();
      const nameLower = String(p.name ?? '').toLowerCase().trim();
      const match = allProducts.find(ap => {
        const apId = String(ap.id ?? ap.product_id ?? '').trim();
        const apSku = String((ap as any).sku ?? '').trim();
        const apName = String((ap as any).name ?? '').toLowerCase().trim();
        return apId === rawId || apSku === rawId || apName === nameLower;
      });

      const resolvedId = match ? String(match.id ?? match.product_id ?? '') : rawId;
      const image = match ? (match.image || match.image_url) : undefined;
      const price = match ? Number(match.price ?? match.product_price ?? p.price ?? 0) : Number(p.price ?? 0);

      return {
        product_id: resolvedId,
        name: p.name,
        product_price: price,
        quantity: p.quantity ?? 1,
        image,
        description: match?.description ?? '',
        category_id: match?.category_id ?? match?.category ?? null,
        ingredients: match?.ingredients ?? [],
        is_available: typeof (match?.is_available) !== 'undefined' ? Boolean(match.is_available) : true,
      };
    });

    const payload: CreateBundlePayload & { products?: any[] } = {
      bundle_name: strategyForm.bundle_name || "Untitled Bundle",
      description: strategyForm.description || "",
      // Use resolved product_ids from the enriched products payload so backend receives backend ids where available
      product_ids: productsForPayload.map((pp) => pp.product_id),
      product_names: productsForPayload.map((pp) => pp.name),
      original_price: selectedProducts.reduce((sum, p) => sum + (p.price || 0), 0),
      bundle_price: Number(pricingForm.bundle_price ?? 0),
      discount_percentage: Number(pricingForm.discount_percentage ?? 0),
      bundle_strategy: strategyForm.bundle_strategy,
      bundle_type: strategyForm.bundle_type || "manual",
      is_manual: strategyForm.bundle_type === "manual",
      start_date: pricingForm.startDate ? pricingForm.startDate.toISOString() : null,
      end_date: pricingForm.endDate ? pricingForm.endDate.toISOString() : null,
      auto_activate: pricingForm.autoActivate,
      show_on_kiosk: pricingForm.showOnKiosk,
      show_on_staff: pricingForm.showOnStaff,
      products: productsForPayload,
      image_url: productsForPayload.length > 0 ? productsForPayload[0].image : undefined,
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
      {!editId && (
        <CreateBundleHeader
          step={step}
          onNext={handleNext}
          onBack={() => router.back()}
        />
      )}
      <div className="w-full mx-auto px-4 flex justify-center">
        <div className="w-full max-w-full">
          {editId ? (
            <BundleEditForm />
          ) : (
            <>
              {step === 1 && <BundleStrategy value={strategyForm} onChange={handleStrategyChange} />}
              {step === 2 && (
                <ProjectManagement
                  selectedProducts={selectedProducts}
                  onToggleProduct={toggleProductSelection}
                />
              )}
              {step === 3 && <BundlePricing value={pricingForm} onChange={handlePricingChange} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
