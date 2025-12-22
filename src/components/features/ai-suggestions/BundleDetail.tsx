"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { buildImageUrl } from "@/lib/utils";
import { ArrowLeft, Edit2, Pause, Play, Copy, Trash2 } from 'lucide-react';
import { updateBundleById } from '@/lib/hooks/useBundleApi';
import AIDeleteDialog from '@/components/ui/ai-delete-dialog';
import { deleteBundle } from '@/app/api/bundles/deleteBundle';
import StatCards from '@/components/ui/StatCards';

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
  is_manual?: boolean;
  isManual?: boolean;
}

const ProductCard: React.FC<{ product: BundleProduct; fallbackImage: string }> = React.memo(({ product, fallbackImage }) => {
  return (
    <div className="relative w-full lg:w-[261px] h-[200px] lg:h-[222px] border border-[#EEEEEE] rounded-[20px] lg:rounded-[24px] overflow-hidden bg-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-emerald-100">
      <div className="w-full h-[120px] lg:w-[261px] lg:h-[134px] bg-[#D5D6D6] overflow-hidden transition-all duration-500 ease-in-out hover:scale-[1.03]">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" />
        )}
      </div>

      {(product.isExpiring || product.isUrgentExpiry) && (
        <span className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-rose-400 text-white text-[10px] lg:text-[11px] font-semibold px-2 lg:px-3 py-1 rounded-full shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">Slow Moving</span>
      )}
      {product.isAvailable && !product.isExpiring && (
        <span className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-emerald-600 text-white text-[10px] lg:text-[11px] font-semibold px-2 lg:px-3 py-1 rounded-full shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">Top Seller</span>
      )}

      <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] lg:h-[88px] flex items-center px-3 lg:px-[12px] transition-all duration-300 ease-in-out group">
        <div className="w-full lg:w-[234px] h-[50px] lg:h-[55px]">
          <div className="font-semibold text-sm text-gray-900 truncate transition-all duration-300 ease-in-out group-hover:text-emerald-800">{product.name}</div>
          <div className="flex items-center justify-between text-sm mt-1 transition-all duration-300 ease-in-out">
            <span className="text-gray-700 font-medium transition-colors duration-300 ease-in-out group-hover:text-emerald-700">AED {product.price.toFixed(2)}</span>
            <span className="text-gray-500 text-xs transition-colors duration-300 ease-in-out group-hover:text-gray-700">QTY {product.quantity || 1}</span>
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
  const [mounted, setMounted] = useState(false);
  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const [localStatus, setLocalStatus] = useState<string>(capitalize(String(bundleData.status || 'Draft')));
  const [toggling, setToggling] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bundleToDelete, setBundleToDelete] = useState<{ id: number; name?: string } | null>(null);
  
  const fallbackImage = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL || buildImageUrl(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white p-4 sm:p-6 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#1A5D4A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 animate-pulse">Loading bundle details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 animate-fadeIn">
      {/* Header */}
      <div className="mb-12 animate-slideDown">
        <button
          className="flex items-center gap-2 text-[#222] text-[18px] font-lato font-normal cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out mb-6 -ml-10 hover:-translate-x-1 active:scale-95 group"
          onClick={() => router.back()}
        >
          <ArrowLeft size={25} className="text-[#222] transition-all duration-300 ease-in-out group-hover:-translate-x-1" />
          <span className="font-lato font-normal text-[18px] text-[#222] transition-all duration-300 ease-in-out group-hover:text-emerald-700">Back</span>
        </button>

        <div className="flex items-center justify-between md:gap-3 animate-slideDown">
          <div className="flex items-center gap-3 transition-all duration-500 ease-out">
            <h1 className="font-lato text-[32px] font-semibold text-[#1E1E1E] transition-all duration-300 ease-in-out hover:text-emerald-800">{bundleData.name}</h1>
            {(() => {
              const statusVal = (localStatus || bundleData.status || '').toString();
              const s = statusVal.toLowerCase();
              const isAISuggested = bundleData?.is_manual === false || bundleData?.isManual === false || s === 'pending';

              if (isAISuggested) {
                return (
                  <>
                    <span className={`px-3 py-1 text-[14px] font-medium rounded-md bg-black text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md`}>AI Suggested</span>
                    {s === 'active' ? (
                      <span className="px-3 py-1 bg-[#05C16826] font-lato text-[14px] text-[#14CA74] font-normal rounded-md ml-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">Active</span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-[#1E1E1E] font-lato text-[14px] font-normal rounded-md ml-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">{capitalize(statusVal)}</span>
                    )}
                  </>
                );
              }

              const badgeClass = s === 'active' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-[#1E1E1E]';
              return (
                <span className={`px-3 py-1 text-[14px] font-medium rounded-md ${badgeClass} transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md`}>
                  {capitalize(statusVal)}
                </span>
              );
            })()}
          </div>
          
          <div className="flex items-center gap-2 transition-all duration-300 ease-in-out">
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
              className="w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:border-emerald-300 group"
            >
              <Edit2 size={18} className="text-gray-500 transition-all duration-300 ease-in-out group-hover:text-emerald-600 group-hover:rotate-12" />
            </button>
            <button
              onClick={async () => {
                const id = bundleData?.id;
                if (!id) return alert('Invalid bundle id');
                if (toggling) return;
                setToggling(true);
                try {
                  const current = String(localStatus || bundleData.status || '').toLowerCase();
                  const willActivate = current !== 'active';
                  const newStatus = willActivate ? 'active' : 'draft';
                  setLocalStatus(capitalize(willActivate ? 'active' : 'draft'));
                  const resp = await updateBundleById(String(id), { status: newStatus });
                  const respStatusRaw = resp && (resp.status || resp.data || resp.state) ? (resp.status || resp.data || resp.state) : newStatus;
                  const respStatus = String(respStatusRaw || newStatus).toLowerCase();
                  setLocalStatus(capitalize(respStatus));
                } catch (e) {
                  console.error('Failed to toggle bundle status', e);
                  alert('Failed to update bundle status');
                  setLocalStatus(capitalize(String(bundleData.status || 'Draft')));
                } finally {
                  setToggling(false);
                }
              }}
              className={`w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:border-emerald-300 group ${toggling ? 'opacity-60 cursor-wait animate-pulse' : ''}`}
              title={localStatus.toLowerCase() === 'active' ? 'Pause bundle (set to Draft)' : 'Activate bundle'}
            >
              {String(localStatus || bundleData.status || '').toLowerCase() === 'active' ? (
                <Pause size={18} className="text-gray-500 transition-all duration-300 ease-in-out group-hover:text-rose-600" />
              ) : (
                <Play size={18} className="text-gray-500 transition-all duration-300 ease-in-out group-hover:text-emerald-600" />
              )}
            </button>
            <button className="w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:border-emerald-300 group">
              <Copy size={18} className="text-gray-500 transition-all duration-300 ease-in-out group-hover:text-emerald-600 group-hover:rotate-12" />
            </button>
            <button
              onClick={() => {
                const id = bundleData?.id;
                if (!id) return alert('Invalid bundle id');
                setBundleToDelete({ id: Number(id), name: bundleData.name });
                setDeleteDialogOpen(true);
              }}
              className="w-14 h-12 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 rounded-md px-3 py-2.5 opacity-100 hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:border-rose-300 group"
            >
              <Trash2 size={18} className="text-gray-500 transition-all duration-300 ease-in-out group-hover:text-rose-600 group-hover:rotate-12" />
            </button>
            <button
              onClick={() => router.push('/create-bundle')}
              className="px-5 py-2.5 bg-[#1A5D4A] text-white text-[18px] font-medium rounded-lg hover:bg-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-100 active:scale-95 shadow-md hover:shadow-xl hover:-translate-y-0.5 ml-2 animate-pulse-slow"
            >
              Create New Bundle
            </button>
          </div>
        </div>
      </div>

      <AIDeleteDialog
        open={deleteDialogOpen}
        bundleName={bundleToDelete?.name}
        onOpenChange={(open) => setDeleteDialogOpen(open)}
        onConfirm={async (reason: string) => {
          if (!bundleToDelete) return;
          try {
            await deleteBundle(String(bundleToDelete.id));
            setDeleteDialogOpen(false);
            router.back();
          } catch (e) {
            console.error('Failed to delete bundle', e);
            alert('Failed to delete bundle');
          }
        }}
      />

      {/* Metrics (stat cards) */}
      <div className="mb-6 animate-slideUp">
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
        {/* Left Column - Bundle Image & Products */}
        <div className="w-full lg:w-1/2">
          {/* Bundle Image Section */}
          <div className="mb-8">
            <h2 className="text-[20px] font-lato font-semibold text-[#1E1E1E] mb-5 mt-5">Bundle Image</h2>
            <div className="relative w-full h-[530px] bg-[#F5F5F5] rounded-[16px] overflow-hidden border border-[#EEEEEE] transition-all duration-300 ease-in-out hover:shadow-lg">
              {bundleData.images && bundleData.images.length > 0 ? (
                <img 
                  src={bundleData.images[0]} 
                  alt={bundleData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No image available</span>
                </div>
              )}
              
              {/* Edit Button Overlay */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 bg-gradient-to-br from-[#011913] via-[#023626] to-[#004534]">
                <div className="w-full h-full rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img 
                    src="/icons/si_ai-fill.svg" 
                    alt="AI" 
                    className="w-5 h-5 filter brightness-0 invert"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Products in Bundle Section */}
          <div className="w-full">
            <h2 className="text-[20px] font-lato font-semibold text-black mb-5">Products in Bundle</h2>

            <div className="flex gap-4 transition-all duration-500 ease-in-out">
              {bundleData.products && bundleData.products.length > 0 ? (
                bundleData.products.map((product, index) => (
                  <div 
                      key={product.id} 
                      className="relative w-full lg:w-[261px] h-[222px] border border-[#EEEEEE] rounded-[20px] overflow-hidden bg-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-emerald-100 animate-slideUp"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                      <div className="w-full h-[134px] lg:h-[134px] bg-[#D5D6D6] overflow-hidden transition-all duration-500 ease-in-out hover:scale-[1.03]">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" />
                      )}
                    </div>

                    {(product.isExpiring || product.isUrgentExpiry) && (
                      <span className="absolute top-2 right-2 bg-rose-400 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">Slow Moving</span>
                    )}
                    {product.isAvailable && !product.isExpiring && (
                      <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">Top Seller</span>
                    )}

                    <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] flex items-center px-3 transition-all duration-300 ease-in-out group">
                      <div className="w-full h-[50px]">
                        <div className="font-semibold text-[20px] text-gray-900 truncate transition-all duration-300 ease-in-out group-hover:text-emerald-800">{product.name}</div>
                        <div className="flex items-center justify-between text-sm mt-1 transition-all duration-300 ease-in-out">
                          <span className="text-gray-700 font-lato text-[18px] font-normal ">AED {product.price.toFixed(2)}</span>
                          <span className="text-gray-500 font-lato text-[18px] font-normal">QTY {product.quantity || 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                [
                  { id: 'f1', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isAvailable: true },
                  { id: 'f2', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isExpiring: true },
                  { id: 'f3', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isAvailable: true },
                  { id: 'f4', name: 'Pumpkin Spice Latte', price: 20.00, quantity: 1, isExpiring: true }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full lg:w-[220px] h-[200px] border border-[#EEEEEE] rounded-[20px] overflow-hidden bg-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-emerald-100 animate-slideUp"
                    style={{ 
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="w-full h-[120px] bg-[#D5D6D6] transition-all duration-500 ease-in-out hover:scale-[1.03]" />
                    <span className={`absolute top-2 right-2 ${item.isExpiring ? 'bg-rose-400' : 'bg-emerald-600'} text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm`}>
                      {item.isExpiring ? 'Slow Moving' : 'Top Seller'}
                    </span>
                    <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] flex items-center px-3 transition-all duration-300 ease-in-out group">
                      <div className="w-full h-[50px]">
                        <div className="font-semibold text-sm text-gray-900 truncate transition-all duration-300 ease-in-out group-hover:text-emerald-800">{item.name}</div>
                        <div className="flex items-center justify-between text-sm mt-1 transition-all duration-300 ease-in-out">
                          <span className="text-gray-700 font-medium transition-colors duration-300 ease-in-out group-hover:text-emerald-700">AED {item.price.toFixed(2)}</span>
                          <span className="text-gray-500 text-xs transition-colors duration-300 ease-in-out group-hover:text-gray-700">QTY {item.quantity || 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Bundle Summary */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-[20px] font-lato font-semibold text-[#1E1E1E] mb-5 mt-5">Bundle Summary</h2>
         {/* Bundle Info */}
         <div className="h-[530px] overflow-auto pr-4 border border-[#EEEEEE] rounded-[16px] p-6 bg-white shadow-sm">
            <div className="">
              <div className="text-[14px] font-lato font-semibold text-[#6A7282] mb-1.5 ">Bundle Price</div>
              <div className="text-[30px] font-lato font-semibold text-black ">AED {bundlePrice.toFixed(2)}</div>
            </div>

            <div className="mt-4">
              <div className="text-[18px] font-lato font-medium text-black mb-2">Why this bundle?</div>
              <p className="text-[18px] font-lato font-medium leading-relaxed text-[#787777] line-clamp-5">
                {bundleData.reasoning || bundleData.description || 
                "The Morning Energy Boost is a perfect, refreshing caffeine boost and a sweet morning pick-me-up. This quick, good-mood event boost is ideal as a festive, joyful start to the day."}
              </p>
            </div>

            <div className="space-y-3 transition-all duration-300 ease-in-out mt-4">
              <div className="transition-all duration-300 ease-in-out hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-inner group/item">
                  <span className="text-[16px] font-lato font-normal text-gray-600 pr-3 pl-3 transition-all duration-300 ease-in-out group-hover/item:text-emerald-700">AOV</span>
                  <div className="bg-[#05C16833] border border-[rgba(5,193,104,0.2)] rounded-[3px] px-[8px] py-[3px] flex items-center gap-[4px] mr-3 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md">
                    <span className="font-lato font-medium text-[12px] leading-[14px] text-[#14CA74] transition-all duration-300 ease-in-out">{discountPercentage}%</span>
                    <ArrowUpRight className="w-[14px] h-[14px] text-[#14CA74] transition-all duration-300 ease-in-out group-hover:rotate-45" />
                  </div>
                </div>
              </div>

              <div className="transition-all duration-300 ease-in-out hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-inner group/item">
                  <span className="text-[16px] font-lato font-normal text-gray-600 pr-3 pl-3 transition-all duration-300 ease-in-out group-hover/item:text-emerald-700">Orders/day</span>
                  <div className="bg-[#05C16833] border border-[rgba(5,193,104,0.2)] rounded-[3px] px-[6px] py-[4px] flex items-center gap-[4px] mr-3 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md">
                    <span className="font-lato font-medium text-[12px] leading-[14px] text-[#14CA74] transition-all duration-300 ease-in-out">24%</span>
                    <ArrowUpRight className="w-[14px] h-[14px] text-[#14CA74] transition-all duration-300 ease-in-out group-hover:rotate-45" />
                  </div>
                </div>
              </div>

              <div className="transition-all duration-300 ease-in-out hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-2 bg-[#F6F6F6] h-[54px] rounded-md transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-inner group/item">
                  <span className="text-[16px] font-lato font-normal text-gray-600 pr-3 pl-3 transition-all duration-300 ease-in-out group-hover/item:text-emerald-700">Waste</span>
                  <div className="bg-[#05C16833] border border-[rgba(5,193,104,0.2)] rounded-[3px] px-[6px] py-[4px] flex items-center gap-[4px] mr-3 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md">
                    <span className="font-lato font-medium text-[12px] leading-[14px] text-[#14CA74] transition-all duration-300 ease-in-out">-10%</span>
                    <ArrowUpRight className="w-[14px] h-[14px] text-[#14CA74] transition-all duration-300 ease-in-out group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Availability Rules Section */}
      <div className="animate-slideUp mt-10">
        <h2 className="text-[20px] font-lato font-semibold text-black mb-5 transition-all duration-300 ease-in-out hover:text-emerald-800">Availability Rules</h2>
      </div>
      
      <div className="w-full mx-auto max-w-screen-3xl bg-white p-6 rounded-[16px] shadow-sm border border-[#EEEEEE] lg:ml-[-2px] lg:mr-[-40px] transition-all duration-500 ease-in-out hover:shadow-xl hover:border-emerald-100 animate-slideUp">
        <div className="mb-5 transition-all duration-300 ease-in-out">
          <div className="text-[18px] font-lato font-normal text-black mb-3 transition-all duration-300 ease-in-out hover:text-emerald-800">Channels</div>
          <div className="flex gap-3 transition-all duration-300 ease-in-out">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg text-[16px] font-lato font-normal text-black hover:border-emerald-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-emerald-50 hover:shadow-md group">
              <div className="w-4 h-4 border-2 border-gray-400 rounded transition-all duration-300 ease-in-out group-hover:border-emerald-500 group-hover:bg-emerald-500" />
              Kiosk
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg text-[16px] font-lato font-normal text-black hover:border-emerald-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-emerald-50 hover:shadow-md group">
              <div className="w-4 h-4 border-2 border-gray-400 rounded transition-all duration-300 ease-in-out group-hover:border-emerald-500 group-hover:bg-emerald-500" />
              Counter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-5 transition-all duration-300 ease-in-out">
          <div className="transition-all duration-300 ease-in-out">
            <div className="text-[18px] font-lato font-normal text-black mb-3 transition-all duration-300 ease-in-out hover:text-emerald-800">Days</div>
            <div className="flex gap-4 transition-all duration-300 ease-in-out">
              {days.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleDay(day)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[16px] font-lato font-semibold transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${
                    selectedDays.includes(day)
                      ? 'bg-[#1A5D4A] text-white shadow-lg transform scale-110 animate-bounce-once'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="transition-all duration-300 ease-in-out">
            <div className="text-[16px] font-lato font-semibold text-gray-900 mb-3 transition-all duration-300 ease-in-out hover:text-emerald-800">Time Range</div>
            <div className="transition-all duration-300 ease-in-out">
              <div className="inline-block bg-white border border-gray-200 px-3 py-2 rounded-lg text-[16px] font-lato text-gray-700 font-medium transition-all duration-300 ease-in-out hover:border-emerald-300 hover:scale-105 hover:shadow-md hover:bg-emerald-50 group">
                {bundleData.startDate && bundleData.endDate ? (
                  `${new Date(bundleData.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(bundleData.endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                ) : (
                  '5:00 AM - 11:00 AM'
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-row mb-5 transition-all duration-300 ease-in-out">
          {/* simple location chips (non-interactive) */}
          <h2 className="text-[18px] font-lato font-normal text-black mb-3 transition-all duration-300 ease-in-out hover:text-emerald-800">Locations</h2>
          <div className="mt-3 flex items-center gap-4">
            {['Dubai Marina', 'Down Town', 'City Center'].map((label) => (
              <span key={label} className="px-3 py-1 rounded-lg bg-[#F5F5F5] text-[#1E1E1E] text-[14px] font-lato">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="transition-all duration-300 ease-in-out group">
          <button className="flex items-center gap-2.5 text-sm text-gray-700 transition-all duration-300 ease-in-out hover:gap-3">
            <span className="text-[16px] font-normal font-lato transition-all duration-300 ease-in-out group-hover:text-emerald-700">Event Linked</span>
          </button>
          <div className="text-[14px] font-lato text-[#6A7282] mt-1.5 transition-all duration-300 ease-in-out group-hover:text-gray-700">
            {bundleData.eventName || 'No event linked'}
          </div>
        </div>
      </div>
      
      
    </div>
  );
}