"use client";

import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type PricingForm = {
  bundle_price?: number;
  discount_percentage?: number;
  startDate?: Date;
  endDate?: Date;
  autoActivate: boolean;
  showOnKiosk: boolean;
  showOnStaff: boolean;
};

interface BundlePricingProps {
  value: PricingForm;
  onChange: (updated: Partial<PricingForm>) => void;
}

const BundlePricing = ({ value, onChange }: BundlePricingProps) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  
  // Initialize default dates on component mount
  useEffect(() => {
    if (!value.startDate && !value.endDate) {
      const today = new Date();
      const twoDaysLater = addDays(today, 2);
      onChange({ startDate: today, endDate: twoDaysLater });
    }
  }, []);
  
  const { bundle_price, discount_percentage, startDate, endDate, autoActivate, showOnKiosk, showOnStaff } = value;

  const handleStartDateSelect = (date: Date | undefined) => {
    onChange({ startDate: date });
    setIsStartDateOpen(false);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    onChange({ endDate: date });
    setIsEndDateOpen(false);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      onClick={onChange}
      className={`w-10 h-6 rounded-full ${checked ? 'bg-[#00674E]' : 'bg-[#E4E4E7]'} relative cursor-pointer transition-colors flex items-center ml-2`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white absolute top-[2px] shadow-sm transition-all ${checked ? 'left-[18px]' : 'left-[2px]'}`}
      />
    </div>
  );

  return (
    <section className="w-full px-10">
      <div className="w-full min-h-[405px] bg-white rounded-2xl p-8 mb-8 flex flex-col gap-6 mt-12">
      {/* Pricing & Profit Impact Section */}
      <div className="w-full flex flex-col gap-4 opacity-100">
        <div className="w-[200px] h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] bg-none opacity-100 mb-2 whitespace-nowrap">Pricing & Profit Impact</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bundle Price Input */}
          <div className="flex flex-col">
            <Label variant="bundle" className="mb-2">
              Bundle Price (AED)
            </Label>
            <Input
              type="number"
              variant="bundlePrice"
              placeholder="0.00"
              value={bundle_price ?? ""}
              onChange={(e) => onChange({ bundle_price: e.target.value === "" ? undefined : Number(e.target.value) })}
            />
          </div>
          {/* Discount Input */}
          <div className="flex flex-col">
            <Label variant="bundle" className="mb-2">
              Discount (%)
            </Label>
            <Input
              type="number"
              variant="bundlePrice"
              placeholder="0"
              value={discount_percentage ?? ""}
              onChange={(e) => onChange({ discount_percentage: e.target.value === "" ? undefined : Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 opacity-100">
        <div className="w-[196px] h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] bg-none opacity-100 mb-2 whitespace-nowrap">Schedule & Activation</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Start Date Input */}
          <div className="flex flex-col">
            <Label variant="bundle" className="mb-2">
              Start Date
            </Label>
            <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-[48px] justify-start text-left font-lato font-normal text-[16px] text-[#787777] rounded-lg border border-[#E4E4E7] bg-white hover:bg-white pl-10 relative"
                >
                  <span className="absolute left-[14px]">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <rect x="3" y="6" width="14" height="11" rx="2" stroke="#787777" strokeWidth="1.5" />
                      <path d="M7 2v2M13 2v2" stroke="#787777" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  {startDate ? format(startDate, "PPP") : "Pick a Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 bg-[#FAFAFA] rounded-2xl shadow-xl border-none z-50" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  className="bg-transparent"
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* End Date Input */}
          <div className="flex flex-col">
            <Label variant="bundle" className="mb-2">
              End Date
            </Label>
            <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-[48px] justify-start text-left font-lato font-normal text-[16px] text-[#787777] rounded-lg border border-[#E4E4E7] bg-white hover:bg-white pl-10 relative"
                >
                  <span className="absolute left-[14px]">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <rect x="3" y="6" width="14" height="11" rx="2" stroke="#787777" strokeWidth="1.5" />
                      <path d="M7 2v2M13 2v2" stroke="#787777" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  {endDate ? format(endDate, "PPP") : "Pick a Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 bg-[#FAFAFA] rounded-2xl shadow-xl border-none z-50" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  initialFocus
                  className="bg-transparent"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Activation Buttons Section */}
      <div className="w-full flex flex-col gap-6 opacity-100">
        <div className="flex items-center gap-4 h-9">
          <span className="font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] align-middle">Auto-activate</span>
          <div className="ml-auto flex items-center gap-2">
            <Toggle checked={autoActivate} onChange={() => onChange({ autoActivate: !autoActivate })} />
            <span className={`font-lato font-medium text-[16px] ${autoActivate ? 'text-[#1E1E1E]' : 'text-[#787777]'}`}>{autoActivate ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 h-9">
          <span className="font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] align-middle">Show on kiosk</span>
          <div className="ml-auto flex items-center gap-2">
            <Toggle checked={showOnKiosk} onChange={() => onChange({ showOnKiosk: !showOnKiosk })} />
            <span className={`font-lato font-medium text-[16px] ${showOnKiosk ? 'text-[#1E1E1E]' : 'text-[#787777]'}`}>{showOnKiosk ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 h-9">
          <span className="font-lato font-normal text-[16px] leading-[20px] text-[#1E1E1E] align-middle">Show on Staff screen</span>
          <div className="ml-auto flex items-center gap-2">
            <Toggle checked={showOnStaff} onChange={() => onChange({ showOnStaff: !showOnStaff })} />
            <span className={`font-lato font-medium text-[16px] ${showOnStaff ? 'text-[#1E1E1E]' : 'text-[#787777]'}`}>{showOnStaff ? "Active" : "Inactive"}</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default BundlePricing;