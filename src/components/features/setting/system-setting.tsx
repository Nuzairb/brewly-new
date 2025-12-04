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

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-0 min-h-[calc(100vh-48px)]">
      <div className="px-8 pt-6 pb-8">
        <h2 className="font-lato font-medium text-[16px] leading-6 text-[#1E1E1E] mb-6">System Settings</h2>
        {/* Maintenance Mode */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 px-6 py-5 flex items-center justify-between">
          <div>
            <span className="font-lato font-medium text-[16px] leading-6 text-[#1E1E1E]">Maintenance Mode</span>
            <div className="font-inter font-normal text-[14px] leading-5 text-[#787777]">Temporarily disable public access</div>
          </div>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${maintenanceMode ? 'bg-[#00674E]' : 'bg-gray-300'}`}
            onClick={() => setMaintenanceMode((prev) => !prev)}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        {/* Product Fees */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-inter font-normal text-[14px] leading-5 text-[#787777] mb-2 block">VAT %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={vat}
              onChange={(e) => setVat(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
          </div>
          <div>
            <label className="font-inter font-normal text-[14px] leading-5 text-[#787777] mb-2 block">AI Discount Limit %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={discountLimit}
              onChange={(e) => setDiscountLimit(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
          </div>
        </div>
        {/* Others */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 px-6 py-5">
          <label className="font-inter font-normal text-[14px] leading-5 text-[#787777] mb-2 block">POS Sync Interval</label>
          <input
            type="number"
            min="1"
            value={posSyncInterval}
            onChange={(e) => setPosSyncInterval(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
          />
        </div>
        {/* Save Button */}
        <div className="flex justify-end w-full">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-[180px] h-[48px] rounded-lg px-4 py-3 bg-[#00674E] text-white font-inter font-medium text-[20px] leading-6 flex items-center justify-center border-none shadow-sm cursor-pointer whitespace-nowrap"
          >
            {isSaving ? "Saving..." : isSaved ? "Settings Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
