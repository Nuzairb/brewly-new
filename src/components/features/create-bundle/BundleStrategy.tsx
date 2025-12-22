import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StrategyForm = {
  bundle_strategy: string;
  bundle_name: string;
  bundle_type: string;
  description?: string;
};

interface BundleStrategyProps {
  value: StrategyForm;
  onChange: (updated: Partial<StrategyForm>) => void;
}

export default function BundleStrategy({ value, onChange }: BundleStrategyProps) {
  const [activeSection, setActiveSection] = useState<'attach' | 'generate'>('attach');
  
  const strategies = [
    {
      key: "reduce",
      icon: "moon-slow-wind.svg",
      label: "Reduce Slow-Moving Stock",
    },
    {
      key: "ai",
      icon: "ai-magic.svg",
      label: "AI Suggested Combo",
    },
    {
      key: "increase",
      icon: "analytics-01.svg",
      label: "Increase Average Order Value",
    },
    {
      key: "promote",
      icon: "dollar-square.svg",
      label: "Promote High-Margin Items",
    },
  ];

  const handleSelectStrategy = (key: string) => {
    onChange({ bundle_strategy: key });
  };

  // use the provided generated preview SVG for all three preview slots
  const previewImages = [
    "/icons/Image%20(Generated%20preview%201).svg",
    "/icons/Image%20(Generated%20preview%201).svg",
    "/icons/Image%20(Generated%20preview%201).svg",
  ];

  return (
    <>
      <section className="w-full max-w-full h-[196px] flex flex-col justify-between opacity-100 mb-8 mt-10 relative px-[65px]">
        {/* Title */}
        <div className="w-full h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] flex items-center bg-transparent opacity-100 mb-4">
          Bundle Strategy
        </div>
        {/* Cards Container */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 opacity-100">
          {strategies.map((strategy) => (
            <div
              key={strategy.key}
              className={`h-[152px] rounded-[14px] border bg-[#FAFAFA] flex flex-col items-start justify-end gap-2 p-[18px_17px] opacity-100 cursor-pointer transition-all duration-300 ease-in-out ${
                value.bundle_strategy === strategy.key
                  ? "border-2 border-[#00674E]"
                  : "border-2 border-[#EEEEEE] hover:border-[#00674E]/50 hover:shadow-md hover:scale-[1.02]"
              }`}
              onClick={() => handleSelectStrategy(strategy.key)}
            >
              <div className="w-full flex flex-col justify-start items-start opacity-100 h-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/${strategy.icon}`}
                  alt=""
                  className="w-8 h-8 mb-auto transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] bg-transparent align-middle opacity-100 text-left flex items-center transition-all duration-300 ease-in-out hover:text-[#00674E]">
                  {strategy.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bundle Composition Section */}
      <section className="w-full flex flex-col gap-4 opacity-100 mt-8 px-[81px] -ml-[12px]">
        {/* Top Row: Heading and Button */}
        <div className="flex justify-between items-center w-full">
          {/* Left Side Heading */}
          <span className="w-[198px] h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] bg-transparent align-middle opacity-100 flex items-center">
            Bundle Composition
          </span>
          {/* Right Side AI Suggestion Button */}
          <div className="flex justify-end">
            <Button
              variant="aiSuggestionBtn"
              className="w-[227px] h-[44px] gap-2 px-4 py-3 transition-all duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/magic-wand-05.svg`}
                alt=""
                className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
              />
              <span className="whitespace-nowrap">AI Suggestion</span>
            </Button>
          </div>
        </div>

        {/* Slot Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-100 mt-4">
          {/* Bundle Name */}
          <div className="flex flex-col gap-2 mb-2">
            <span className="w-[110px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">
              Bundle Name
            </span>
            <Input
              value={value.bundle_name}
              onChange={(event) => onChange({ bundle_name: event.target.value })}
              placeholder="Enter bundle name"
              className="w-full h-12 font-lato text-[16px] text-[#1E1E1E] transition-all duration-300 ease-in-out hover:border-[#00674E]/50 focus:border-[#00674E]"
            />
          </div>
          {/* Bundle Type */}
          <div className="flex flex-col gap-2">
            <span className="w-[90px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">
              Bundle Type
            </span>
            <Select value={value.bundle_type} onValueChange={(val) => onChange({ bundle_type: val })}>
              <SelectTrigger variant="bundle" className="w-full h-12 font-lato text-[16px] text-[#1E1E1E] transition-all duration-300 ease-in-out hover:border-[#00674E]/50">
                <SelectValue placeholder="Manual" />
              </SelectTrigger>
              <SelectContent side="bottom">
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="auto">Automatic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Description (full width) */}
          <div className="sm:col-span-2 mt-2">
            <span className="w-[110px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">
              Description
            </span>
            <textarea
              placeholder="Enter a description ..... (optional)"
              value={value.description ?? ""}
              onChange={(event) => onChange({ description: event.target.value })}
              className="w-full h-[128px] resize-none rounded-lg border border-[#EEEEEE] bg-white px-[14px] py-[10px] font-lato text-[16px] text-[#1E1E1E] transition-all duration-300 ease-in-out hover:border-[#00674E]/50 focus:border-[#00674E] mt-2 mb-5"
            />
          </div>
        </div>
      </section>

      {/* Conditional Section based on activeSection state */}
      {activeSection === 'attach' ? (
        // Attach Bundle Image Section
        <section className="mt-8 mb-8 w-full max-w-full px-[81px] -ml-[12px]">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-lato text-[20px] font-semibold leading-[28px] text-[#1E1E1E]">
              Attach Bundle Image
            </h3>
            <Button
              variant="outline"
              className="h-[44px] w-[227px] px-4 font-lato text-[16px] font-medium hover:scale-103 bg-gradient-to-r from-[#011913] via-[#00291F] to-[#004534]"
              onClick={() => setActiveSection('generate')}
            >
              <span className="flex items-center justify-center bg-gradient-to-r from-white via-[#CCCCCC] to-white bg-clip-text text-transparent bg-[length:200%_100%]">
                <img 
                  src="/icons/si_ai-fill.svg" 
                  alt="AI" 
                  className="w-5 h-5 mr-2" 
                />
                Generate With AI
              </span>
            </Button>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-[#E5E5E5] p-8 rounded-lg text-center bg-white hover:border-[#00674E]/30 transition-colors duration-300 mb-4">
            <div className="flex flex-col items-center justify-center">
              {/* Upload Icon */}
              <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center mb-4">
                <img
                  src="/icons/upload.svg"
                  alt="Upload Icon"
                  className="w-6 h-6"
                /> 
              </div>

              {/* Upload Text */}
              <p className="font-lato text-[16px] text-[#1E1E1E] mb-2">
                Drag your file(s) to start uploading
              </p>
              
              {/* OR Divider */}
              <div className="flex items-center gap-2 w-full max-w-[200px] my-3">
                <div className="flex-1 h-[1px] bg-[#E5E5E5]"></div>
                <span className="font-lato text-[14px] text-[#9E9E9E]">OR</span>
                <div className="flex-1 h-[1px] bg-[#E5E5E5]"></div>
              </div>

              {/* Browse Button */}
              <Button
                variant="outline"
                className="h-10 px-6 border-[#009C76] font-lato font-medium border-solid text-[#009C76] hover:bg-[#009C76]/5 text-[14px]"
              >
                Browse files
              </Button>
            </div>
          </div>

          {/* Supported Formats */}
          <p className="font-lato text-[14px] text-[#6D6D6D] mt-2 mb-4">
            Only support .jpg, .png and .svg and .zip files
          </p>

          {/* Uploaded File Preview */}
          <div className="mt-4 h-[114px] flex items-center justify-between p-3 bg-[#FFFFFF] rounded-lg border border-[#E7E7E7]">
            <div className="flex items-center gap-3">
              {/* File Icon/Image */}
              <div className="w-[82px] h-[82px] rounded bg-white flex items-center justify-center overflow-hidden">
                <img
                  src="/icons/Image (Generated preview 1).svg"
                  alt="Uploaded file"
                  className="w-full h-full object-cover bg-[#F5F5F5]"
                />
              </div>

              {/* File Info */}
              <div>
                <p className="font-lato text-[14px] font-medium text-[#1E1E1E]">assets.zip</p>
                <p className="font-lato text-[12px] text-[#757575]">8.5MB</p>
              </div>
            </div>

            {/* Remove Button */}
            <button className="text-[#757575] hover:text-[#1E1E1E] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </section>
      ) : (
        // Generate Bundle Image Section
        <section className="mt-8 mb-8 w-full max-w-full px-[81px] -ml-[12px]">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-lato text-[20px] font-semibold leading-[28px] text-[#1E1E1E]">
              Generate bundle image
            </h3>
            <Button
              variant="outline"
              className="h-[44px] px-4 border-[#009C76] text-[#00674E] hover:bg-[#009C76]/5 font-lato text-[16px] font-medium transition-all hover:scale-103"
              onClick={() => setActiveSection('attach')}
            >
              Upload Image
            </Button>
          </div>

          {/* Prompt Input Section */}
          <div className="mb-6 bg-[#FAFAFA] p-4 rounded-lg">
            <label className="block font-lato text-[16px] font-normal text-[#1E1E1E] mb-2">
              Prompt
            </label>
            <div className="relative">
              <textarea
                placeholder="Example: Grilled sandwich and latte placed side by side, warm lighting, minimal composition, no background"
                className="w-full h-[150px] resize-none rounded-lg shadow-sm border border-[#EEEEEE] bg-white px-[14px] py-[10px] pr-[50px] font-lato text-[14px] text-[#757575] placeholder:text-[#BDBDBD] transition-all duration-300 ease-in-out hover:border-[#00674E]/50 focus:border-[#00674E] focus:outline-none"
              />
              {/* Send Button Inside Textarea */}
              <button className="absolute bottom-3 right-3 w-9 h-9 bg-[#00674E] rounded-full flex items-center justify-center hover:bg-[#005840] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 12.6667V3.33337M8 3.33337L3.33337 8.00004M8 3.33337L12.6667 8.00004"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>
          </div>

          {/* Quick Add Section */}
          <div className="mb-6">
            <label className="block font-lato text-[14px] font-medium text-[#1E1E1E] mb-3">
              Quick add
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "No background",
                "White background",
                "Premium lighting",
                "Minimal style",
                "Top view",
                "Close-up shot",
              ].map((tag, index) => (
                <button
                  key={index}
                  className="h-[34px] px-3 rounded-sm border border-[#E0E0E0] bg-[#FAFAFA] font-lato text-[13px] text-[#424242] hover:border-[#00674E] hover:bg-[#E8F5F2] hover:text-[#00674E] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mt-4">
              <div className=" flex gap-2 justify-start">
                {previewImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px] object-cover rounded-md bg-[#F5F5F5] transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}