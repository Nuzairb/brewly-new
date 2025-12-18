import React from "react";
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

  return (
    <>
      <section className="w-full max-w-full h-[196px] flex flex-col justify-between opacity-100 mb-8 mt-10 relative px-[65px]">
        {/* Title */}
        <div className="w-full h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] flex items-center bg-transparent opacity-100 mb-4">Bundle Strategy</div>
        {/* Cards Container */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 opacity-100">
          {strategies.map((strategy) => (
            <div
              key={strategy.key}
              className={`h-[152px] rounded-[14px] border bg-[#FAFAFA] flex flex-col items-start justify-end gap-2 p-[18px_17px] opacity-100 cursor-pointer transition-all duration-300 ease-in-out ${value.bundle_strategy === strategy.key ? "border-2 border-[#00674E]" : "border-2 border-[#EEEEEE] hover:border-[#00674E]/50 hover:shadow-md hover:scale-[1.02]"}`}
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
          <span className="w-[198px] h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] bg-transparent align-middle opacity-100 flex items-center">Bundle Composition</span>
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
            <span className="w-[110px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">Bundle Name</span>
            <Input
              value={value.bundle_name}
              onChange={(event) => onChange({ bundle_name: event.target.value })}
              placeholder="Enter bundle name"
              className="w-full h-12 font-lato text-[16px] text-[#1E1E1E] transition-all duration-300 ease-in-out hover:border-[#00674E]/50 focus:border-[#00674E]"
            />
          </div>
          {/* Bundle Type */}
          <div className="flex flex-col gap-2">
            <span className="w-[90px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">Bundle Type</span>
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
            <span className="w-[110px] h-5 font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] opacity-100">Description</span>
            <Input
              value={value.description ?? ""}
              onChange={(event) => onChange({ description: event.target.value })}
              placeholder="Add a short description (optional)"
              className="w-full h-12 font-lato text-[16px] text-[#1E1E1E] transition-all duration-300 ease-in-out hover:border-[#00674E]/50 focus:border-[#00674E] mt-2"
            />
          </div>
        </div>
      </section>
    </>
  );
}