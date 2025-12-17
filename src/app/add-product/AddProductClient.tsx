"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductManagement from "@/components/features/create-bundle/ProductManagement";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddProductClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get("returnUrl") || undefined;
  const bundleId = searchParams?.get("bundleId") || undefined;

  const [selectedProducts, setSelectedProducts] = useState<Array<{ id: string; product_id?: string; name?: string; price?: number; image?: string }>>([]);

  const onToggleProduct = (product: any) => {
    const id = String(product.id ?? product.product_id ?? product.product_name ?? product.name ?? Math.random());
    const exists = selectedProducts.some((p) => p.id === id);
    const item = {
      id,
      product_id: product.id ?? product.product_id ?? undefined,
      name: product.name ?? product.product_name ?? `Product ${id}`,
      price: product.price ?? product.product_price ?? 0,
      image: product.image ?? product.image_url ?? undefined,
    };
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
    } else {
      setSelectedProducts([...selectedProducts, item]);
    }
  };

  const handleAdd = () => {
    const ids = selectedProducts.map((p) => p.id).join(",");
    try {
      const key = bundleId ? `selectedProductsForBundle_${bundleId}` : `selectedProducts`;
      sessionStorage.setItem(key, JSON.stringify(selectedProducts));
    } catch (e) {}
    if (returnUrl) {
      const sep = returnUrl.includes("?") ? "&" : "?";
      const dest = `${returnUrl}${sep}selectedProducts=${encodeURIComponent(ids)}${bundleId ? `&bundleId=${encodeURIComponent(bundleId)}` : ""}`;
      router.push(dest);
      return;
    }
    try {
      const key = bundleId ? `selectedProductsForBundle_${bundleId}` : `selectedProducts`;
      sessionStorage.setItem(key, ids);
    } catch (e) {}
    router.back();
  };

  return (
    <div className="min-h-screen bg-white mt-10 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div>
            <button
              className="flex items-center gap-2 text-[#222] text-[18px] font-lato font-normal cursor-pointer hover:opacity-70 transition-opacity mb-4 ml-4"
              onClick={() => router.back()}
            >
              <ArrowLeft size={25} className="text-black" />
              <span className="font-lato font-normal text-[18px] text-[#222]">Back</span>
            </button>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-lato font-semibold ml-[80px]">Add Product</h1>
          <div className="flex items-center font-lato font-medium gap-4">
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button variant="ghost" onClick={handleAdd} disabled={selectedProducts.length === 0}>Add Product</Button>
          </div>
        </div>

        <ProductManagement
          selectedProducts={selectedProducts.map(p => ({ id: p.id, name: p.name || '', price: p.price || 0 }))}
          onToggleProduct={onToggleProduct}
        />
      </div>
    </div>
  );
}
