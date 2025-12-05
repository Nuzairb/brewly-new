import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function BundleStrategy() {
  return (
    <>
    <section className="w-full max-w-full h-[196px] flex flex-col justify-between opacity-100 mb-8 mt-10 relative px-[65px]">
      {/* Title */}
      <div className="w-full h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] flex items-center bg-transparent opacity-100 mb-4">Bundle Strategy</div>
      {/* Cards Container */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 opacity-100">
        {/* Card 1 */}
        <div className="h-[152px] rounded-[14px] border border-[#EEEEEE] bg-[#FAFAFA] flex flex-col items-start justify-end gap-2 p-[18px_17px] opacity-100 cursor-pointer">
          <div className="w-full flex flex-col justify-start items-start opacity-100 h-full">
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/moon-slow-wind.svg`} alt="" className="w-8 h-8 mb-auto" />
            <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] bg-transparent align-middle opacity-100 text-left flex items-center">Reduce Slow-Moving Stock</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="h-[152px] rounded-[14px] border border-[#EEEEEE] bg-[#FAFAFA] flex flex-col items-start justify-end gap-2 p-[18px_17px] opacity-100 cursor-pointer">
          <div className="w-full flex flex-col justify-start items-start opacity-100 h-full">
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/ai-magic.svg`} alt="" className="w-8 h-8 mb-auto" />
            <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] bg-transparent align-middle opacity-100 text-left flex items-center">AI Suggested Combo</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="h-[152px] rounded-[14px] border border-[#EEEEEE] bg-[#FAFAFA] flex flex-col items-start justify-end gap-2 p-[18px_17px] opacity-100 cursor-pointer">
          <div className="w-full flex flex-col justify-start items-start opacity-100 h-full">
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/analytics-01.svg`} alt="" className="w-8 h-8 mb-auto" />
            <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] bg-transparent align-middle opacity-100 text-left flex items-center">Increase Average Order Value</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="h-[152px] rounded-[14px] border border-[#EEEEEE] bg-[#FAFAFA] flex flex-col items-start justify-end gap-2 p-[18px_17px] opacity-100 cursor-pointer">
          <div className="w-full flex flex-col justify-start items-start opacity-100 h-full">
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/dollar-square.svg`} alt="" className="w-8 h-8 mb-auto" />
            <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] bg-transparent align-middle opacity-100 text-left flex items-center">Promote High-Margin Items</span>
          </div>
        </div>
      </div>
    </section>
      {/* Bundle Composition Section */}
      <section className="w-full flex flex-col gap-4 opacity-100 mt-8 px-[81px]">
            {/* Top Row: Heading and Button */}
            <div className="flex justify-between items-center w-full">
              {/* Left Side Heading */}
              <span className="w-[198px] h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] bg-transparent align-middle opacity-100 flex items-center">Bundle Composition</span>
              {/* Right Side AI Suggestion Button */}
                      <div className="flex justify-end">
                        <Button
                          variant="aiSuggestionBtn"
                          className="w-[227px] h-[44px] gap-2 px-4 py-3"
                        >
                          <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/magic-wand-05.svg`} alt="" className="w-5 h-5" />
                          <span className="whitespace-nowrap">AI Suggestion</span>
                        </Button>
                      </div>
            </div>
            {/* Slot Section */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-100">
              {/* Slot 1 */}
              <div className="flex flex-col gap-2">
                <span className="w-[41px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">Slot 1</span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12 font-lato text-[16px] text-[#787777]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Slot 2 */}
              <div className="flex flex-col gap-2">
                <span className="font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">Slot 2</span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12 font-lato text-[16px] text-[#787777]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
          {/* Bundle Basics Section */}
          <section className="w-full flex flex-col gap-4 opacity-100 mt-8 mb-8 px-[81px]">
            {/* Top Row: Heading */}
            <span className="w-[198px] h-7 font-lato font-semibold text-[20px] leading-[28px] mt-8 text-[#1E1E1E] bg-transparent align-middle opacity-100 flex items-center">Bundle Basics</span>
            {/* Slot Section */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-100 mt-4">
              {/* Bundle Name */}
              <div className="flex flex-col gap-2 mb-2">
                <span className="w-[110px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">Bundle Name</span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12 font-lato text-[16px] text-[#787777]">
                    <SelectValue placeholder="Grill Sandwich" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="grill">Grill Sandwich</SelectItem>
                    <SelectItem value="club">Club Sandwich</SelectItem>
                    <SelectItem value="veggie">Veggie Sandwich</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Bundle Type */}
              <div className="flex flex-col gap-2">
                <span className="w-[90px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">Bundle Type</span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12 font-lato text-[16px] text-[#787777]">
                    <SelectValue placeholder="Manual" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="auto">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
    </>
    
  );
}
