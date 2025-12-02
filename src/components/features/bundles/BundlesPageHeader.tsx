"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface BundlesPageHeaderProps {
  onBackClick: () => void;
}

export default function BundlesPageHeader({ onBackClick }: BundlesPageHeaderProps) {
    const router = useRouter();
  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 32,
        width: "100%",
        gap: 16,
      }}
    >
      {/* Left Side - Search Bar Container */}
      <div 
        style={{
          flex: "0 1 429px",
          minWidth: "200px",
          height: '52px',
        }}
      >
        {/* Search Bar Box */}
        <div
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '16px',
            border: '1px solid #D5D6D6',
            gap: '8px',
            padding: '12px',
            background: '#FAFAFA',
            opacity: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Inner Search Bar Container */}
          <div
            style={{
              width: '100%',
              height: '28px',
              opacity: 0.8,
              gap: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Search Icon */}
            <div
              style={{
                width: '28px',
                height: '28px',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 19.5L24.5 24.5M22.1667 12.8333C22.1667 18.0381 17.9548 22.25 12.75 22.25C7.54518 22.25 3.33333 18.0381 3.33333 12.8333C3.33333 7.62847 7.54518 3.41663 12.75 3.41663C17.9548 3.41663 22.1667 7.62847 22.1667 12.8333Z" stroke="#787777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Search Text/Input */}
            <Input
              type="text"
              variant="search"
              placeholder="Search bundle, date"
              className="flex-1 h-auto border-none shadow-none p-0 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Buttons Container */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
        <Button
          variant="bundlesHeaderSecondary"
          size="pageHeader"
        >
          Export Report
        </Button>

        <Button
          variant="bundlesHeaderPrimary"
          size="pageHeader"
          onClick={() => router.push('/create-bundle')}
        >
          Create New Bundle
        </Button>
      </div>
    </div>
  );
}
