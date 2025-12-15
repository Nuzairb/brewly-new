"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buildImageUrl } from "@/lib/utils";

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

export default function BundleDetail({ bundleData }: { bundleData: BundleDetailProps }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const fallbackImage = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL || buildImageUrl(undefined);

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

  return (
    <div className="w-full flex flex-col gap-8 pb-10">
      {/* Hero Section with Image and Info */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
        {/* Image Section */}
        <div className="flex flex-col gap-4">
          <div className="relative rounded-[20px] overflow-hidden bg-[#FAFAFA] border border-[#EEEEEE] aspect-square lg:aspect-auto lg:h-full">
            <img
              src={bundleData.images[0] || fallbackImage}
              alt={bundleData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Additional Images */}
          {bundleData.images.length > 1 && (
            <div className="flex gap-2">
              {bundleData.images.slice(1, 4).map((image, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 rounded-[12px] overflow-hidden border border-[#EEEEEE] bg-[#FAFAFA] cursor-pointer hover:border-[#1A5D4A] transition-all"
                >
                  <img
                    src={image || fallbackImage}
                    alt={`Bundle view ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6">
          {/* Header with Status and Menu */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <Badge
                variant={
                  bundleData.status === 'Active' ? 'active' :
                  bundleData.status === 'Pending' ? 'pending' :
                  'draft'
                }
                className="w-fit"
              >
                {bundleData.status}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-lato font-semibold text-[#1E1E1E]">
                {bundleData.name}
              </h1>
                  {bundleData.bundleType && (
                    <div className="text-sm text-[#787777] mt-1">Type: <span className="font-semibold text-[#1E1E1E]">{bundleData.bundleType}</span></div>
                  )}

                  {/* Quick stats */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="text-sm text-[#787777]">{bundleData.products?.length ?? 0} items</div>
                    <div className="text-sm text-[#1A5D4A] font-semibold">Save AED {savings.toFixed(2)}</div>
                    <div className="text-sm text-[#787777]">{bundleData.discountPercentage ?? 0}% off</div>
                  </div>
            </div>

            {/* Menu Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 p-0 flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 4"
                  fill="none"
                >
                  <circle cx="2" cy="2" r="1.5" fill="#1A5D4A" />
                  <circle cx="8" cy="2" r="1.5" fill="#1A5D4A" />
                  <circle cx="14" cy="2" r="1.5" fill="#1A5D4A" />
                </svg>
              </Button>

              {showMenu && (
                <div className="absolute right-0 top-12 w-[180px] bg-white shadow-[0_4px_24px_0_#1A5D4A1A] rounded-[12px] z-20 flex flex-col p-3 gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-9 hover:bg-gray-100"
                    onClick={() => {
                      router.push(`/create-bundle?edit=${bundleData.id}`);
                      setShowMenu(false);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38297 14.4088 2.61177C14.5036 2.84057 14.5523 3.08577 14.5523 3.33337C14.5523 3.58098 14.5036 3.82618 14.4088 4.05498C14.314 4.28378 14.1751 4.49162 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Edit Bundle</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-9 text-red-600 hover:bg-red-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4H3.33333M3.33333 4H14M3.33333 4V13.3333C3.33333 13.687 3.47381 14.0261 3.72386 14.2761C3.97391 14.5262 4.31304 14.6667 4.66667 14.6667H11.3333C11.687 14.6667 12.0261 14.5262 12.2761 14.2761C12.5262 14.0261 12.6667 13.687 12.6667 13.3333V4H3.33333ZM5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333" stroke="#E74C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Delete</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {bundleData.description && (
            <p className="text-base text-[#5A5A5A] font-lato leading-relaxed max-w-3xl">
              {bundleData.description}
            </p>
          )}

          {/* Audience & Reasoning */}
          {(bundleData.targetAudience || bundleData.reasoning) && (
            <div className="mt-4 bg-white border border-[#F3F3F3] rounded-[12px] p-4">
              {bundleData.targetAudience && (
                <div className="mb-2">
                  <span className="text-sm font-lato font-semibold text-[#1E1E1E]">Target Audience</span>
                  <p className="text-sm text-[#787777] mt-1">{bundleData.targetAudience}</p>
                </div>
              )}
              {bundleData.reasoning && (
                <div>
                  <span className="text-sm font-lato font-semibold text-[#1E1E1E]">Why this bundle?</span>
                  <p className="text-sm text-[#787777] mt-1">{bundleData.reasoning}</p>
                </div>
              )}
            </div>
          )}

          {/* Strategy Info */}
          {bundleData.eventName && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-lato font-semibold text-[#1E1E1E]">Event</span>
              <p className="text-base text-[#787777] font-lato">{bundleData.eventName}</p>
            </div>
          )}

          {bundleData.bundleStrategy && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-lato font-semibold text-[#1E1E1E]">Strategy</span>
              <p className="text-base text-[#787777] font-lato">{bundleData.bundleStrategy}</p>
            </div>
          )}

          {/* Pricing Card */}
          <Card className="p-6 border border-[#EEEEEE] rounded-[16px] bg-[#FAFAFA]">
            <h3 className="text-lg font-lato font-semibold text-[#1E1E1E] mb-4">Pricing</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-lato text-[#787777]">Original Price</span>
                <span className="text-lg font-lato font-semibold text-[#787777] line-through">
                  AED {originalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base font-lato text-[#787777]">Bundle Price</span>
                <span className="text-2xl font-lato font-bold text-[#1A5D4A]">
                  AED {bundlePrice.toFixed(2)}
                </span>
              </div>

              <div className="h-px bg-[#EEEEEE]" />

              <div className="flex justify-between items-center">
                <span className="text-base font-lato font-semibold text-[#1E1E1E]">You Save</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-lato font-bold text-green-600">
                    AED {savings.toFixed(2)}
                  </span>
                  <Badge className="bg-green-100 text-green-700 font-semibold">
                    -{discountPercentage}%
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Products Section */}
      {bundleData.products && bundleData.products.length > 0 && (
        <div className="w-full">
          <h2 className="text-2xl font-lato font-semibold text-[#1E1E1E] mb-6">Bundle Contents</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundleData.products.map((product) => (
              <Card
                key={product.id}
                className="p-4 border border-[#EEEEEE] rounded-[12px] bg-white hover:shadow-md transition-all flex gap-4 items-start"
              >
                <div className="w-24 h-24 rounded-[8px] overflow-hidden bg-[#FAFAFA] flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-lato font-semibold text-[#1E1E1E] mb-1">{product.name}</h4>
                      {product.description && (
                        <p className="text-sm text-[#787777]">{product.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-lato font-bold text-[#1A5D4A]">AED {product.price.toFixed(2)}</div>
                      <div className="text-xs mt-1">{product.isAvailable ? <span className="text-green-600">Available</span> : <span className="text-red-600">Unavailable</span>}</div>
                    </div>
                  </div>

                  {(product.isExpiring || product.isUrgentExpiry) && (
                    <div className="mt-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 font-semibold">Expiring Soon</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Configuration Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dates Section */}
          {(bundleData.startDate || bundleData.endDate) && (
          <Card className="p-6 border border-[#EEEEEE] rounded-[16px] bg-[#FAFAFA]">
            <h3 className="text-lg font-lato font-semibold text-[#1E1E1E] mb-4">Validity Period</h3>

            <div className="space-y-4">
              {bundleData.startDate && (
                <div className="flex justify-between">
                  <span className="text-base font-lato text-[#787777]">Start Date</span>
                  <span className="text-base font-lato font-semibold text-[#1E1E1E]">
                    {new Date(bundleData.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}

              {bundleData.endDate && (
                <div className="flex justify-between">
                  <span className="text-base font-lato text-[#787777]">End Date</span>
                  <span className={`text-base font-lato font-semibold ${bundleData.endDate && new Date(bundleData.endDate) < new Date() ? 'text-red-600' : 'text-[#1E1E1E]'}`}>
                    {new Date(bundleData.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })} {bundleData.endDate && new Date(bundleData.endDate) < new Date() && (<span className="ml-2 text-sm font-semibold text-red-600">Expired</span>)}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Display settings removed per request */}
      </div>

      {/* Metadata */}
      {(bundleData.createdAt || bundleData.updatedAt) && (
        <Card className="p-4 border border-[#EEEEEE] rounded-[16px] bg-[#FAFAFA]">
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm font-lato text-[#787777]">
            {bundleData.createdAt && (
              <div>
                <span className="text-[#1E1E1E] font-semibold">Created: </span>
                {new Date(bundleData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
            {bundleData.updatedAt && (
              <div>
                <span className="text-[#1E1E1E] font-semibold">Last Updated: </span>
                {new Date(bundleData.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-12"
          onClick={() => router.back()}
        >
          Back to Bundles
        </Button>

        {bundleData.status !== 'Active' && (
          <Button
            className="flex-1 h-12 bg-[#1A5D4A] hover:bg-[#155040] text-white font-lato font-semibold"
          >
            Go Live
          </Button>
        )}

        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-12"
          onClick={() => router.push(`/create-bundle?edit=${bundleData.id}`)}
        >
          Edit Bundle
        </Button>
      </div>
    </div>
  );
}