"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { buildImageUrl } from "@/lib/utils";
import { ArrowLeft, Edit2, Pause, Copy, Trash2 } from 'lucide-react';
import StatCards from '@/components/ui/StatCards';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardPercentage,
} from '@/components/ui/card';

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

interface BundleDetailProps {
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
  bundleStrategy?: string;
  targetAudience?: string;
  reasoning?: string;
  bundleType?: string;
  startDate?: string;
  endDate?: string;
}

const statCardsData = [
  {
    title: "Active Bundles",
    value: "22",
    percentage: "+12%",
    description: "Running campaigns",
    variant: "active-bundle" as const,
    valueVariant: "bundle-number" as const,
    descVariant: "running-campaigns" as const,
  },
  {
    title: "Average bundle",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
  },
  {
    title: "Revenue from Bundles",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
  },
  {
    title: "Slow-Moving Items",
    value: "5",
    percentage: "+12%",
    description: "This Week",
    variant: "slow-moving" as const,
    valueVariant: "bundle-number" as const,
    descVariant: "this-week" as const,
  }
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const FALLBACK_PRODUCTS: BundleProduct[] = [
  { id: 'f1', name: 'Pumpkin Spice Latte', price: 20.0, quantity: 1, isAvailable: true },
  { id: 'f2', name: 'Pumpkin Spice Latte', price: 20.0, quantity: 1, isExpiring: true },
  { id: 'f3', name: 'Pumpkin Spice Latte', price: 20.0, quantity: 1, isAvailable: true },
  { id: 'f4', name: 'Pumpkin Spice Latte', price: 20.0, quantity: 1, isExpiring: true },
];

const ProductCard: React.FC<{ product: BundleProduct; fallbackImage: string }> = React.memo(({ product, fallbackImage }) => {
  return (
    <div className="relative w-full lg:w-[261px] h-[200px] lg:h-[222px] border border-[#EEEEEE] rounded-[20px] lg:rounded-[24px] overflow-hidden bg-white">
      <div className="w-full h-[120px] lg:w-[261px] lg:h-[134px] bg-[#D5D6D6] overflow-hidden">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" />
        )}
      </div>

      {(product.isExpiring || product.isUrgentExpiry) && (
        <span className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-rose-400 text-white text-[10px] lg:text-[11px] font-semibold px-2 lg:px-3 py-1 rounded-full shadow-sm">Slow Moving</span>
      )}
      {product.isAvailable && !product.isExpiring && (
        <span className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-emerald-600 text-white text-[10px] lg:text-[11px] font-semibold px-2 lg:px-3 py-1 rounded-full shadow-sm">Top Seller</span>
      )}

      <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] lg:h-[88px] flex items-center px-3 lg:px-[12px]">
        <div className="w-full lg:w-[234px] h-[50px] lg:h-[55px]">
          <div className="font-semibold text-sm text-gray-900 truncate">{product.name}</div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-700 font-medium">AED {product.price.toFixed(2)}</span>
            <span className="text-gray-500 text-xs">QTY {product.quantity || 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
});



export default function BundleDetail({ bundleData }: { bundleData: BundleDetailProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedDays, setSelectedDays] = useState<string[]>(['S']);
  const fallbackImage = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL || buildImageUrl(undefined);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const calculateOriginalPrice = () => {
    if (bundleData.originalPrice) return bundleData.originalPrice;
    if (bundleData.products) {
      return bundleData.products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);
    }
    return 0;
  };

  const originalPrice = calculateOriginalPrice();
  const bundlePrice = bundleData.bundlePrice || 0;
  const savings = originalPrice - bundlePrice;
  const discountPercentage = bundleData.discountPercentage || (originalPrice > 0 ? ((savings / originalPrice) * 100).toFixed(1) : 0);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-12">

        <button
          className="flex items-center gap-2 text-[#222] text-[18px] font-lato font-normal cursor-pointer hover:opacity-70 transition-opacity mb-6 -ml-10"
          onClick={() => router.back()}
        >
          <ArrowLeft size={25} className="text-[#222]" />
          <span className="font-lato font-normal text-[18px] text-[#222]">Back</span>
        </button>


        <div className="flex items-center justify-between md:gap-3">
          <div className="flex items-center gap-3">
            <h1 className="font-lato text-[32px] font-semibold text-[#1E1E1E]">{bundleData.name}</h1>
            <span className={`px-3 py-1 text-[14px] font-medium rounded-md ${
              bundleData.status === 'Active' ? 'bg-emerald-600 text-white' :
              bundleData.status === 'Pending' ? 'bg-black text-[#FFFFFF]' : // Changed from yellow to purple
              'bg-gray-100 text-[#FFFFFF]'
            }`}>
              {bundleData.status === 'Pending' ? 'AI Suggested' : bundleData.status}
            </span>
            <span className="px-3 py-1 bg-[#05C16826] font-lato text-[14px] text-[#14CA74] font-normal rounded-md">
              Active
            </span>
          </div>
          
          <div className="flex items-center gap-2 ">

          <button 
            onClick={() => {
              const id = bundleData?.id;
              if (!id || (typeof id !== 'number' && !/^\d+$/.test(String(id)))) {
                console.warn('Attempted to navigate to edit with invalid id:', id);
                alert('Cannot edit bundle: invalid bundle id');
                return;
              }
              router.push(`/create-bundle?edit=${encodeURIComponent(String(id))}`);
            }}
            className="w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-colors"
          >
            <Edit2 size={18} className="text-gray-500" />
          </button>
            <button className="w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-colors">
              <Pause size={18} className="text-gray-500" />
            </button>
            <button className="w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-colors">
              <Copy size={18} className="text-gray-500" />
            </button>
            <button className="w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-colors">
              <Trash2 size={18} className="text-gray-500" />
            </button>
            <button className="px-5 py-2.5 bg-[#1A5D4A] text-white text-[18px] font-medium rounded-lg hover:bg-emerald-700 transition-colors ml-2">
              Create New Bundle
            </button>
            {/* Add Product moved to Editbundle products section per UX — no button here */}
          </div>
        </div>
      </div>

      {/* Metrics (stat cards) */}
      <div className="mb-6">
        <StatCards
          cards={[
            { title: 'Orders', value: '89', percentage: '+12%', description: 'This Week', variant: 'active-bundle', valueVariant: 'bundle-number', descVariant: 'this-week' },
            { title: 'Revenue', value: 'AED 2,499', percentage: '+12%', description: 'Running campaign', variant: 'revenue', valueVariant: 'bundle-amount', descVariant: 'this-month' },
            { title: 'AOV', value: '22%', percentage: '+12%', description: 'This Week', variant: 'revenue', valueVariant: 'bundle-amount', descVariant: 'this-week' },
            { title: 'Conversion Rate', value: '+14%', percentage: '+12%', description: 'This Week', variant: 'slow-moving', valueVariant: 'bundle-number', descVariant: 'this-week' },
          ]}
          isVisible={true}
        />
      </div>

      {/* Main Content - Columns */}
      <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8">
        {/* Left Column - Bundle Summary */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-[20px] font-lato font-semibold text-[#1E1E1E] mb-5 mt-5">Bundle Summary</h2>
          <div className="w-full bg-white p-6 overflow-hidden shadow-sm border border-[#EEEEEE] rounded-[16px] flex flex-col gap-6">
            {/* Bundle Info */}
                    <div >
                      <div className="text-[14px] font-lato font-semibold text-[#6A7282] mb-1.5">Bundle Price</div>
                      <div className="text-[30px] font-lato font-semibold text-black">AED {bundlePrice.toFixed(2)}</div>
                    </div>

                    <div>
                      <div className="text-[18px] font-lato font-medium text-black mb-2">Why this bundle?</div>
                      <p className="text-[18px] text-[#787777] leading-relaxed">
                        {bundleData.reasoning || bundleData.description || 
                        "The Morning Energy Boost is a perfect, refreshing caffeine boost and a sweet morning pick-me-up. This quick, good-mood event boost is ideal as a festive, joyful start to the day."}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div >
                        <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md">
                          <span className="text-[16px] font-lato font-normal text-gray-600 pr-3 pl-3">AOV</span>
                          <div className="bg-[#05C16833] border border-[rgba(5,193,104,0.2)] rounded-[3px] px-[8px] py-[3px] flex items-center gap-[4px] mr-3">
                            <span className="font-lato font-medium text-[12px] leading-[14px] text-[#14CA74]">{discountPercentage}%</span>
                            <ArrowUpRight className="w-[14px] h-[14px] text-[#14CA74]" />
                          </div>
                        </div>
                        
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md">
                          <span className="text-[16px] font-lato font-normal text-gray-600 pr-3 pl-3">Orders/day</span>
                          <div className="bg-[#05C16833] border border-[rgba(5,193,104,0.2)] rounded-[3px] px-[6px] py-[4px] flex items-center gap-[4px] mr-3">
                            <span className="font-lato font-medium text-[12px] leading-[14px] text-[#14CA74]">24%</span>
                            <ArrowUpRight className="w-[14px] h-[14px] text-[#14CA74]" />
                          </div>
                        </div>
                        
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md">
                          <span className="text-[16px] font-lato font-normal text-gray-600 pr-3 pl-3">Waste</span>
                          <div className="bg-[#05C16833] border border-[rgba(5,193,104,0.2)] rounded-[3px] px-[6px] py-[4px] flex items-center gap-[4px] mr-3">
                            <span className="font-lato font-medium text-[12px] leading-[14px] text-[#14CA74]">-10%</span>
                            <ArrowUpRight className="w-[14px] h-[14px] text-[#14CA74]" />
                          </div>
                        </div>
                        
                      </div>
            </div>
          </div>
        </div>

        {/* Right Column - Products in Bundle */}
        <div className="w-full lg:w-1/2">
          <div className="w-full">
            <h2 className="text-[20px] md:text-[20px] font-lato font-semibold text-black mt-6 lg:mt-5 mb-5">Products in Bundle</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {bundleData.products && bundleData.products.length > 0 ? (
                bundleData.products.map((product) => (
                  <div key={product.id} className="relative w-full h-[200px] md:h-[222px] border border-[#EEEEEE] rounded-[20px] overflow-hidden bg-white">
                    <div className="w-full h-[120px] md:h-[134px] bg-[#D5D6D6] overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" />
                      )}
                    </div>

                    <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] md:h-[88px] flex items-center px-3">
                      <div className="w-full h-[50px] md:h-[55px]">
                        <div className="font-semibold text-[20px] font-lato text-black truncate">{product.name}</div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-[#787777] font-lato text-[18px] font-normal">AED {product.price.toFixed(2)}</span>
                          <span className="text-[#787777] font-lato text-[18px] font-normal">QTY {product.quantity || 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
              // Fallback products if none provided
              [
                { id: 'f1', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isAvailable: true },
                { id: 'f2', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isExpiring: true },
                { id: 'f3', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isAvailable: true },
                { id: 'f4', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isExpiring: true }
              ].map((item, idx) => (
                <div key={idx} className="relative w-full lg:w-[261px] h-[200px] lg:h-[222px] border border-[#EEEEEE] rounded-[20px] lg:rounded-[24px] overflow-hidden bg-white">
                  <div className="w-full h-[120px] lg:w-[261px] lg:h-[134px] bg-[#D5D6D6]" />
                  <span className={`absolute top-2 lg:top-3 right-2 lg:right-3 ${item.isExpiring ? 'bg-rose-400' : 'bg-emerald-600'} text-white text-[10px] lg:text-[11px] font-semibold px-2 lg:px-3 py-1 rounded-full shadow-sm`}>
                    {item.isExpiring ? 'Slow Moving' : 'Top Seller'}
                  </span>
                  <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] lg:h-[88px] flex items-center px-3 lg:px-[12px]">
                    <div className="w-full lg:w-[234px] h-[50px] lg:h-[55px]">
                      <div className="font-semibold text-sm text-gray-900 truncate">{item.name}</div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-700 font-medium">AED {item.price.toFixed(2)}</span>
                        <span className="text-gray-500 text-xs">QTY {item.quantity || 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        </div>
      </div>

      
      {/* Availability Rules Section - Outside of columns grid */}
      <div>
        <h2 className="text-[20px] font-lato font-semibold text-black mb-5 mt-10">Availability Rules</h2>
       
      </div>
        <div className="w-full mx-auto max-w-screen-2xl bg-white p-8 rounded-[16px] shadow-sm border border-[#EEEEEE]">
        
        <div className="mb-5 ">
          <div className="text-[18px] font-lato font-normal text-black mb-3">Channels</div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg text-[16px] font-lato font-normal text-black hover:border-gray-400 transition-colors">
              <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
              Kiosk
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg text-[16px] font-lato font-normal text-black hover:border-gray-400 transition-colors">
              <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
              Counter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-5">
          <div>
            <div className="text-[18px] font-lato font-normal text-black mb-3">Days</div>
            <div className="flex gap-4">
              {days.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleDay(day)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[16px] font-lato font-semibold transition-all ${
                    selectedDays.includes(day)
                      ? 'bg-[#1A5D4A] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[16px] font-lato font-semibold text-gray-900 mb-3">Time Range</div>
            <div>
              <div className="inline-block bg-white border border-gray-200 px-3 py-2 rounded-lg text-[16px] font-lato text-gray-700 font-medium">
                {bundleData.startDate && bundleData.endDate ? (
                  `${new Date(bundleData.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(bundleData.endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                ) : (
                  '5:00 AM - 11:00 AM'
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className="flex items-center gap-2.5 text-sm text-gray-700">
            <span className="text-[16px] font-normal font-lato">Event Linked</span>
          </button>
          <div className="text-[14px] font-lato text-[#6A7282] mt-1.5">
            {bundleData.eventName || 'No event linked'}
          </div>
        </div>
      </div>
    </div>
  );
}