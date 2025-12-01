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

// Text style for cells
const cellTextStyle = {
  height: '20px',
  opacity: 1,
  fontFamily: 'Lato, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0%',
  color: '#1E1E1E',
  whiteSpace: 'nowrap' as const,
};

export default function BundlesSection() {
  return (
    <div>
      {/* Bundles Title */}
      <h2
        style={{
          fontFamily: 'Lato, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#1E1E1E',
          margin: 0,
          marginTop: '32px',
          marginBottom: '24px',
        }}
      >
        
      </h2>

      {/* Bundles Parent Container */}
      <div
        style={{
          width: '100%',
          borderRadius: '16px',
          border: '1px solid #EEEEEE',
          background: '#FFFFFF',
          opacity: 1,
          position: 'relative',
          overflow: 'auto',
          padding: '16px',
        }}
      >
        {/* Header - All Bundles and Buttons */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side - All Bundles */}
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '30px',
              letterSpacing: '0%',
              color: '#787777',
              opacity: 1,
              margin: 0,
            }}
          >
            All Bundles
          </h3>

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
        <div className="w-full overflow-x-auto"
        >
          {/* Table */}
          <table className="w-full" style={{ minWidth: '800px' }}>
            {/* Table Header */}
            <thead>
              <tr style={{ borderBottom: '1px solid #EEEEEE' }}>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Bundle Name
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Product
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Items
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Sales
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Create Date
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Expiry Date
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
            {bundlesData.map((bundle, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: index < bundlesData.length - 1 ? '1px solid #EEEEEE' : 'none',
                }}
              >
                {/* Bundle Name */}
                <td style={{ padding: '8px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#1E1E1E',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bundle.bundleName}
                  </span>
                </td>

                {/* Product */}
                <td style={{ padding: '8px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#1E1E1E',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bundle.product}
                  </span>
                </td>

                {/* Items */}
                <td style={{ padding: '8px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#1E1E1E',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bundle.items}
                  </span>
                </td>

                {/* Sales */}
                <td style={{ padding: '8px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#1E1E1E',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bundle.sales}
                  </span>
                </td>

                {/* Create Date */}
                <td style={{ padding: '8px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#1E1E1E',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bundle.createDate}
                  </span>
                </td>

                {/* Expiry Date */}
                <td style={{ padding: '8px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#1E1E1E',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bundle.expiryDate}
                  </span>
                </td>

                {/* Status */}
                <td style={{ padding: '8px 16px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      background: bundle.status === 'Active' ? '#10A7601A' : '#FF23111A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: bundle.status === 'Active' ? '#10A760' : '#FF2311',
                      }}
                    >
                      {bundle.status}
                    </span>
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
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  color: '#787777',
                }}
              >
                Page{' '}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0%',
                    color: '#787777',
                  }}
                >
                  1
                </span>{' '}
                of 10
              </span>
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
