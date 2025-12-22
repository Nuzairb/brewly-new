"use client";

import React, { useState, useEffect, useRef } from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);
  // local state for the three checkboxes
  const [locationChecks, setLocationChecks] = useState<boolean[]>([false, false, false]);

  // Initialize default dates on component mount
  useEffect(() => {
    if (!value.startDate && !value.endDate) {
      const today = new Date();
      const twoDaysLater = addDays(today, 2);
      onChange({ startDate: today, endDate: twoDaysLater });
    }
  }, []);

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startDateRef.current && !startDateRef.current.contains(event.target as Node)) {
        setIsStartDateOpen(false);
      }
      if (endDateRef.current && !endDateRef.current.contains(event.target as Node)) {
        setIsEndDateOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { bundle_price, discount_percentage, startDate, endDate, autoActivate, showOnKiosk, showOnStaff } = value;

  const handleStartDateSelect = (date: Date | undefined) => {
    console.log('Start date selected:', date);
    onChange({ startDate: date });
    setIsStartDateOpen(false);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    console.log('End date selected:', date);
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
    <section className="w-full px-10 relative">
      <div className="w-full min-h-[405px] bg-white rounded-2xl p-8 mb-8 flex flex-col gap-6 mt-12 overflow-visible">
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
          <div className="flex flex-col relative" ref={startDateRef}>
            <Label variant="bundle" className="mb-2">
              Start Date
            </Label>
            <button
              type="button"
              className="w-full h-[48px] justify-start text-left font-lato font-normal text-[16px] text-[#787777] rounded-lg border border-[#E4E4E7] bg-white hover:bg-gray-50 pl-10 relative cursor-pointer flex items-center"
              onClick={() => {
                console.log('Start date button clicked');
                setIsStartDateOpen(!isStartDateOpen);
                setIsEndDateOpen(false);
              }}
            >
              <span className="absolute left-[14px] pointer-events-none">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <rect x="3" y="6" width="14" height="11" rx="2" stroke="#787777" strokeWidth="1.5" />
                  <path d="M7 2v2M13 2v2" stroke="#787777" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              {startDate ? format(startDate, "PPP") : "Pick a Date"}
            </button>
            {isStartDateOpen && (
              <div
                className="absolute top-full left-0 mt-2 p-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9999]"
                style={{ minWidth: '320px' }}
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  className="bg-white"
                />
              </div>
            )}
          </div>
          {/* End Date Input */}
          <div className="flex flex-col relative" ref={endDateRef}>
            <Label variant="bundle" className="mb-2">
              End Date
            </Label>
            <button
              type="button"
              className="w-full h-[48px] justify-start text-left font-lato font-normal text-[16px] text-[#787777] rounded-lg border border-[#E4E4E7] bg-white hover:bg-gray-50 pl-10 relative cursor-pointer flex items-center"
              onClick={() => {
                console.log('End date button clicked');
                setIsEndDateOpen(!isEndDateOpen);
                setIsStartDateOpen(false);
              }}
            >
              <span className="absolute left-[14px] pointer-events-none">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <rect x="3" y="6" width="14" height="11" rx="2" stroke="#787777" strokeWidth="1.5" />
                  <path d="M7 2v2M13 2v2" stroke="#787777" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              {endDate ? format(endDate, "PPP") : "Pick a Date"}
            </button>
            {isEndDateOpen && (
              <div
                className="absolute top-full left-0 mt-2 p-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9999]"
                style={{ minWidth: '320px' }}
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  initialFocus
                  className="bg-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Activation Buttons Section */}
      <div className="w-full flex flex-col gap-6 opacity-100">
      <div className="w-[196px] h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] bg-none opacity-100 mb-2 whitespace-nowrap">Availability & Visibility</div>
        <div>
        <div className="flex flex-row">
              <span className="font-lato font-semibold text-[18px]">Apply to all Locations</span>
              <div className="font-lato font-semibold text-[18px] ml-auto flex items-center gap-2">
                <Toggle checked={autoActivate} onChange={() => onChange({ autoActivate: !autoActivate })} />
                <span className={`font-lato font-medium text-[16px] ${autoActivate ? 'text-[#1E1E1E]' : 'text-[#787777]'}`}>{autoActivate ? "Active" : "Inactive"}</span>
              </div>
          </div>

          {/* three checkboxes added at approximately line 200 */}
          <div className="mt-3 flex flex-col gap-2">
              {['Dubai Marina', 'Down Town', 'City Center'].map((label, idx) => {
                const checked = !!locationChecks[idx];
                return (
                  <label key={label} className="inline-flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...locationChecks];
                        next[idx] = !next[idx];
                        setLocationChecks(next);
                      }}
                      aria-pressed={checked}
                      className={`w-5 h-5 rounded-sm flex items-center justify-center transition-colors ml-4 duration-150 border ${checked ? 'bg-[#00674E] border-[#00674E]' : 'bg-white border-[#E0E0E0]'}`}
                    >
                      {checked && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4 8L11 1" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="font-lato text-[16px] font-normal text-[#787777] ">{label}</span>
                  </label>
                );
              })}
          </div>
        </div>
        <div className="flex items-center gap-4 h-9">
          <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] align-middle">Auto-activate</span>
          <div className="ml-auto flex items-center gap-2">
            <Toggle checked={autoActivate} onChange={() => onChange({ autoActivate: !autoActivate })} />
            <span className={`font-lato font-medium text-[16px] ${autoActivate ? 'text-[#1E1E1E]' : 'text-[#787777]'}`}>{autoActivate ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 h-9">
          <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] align-middle">Show on kiosk</span>
          <div className="ml-auto flex items-center gap-2">
            <Toggle checked={showOnKiosk} onChange={() => onChange({ showOnKiosk: !showOnKiosk })} />
            <span className={`font-lato font-medium text-[16px] ${showOnKiosk ? 'text-[#1E1E1E]' : 'text-[#787777]'}`}>{showOnKiosk ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 h-9">
          <span className="font-lato font-medium text-[16px] leading-[20px] text-[#1E1E1E] align-middle">Show on Staff screen</span>
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