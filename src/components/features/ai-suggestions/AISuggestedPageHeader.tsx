"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 mb-6 mt-[10px] opacity-100"
    >
      {/* Left Side - Search Bar Container */}
      <div 
        className="w-full sm:w-auto flex-1 sm:max-w-[429px] opacity-100"
      >
        {/* Search Bar Box */}
        <div
          className="w-full h-[52px] rounded-[16px] border border-[#D5D6D6] gap-2 p-3 bg-[#FAFAFA] opacity-100 flex items-center"
        >
          {/* Inner Search Bar Container */}
          <div
            className="w-[405px] h-[28px] opacity-80 gap-2 flex items-center"
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
              placeholder="Search bundle, date"
              className="flex-1 h-auto border-none shadow-none p-0 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Buttons Container */}
      <div
        className="flex items-center gap-4 w-full sm:w-auto justify-end opacity-100"
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
