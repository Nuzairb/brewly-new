"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PageHeaderProps {
  searchPlaceholder?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showSearch?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
}

export default function PageHeader({
  searchPlaceholder = "Search bundle, date",
  primaryButtonText = "Create New",
  secondaryButtonText = "Export Report",
  onPrimaryClick,
  onSecondaryClick,
  showSearch = true,
  showPrimaryButton = true,
  showSecondaryButton = true,
}: PageHeaderProps) {
  return (
    <div 
      className="flex justify-between items-center mb-8 w-full gap-4"
    >
      {/* Left Side - Search Bar Container */}
      {showSearch && (
        <div 
          className="flex-[0_1_429px] min-w-[200px] h-[52px]"
        >
          {/* Search Bar Box */}
          <div
            className="w-full h-[52px] rounded-[16px] border border-[#D5D6D6] gap-2 p-3 bg-[#FAFAFA] opacity-100 flex items-center"
          >
            {/* Inner Search Bar Container */}
            <div
              className="w-full h-[28px] opacity-80 gap-2 flex items-center"
            >
              {/* Search Icon */}
              <div
                className="w-[28px] h-[28px] opacity-100 flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 19.5L24.5 24.5M22.1667 12.8333C22.1667 18.0381 17.9548 22.25 12.75 22.25C7.54518 22.25 3.33333 18.0381 3.33333 12.8333C3.33333 7.62847 7.54518 3.41663 12.75 3.41663C17.9548 3.41663 22.1667 7.62847 22.1667 12.8333Z" stroke="#787777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Search Text/Input */}
              <Input
                type="text"
                variant="search"
                placeholder={searchPlaceholder}
                className="flex-1 h-auto border-none shadow-none p-0 bg-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Buttons Container */}
      <div className="flex gap-4 items-center flex-shrink-0">
        {showSecondaryButton && (
          <Button
            variant="bundlesHeaderSecondary"
            size="pageHeader"
            onClick={onSecondaryClick}
          >
            {secondaryButtonText}
          </Button>
        )}

        {showPrimaryButton && (
          <Button
            variant="bundlesHeaderPrimary"
            size="pageHeader"
            onClick={onPrimaryClick}
          >
            {primaryButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
