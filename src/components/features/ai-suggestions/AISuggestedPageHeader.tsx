"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AISuggestedPageHeaderProps {
  onBackClick: () => void;
  onCreateManually?: () => void;
}

export default function AISuggestedPageHeader({ onBackClick, onCreateManually }: AISuggestedPageHeaderProps) {
  const router = useRouter();

  const handleCreateManually = () => {
    router.push('/create-bundle');
  };
  return (
    <div 
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 mb-6 mt-[30px]"
      style={{
        opacity: 1,
      }}
    >
      {/* Left Side - Search Bar Container */}
      <div 
        className="w-full sm:w-auto flex-1 sm:max-w-[429px]"
        style={{
          opacity: 1,
        }}
      >
        {/* Search Bar Box */}
        <div
          className="w-full"
          style={{
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
              width: '405px',
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
            <input
              type="text"
              placeholder="Search bundle, date"
              style={{
                flex: 1,
                height: '24px',
                opacity: 1,
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#787777',
                background: 'transparent',
                border: 'none',
                outline: 'none',
              }}
            />
            <style jsx>{`
              input::placeholder {
                font-family: Lato, sans-serif;
                font-weight: 400;
                font-style: normal;
                font-size: 20px;
                line-height: 100%;
                letter-spacing: 0%;
                color: #787777;
                opacity: 1;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Right Side - Buttons Container */}
      <div
        className="flex items-center gap-4 w-full sm:w-auto justify-end"
        style={{
          opacity: 1,
        }}
      >
        <Button
          variant="aiFilter"
          size="pageHeader"
          className="w-[141px]"
        >
          Export Report
        </Button>

        <Button
          variant="aiCardActionActive"
          size="pageHeader"
          className="w-[187px]"
          onClick={handleCreateManually}
        >
          Create Manually
        </Button>
      </div>
    </div>
  );
}
