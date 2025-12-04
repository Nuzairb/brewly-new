"use client";

import React from "react";
import { Button } from "@/components/ui/button";

// Table data type
interface BundleData {
  bundleName: string;
  product: string;
  items: number;
  sales: number;
  createDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
}

// Sample data - backend se aayega
const bundlesData: BundleData[] = [
  {
    bundleName: "Starter Pack",
    product: "Bagel + Cappuccino",
    items: 5,
    sales: 342,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Active"
  },
  {
    bundleName: "Rainy Day Comfort Pack",
    product: "Bagel + Cappuccino",
    items: 2,
    sales: 342,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Active"
  },
  {
    bundleName: "Bagel + Cappuccino",
    product: "Bagel + Cappuccino",
    items: 2,
    sales: 342,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Active"
  },
  {
    bundleName: "Rainy Day Comfort Pack",
    product: "Oat Milk",
    items: 3,
    sales: 200,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Expired"
  },
  {
    bundleName: "Rainy Day Comfort Pack",
    product: "Oat Milk",
    items: 3,
    sales: 100,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Expired"
  }
];

// Column positions - Figma se exact
const columnPositions = {
  bundleName: '17px',
  product: '219px',
  items: '418px',
  sales: '556px',
  createDate: '699px',
  expiryDate: '827px',
  status: '951.25px'
};


export default function BundlesSection() {
  return (
    <div>
      {/* Bundles Title */}
      <h2 className="font-lato font-semibold text-[24px] leading-[32px] text-[#1E1E1E] m-0 mt-8 mb-6"></h2>

      {/* Bundles Parent Container */}
      <div className="w-full rounded-2xl border border-[#EEEEEE] bg-white opacity-100 relative overflow-auto p-4">
        {/* Header - All Bundles and Buttons */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side - All Bundles */}
          <h3 className="font-inter font-medium text-[20px] leading-[30px] text-[#787777] opacity-100 m-0">All Bundles</h3>

          {/* Right Side - Buttons Container */}
          <div className="flex gap-4 items-center"
          >
          <Button
            variant="outline"
            size="pageHeader"
            className="w-[99px] h-[48px] flex items-center justify-center gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 5H17.5M5 10H15M8.33333 15H11.6667"
                stroke="#787777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-lato font-medium text-[14px] leading-5 text-[#787777]">Filters</span>
          </Button>

          <Button
            variant="outline"
            size="pageHeader"
            className="w-[113px] h-[48px] flex items-center justify-center gap-2"
          >
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
                <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Product</th>
                <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Items</th>
                <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Sales</th>
                <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Create Date</th>
                <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Expiry Date</th>
                <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-[20px] text-[#787777] whitespace-nowrap">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
            {bundlesData.map((bundle, index) => (
              <tr key={index} className={index < bundlesData.length - 1 ? 'border-b border-[#EEEEEE]' : ''}>
                <td className="px-4 py-2">
                  <span className="font-lato font-medium text-[14px] leading-[20px] text-[#1E1E1E] whitespace-nowrap">{bundle.bundleName}</span>
                </td>
                <td className="px-4 py-2">
                  <span className="font-lato font-medium text-[14px] leading-[20px] text-[#1E1E1E] whitespace-nowrap">{bundle.product}</span>
                </td>
                <td className="px-4 py-2">
                  <span className="font-lato font-medium text-[14px] leading-[20px] text-[#1E1E1E] whitespace-nowrap">{bundle.items}</span>
                </td>
                <td className="px-4 py-2">
                  <span className="font-lato font-medium text-[14px] leading-[20px] text-[#1E1E1E] whitespace-nowrap">{bundle.sales}</span>
                </td>
                <td className="px-4 py-2">
                  <span className="font-lato font-medium text-[14px] leading-[20px] text-[#1E1E1E] whitespace-nowrap">{bundle.createDate}</span>
                </td>
                <td className="px-4 py-2">
                  <span className="font-lato font-medium text-[14px] leading-[20px] text-[#1E1E1E] whitespace-nowrap">{bundle.expiryDate}</span>
                </td>
                <td className="px-4 py-2">
                  <div className={`inline-flex rounded-[4px] px-3 py-1 items-center justify-center ${bundle.status === 'Active' ? 'bg-[#10A7601A]' : 'bg-[#FF23111A]'}`}>
                    <span className={`font-lato font-normal text-[14px] leading-[20px] ${bundle.status === 'Active' ? 'text-[#10A760]' : 'text-[#FF2311]'}`}>{bundle.status}</span>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Container */}
        <div className="flex justify-between items-center mt-6 w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-[92px] h-[38px] flex items-center justify-center"
            >
              <span className="font-inter font-medium text-[14px] leading-5 text-[#787777]">Previous</span>
            </Button>

            {/* Page Info */}
            <div>
              <span className="font-inter font-normal text-[14px] leading-[20px] text-[#787777]">Page <span className="font-inter font-medium">1</span> of 10</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-[66px] h-[38px] flex items-center justify-center"
            >
              <span className="font-inter font-medium text-[14px] leading-5 text-[#787777]">Next</span>
            </Button>
          </div>
      </div>
    </div>
  );
}
