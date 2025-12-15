"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import BundleDetail from "@/components/features/ai-suggestions/BundleDetail";
import { getBundleDetails, type BundleDetails } from "@/app/api/bundles/getBundlesById";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BundleProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  image?: string;
  description?: string;
  isAvailable?: boolean;
  isExpiring?: boolean;
  isUrgentExpiry?: boolean;
}

interface BundleDetailData {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Draft' | 'Pending';
  images: string[];
  products?: BundleProduct[];
  bundlePrice?: number;
  originalPrice?: number;
  discountPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
  eventName?: string;
  eventType?: string;
  eventDate?: string;
  bundleStrategy?: string;
  targetAudience?: string;
  reasoning?: string;
  bundleType?: string;
  weatherTemp?: number;
  weatherCondition?: string;
  weatherDescription?: string;
  isExtremeWeather?: boolean;
  startDate?: string;
  endDate?: string;
  isManual?: boolean;
}

export default function SingleBundlePage() {
  const params = useParams();
  const router = useRouter();
  const bundleId = params?.id as string;

  const [bundle, setBundle] = useState<BundleDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        setLoading(true);
        setError(null);

        const bundleData = await getBundleDetails(bundleId);

        const transformedBundle: BundleDetailData = {
          id: bundleData.id,
          name: bundleData.bundle_name || 'Untitled Bundle',
          description: bundleData.description || bundleData.bundle_strategy || '',
          status: bundleData.status === 'accepted' || bundleData.status === 'active' ? 'Active' :
            bundleData.status === 'pending' ? 'Pending' : 'Draft',
          images: bundleData.image_url ? [bundleData.image_url] : [],
          bundlePrice: bundleData.bundle_price,
          originalPrice: bundleData.original_price,
          discountPercentage: bundleData.discount_percentage,
          createdAt: bundleData.created_at,
          updatedAt: bundleData.bundle_expiry_datetime,
          eventName: bundleData.event_name,
          eventType: bundleData.event_type,
          eventDate: bundleData.event_date,
          bundleStrategy: bundleData.bundle_strategy,
          targetAudience: bundleData.target_audience,
          reasoning: bundleData.reasoning,
          bundleType: bundleData.bundle_type,
          weatherTemp: bundleData.weather_temp,
          weatherCondition: bundleData.weather_condition,
          weatherDescription: bundleData.weather_description,
          isExtremeWeather: bundleData.is_extreme_weather,
          startDate: bundleData.created_at,
          endDate: bundleData.bundle_expiry_datetime,
          isManual: bundleData.is_manual,
          products: bundleData.products && bundleData.products.length > 0 ?
            bundleData.products.map((p: any) => ({
              id: p.product_id || String(p.product_id || p.id),
              name: p.name || '',
              price: Number(p.product_price || 0),
              quantity: 1,
              image: p.image,
              description: p.description,
              isAvailable: p.is_available,
              isExpiring: p.is_expiring,
              isUrgentExpiry: p.is_urgent_expiry
            })) : undefined
        };

        setBundle(transformedBundle);
      } catch (err) {
        console.error('Failed to fetch bundle:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load bundle details.';
        setError(errorMessage);
        setBundle({
          id: parseInt(bundleId) || 0,
          name: 'Bundle Details',
          description: 'Unable to load bundle data',
          status: 'Draft',
          images: [],
          bundlePrice: 0,
          originalPrice: 0,
          discountPercentage: 0,
          // display settings intentionally omitted for single bundle view
        });
      } finally {
        setLoading(false);
      }
    };

    if (bundleId) {
      fetchBundle();
    }
  }, [bundleId]);

  return (
    <AppLayout>
      <div className="w-full min-h-screen bg-white">
        <div className="p-6 border-b border-[#EEEEEE] bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-full">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <div>
                <h1 className="font-lato font-semibold text-[20px] text-[#1E1E1E]">Bundle Details</h1>
                <p className="text-sm text-[#787777] font-lato">View and manage bundle information</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 w-full box-border">
          {loading ? (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#EEEEEE] border-t-[#1A5D4A] rounded-full animate-spin" />
                <p className="font-lato text-[#787777]">Loading bundle details...</p>
              </div>
                <p className="font-lato text-lg text-red-600 mb-4">{error}</p>
                <Button
                  onClick={() => router.back()}
                  className="bg-[#1A5D4A] hover:bg-[#155040] text-white"
                >
                  Go Back
                </Button>
              </div>
          ) : bundle ? (
            <BundleDetail bundleData={bundle} />
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
