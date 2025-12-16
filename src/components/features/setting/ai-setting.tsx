"use client";

import React, { useState } from "react";

export default function AISettings() {
  type SettingsKey = 'autoApprove' | 'weatherBased' | 'eventBased' | 'expiringItems' | 'slowMovers';
  const [settings, setSettings] = useState({
    autoApprove: true,
    weatherBased: true,
    eventBased: true,
    expiringItems: true,
    slowMovers: true,
    aggressiveness: 50,
    sessionTimeout: 30,
    apiPerMinute: 30,
    apiBurstLimit: 30,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (key: SettingsKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsSaved(false);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, aggressiveness: parseInt(e.target.value) }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 1200);
  };

  const getAggressivenessLabel = () => {
    if (settings.aggressiveness < 33) return "Low";
    if (settings.aggressiveness < 66) return "Balanced";
    return "High";
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ isOn, onChange, label }: { isOn: boolean, onChange: () => void, label: string }) => (
    <div className="flex items-center justify-between w-full py-3 px-4 hover:bg-gray-50/50 transition-all duration-200 rounded-lg">
      <p className="font-inter font-normal text-[#4b5675] text-[14px]">{label}</p>
      <button
        onClick={onChange}
        className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-all duration-300 ease-out 
                   ${isOn ? 'bg-[#00674E]' : 'bg-gray-300 hover:bg-gray-400'}`}
      >
        <span className={`inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform transition-all duration-300 ease-out
                         ${isOn ? 'translate-x-[22px]' : 'translate-x-[2px] hover:translate-x-[3px]'}`} />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 items-start w-full">
      {/* AI Controls Title */}
      <p className="font-lato font-medium text-[16px] text-[#071437] w-full">
        AI Controls
      </p>

      {/* Auto-approve AI bundles */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl shadow-sm w-full overflow-hidden
                      transition-all duration-300 hover:shadow-md">
        <div className="flex items-center justify-between p-5 border-b border-[#f1f1f4]">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e]">
            Auto-approve AI bundles
          </p>
          <button
            onClick={() => handleToggle('autoApprove')}
            className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-all duration-300 ease-out
                       ${settings.autoApprove ? 'bg-[#00674E] hover:bg-[#00563d]' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            <span className={`inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform transition-all duration-300 ease-out
                             ${settings.autoApprove ? 'translate-x-[22px]' : 'translate-x-[2px] hover:translate-x-[3px]'}`} />
          </button>
        </div>
      </div>

      {/* Predictions & Triggers */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl shadow-sm w-full overflow-hidden
                      transition-all duration-300 hover:shadow-md">
        <div className="p-5">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e] mb-6">
            Predictions & Triggers
          </p>
          
          <div className="space-y-3 mb-8">
            <ToggleSwitch 
              isOn={settings.weatherBased} 
              onChange={() => handleToggle('weatherBased')}
              label="Weather-based suggestions"
            />
            <ToggleSwitch 
              isOn={settings.eventBased} 
              onChange={() => handleToggle('eventBased')}
              label="Event-based suggestions"
            />
            <ToggleSwitch 
              isOn={settings.expiringItems} 
              onChange={() => handleToggle('expiringItems')}
              label="Expiring items auto-bundles"
            />
            <ToggleSwitch 
              isOn={settings.slowMovers} 
              onChange={() => handleToggle('slowMovers')}
              label="Pair slow movers with top sellers"
            />
          </div>

          {/* AI Aggressiveness */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-lato font-medium text-[16px] text-[#1e1e1e]">
                AI Aggressiveness
              </p>
              <p className="font-lato font-semibold text-[14px] text-[#1e1e1e]">
                {getAggressivenessLabel()}
              </p>
            </div>
            
            <div className="relative pt-3 pb-2">
              <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#00674E] h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${settings.aggressiveness}%` }}
                />
              </div>
              
              <div 
                className="absolute top-1 -translate-x-1/2"
                style={{ left: `${settings.aggressiveness}%` }}
              >
                <div className="bg-[#00674E] border-2 border-white w-4 h-4 rounded-full shadow-lg
                              transition-all duration-200 hover:scale-125 hover:shadow-xl" />
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={settings.aggressiveness}
                onChange={handleSliderChange}
                className="absolute top-0 w-full h-4 opacity-0 cursor-pointer hover:opacity-20"
              />
            </div>
            
            <p className="font-inter font-normal text-[14px] text-[#4b5675] text-right">
              Controls how aggressively AI suggests bundles & discounts.
            </p>
          </div>
        </div>
      </div>

      {/* Others */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl shadow-sm w-full overflow-hidden
                      transition-all duration-300 hover:shadow-md">
        <div className="p-5">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e] mb-6">
            Others
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Session Timeout Mintue", value: settings.sessionTimeout, key: 'sessionTimeout' },
              { label: "API Request per minute", value: settings.apiPerMinute, key: 'apiPerMinute' },
              { label: "API Burst Limit", value: settings.apiBurstLimit, key: 'apiBurstLimit' }
            ].map(({ label, value, key }) => (
              <div key={key} className="space-y-2">
                <p className="font-inter font-normal text-[14px] text-[#071437]">{label}</p>
                <div className="bg-white border border-[#eeeeee] rounded-lg px-4 py-3 shadow-sm
                              transition-all duration-200 focus-within:border-[#00674E] focus-within:shadow-md">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      [key]: parseInt(e.target.value) || 30 
                    }))}
                    className="font-inter font-normal text-[13px] text-[#252f4a] w-full border-none outline-none bg-transparent
                             transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`relative font-inter font-medium text-[16px] text-white px-6 py-3 rounded-lg
                     transition-all duration-300 ease-out
                     ${isSaving 
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : isSaved
                         ? 'bg-green-600 hover:bg-green-700'
                         : 'bg-[#00674E] hover:bg-[#00563d] hover:scale-[1.02] hover:shadow-lg'
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