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
    <div className="flex flex-col gap-[20px] items-start w-full">
      {/* System Settings Title */}
      <p className="font-lato font-medium leading-[24px] text-[#071437] text-[16px] w-full">
        System Settings
      </p>

      {/* Maintenance Mode */}
      <div className="flex items-start w-full">
        <div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
          <div className="border-[#f1f1f4] border-[0px_0px_1px] border-solid flex gap-[10px] h-[79px] items-center justify-end p-[20px] w-full">
            <div className="flex flex-col gap-[10px] items-start justify-center flex-1 min-h-px min-w-px">
              <p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
                Maintenance Mode
              </p>
              <div className="flex flex-col gap-[8px] items-start justify-center">
                <p className="font-inter font-normal leading-[12px] text-[#4b5675] text-[12px] whitespace-pre">
                  Temporarily disable public access
                </p>
              </div>
            </div>
            <button
              className={`relative inline-flex h-[22px] w-[34px] items-center rounded-full ${maintenanceMode ? 'bg-[#00674e]' : 'bg-gray-300'}`}
              onClick={() => setMaintenanceMode((prev) => !prev)}
            >
              <span className={`absolute inline-block h-[18px] w-[18px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition top-[2px] ${maintenanceMode ? 'left-[14px]' : 'left-[2px]'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Fees */}
      <div className="flex items-start w-full">
        <div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
          <div className="border-[#f1f1f4] border-[0px_0px_1px] border-solid flex items-center justify-end p-[20px] w-full">
            <div className="flex flex-col gap-[16px] items-start justify-center flex-1 min-h-px min-w-px">
              <p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
                Product Fees
              </p>
              <div className="flex gap-[16px] items-start w-full">
                {/* VAT % */}
                <div className="flex flex-col gap-[4px] items-start flex-1 min-h-px min-w-px">
                  <p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] whitespace-pre">
                    VAT %
                  </p>
                  <div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[46px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={vat}
                      onChange={(e) => setVat(parseInt(e.target.value) || 0)}
                      className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] w-full border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
                {/* AI Discount Limit % */}
                <div className="flex flex-col gap-[4px] items-start flex-1 min-h-px min-w-px">
                  <p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] whitespace-pre">
                    AI Discount Limit %
                  </p>
                  <div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[46px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discountLimit}
                      onChange={(e) => setDiscountLimit(parseInt(e.target.value) || 0)}
                      className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] w-full border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Others */}
      <div className="flex items-start w-full">
        <div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
          <div className="border-[#f1f1f4] border-[0px_0px_1px] border-solid flex items-center justify-end p-[20px] w-full">
            <div className="flex flex-col gap-[16px] items-start justify-center flex-1 min-h-px min-w-px">
              <p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
                Others
              </p>
              <div className="flex items-start w-full">
                <div className="flex flex-col gap-[4px] items-start flex-1 min-h-px min-w-px">
                  <div className="flex items-center w-full">
                    <p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] flex-1 min-h-px min-w-px">
                      POS Sync Interval
                    </p>
                  </div>
                  <div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[56px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
                    <input
                      type="number"
                      min="1"
                      value={posSyncInterval}
                      onChange={(e) => setPosSyncInterval(parseInt(e.target.value) || 1)}
                      className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] w-full border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="h-[44px] w-full relative">
        <div className="absolute bg-[#00674e] flex gap-[5px] items-center overflow-clip px-[16px] py-[12px] right-0 rounded-[6px] top-0 h-[44px] w-[140px]">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="font-inter font-medium leading-[14px] text-[16px] text-white tracking-[-0.16px] whitespace-nowrap w-full bg-transparent border-none cursor-pointer"
          >
            {isSaving ? 'Saving...' : isSaved ? 'Settings Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
