"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gray-50 p-6 bg-white ">
      {/* Header */}
      <div className="mb-12">

        <button
          className="flex items-center gap-2 text-[#222] text-[18px] font-normal cursor-pointer hover:opacity-70 transition-opacity mb-6 pr-[30px]"
          onClick={() => router.back()}
        >
          <ArrowLeft size={24} className="text-[#222]" />
          <span className="font-lato font-normal text-[18px] text-[#222]">Back</span>
        </button>


        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-900">{bundleData.name}</h1>
            <span className={`px-3 py-1 text-xs font-medium rounded-md ${
              bundleData.status === 'Active' ? 'bg-emerald-600 text-white' :
              bundleData.status === 'Pending' ? 'bg-black text-white' : // Changed from yellow to purple
              'bg-gray-100 text-gray-700'
            }`}>
              {bundleData.status === 'Pending' ? 'AI Suggested' : bundleData.status}
            </span>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-md">
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
            className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors shadow-sm"
          >
            <Edit2 size={18} className="text-gray-500" />
          </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors shadow-sm">
              <Pause size={18} className="text-gray-500" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors shadow-sm">
              <Copy size={18} className="text-gray-500" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors shadow-sm">
              <Trash2 size={18} className="text-gray-500" />
            </button>
            <button className="px-5 py-2.5 bg-[#1A5D4A] text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors ml-2">
              Create New Bundle
            </button>
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

      {/* Main Content */}
      <div className="flex w-[1165px] h-[600px] gap-[35px]">
        {/* Left Column - Bundle Summary */}
        <div className="w-[560px] h-[509px] mb-10">
          <h2 className="text-[24px] font-semibold text-gray-900 mb-5 mt-10">Bundle Summary</h2>
          <div className="w-[730px] h-[500px] bg-white p-[24px] overflow-hidden shadow-sm border border-[#EEEEEE] rounded-[16px] flex flex-col gap-6">
            {/* Bundle Info */}
                    <div className="mb-4">
                      <div className="text-[18px] text-gray-600 mb-1.5">Bundle Price</div>
                      <div className="text-4xl font-extrabold text-gray-900">AED {bundlePrice.toFixed(2)}</div>
                    </div>

                    <div className="mb-5">
                      <div className="text-[16px] font-semibold text-gray-900 mb-2">Why this bundle?</div>
                      <p className="text-[14px] text-gray-600 leading-relaxed">
                        {bundleData.reasoning || bundleData.description || 
                        "The Morning Energy Boost is a perfect, refreshing caffeine boost and a sweet morning pick-me-up. This quick, good-mood event boost is ideal as a festive, joyful start to the day."}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div >
                        <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md">
                          <span className="text-sm text-gray-600 pr-3 pl-3">AOV</span>
                          <span className="text-sm text-gray-500 bg-[#05C16833] mr-3">{discountPercentage}%</span>
                        </div>
                        
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md">
                          <span className="text-sm text-gray-600 pr-3 pl-3">Orders/day</span>
                          <span className="text-sm text-gray-500 bg-[#05C16833] mr-3">24%</span>
                        </div>
                        
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md">
                          <span className="text-sm text-gray-600 pr-3 pl-3">Waste</span>
                          <span className="text-sm text-gray-500 bg-[#05C16833] mr-3">-10%</span>
                        </div>
                        
                      </div>
            </div>
          </div>

          {/* AI Reasoning */}
          <div className="w-[1350px] h-[250px] bg-white p-[24px] rounded-[16px] shadow-sm border border-[#EEEEEE] mt-10 mb-10">
            <h2 className="text-base font-semibold text-gray-900 mb-5">AI Reasoning</h2>
            
            <div className="h-[165px] grid grid-cols-3 gap-4">
              <div className="bg-rose-50 p-4 rounded-lg">
                <div className="text-sm font-semibold text-gray-900 mb-3">Why this works</div>
                <ul className="text-sm text-gray-700 space-y-1.5 leading-relaxed">
                  <li>• Latte has 42% repeat rate</li>
                  <li>• Blueberry Muffin sells 38% slower solo</li>
                </ul>
              </div>

              <div className="h-[165px] bg-sky-50 p-4 rounded-lg">
                <div className=" text-sm font-semibold text-gray-900 mb-3">Best performance</div>
                <ul className="text-sm text-gray-700 space-y-1.5 leading-relaxed">
                  <li>• Evenings (5-9 PM)</li>
                  <li>• Hot days / events</li>
                </ul>
              </div>

              <div className="h-[165px] bg-violet-50 p-4 rounded-lg">
                <div className="text-sm font-semibold text-gray-900 mb-3">Risk check</div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <div className="mb-2 font-medium">Margin:</div>
                  <div className="mb-3">Healthy 38% margin maintained</div>
                  <div className="mb-2 font-medium">Stock:</div>
                  <div>Low risk - all items well stocked</div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Rules */}
          <div className="w-[1350px] bg-white p-[24px] rounded-[16px] shadow-sm border border-[#EEEEEE] mb-10">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Availability Rules</h2>
            
            <div className="mb-5">
              <div className="text-sm font-semibold text-gray-900 mb-3">Channels</div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  Kiosk
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  Counter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-5">
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-3">Days</div>
                <div className="flex gap-2">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleDay(day)}
                      className={`w-15 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                        selectedDays.includes(day)
                          ? 'bg-teal-500 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900 mb-3">Time Range</div>
                <div>
                  <div className="inline-block bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 font-medium">
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
                <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                <span className="font-medium">Event Linked</span>
              </button>
              <div className="text-xs text-gray-500 mt-1.5 ml-6">
                {bundleData.eventName || 'No event linked'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Products in Bundle */}
        <div className="w-full lg:w-[553px] h-auto lg:h-[509px] lg:ml-[200px]">
        <div className="w-full lg:w-[553px] h-auto lg:h-[461px]">
          <h2 className="text-[20px] md:text-[24px] font-semibold text-gray-900 mt-6 lg:mt-10 mb-5">Products in Bundle</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[17px]">
            {bundleData.products && bundleData.products.length > 0 ? (
              bundleData.products.map((product) => (
                <div key={product.id} className="relative w-full lg:w-[261px] h-[200px] lg:h-[222px] border border-[#EEEEEE] rounded-[20px] lg:rounded-[24px] overflow-hidden bg-white">
                  <div className="w-full h-[120px] lg:w-[261px] lg:h-[134px] bg-[#D5D6D6] overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" />
                    )}
                  </div>

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
    </div>
  );
}