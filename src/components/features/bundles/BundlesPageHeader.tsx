"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface BundlesPageHeaderProps {
  onBackClick: () => void;
}

export default function BundlesPageHeader({ onBackClick }: BundlesPageHeaderProps) {
    const router = useRouter();
  return (
    <div 
      className="flex items-center"
      style={{
        width: '1096px',
        height: '111px',
        justifyContent: 'space-between',
        opacity: 1,
      }}
    >
      {/* Left Side - Search Bar Container */}
      <div 
        style={{
          width: '429px',
          height: '52px',
          justifyContent: 'space-between',
          opacity: 1,
        }}
      >
        {/* Search Bar Box */}
        <div
          style={{
            width: '429px',
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
              placeholder="Search bundle ,date"
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
        style={{
          width: '474.5px',
          height: '48px',
          opacity: 1,
          gap: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {/* Export Report Button */}
        <button
          style={{
            width: '141px',
            height: '48px',
            borderRadius: '8px',
            border: '1px solid #1A5D4A',
            paddingTop: '8px',
            paddingRight: '16px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            opacity: 1,
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          className="hover:bg-[#1A5D4A]/5 transition-colors"
        >
          <span
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '20px',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#00674E',
              opacity: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Export Report
          </span>
        </button>

        {/* Create New Bundle Button */}
        <button
          style={{
            width: '187px',
            height: '48px',
            borderRadius: '8px',
            paddingTop: '8px',
            paddingRight: '16px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            background: '#1A5D4A',
            border: 'none',
            opacity: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          className="hover:opacity-90 transition-opacity"
          onClick={() => router.push('/create-bundle')}
        >
          <span
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '20px',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#FAF8F3',
              opacity: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Create New Bundle
          </span>
        </button>
      </div>
    </div>
  );
}
