"use client";

import React, { useState } from "react";

export default function SystemSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [vat, setVat] = useState(25);
  const [discountLimit, setDiscountLimit] = useState(35);
  const [posSyncInterval, setPosSyncInterval] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 1200);
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ 
    isOn, 
    onChange, 
    label, 
    description 
  }: { 
    isOn: boolean, 
    onChange: () => void, 
    label: string, 
    description: string 
  }) => (
    <div className="flex items-center justify-between w-full p-5
                   transition-all duration-300 hover:bg-gray-50/50 rounded-lg">
      <div className="flex flex-col gap-2">
        <p className="font-lato font-medium text-[16px] text-[#1e1e1e]">{label}</p>
        <p className="font-inter font-normal text-[12px] text-[#4b5675]">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-[22px] w-[34px] items-center rounded-full transition-all duration-300 ease-out
                   ${isOn ? 'bg-[#00674e] hover:bg-[#00563d]' : 'bg-gray-300 hover:bg-gray-400'}`}
      >
        <span className={`absolute inline-block h-[18px] w-[18px] rounded-full bg-white shadow-md transform transition-all duration-300 ease-out top-[2px]
                         ${isOn ? 'left-[14px]' : 'left-[2px] hover:left-[3px]'}`} />
      </button>
    </div>
  );

  // Input Field Component
  const InputField = ({ 
    label, 
    value, 
    onChange, 
    min = 0, 
    max = 100,
    unit = "%"
  }: { 
    label: string, 
    value: number, 
    onChange: (value: number) => void,
    min?: number,
    max?: number,
    unit?: string
  }) => (
    <div className="flex flex-col gap-2 flex-1">
      <p className="font-inter font-normal text-[14px] text-[#071437]">{label}</p>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="bg-white border border-[#eeeeee] h-[46px] px-4 py-3 rounded-lg w-full
                   font-inter font-normal text-[13px] text-[#252f4a] outline-none
                   transition-all duration-300 ease-out
                   focus:border-[#00674e] focus:shadow-md focus:ring-2 focus:ring-[#00674e]/20"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#787777] text-sm">
          {unit}
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 items-start w-full">
      {/* System Settings Title */}
      <p className="font-lato font-medium text-[16px] text-[#071437] w-full">
        System Settings
      </p>

      {/* Maintenance Mode */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl w-full overflow-hidden
                     transition-all duration-300 hover:shadow-md">
        <ToggleSwitch 
          isOn={maintenanceMode}
          onChange={() => setMaintenanceMode(prev => !prev)}
          label="Maintenance Mode"
          description="Temporarily disable public access"
        />
      </div>

      {/* Product Fees */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl w-full overflow-hidden
                     transition-all duration-300 hover:shadow-md">
        <div className="p-5">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e] mb-4">
            Product Fees
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <InputField 
              label="VAT %"
              value={vat}
              onChange={setVat}
              min={0}
              max={100}
              unit="%"
            
            />
            
            <InputField 
              label="AI Discount Limit %"
              value={discountLimit}
              onChange={setDiscountLimit}
              min={0}
              max={100}
              unit="%"
            />
          </div>
        </div>
      </div>

      {/* Others */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl w-full overflow-hidden
                     transition-all duration-300 hover:shadow-md">
        <div className="p-5">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e] mb-4">
            Others
          </p>
          
          <div className="flex flex-col gap-2">
            <p className="font-inter font-normal text-[14px] text-[#071437]">
              POS Sync Interval
            </p>
            
            <div className="relative">
              <input
                type="number"
                min="1"
                value={posSyncInterval}
                onChange={(e) => setPosSyncInterval(parseInt(e.target.value) || 1)}
                className="bg-white border border-[#eeeeee] h-[56px] px-4 py-3 rounded-lg w-full
                         font-inter font-normal text-[13px] text-[#252f4a] outline-none
                         transition-all duration-300 ease-out
                         focus:border-[#00674e] focus:shadow-md focus:ring-2 focus:ring-[#00674e]/20"
              />
              
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`relative font-inter font-medium text-[16px] text-white px-6 py-3 rounded-lg
                     transition-all duration-300 ease-out min-w-[140px]
                     ${isSaving 
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : isSaved
                         ? 'bg-green-600 hover:bg-green-700'
                         : 'bg-[#00674e] hover:bg-[#00563d] hover:scale-[1.02] hover:shadow-lg'
                     }`}
        >
          <span className={`transition-all duration-300 ${isSaving || isSaved ? 'opacity-0' : 'opacity-100'}`}>
            Save Settings
          </span>
          <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300
                          ${isSaving ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </div>
          </span>
          <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300
                          ${isSaved ? 'opacity-100' : 'opacity-0'}`}>
             Settings Saved!
          </span>
        </button>
      </div>
    </div>
  );
}