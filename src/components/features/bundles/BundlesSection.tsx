"use client";

import React from "react";
import { Button } from "@/components/ui/button";

// Table data type
interface BundleData {
  bundleName: string;
  eventName: string;
  productNames: string;
  originalPrice: number;
  bundlePrice: number;
  discount: number;
  acceptedAt: string;
  isActive: boolean;
}

import { useEffect, useState } from "react";

const API_URL = "/api/accepted-bundles";

export default function BundlesSection() {
  const [bundlesData, setBundlesData] = useState<BundleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((bundle: any) => ({
          bundleName: bundle.bundle_name || "-",
          eventName: bundle.event_name || "-",
          productNames: Array.isArray(bundle.product_names) ? bundle.product_names.join(", ") : (bundle.product_names || "-"),
          originalPrice: bundle.original_price ?? 0,
          bundlePrice: bundle.bundle_price ?? 0,
          discount: bundle.discount_percentage ?? 0,
          acceptedAt: bundle.accepted_at ? new Date(bundle.accepted_at).toLocaleString() : "-",
          isActive: !!bundle.is_active,
        }));
        setBundlesData(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- Begin Table Rendering ---
  return (
    <div className="w-full rounded-2xl border border-[#EEEEEE] bg-white opacity-100 relative overflow-auto p-4 mt-8">
      {/* Header - All Bundles and Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-inter font-medium text-[20px] leading-[30px] text-[#787777] opacity-100 m-0">All Bundles</h3>
        <div className="flex gap-4 items-center">
          <Button variant="outline" size="pageHeader" className="w-[99px] h-[48px] flex items-center justify-center gap-2">
            {/* Filter Icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5H17.5M5 10H15M8.33333 15H11.6667" stroke="#787777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-lato font-medium text-[14px] leading-5 text-[#787777]">Filters</span>
          </Button>
          <Button variant="outline" size="pageHeader" className="w-[113px] h-[48px] flex items-center justify-center gap-2">
            <span className="font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">Download all</span>
          </Button>
        </div>
      </div>
      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-[#EEEEEE]">
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Bundle Name</th>
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Event Name</th>
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Products</th>
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Original Price</th>
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Bundle Price</th>
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Discount (%)</th>
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Accepted At</th>
              <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Active</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : (
              bundlesData.map((bundle, index) => (
                <tr key={index} className={index < bundlesData.length - 1 ? 'border-b border-[#EEEEEE]' : ''}>
                  <td className="px-4 py-2">{bundle.bundleName}</td>
                  <td className="px-4 py-2">{bundle.eventName}</td>
                  <td className="px-4 py-2">{bundle.productNames}</td>
                  <td className="px-4 py-2">{bundle.originalPrice}</td>
                  <td className="px-4 py-2">{bundle.bundlePrice}</td>
                  <td className="px-4 py-2">{bundle.discount}</td>
                  <td className="px-4 py-2">{bundle.acceptedAt}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block rounded px-2 py-1 text-xs ${bundle.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{bundle.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Container */}
      <div className="flex justify-between items-center mt-6 w-full">
        <Button variant="outline" size="sm" className="w-[92px] h-[38px] flex items-center justify-center">
          <span className="font-inter font-medium text-[14px] leading-5 text-[#787777]">Previous</span>
        </Button>
        <div>
          <span className="font-inter font-normal text-[14px] leading-[20px] text-[#787777]">Page <span className="font-inter font-medium">1</span> of 10</span>
        </div>
        <Button variant="outline" size="sm" className="w-[66px] h-[38px] flex items-center justify-center">
          <span className="font-inter font-medium text-[14px] leading-5 text-[#787777]">Next</span>
        </Button>
      </div>
    </div>
  );
}
